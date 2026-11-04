/* Optional independent scoring services. No keys are embedded in browser code.
   Azure metrics are 0–100 diagnostic scores, NOT Pearson PTE exam scores. */
(() => {
  'use strict';
  let config={speech:false,language:false,accessPinRequired:false,loaded:false,error:''};
  let sdkPromise=null,active=null;
  const statusListeners=new Set();
  const notify=()=>{for(const f of statusListeners)try{f(config)}catch{}};
  const pin=()=>{try{return sessionStorage.getItem('scaryAiPin')||'';}catch{return '';}};
  function setPin(value){try{if(value)sessionStorage.setItem('scaryAiPin',String(value));else sessionStorage.removeItem('scaryAiPin');}catch{/* Session storage unavailable (e.g. sandbox preview). */}}
  function headers(){return {'Content-Type':'application/json',...(pin()?{'x-scary-access-pin':pin()}:{})};}
  async function refresh(){
    try{
      const r=await fetch('/api/config',{cache:'no-store'});
      if(!r.ok)throw new Error('AI server unavailable');
      config={...(await r.json()),loaded:true,error:''};
    }catch{config={speech:false,language:false,accessPinRequired:false,loaded:true,error:'AI services are not reachable. Open the hosted Vercel site or start node server.js on localhost.'};}
    notify();return {...config};
  }
  function status(){return {...config};}
  function onStatus(fn){statusListeners.add(fn);return ()=>statusListeners.delete(fn);}
  function loadSDK(){
    if(window.SpeechSDK)return Promise.resolve(window.SpeechSDK);
    if(!sdkPromise){
      sdkPromise=new Promise((resolve,reject)=>{
        const sc=document.createElement('script');
        sc.src='https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@1.47.0/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js';
        sc.async=true;
        sc.onload=()=>window.SpeechSDK?resolve(window.SpeechSDK):reject(new Error('Azure SDK did not initialize.'));
        sc.onerror=()=>reject(new Error('Could not load Azure Speech SDK. Check your network.'));
        document.head.appendChild(sc);
      }).catch(e=>{sdkPromise=null;throw e;});
    }
    return sdkPromise;
  }
  function preload(){if(config.speech)loadSDK().catch(()=>{});}
  async function token(){
    const r=await fetch('/api/speech-token',{method:'POST',headers:headers(),body:'{}'});
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.error||`Token service ${r.status}`);
    return data;
  }
  const num=x=>Number.isFinite(Number(x))?Math.round(Number(x)*10)/10:null;
  function summarize(session){
    if(!session.results.length)return {status:'error',error:session.error||'No recognized speech was returned. Check microphone audio and your Azure Speech subscription.',transcript:session.transcript.join(' ').trim()};
    const keys=['accuracyScore','fluencyScore','pronunciationScore','completenessScore','prosodyScore'];
    const out={status:'ok',provider:'Microsoft Azure Speech Pronunciation Assessment',segments:session.results.length,transcript:session.transcript.join(' ').trim(),words:[]};
    for(const k of keys){const a=session.results.map(x=>x[k]).filter(x=>x!==null);out[k]=a.length?num(a.reduce((s,v)=>s+v,0)/a.length):null;}
    out.words=session.results.flatMap(x=>x.words||[]).slice(0,140);
    out.note='Azure trait values are on a 0–100 diagnostic scale. Multi-utterance figures are simple segment means, not Pearson PTE grades.';
    return out;
  }
  function sendUpdate(session,payload){if(!session.sent){session.sent=true;try{session.callback(payload);}catch{}}}
  async function startSpeech({taskId,referenceText='',callback}){
    if(!config.speech||active)return false;
    const session={id:Date.now()+Math.random(),taskId,referenceText,callback,results:[],transcript:[],closed:false,started:false,sent:false,recognizer:null,error:''};
    active=session;
    try{
      const [SDK,auth]=await Promise.all([loadSDK(),token()]);
      if(session.closed){sendUpdate(session,{status:'error',error:'Speech analysis was not ready before recording ended. Retry after connecting AI in Settings.'});if(active===session)active=null;return false;}
      const speechConfig=SDK.SpeechConfig.fromAuthorizationToken(auth.token,auth.region);
      speechConfig.speechRecognitionLanguage='en-US';
      speechConfig.outputFormat=SDK.OutputFormat.Detailed;
      const audioConfig=SDK.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer=new SDK.SpeechRecognizer(speechConfig,audioConfig);
      session.recognizer=recognizer;
      // Reference-based assessment for Read Aloud and Repeat Sentence. Other speaking tasks are unscripted.
      const scripted=['read-aloud','repeat-sentence'].includes(taskId) && Boolean(referenceText);
      const pa=new SDK.PronunciationAssessmentConfig(scripted?referenceText:'',SDK.PronunciationAssessmentGradingSystem.HundredMark,SDK.PronunciationAssessmentGranularity.Phoneme,false);
      if(typeof pa.enableProsodyAssessment==='function')pa.enableProsodyAssessment();
      pa.applyTo(recognizer);
      recognizer.recognized=(_sender,e)=>{
        if(e.result?.reason!==SDK.ResultReason.RecognizedSpeech)return;
        if(e.result.text)session.transcript.push(e.result.text);
        try{
          const a=SDK.PronunciationAssessmentResult.fromResult(e.result);
          const raw=JSON.parse(e.result.properties.getProperty(SDK.PropertyId.SpeechServiceResponse_JsonResult)||'{}');
          const words=(raw.NBest?.[0]?.Words||[]).map(w=>({word:String(w.Word||''),accuracy:num(w.PronunciationAssessment?.AccuracyScore),error:String(w.PronunciationAssessment?.ErrorType||'None')}));
          session.results.push({accuracyScore:num(a.accuracyScore),fluencyScore:num(a.fluencyScore),pronunciationScore:num(a.pronunciationScore),completenessScore:scripted?num(a.completenessScore):null,prosodyScore:num(a.prosodyScore),words});
        }catch(e){session.error=String(e.message||e);}
      };
      recognizer.canceled=(_sender,e)=>{session.error=e.errorDetails||`Azure recognition canceled: ${e.reason}`;};
      await new Promise((resolve,reject)=>recognizer.startContinuousRecognitionAsync(resolve,err=>reject(new Error(String(err)))));
      session.started=true;
      if(session.closed)await stopSession(session);
      return true;
    }catch(e){
      session.error=String(e.message||e);sendUpdate(session,{status:'error',error:session.error});
      try{session.recognizer?.close();}catch{}
      if(active===session)active=null;
      return false;
    }
  }
  async function stopSession(session){
    if(!session.recognizer){if(!session.sent)sendUpdate(session,{status:'error',error:'Speech analysis did not start in time.'});if(active===session)active=null;return;}
    try{
      if(session.started){await new Promise(resolve=>session.recognizer.stopContinuousRecognitionAsync(resolve,resolve));}
      // SDK callbacks may arrive during stop. Use all recognized segments available now.
      sendUpdate(session,summarize(session));
    }catch(e){sendUpdate(session,{status:'error',error:String(e.message||e)});}
    finally{try{session.recognizer.close();}catch{}if(active===session)active=null;}
  }
  function finishSpeech(){if(!active)return;const s=active;s.closed=true;if(s.started)stopSession(s);}
  async function language({taskId,prompt,response,reference}){
    if(!config.language)throw new Error('Language AI is not configured. See Settings.');
    const r=await fetch('/api/language-feedback',{method:'POST',headers:headers(),body:JSON.stringify({taskId,prompt,response,reference})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.error||`Language feedback service error (${r.status})`);
    return data;
  }
  window.ScaryAI={refresh,status,onStatus,setPin,preload,startSpeech,finishSpeech,language};
  refresh();
})();
