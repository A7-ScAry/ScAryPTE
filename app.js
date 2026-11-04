/* ScAry PTE v6: local-first practice with optional independent Azure Speech / language AI. No Pearson or APEUni scoring engine. */
(() => {
  'use strict';
  const { tasks: TASKS, questions: BANK } = window.SCARE_DATA;
  const SECTIONS = ['Speaking','Writing','Reading','Listening'];
  const COLORS = {Speaking:'#3c4448', Writing:'#737d82', Reading:'#a0a7ab', Listening:'#596369'};
  const ICONS = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2"/>',
    test:'<rect x="5" y="3" width="14" height="19" rx="2"/><path d="M9 3.5h6M9 11l1.6 1.6L14 9M9 17h6"/>',
    chart:'<path d="M3 3v18h18M8 16v-4m5 4V8m5 8V5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06L4.2 16.94l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3v-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06 7.06 4.2l.06.06A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.04V3h4v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 9 1.7 1.7 0 0 0 20.96 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15z"/>',
    mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8"/>',
    pen:'<path d="m15 5 4 4M4 20l4.5-.7L20 7.8a2.8 2.8 0 0 0-3.9-3.9L4.7 15.5z"/>',
    reading:'<path d="M12 7c-2.4-2-5.2-2.8-9-2v14c3.5-.7 6.5 0 9 2 2.5-2 5.5-2.7 9-2V5c-3.8-.8-6.6 0-9 2zm0 0v14"/>',
    headphone:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v7H5a2 2 0 0 1-2-2zm14 0h4v5a2 2 0 0 1-2 2h-2z"/>',
    right:'<path d="M5 12h14m-6-6 6 6-6 6"/>',left:'<path d="M19 12H5m6 6-6-6 6-6"/>',check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    fire:'<path d="M12 22c5 0 8-3.5 8-8 0-3-2-5.5-4-7 .2 3-1 4.5-2 5C14 7 11 4 9 2c.3 4-1 5.5-3 7.5A8.2 8.2 0 0 0 4 15c0 4 3.4 7 8 7z"/>',
    volume:'<path d="M11 5 6 9H3v6h3l5 4zM15 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    play:'<path d="m7 4 13 8-13 8z"/>',pause:'<path d="M8 5v14M16 5v14"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',up:'<path d="m6 15 6-6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>',
    sparkle:'<path d="m12 2 2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"/>',
    refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A8 8 0 0 1 19 7m-.5 8A8 8 0 0 1 5 17"/>',
    award:'<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>'
  };
  const svg = (name,size=19) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.sparkle}</svg>`;
  const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = s=>s.toLowerCase();
  const safeLoad = (key,fallback)=>{try {const x=JSON.parse(localStorage.getItem(key));return x??fallback;}catch{return fallback;}};
  let records = safeLoad('scaryPteRecords',[]); if(!Array.isArray(records)) records=[];
  let favourites = safeLoad('scaryPteFavourites',[]); if(!Array.isArray(favourites)) favourites=[];
  let settings = {...{target:79,goal:20},...safeLoad('scaryPteSettings',{})};
  let state = {page:'dashboard',filter:'All',search:'',qSearch:'',qPage:0,taskId:null,qIndex:0,answer:null,feedback:null,seconds:0,originalSeconds:0,phase:'ready',mock:null,mobileNav:false};
  let timerId=null, sectionTimerId=null, phaseDeadline=0, recognition=null,recording=false,voiceMessage='';
  let micStream=null,mediaRecorder=null,recordedChunks=[],recordedAudioUrl=null,captureGeneration=0,micAttemptPending=false;
  let selectedMicrophone='', microphoneDevices=[], micProblem='', micTesterStatus='not-checked', recordedAudioMime='audio/webm';
  let audioContext=null, audioSource=null, audioAnalyser=null, audioMeterTimer=null, audioMeterLevel=0;
  let speechActivity={samples:0, voiced:0, peak:0, startedAt:0, stoppedAt:0};
  let lastCaptureInfo=null, transcriptSource='none';
  const ai=window.ScaryAI;
  let attemptId=0;
  if(ai)ai.onStatus(()=>{if(state.page==='settings')render();});
  const aiConfigured=(type)=>Boolean(ai?.status()?.[type]);
  const numText=v=>typeof v==='number'&&Number.isFinite(v)?`${Math.round(v)}/100`:'Not available';
  function aiSummaryUI(f,task){
    const speech=SPEAKING_TYPES.has(task.type);
    const lang=['writing','speech-open'].includes(task.type);
    if(!speech&&!lang)return '';
    let content=`<div class="ai-intro">These are diagnostic measurements from independent providers. They are <b>not calibrated PTE exam results</b> or APEUni scores.</div>`;
    if(speech){
      const x=f.aiSpeech;
      if(x?.status==='ok'){
        const traits=[['Pronunciation',x.pronunciationScore],['Accuracy',x.accuracyScore],['Oral fluency',x.fluencyScore],['Prosody',x.prosodyScore],['Completeness',x.completenessScore]];
        content+=`<div class="ai-trait-grid">${traits.filter(([,v])=>v!=null).map(([k,v])=>`<div class="ai-trait"><small>${esc(k)}</small><strong>${numText(v)}</strong><div class="ai-track"><span style="width:${Math.max(0,Math.min(100,v))}%"></span></div></div>`).join('')}</div>`;
        content+=`<p class="ai-note">${esc(x.provider)} · ${x.segments} recognized segment(s). Segment averages are approximations, not exam scores.</p>`;
        if(x.words?.length)content+=`<div class="ai-word-list"><strong>Word-level notes</strong><div>${x.words.filter(w=>w.accuracy!==null).slice(0,60).map(w=>`<span title="${esc(w.error)} · ${numText(w.accuracy)}" class="ai-word ${w.accuracy<65?'needs-work':''}">${esc(w.word)} <small>${Math.round(w.accuracy)}</small></span>`).join(' ')}</div></div>`;
      } else if(x?.status==='error')content+=`<p class="ai-error">Azure speech assessment unavailable: ${esc(x.error)}</p>`;
      else if(f.aiSpeechPending)content+=`<p class="ai-pending">Analyzing your recorded speech… Results will appear here when Azure finishes.</p>`;
      else content+=`<p class="ai-note">Speech AI ${aiConfigured('speech')?'was not started for this attempt':'not connected'}. Enable Azure Speech in the server settings for actual pronunciation and fluency analysis.</p>`;
    }
    if(lang){
      const x=f.aiLanguage;
      if(x?.provider){
        content+=`<div class="ai-trait-grid">${[['Content',x.content],['Grammar',x.grammar],['Vocabulary',x.vocabulary],['Organization',x.organization],['Form',x.form]].map(([k,v])=>`<div class="ai-trait"><small>${esc(k)}</small><strong>${numText(v)}</strong><div class="ai-track"><span style="width:${Math.max(0,Math.min(100,v))}%"></span></div></div>`).join('')}</div>`;
        content+=`<p class="ai-note"><b>AI feedback:</b> ${esc(x.summary||'')}</p><div class="ai-improve">${(x.improvements||[]).map(t=>`<p>• ${esc(t)}</p>`).join('')}</div>`;
      }else if(f.aiLanguageError)content+=`<p class="ai-error">Language feedback unavailable: ${esc(f.aiLanguageError)}</p>`;
      else if(f.aiLanguagePending)content+=`<p class="ai-pending">Reviewing content, grammar, vocabulary and structure…</p>`;
      else content+=`<p class="ai-note">Language AI ${aiConfigured('language')?'was not run for this attempt':'not connected'}. Configure an OpenAI API key on the server.</p>`;
    }
    return `<section class="ai-result-panel"><div class="ai-result-heading">${svg('sparkle',17)} Independent AI assessment <span class="ai-tag">BETA</span></div>${content}</section>`;
  }
  function aiSetupUI(){
    const c=ai?.status()||{};
    const chip=x=>x?'Configured':'Not configured';
    return `<div class="surface ai-setup"><h3 class="surface-title">AI scoring providers <span class="ai-tag">OPTIONAL</span></h3><p class="surface-sub">Real provider measurements, separate from ScAry's offline answer checks</p>
      <div class="ai-service-list"><div><strong>Microsoft Azure Speech</strong><span class="${c.speech?'ai-on':'ai-off'}">${chip(c.speech)}</span><p>Pronunciation, fluency, word accuracy, completeness and prosody from microphone recordings.</p></div><div><strong>AI language evaluation</strong><span class="${c.language?'ai-on':'ai-off'}">${chip(c.language)}</span><p>Grammar, vocabulary, organization and relevance feedback from an AI language model.</p></div></div>
      ${c.error?`<p class="ai-error">${esc(c.error)}</p>`:''}<p class="settings-note">To enable: deploy the complete site on Vercel and set server environment variables as explained in README. Keys must NEVER appear in this website's HTML or JavaScript.</p>
      <label class="settings-label" for="ai-pin">${c.accessPinRequired?'Access PIN (required to use AI services)':'Access PIN (only if you configured one)'}</label><div class="ai-pin-row"><input id="ai-pin" type="password" autocomplete="off" placeholder="Enter private access PIN"><button class="button small soft" data-action="save-ai-pin">Save for this tab</button><button class="button small ghost" data-action="refresh-ai">Check connection</button></div>
      <p class="settings-note">AI services may incur charges to the person running the server. Do not expose unrestricted APIs to the public. These AI diagnostics are not official PTE 10–90 scores.</p></div>`;
  }

  const isSecureMicEnvironment=()=>window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
  function micProblemText(error){
    const n=error?.name||'';
    if(n==='NotAllowedError'||n==='PermissionDeniedError')return 'Microphone permission was blocked. In Chrome click the site-controls icon beside the address, allow Microphone, then try again. On Mac check System Settings → Privacy & Security → Microphone.';
    if(n==='NotFoundError'||n==='DevicesNotFoundError')return 'No microphone found. Connect a headset or microphone and try again.';
    if(n==='NotReadableError'||n==='TrackStartError')return 'Your microphone is busy or not accessible. Close other recording apps and select another input.';
    if(n==='OverconstrainedError')return 'This selected input is not available. Choose the default microphone and retry.';
    if(n==='SecurityError')return 'Browser security blocked microphone access. Open the site with HTTPS or http://localhost:8000.';
    return `${n||'Microphone error'}: ${String(error?.message||'Could not open your microphone.')}`;
  }
  function resetActivity(){speechActivity={samples:0,voiced:0,peak:0,startedAt:0,stoppedAt:0};lastCaptureInfo=null;transcriptSource='none';}
  function closeMeter(){clearInterval(audioMeterTimer);audioMeterTimer=null;if(audioSource){try{audioSource.disconnect();}catch{}audioSource=null;}audioAnalyser=null;if(audioContext){try{audioContext.close();}catch{}audioContext=null;}audioMeterLevel=0;}
  function startMeter(stream){
    closeMeter();if(!stream)return;
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    try{
      audioContext=new AC();audioSource=audioContext.createMediaStreamSource(stream);
      audioAnalyser=audioContext.createAnalyser();audioAnalyser.fftSize=1024;audioSource.connect(audioAnalyser);
      audioContext.resume().catch(()=>{});
      const samples=new Uint8Array(audioAnalyser.fftSize);
      audioMeterTimer=setInterval(()=>{
        if(!audioAnalyser)return;
        audioAnalyser.getByteTimeDomainData(samples);
        let sum=0;for(const v of samples){const a=(v-128)/128;sum+=a*a;}
        const rms=Math.sqrt(sum/samples.length);
        audioMeterLevel=Math.min(100,Math.round(rms*560));
        const meter=document.getElementById('mic-level-fill');if(meter)meter.style.width=`${audioMeterLevel}%`;
        const num=document.getElementById('mic-level-text');if(num)num.textContent=audioMeterLevel>4?'Input detected':'Speak into your microphone';
        if(recording){speechActivity.samples++;if(rms>.018)speechActivity.voiced++;speechActivity.peak=Math.max(speechActivity.peak,rms);}
      },110);
    }catch{closeMeter();}
  }
  async function listMicrophones(){
    if(!navigator.mediaDevices?.enumerateDevices)return;
    try{microphoneDevices=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput');}catch{microphoneDevices=[];}
  }
  async function requestMicrophone(){
    if(micStream?.getAudioTracks().some(t=>t.readyState==='live'))return true;
    if(!isSecureMicEnvironment()){micProblem='Microphone access is unavailable in this browser or page. Use Chrome over HTTPS or http://localhost:8000 (not a preview inside another app).';micTesterStatus='unavailable';voiceMessage=micProblem;return false;}
    if(typeof MediaRecorder==='undefined'){micProblem='This browser cannot record microphone audio using MediaRecorder. Use a current version of Chrome or Edge.';micTesterStatus='unavailable';voiceMessage=micProblem;return false;}
    if(micAttemptPending)return false;
    micAttemptPending=true;
    try{
      const trackOpts={echoCancellation:true,noiseSuppression:true,autoGainControl:true};
      if(selectedMicrophone)trackOpts.deviceId={ideal:selectedMicrophone};
      micStream=await navigator.mediaDevices.getUserMedia({audio:trackOpts});
      if(!micStream?.getAudioTracks().some(t=>t.readyState==='live'))throw new Error('No live input audio track.');
      micStream.getAudioTracks().forEach(track=>track.onended=()=>{micProblem='Your microphone was disconnected or stopped. Retry the microphone test.';micTesterStatus='error';recording=false;syncRecordUI();});
      micProblem='';micTesterStatus='ready';voiceMessage='Microphone connected. Speak to check the input bar; recording will start after preparation.';
      await listMicrophones();startMeter(micStream);return true;
    }catch(error){micProblem=micProblemText(error);voiceMessage=micProblem;micTesterStatus='error';return false;}
    finally{micAttemptPending=false;}
  }
  function micTools(){
    const available=isSecureMicEnvironment();
    const ready=micStream?.getAudioTracks().some(t=>t.readyState==='live');
    const options=microphoneDevices.map((d,i)=>`<option value="${esc(d.deviceId)}" ${selectedMicrophone===d.deviceId?'selected':''}>${esc(d.label||`Microphone ${i+1}`)}</option>`).join('');
    return `<div class="mic-setup-panel"><div class="mic-setup-top"><div class="mic-setup-icon">${svg('mic',22)}</div><div><strong>Microphone setup</strong><p id="mic-setup-status" role="status">${esc(micProblem||(ready?'Connected · check the moving input meter below.':available?'Test your microphone before starting a speaking task.':'Microphone requires a secure page (HTTPS or localhost) and a supported browser.'))}</p></div><span class="mic-status-dot ${ready?'ready':'off'}" title="${ready?'Microphone connected':'Not connected'}"></span></div>
      <div class="mic-test-controls"><button class="button soft small" data-action="test-mic">${svg('mic',15)} ${ready?'Test again':'Test microphone'}</button>${microphoneDevices.length>1?`<label class="mic-device-label">Input <select id="mic-device-select" aria-label="Select microphone"><option value="">Default microphone</option>${options}</select></label>`:''}<span class="mic-source-label">${ready?'LIVE INPUT':'NOT CONNECTED'}</span></div>
      <div class="mic-level"><div class="mic-level-track"><div id="mic-level-fill" style="width:${audioMeterLevel}%"></div></div><span id="mic-level-text">${ready?'Speak into your microphone':'Waiting for permission'}</span></div>
      ${!ready?'<p class="mic-help">If Chrome says “blocked”, use the icon next to the website address → Site settings → Microphone → Allow. On Mac: System Settings → Privacy & Security → Microphone → enable Chrome. Reopen on HTTPS or localhost if needed.</p>':'<p class="mic-help">This is an input test only. Your response is not recorded until the speaking countdown begins.</p>'}
      </div>`;
  }

  const QUESTION_TOTAL=Object.values(BANK).reduce((n,items)=>n+items.length,0);
  const SPEAKING_TYPES=new Set(['speech-compare','speech-open','speech-short']);
  const AUDIO_SPEAK_IDS=new Set(['repeat-sentence','retell-lecture','answer-short-question','summarize-group-discussion','respond-to-situation']);
  const FIXED_TIMED_IDS=new Set(['summarize-written-text','write-essay','summarize-spoken-text']);
  const FULL_COUNTS={'read-aloud':6,'repeat-sentence':10,'describe-image':5,'retell-lecture':2,'answer-short-question':5,'summarize-group-discussion':2,'respond-to-situation':2,'summarize-written-text':2,'write-essay':1,'reading-fib-dropdown':5,'reading-mcq-multi':2,'reorder-paragraph':2,'reading-fib-dragdrop':4,'reading-mcq-single':2,'summarize-spoken-text':1,'listening-mcq-multi':2,'listening-fib':2,'highlight-correct-summary':2,'listening-mcq-single':2,'select-missing-word':1,'highlight-incorrect-words':2,'write-from-dictation':3};
  const groupFor=t=>['Speaking','Writing'].includes(t.section)?'Speaking & Writing':t.section;
  const SECTION_LIMITS={'Speaking & Writing':80*60,'Reading':26*60,'Listening':35*60};
  const prepSeconds=(t,q)=>t.id==='read-aloud'?40:t.id==='describe-image'?25:['retell-lecture','summarize-group-discussion','respond-to-situation'].includes(t.id)?10:0;
  const responseSeconds=t=>({'read-aloud':40,'repeat-sentence':15,'describe-image':40,'retell-lecture':40,'answer-short-question':10,'summarize-group-discussion':120,'respond-to-situation':40})[t.id]||0;
  const app=document.getElementById('app');
  const persist=()=>{try{localStorage.setItem('scaryPteRecords',JSON.stringify(records));localStorage.setItem('scaryPteFavourites',JSON.stringify(favourites));localStorage.setItem('scaryPteSettings',JSON.stringify(settings));}catch{/* Browser privacy mode can prevent local saves; practice still works. */}};
  const words=s=>String(s??'').toLowerCase().replace(/[’']/g,"'").match(/[a-z0-9]+(?:'[a-z]+)?/g)||[];
  const wordCount=s=>words(s).length;
  const clamp=(x,min=0,max=1)=>Math.max(min,Math.min(max,x));
  const scoreFromRatio=x=>Math.round(10+80*clamp(x));
  const average=xs=>{const valid=xs.filter(x=>Number.isFinite(x));return valid.length?Math.round(valid.reduce((a,b)=>a+b,0)/valid.length):null;};
  const pct=x=>Math.round(x*100);
  const todayKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const toDate=d=>new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const timeText=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const taskById=id=>TASKS.find(t=>t.id===id);
  const currentTask=()=>taskById(state.taskId);
  const currentQuestion=()=>BANK[state.taskId]?.[state.qIndex];
  const audioText=q=>q.audio || (state.taskId==='respond-to-situation'?q.prompt:null);
  function speak(text,onEnd){
    if(!text||!('speechSynthesis' in window)) {toast('Speech playback is unavailable in this browser.');if(onEnd)onEnd();return;}
    window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.88;u.pitch=1;
    const en=window.speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));if(en.length)u.voice=en.find(v=>/US/.test(v.lang))||en[0];
    let done=false;const finish=()=>{if(done)return;done=true;if(onEnd)onEnd();};u.onend=finish;u.onerror=()=>{toast('Audio playback could not finish. You can continue the question.');finish();};
    try{window.speechSynthesis.speak(u);}catch{finish();}
  }
  function captureInfo(){
    const end=speechActivity.stoppedAt||Date.now();
    const duration=speechActivity.startedAt?Math.max(0,(end-speechActivity.startedAt)/1000):0;
    return {duration:Math.round(duration*10)/10,voicePct:speechActivity.samples?Math.round(100*speechActivity.voiced/speechActivity.samples):null,peak:Math.round(speechActivity.peak*1000)/1000};
  }
  function finishCapture(){
    if(speechActivity.startedAt&&!speechActivity.stoppedAt)speechActivity.stoppedAt=Date.now();
    if(speechActivity.startedAt)lastCaptureInfo=captureInfo();
    closeMeter();
    if(recognition){try{recognition.onend=null;recognition.stop();}catch{}recognition=null;}
    if(mediaRecorder&&mediaRecorder.state!=='inactive'){try{mediaRecorder.stop();}catch{}}
    if(micStream){micStream.getTracks().forEach(track=>track.stop());micStream=null;}
    recording=false;micAttemptPending=false;
    ai?.finishSpeech();
  }
  function stopMedia(){
    captureGeneration++;
    finishCapture();
    if(recordedAudioUrl){URL.revokeObjectURL(recordedAudioUrl);recordedAudioUrl=null;}
    recordedChunks=[];mediaRecorder=null;resetActivity();micProblem='';micTesterStatus='not-checked';microphoneDevices=[];
    if(window.speechSynthesis)window.speechSynthesis.cancel();
  }
  function recordingPlayback(){return `<div class="audio-result" data-recording-playback>${recordedAudioUrl?`<div class="audio-result-head">${svg('headphone',18)} <strong>Your recorded answer</strong><a href="${esc(recordedAudioUrl)}" download="ScAry-PTE-recording.${recordedAudioMime?.includes('mp4')?'mp4':recordedAudioMime?.includes('ogg')?'ogg':'webm'}" class="text-link">${svg('download',14)} Save audio</a></div><audio controls preload="metadata" src="${esc(recordedAudioUrl)}" aria-label="Play your answer"></audio>`:state.phase==='finished'&&SPEAKING_TYPES.has(currentTask()?.type)?'<p class="help-text">Recording will appear here when audio capture finishes, if microphone permission was granted.</p>':''}</div>`;}
  function updateRecordingPlayback(){const el=document.querySelector('[data-recording-playback]');if(el)el.outerHTML=recordingPlayback();}

  function stopTimer(){clearInterval(timerId);timerId=null;phaseDeadline=0;}
  function stopSectionTimer(){clearInterval(sectionTimerId);sectionTimerId=null;}
  function sectionTick(){
    const m=state.mock;if(!m||m.mode!=='full'||state.page!=='exercise')return;
    const group=groupFor(currentTask());if(m.section!==group){m.section=group;m.deadline=Date.now()+SECTION_LIMITS[group]*1000;}
    const left=Math.max(0,Math.ceil((m.deadline-Date.now())/1000));const el=document.getElementById('section-timer');if(el)el.textContent=timeText(left);
    if(left===0){stopSectionTimer();const oldIndex=m.index;if(!state.feedback&&['record','answer'].includes(state.phase))submitAnswer(true);const queue=m.queue;const next=queue.findIndex((item,i)=>i>oldIndex&&groupFor(taskById(item.id))!==group);
      if(next!==-1){m.index=next;openExercise(queue[next].id,queue[next].qIndex,true);beginExercise();}else finishMock();toast('The section time ended.');}
  }
  function ensureSectionClock(){const m=state.mock;if(!m||m.mode!=='full'||m.deadline)return;const group=groupFor(currentTask());m.section=group;m.deadline=Date.now()+SECTION_LIMITS[group]*1000;stopSectionTimer();sectionTimerId=setInterval(sectionTick,250);sectionTick();}
  function startTimer(seconds){stopTimer();state.seconds=seconds;state.originalSeconds=seconds;
    if(seconds<=0){render();return;}phaseDeadline=Date.now()+seconds*1000;
    timerId=setInterval(()=>{if(state.page!=='exercise'||state.feedback){stopTimer();return;}state.seconds=Math.max(0,Math.ceil((phaseDeadline-Date.now())/1000));
      const clock=document.getElementById('timer-display'),ring=document.getElementById('timer-ring');if(clock)clock.textContent=timeText(state.seconds);if(ring)ring.style.setProperty('--percent',`${100*state.seconds/Math.max(1,state.originalSeconds)}%`);
      if(state.seconds===0){stopTimer();onPhaseComplete();}
    },125);
  }
  function startPhase(phase,seconds=0){state.phase=phase;state.seconds=seconds;state.originalSeconds=seconds;render();startTimer(seconds);
    if(phase==='record'){
      // The microphone stream was authorized by the initial Begin click and stays ready during prep.
      // MediaRecorder starts here automatically when the countdown ends, without another click.
      if('AudioContext' in window){try{const ctx=new AudioContext();const o=ctx.createOscillator();const gain=ctx.createGain();o.frequency.value=900;gain.gain.value=.05;o.connect(gain);gain.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.12);o.onended=()=>ctx.close();}catch{}}
      startRecording(true);
    }
  }
  function onPhaseComplete(){const t=currentTask();if(state.phase==='prepare'){startPhase('record',responseSeconds(t));return;}
    if(state.phase==='record'||state.phase==='answer'){submitAnswer(true);return;}}
  async function beginExercise(){if(state.page!=='exercise'||state.phase!=='ready')return;const t=currentTask();
    if(SPEAKING_TYPES.has(t.type)){
      if(!(await requestMicrophone())){
        if(state.page==='exercise'&&state.phase==='ready')render();
        toast('Microphone did not connect. Review the microphone setup instructions, then test again.');
        return;
      }
    }
    if(state.page!=='exercise'||state.phase!=='ready')return;
    ensureSectionClock();
    if(SPEAKING_TYPES.has(t.type)){
      ai?.preload();
      if(AUDIO_SPEAK_IDS.has(t.id)){
        state.phase='audio';render();speak(audioText(currentQuestion()),()=>{if(state.page!=='exercise'||state.phase!=='audio')return;const prep=prepSeconds(t,currentQuestion());startPhase(prep?'prepare':'record',prep||responseSeconds(t));});
      }else{const prep=prepSeconds(t,currentQuestion());startPhase(prep?'prepare':'record',prep||responseSeconds(t));}
    }else{
      const fixed=FIXED_TIMED_IDS.has(t.id)?(t.id==='write-essay'?1200:600):0;
      startPhase('answer',fixed);
      if(t.section==='Listening'&&audioText(currentQuestion()))speak(audioText(currentQuestion()));
    }
  }
  
  function toast(text){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=text;document.body.appendChild(el);setTimeout(()=>el.remove(),3500);}
  function navigate(page){stopTimer();stopSectionTimer();stopMedia();state.page=page;state.mobileNav=false;state.mock=null;state.feedback=null;state.phase='ready';render();window.scrollTo({top:0,behavior:'instant'});}
  function defaultAnswer(task,q){switch(task.type){case 'multi':case 'highlight':return [];case 'reorder':return q.items.map((_,i)=>i);case 'blanks':return q.correct.map(()=>'');case 'single':return null;default:return '';}}
  function openExercise(taskId,index=0,retainMock=false){const t=taskById(taskId);if(!t||!BANK[taskId]?.length)return;attemptId++;stopTimer();stopMedia();if(!retainMock){stopSectionTimer();state.mock=null;}state.page='exercise';state.taskId=taskId;state.qIndex=((index%BANK[taskId].length)+BANK[taskId].length)%BANK[taskId].length;
    state.answer=defaultAnswer(t,BANK[taskId][state.qIndex]);state.feedback=null;state.phase='ready';voiceMessage='';state.mobileNav=false;state.seconds=0;state.originalSeconds=0;render();window.scrollTo({top:0,behavior:'instant'});
    if(state.mock?.mode==='full'&&state.mock.deadline&&state.mock.section!==groupFor(t)){state.mock.deadline=0;stopSectionTimer();}
  }
  function startMock(mode='mini'){
    stopSectionTimer();const queue=[];
    for(const t of TASKS){
      const count=mode==='full'?FULL_COUNTS[t.id]:1;
      const size=BANK[t.id].length;
      const picked=new Set();
      for(let i=0;i<count;i++){
        let index=Math.floor(Math.random()*size),tries=0;
        while(picked.has(index)&&tries++<size)index=(index+1)%size;
        picked.add(index);queue.push({id:t.id,qIndex:index});
      }
    }
    state.mock={mode,index:0,queue,results:[],section:null,deadline:0};openExercise(queue[0].id,queue[0].qIndex,true);
  }
  function finishMock(){stopTimer();stopSectionTimer();stopMedia();state.page='mock-results';state.feedback=null;render();window.scrollTo(0,0);}
  function nextTask(){if(state.mock){const m=state.mock;m.index++;if(m.index>=m.queue.length){finishMock();}else{openExercise(m.queue[m.index].id,m.queue[m.index].qIndex,true);if(m.mode==='full')beginExercise();}}else openExercise(state.taskId,(state.qIndex+1)%BANK[state.taskId].length,false);}
  
  function similarity(a,b){const target=words(b),got=words(a);if(!target.length)return 0;const bag={};got.forEach(w=>bag[w]=(bag[w]||0)+1);let hits=0;target.forEach(w=>{if(bag[w]>0){hits++;bag[w]--;}});const precision=got.length?hits/got.length:0,recall=hits/target.length;return precision+recall?2*precision*recall/(precision+recall):0;}
  function keywordMatch(a,keywords=[]){const got=new Set(words(a));const w=keywords.filter(x=>got.has(String(x).toLowerCase()));return keywords.length?w.length/keywords.length:0;}
  function evaluate(task,q,answer){let ratio=0,metrics=[],tips=[],correctText='';const nonempty=Array.isArray(answer)?answer.some(x=>String(x??'').trim().length>0):!!String(answer??'').trim();
    if(task.type==='single'){
      ratio=answer===q.correct?1:0;correctText=q.choices[q.correct];metrics=[['Answer',answer==null?'Not selected':q.choices[answer]||'Not selected'],['Result',ratio?'Correct':'Try again']];if(!ratio)tips.push('Listen or read for the main idea before choosing.');
    }else if(task.type==='multi'||task.type==='highlight'){
      const correct=q.correct;const good=answer.filter(x=>correct.includes(x)).length;const wrong=answer.filter(x=>!correct.includes(x)).length;ratio=clamp((good-wrong)/correct.length);metrics=[['Correct selections',`${good} of ${correct.length}`],['Incorrect selections',String(wrong)]];correctText=task.type==='multi'?correct.map(i=>q.choices[i]).join(' · '):correct.map(i=>words(q.text)[i]).join(' · ');if(wrong)tips.push('Avoid selecting answers unless the evidence supports them.');
    }else if(task.type==='blanks'){
      const correct=q.correct;const hits=correct.filter((w,i)=>String(answer[i]||'').trim().toLowerCase()===w.toLowerCase()).length;ratio=hits/correct.length;metrics=[['Correct blanks',`${hits} of ${correct.length}`],['Completion',`${answer.filter(x=>x.trim()).length} of ${correct.length}`]];let j=0;correctText=q.text.replace(/\{\{\}\}/g,()=>`[${correct[j++]}]`);if(hits<correct.length)tips.push('Read the words around each gap and check grammar and meaning.');
    }else if(task.type==='reorder'){
      const target=q.correct;let good=0;for(let i=0;i<answer.length-1;i++){if(target.indexOf(answer[i+1])===target.indexOf(answer[i])+1)good++;}ratio=good/(target.length-1);metrics=[['Correct adjacent pairs',`${good} of ${target.length-1}`],['Sentences',String(target.length)]];correctText=target.map(i=>q.items[i]).join(' ');if(ratio<1)tips.push('Find a strong topic sentence, then follow pronouns and linking words.');
    }else if(task.type==='speech-short'){
      const valid=[q.correctText,...(q.aliases||[])].some(x=>words(x).join(' ')===words(answer).join(' '));ratio=valid?1:similarity(answer,q.correctText);metrics=[['Expected answer',q.correctText],['Recognized words',String(wordCount(answer))]];correctText=q.correctText;if(!valid)tips.push('Give one clear word or a short phrase.');
    }else if(task.type==='speech-compare'||task.type==='dictation'){
      const target=q.audio||q.prompt;ratio=similarity(answer,target);metrics=[['Word overlap',`${Math.round(ratio*100)}%`],['Words entered',`${wordCount(answer)} / ${wordCount(target)}`]];correctText=target;if(ratio<.9)tips.push('Focus on keeping the original wording and word order.');if(task.type==='speech-compare')tips.push('Speech recognition does not measure true pronunciation or oral fluency.');
    }else if(task.type==='speech-open'){
      const n=wordCount(answer),k=keywordMatch(answer,q.keywords||[]);const length=clamp(n/Math.max(12,task.id==='summarize-group-discussion'?25:20));const structure=/[.!?]/.test(String(answer))?1:.6;ratio=nonempty?.55*k+.35*length+.10*structure:0;metrics=[['Key topic coverage',`${pct(k)}%`],['Response length',`${n} words`]];correctText=q.model||'';if(n<18)tips.push('Aim for a complete response with a main idea and supporting details.');if(k<.5)tips.push('Mention more of the central ideas from the prompt.');tips.push('This transcript-based estimate cannot measure pronunciation, intonation or actual spoken fluency.');
    }else if(task.type==='writing'){
      const n=wordCount(answer),k=keywordMatch(answer,q.keywords||[]),text=String(answer??'').trim();let form=0,range='';
      if(task.id==='summarize-written-text'){range='5–75 words, one sentence';const sentences=(text.match(/[.!?](?=\s|$)/g)||[]).length;form=(n>=5&&n<=75?0.7:0)+((sentences<=1&&n>0)?0.3:0);if(sentences>1)tips.push('Summarize Written Text should be a single sentence.');}
      if(task.id==='write-essay'){range='200–300 words';form=n>=200&&n<=300?1:n?clamp(n/200)*.8:0;if(n<200)tips.push('For the real task, aim for 200–300 words.');}
      if(task.id==='summarize-spoken-text'){range='50–70 words';form=n>=50&&n<=70?1:n?clamp(n/50)*.7:0;if(n<50)tips.push('Try to write a complete 50–70 word summary.');}
      const diverse=wordCount(answer)?new Set(words(answer)).size/Math.max(1,n):0;
      const punctuation=/[.!?]$/.test(text)?1:.6;
      const clarity=clamp(.65*diverse+.35*punctuation);
      ratio=nonempty?.49*k+.34*form+.17*clarity:0;
      metrics=[['Word count',String(n)],['Suggested form',range],['Key topic coverage',`${pct(k)}%`],['Form check',`${pct(form)}%`]];
      correctText=q.model||'';
      if(k<.45)tips.push('Include the central concepts and explain their relationships.');
      if(!/[.!?]$/.test(text))tips.push('Finish your response with appropriate punctuation.');
      tips.push('This local check cannot reliably grade grammar, coherence or the official PTE writing traits.');
    }
    if(!nonempty&&task.type!=='reorder')tips.unshift('No complete answer was submitted. Try again with a response.');
    if(!tips.length)tips.push('Good attempt. Try another sample to build consistency.');
    const isSpeaking=SPEAKING_TYPES.has(task.type);
    if(isSpeaking){
      const info=lastCaptureInfo||captureInfo();
      metrics.push(['Captured audio',info.duration?`${info.duration.toFixed(1)} seconds`:'No audio captured']);
      metrics.push(['Detected voice activity',info.voicePct===null?'Unavailable':`${info.voicePct}% of captured frames`]);
      metrics.push(['Transcript source',transcriptSource==='none'?'Not available':transcriptSource==='manual'?'Manually entered':'Browser speech recognition']);
      metrics.push(['Pronunciation','Not assessed']);
      metrics.push(['Oral fluency','Not assessed']);
      if(transcriptSource==='browser speech recognition'&&wordCount(answer)&&info.duration>0){const rate=Math.round(wordCount(answer)/info.duration*60);metrics.push(['Approx. speaking pace',rate<=300?`${rate} words/min`:'Not reliable']);}
      if(!nonempty)tips.unshift('A recording is not the same as a transcript. Speech recognition may be disabled. Listen to your recording, then type the spoken words to receive a content-only estimate.');
      if(info.duration<=0)tips.unshift('No audio was recorded. Check microphone access before practicing again.');
      tips.push('Pronunciation and oral fluency scores require a separate validated speech model, which is not included in this offline version.');
    }
    const score=isSpeaking&&!nonempty?null:scoreFromRatio(ratio);
    return {score,ratio,metrics,tips,correctText,answer:String(answer??''),audioInfo:lastCaptureInfo||null};
  }
  function submitAnswer(fromTimer=false){if(state.page!=='exercise'||state.feedback||state.phase==='ready'||state.phase==='audio'||state.phase==='prepare')return;
    stopTimer();finishCapture();if(window.speechSynthesis)window.speechSynthesis.cancel();const task=currentTask(),q=currentQuestion(),result=evaluate(task,q,state.answer);
    state.feedback=result;state.phase='finished';
    if(SPEAKING_TYPES.has(task.type)&&aiConfigured('speech'))result.aiSpeechPending=true;
    const languageEligible=(task.type==='writing'||task.type==='speech-open')&&String(state.answer||'').trim().length>0;
    if(languageEligible&&aiConfigured('language')&&state.mock?.mode!=='full'){
      result.aiLanguagePending=true;
      const id=attemptId;
      ai.language({taskId:task.id,prompt:String(q.prompt||q.text||q.audio||''),response:String(state.answer||''),reference:String(q.model||'')})
        .then(data=>{if(id!==attemptId||state.feedback!==result)return;result.aiLanguage=data;result.aiLanguagePending=false;render();})
        .catch(e=>{if(id!==attemptId||state.feedback!==result)return;result.aiLanguagePending=false;result.aiLanguageError=String(e.message||e);render();});
    }
    records.unshift({taskId:task.id,section:task.section,score:result.score,date:new Date().toISOString(),day:todayKey(),mode:state.mock?'mock':'practice'});
    records=records.slice(0,600);if(state.mock)state.mock.results.push({taskId:task.id,section:task.section,score:result.score});persist();
    if(state.mock?.mode==='full'){nextTask();return;}render();if(fromTimer)toast('The response timer finished. Your attempt was saved.');document.getElementById('feedback-card')?.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function startTranscription(){
    if(recognition||state.phase!=='record')return;
    const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Speech){if(recording)voiceMessage='Audio recording is active. Live transcription is unavailable; you can type your words.';syncRecordUI();return;}
    const r=new Speech();recognition=r;r.lang='en-US';r.continuous=true;r.interimResults=true;
    const existing=String(state.answer??'').trim();
    r.onstart=()=>{if(recording)voiceMessage='Recording audio · transcribing your speech';else voiceMessage='Speech-to-text active; audio recording unavailable';syncRecordUI();};
    r.onresult=e=>{transcriptSource='browser speech recognition';const txt=Array.from(e.results).map(x=>x[0].transcript).join(' ');state.answer=[existing,txt].filter(Boolean).join(' ').trim();const input=document.getElementById('response-text');if(input){input.value=state.answer;const count=document.getElementById('word-count');if(count)count.textContent=`${wordCount(state.answer)} words`;}};
    r.onerror=e=>{voiceMessage=recording?'Audio recording active. Live transcription is unavailable; type if needed.':`Speech recognition: ${e.error}. You may type instead.`;syncRecordUI();};
    r.onend=()=>{if(recognition===r)recognition=null;if(state.phase==='record'){if(!voiceMessage.includes('transcription:'))voiceMessage=recording?'Audio recording continues · transcript can be typed':'Speech capture stopped · type your response';syncRecordUI();}};
    try{r.start();}catch{recognition=null;voiceMessage=recording?'Audio recording is active · type if no transcript appears':'Speech-to-text could not start. Type your response.';syncRecordUI();}
  }
  async function startRecording(automatic=false){
    if(state.phase!=='record'){if(!automatic)toast('Begin a question to enter the recording stage.');return;}
    if(recording){if(!recognition)startTranscription();return;}
    if(micAttemptPending)return;
    if(!micStream?.getAudioTracks().some(t=>t.readyState==='live')){
      const got=await requestMicrophone();if(!got){voiceMessage=micProblem;syncRecordUI();return;}
    }
    if(state.phase!=='record'||state.page!=='exercise')return;
    try{
      if(typeof MediaRecorder==='undefined')throw new Error('MediaRecorder is unavailable');
      recordedChunks=[];
      let selectedMime='';
      if(typeof MediaRecorder.isTypeSupported==='function'){
        selectedMime=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'].find(x=>MediaRecorder.isTypeSupported(x))||'';
      }
      const instance=selectedMime?new MediaRecorder(micStream,{mimeType:selectedMime}):new MediaRecorder(micStream);
      mediaRecorder=instance;
      recordedAudioMime=instance.mimeType||selectedMime||'audio/webm';
      const generation=captureGeneration;
      instance.ondataavailable=e=>{if(generation===captureGeneration&&e.data&&e.data.size)recordedChunks.push(e.data);};
      instance.onstop=()=>{
        if(generation!==captureGeneration)return;
        if(recordedChunks.length){
          const blob=new Blob(recordedChunks,{type:recordedAudioMime});
          if(recordedAudioUrl)URL.revokeObjectURL(recordedAudioUrl);
          recordedAudioUrl=URL.createObjectURL(blob);
          updateRecordingPlayback();
        }else{
          voiceMessage='The browser did not save audio. Please try another input device or Chrome over HTTPS.';syncRecordUI();
        }
      };
      instance.onerror=e=>{voiceMessage=`Audio recorder error: ${e?.error?.name||'Unknown error'}. Retry the microphone test.`;recording=false;syncRecordUI();};
      instance.start(250);
      speechActivity.startedAt=Date.now();
      recording=true;voiceMessage='Microphone is LIVE — your voice is being recorded';
      syncRecordUI();startTranscription();
      if(aiConfigured('speech')){
        const id=attemptId,task=currentTask(),q=currentQuestion(), reference=['read-aloud','repeat-sentence'].includes(task.id)?String(q.audio||q.prompt||''):'';
        ai.startSpeech({taskId:task.id,referenceText:reference,callback:(data)=>{
          if(attemptId!==id||state.page!=='exercise')return;
          if(data.status==='ok'&&data.transcript&&transcriptSource!=='manual'&&!String(state.answer||'').trim()){
            state.answer=data.transcript;transcriptSource='azure speech recognition';
            if(state.feedback){const updated=evaluate(task,q,data.transcript);Object.assign(state.feedback,{...updated,aiLanguage:state.feedback.aiLanguage,aiLanguagePending:state.feedback.aiLanguagePending,aiLanguageError:state.feedback.aiLanguageError});}
          }
          if(state.feedback){
            state.feedback.aiSpeech=data;state.feedback.aiSpeechPending=false;
            const f=state.feedback;
            if(task.type==='speech-open'&&state.mock?.mode!=='full'&&aiConfigured('language')&&String(state.answer||'').trim()&&!f.aiLanguage&&!f.aiLanguagePending&&!f.aiLanguageError){
              f.aiLanguagePending=true;
              ai.language({taskId:task.id,prompt:String(q.prompt||q.text||q.audio||''),response:String(state.answer||''),reference:String(q.model||'')})
                .then(v=>{if(attemptId!==id||state.feedback!==f)return;f.aiLanguage=v;f.aiLanguagePending=false;render();})
                .catch(e=>{if(attemptId!==id||state.feedback!==f)return;f.aiLanguageError=String(e.message||e);f.aiLanguagePending=false;render();});
            }
            render();
          }
        }}).catch(()=>{});
      }
    }catch(error){
      recording=false;voiceMessage=micProblemText(error);micProblem=voiceMessage;syncRecordUI();
    }
  }
  function syncRecordUI(){
    const b=document.getElementById('mic-button'),s=document.getElementById('record-status'),panel=document.getElementById('mic-capture');
    if(b){b.disabled=recording;b.innerHTML=`${svg(recording?'check':'mic',16)} ${recording?'Microphone live':'Try microphone'}`;}
    if(s)s.textContent=voiceMessage||'Waiting for microphone';
    if(panel){panel.classList.toggle('active',recording);const label=panel.querySelector('.mic-capture-title');if(label)label.textContent=recording?'Microphone is recording':'Microphone needs attention';}
  }

  const navs=[['dashboard','home','Dashboard'],['bank','book','Question Bank'],['mock','test','Mock Tests'],['analytics','chart','Analytics'],['plan','calendar','Study Plan'],['settings','settings','Settings']];
  function navButton(id,ic,label){return `<button class="nav-item ${state.page===id?'active':''}" data-action="nav" data-page="${id}"><span class="nav-icon">${svg(ic)}</span>${esc(label)}</button>`;}
  function shell(inner){let count=records.filter(r=>(r.day||r.date.slice(0,10))===todayKey()).length;return `<div class="app-shell"><div class="overlay ${state.mobileNav?'show':''}" data-action="close-menu"></div><aside class="sidebar ${state.mobileNav?'show':''}"><div class="brand"><div class="brand-symbol"><span>S</span></div><div><div class="brand-word">Sc<b>A</b>ry PTE</div><div class="brand-sub">PREP WITHOUT LIMITS</div></div></div><div class="nav-label">WORKSPACE</div><div class="nav-group">${navs.slice(0,4).map(n=>navButton(...n)).join('')}</div><div class="nav-label">YOUR JOURNEY</div><div class="nav-group">${navs.slice(4).map(n=>navButton(...n)).join('')}</div><div class="sidebar-bottom"><div class="free-panel"><div class="tiny-stars">✦ &nbsp;✧ &nbsp;✦</div><strong>Learn without limits.</strong><p>Free original practice, progress tracking and optional AI diagnostics.</p><div class="free-tag">FREE PRACTICE • OPTIONAL AI COSTS</div></div><p class="sidebar-footnote">Independent practice app · Not affiliated with Pearson</p></div></aside><main class="main"><header class="topbar"><div class="top-left"><button class="mobile-menu" aria-label="Open menu" data-action="menu">${svg('menu')}</button><span class="breadcrumb">ScAry PTE &nbsp; / &nbsp; ${esc(pageName())}</span></div><div class="top-actions"><span class="date-pill">${new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</span><span class="top-stat" title="Practice items today">${svg('fire',15)} ${count} today</span><div class="avatar">SP</div></div></header><div class="content">${inner}</div></main></div>`;}
  const pageName=()=>({'dashboard':'Dashboard','bank':'Question Bank','questions':'Questions','mock':'Mock Tests','exercise':'Practice','mock-results':'Results','analytics':'Analytics','plan':'Study Plan','settings':'Settings'})[state.page]||'Dashboard';
  const header=(ey,title,desc,right='')=>`<div class="page-header"><div><div class="eyebrow">${esc(ey)}</div><h1 class="page-title">${esc(title)}</h1>${desc?`<p class="page-desc">${esc(desc)}</p>`:''}</div>${right}</div>`;
  const avgAll=()=>average(records.map(r=>r.score));
  const avgSec=sec=>average(records.filter(r=>r.section===sec).map(r=>r.score));
  function secIcon(sec){return `<span class="section-icon ${slug(sec)}">${svg(({Speaking:'mic',Writing:'pen',Reading:'reading',Listening:'headphone'})[sec],19)}</span>`;}
  const stat=(label,value,info,icon,c)=>`<div class="stat-card"><div class="stat-head"><span>${esc(label)}</span><div class="stat-icon ${c}">${svg(icon,19)}</div></div><div class="stat-value">${esc(value)}</div><p class="stat-note">${esc(info)}</p></div>`;
  function skillBars(){return `<div class="skill-list">${SECTIONS.map(s=>{const n=avgSec(s),v=n??0;return `<div class="skill-row"><span>${s}</span><div class="progress-track"><div class="progress-fill" style="width:${v?100*v/90:0}%;background:${COLORS[s]}"></div></div><span class="skill-value">${n===null?'—':n}</span></div>`;}).join('')}</div>`;}
  function activity(){const dates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return {key:todayKey(d),day:d.toLocaleDateString('en-US',{weekday:'short'}).slice(0,2)};});const max=Math.max(1,...dates.map(d=>records.filter(r=>(r.day||r.date.slice(0,10))===d.key).length));return `<div class="activity-bars">${dates.map(d=>{const n=records.filter(r=>(r.day||r.date.slice(0,10))===d.key).length;return `<div class="activity-col" title="${n} attempts"><div class="activity-bar ${n?'on':''}" style="height:${n?Math.max(9,100*n/max):4}%"></div><span class="activity-day">${d.day}</span></div>`;}).join('')}</div>`;}
  function taskCard(t){const f=favourites.includes(t.id);return `<article class="task-card"><div class="task-card-top">${secIcon(t.section)}<button class="favourite ${f?'selected':''}" data-action="favorite" data-task="${t.id}" title="${f?'Remove favourite':'Add favourite'}" aria-label="${f?'Remove favourite':'Add favourite'}">${f?'★':'☆'}</button></div><h3>${esc(t.name)} ${t.new?'<span class="tag new">2025+ NEW</span>':''}</h3><p>${esc(t.desc)}</p><div class="task-card-bottom"><span class="tag">${esc(t.section)} · ${BANK[t.id].length} questions</span><button class="card-arrow" data-action="browse" data-task="${t.id}" title="View ${esc(t.name)} questions" aria-label="View ${esc(t.name)} questions">${svg('right',17)}</button></div><button class="button soft small full" data-action="browse" data-task="${t.id}" style="margin-top:12px">View all ${BANK[t.id].length} questions ${svg('right',14)}</button></article>`;}
  const QUESTION_PAGE_SIZE=30;
  function questionsPage(){
    const t=currentTask();if(!t)return bankPage();const list=BANK[t.id]||[];
    const preview=(q,i)=>{if(q.chart)return q.chart.title;if(q.prompt)return q.prompt;if(q.text)return q.text.replaceAll('{{}}','_____');if(q.items)return q.items[0];if(q.audio)return t.section==='Listening'||t.id==='repeat-sentence'||t.id==='answer-short-question'?'Audio question — start to listen':q.audio;return 'Practice item';};
    const term=state.qSearch.trim().toLowerCase();
    const matches=list.map((q,i)=>({q,i})).filter(({q,i})=>!term||String(i+1)===term||`${q.prompt||''} ${q.text||''} ${q.chart?.title||''} ${q.audio||''} ${(q.items||[]).join(' ')}`.toLowerCase().includes(term));
    const pageCount=Math.max(1,Math.ceil(matches.length/QUESTION_PAGE_SIZE));state.qPage=Math.max(0,Math.min(state.qPage,pageCount-1));
    const first=state.qPage*QUESTION_PAGE_SIZE;
    const entries=matches.slice(first,first+QUESTION_PAGE_SIZE);
    const pagination=`<div class="q-paging"><span class="small-caption">${matches.length?`${first+1}–${Math.min(first+QUESTION_PAGE_SIZE,matches.length)} of ${matches.length}`:'No matches'} · ${list.length} total</span><div class="q-page-actions"><button class="button soft small" data-action="question-page" data-page="0" ${!state.qPage?'disabled':''}>First</button><button class="button soft small" data-action="question-page" data-page="${state.qPage-1}" ${!state.qPage?'disabled':''}>Previous</button><span class="q-page-number">Page ${state.qPage+1} of ${pageCount}</span><button class="button soft small" data-action="question-page" data-page="${state.qPage+1}" ${state.qPage===pageCount-1?'disabled':''}>Next</button><button class="button soft small" data-action="question-page" data-page="${pageCount-1}" ${state.qPage===pageCount-1?'disabled':''}>Last</button></div></div>`;
    return shell(`${header(t.section.toUpperCase()+' QUESTION BANK',t.name,`${list.length.toLocaleString('en-US')} original practice questions · Select any question, search topics or jump to a number`)}<div style="margin-bottom:18px"><button class="text-link" data-action="nav" data-page="bank">${svg('left',14)} All 22 types</button></div><div class="q-tools"><label class="q-search-label">${svg('search',17)}<input id="question-search" type="search" placeholder="Search question text or topic" value="${esc(state.qSearch)}" aria-label="Search questions"></label><div class="q-jump"><label for="jump-number">Question #</label><input id="jump-number" type="number" min="1" max="${list.length}" placeholder="e.g. 897"><button class="button small" data-action="question-jump">Go ${svg('right',14)}</button></div></div>${pagination}<div class="questions-grid">${entries.length?entries.map(({q,i})=>`<button class="question-tile" data-action="practice" data-task="${t.id}" data-index="${i}"><span class="question-number">${String(i+1).padStart(3,'0')}</span><span class="question-detail"><strong>Question ${i+1}</strong><small>${esc(preview(q,i)).slice(0,145)}</small></span><span class="question-go">${svg('right',17)}</span></button>`).join(''):'<div class="surface">No questions matched that search. Try another word or clear the search.</div>'}</div>${pagination}${disclaimer()}`);
  }
  
  function recommendations(){const secs=SECTIONS.slice().sort((a,b)=>(avgSec(a)??45)-(avgSec(b)??45));return [TASKS.find(t=>t.section===secs[0]),TASKS.find(t=>t.section===secs[1]),TASKS.find(t=>t.section===secs[2])];}
  function homePage(){const avg=avgAll();const preferred=favourites.map(taskById).filter(Boolean);const featured=[...preferred,...TASKS.filter(t=>['read-aloud','write-from-dictation','summarize-group-discussion','write-essay','reading-fib-dropdown','repeat-sentence'].includes(t.id))].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).slice(0,6);return shell(`${header('YOUR LEARNING SPACE','Welcome to ScAry PTE 👋','Every question is available free, with exam-style practice stages.')}<section class="hero"><div class="hero-content"><span class="hero-pill">✦ &nbsp; THE FREE PTE PRACTICE SPACE</span><h2>Build confidence.<br>One question at a time.</h2><p>Practice ${QUESTION_TOTAL.toLocaleString('en-US')} questions in all 22 PTE Academic task types, with timed speaking and local feedback.</p><button class="button white" data-action="nav" data-page="bank">Explore question bank ${svg('right',16)}</button></div><div class="hero-graphic" aria-hidden="true"><div class="hero-ring"></div><div class="hero-spark">✦</div><div class="hero-score"><strong>${settings.target}</strong><span>YOUR TARGET</span></div><div class="hero-mini">↗ &nbsp; Keep growing <b>✦</b></div></div></section><section class="stat-grid">${stat('Practice attempts',records.length,'Saved on this device','book','violet')}${stat('Average estimate',avg??'—','Not an official PTE score','chart','green')}${stat('Daily target',`${settings.goal} min`,'Adjust this in Settings','target','orange')}${stat('Questions',QUESTION_TOTAL,'Original templated practice bank · 22 types','award','blue')}</section><div class="section-row"><h2 class="section-heading">Your practice snapshot</h2><button class="text-link" data-action="nav" data-page="analytics">View analytics ${svg('right',14)}</button></div><div class="two-column"><div class="surface"><h3 class="surface-title">Skill performance</h3><p class="surface-sub">Practice estimates based on your answers</p>${skillBars()}</div><div class="surface"><h3 class="surface-title">This week's activity</h3><p class="surface-sub">Questions attempted each day</p>${activity()}</div></div><div class="section-row"><h2 class="section-heading">Popular practice tasks</h2><button class="text-link" data-action="nav" data-page="bank">See all 22 ${svg('right',14)}</button></div><div class="cards-grid">${featured.map(taskCard).join('')}</div><div class="section-row"><h2 class="section-heading">Your next 3 steps</h2><button class="text-link" data-action="nav" data-page="plan">Open study plan ${svg('right',14)}</button></div><div class="plan-grid">${recommendations().map((t,i)=>`<div class="plan-item"><div class="plan-head"><div class="plan-index">0${i+1}</div><h3>${esc(t.name)}</h3></div><p>${esc(t.desc)}</p><button class="text-link" data-action="practice" data-task="${t.id}">Start practice ${svg('right',14)}</button></div>`).join('')}</div>${disclaimer()}`);}
  function disclaimer(){return `<p class="disclaimer">ScAry PTE provides independent, original and partly template-generated practice questions. Local scores are heuristic estimates. Optional Azure Speech and AI language scores measure different traits (0–100); neither is Pearson PTE / APEUni scoring or a validated exam prediction.</p>`;}
  function bankPage(){const selected=TASKS.filter(t=>(state.filter==='All'||(state.filter==='Favorites'?favourites.includes(t.id):t.section===state.filter))&&`${t.name} ${t.desc} ${t.section}`.toLowerCase().includes(state.search.toLowerCase()));return shell(`${header('EXPLORE & PRACTICE','Question Bank',`All 22 scored PTE Academic question types · ${QUESTION_TOTAL.toLocaleString('en-US')} original practice questions. Click a task to see its questions.`)}<div class="bank-tools"><div class="tabs">${['All',...SECTIONS,'Favorites'].map(s=>`<button class="tab ${state.filter===s?'active':''}" data-action="filter" data-filter="${s}">${esc(s)}</button>`).join('')}</div><label class="searchbox">${svg('search',17)}<input id="bank-search" type="search" aria-label="Search practice tasks" placeholder="Search question types..." value="${esc(state.search)}"></label></div><p class="section-count" style="margin:0 0 15px">Showing ${selected.length} question types</p>${selected.length?`<div class="bank-grid">${selected.map(taskCard).join('')}</div>`:`<div class="surface empty"><h3>No matching tasks</h3><p>Try another skill or remove the search filter.</p><button class="button light" data-action="clear-filter">Show all tasks</button></div>`}${disclaimer()}`);}
  function audioWidget(q){if(!audioText(q))return '';return `<div class="audio-panel"><button class="audio-play" data-action="audio" title="Replay audio in practice mode" aria-label="Replay question audio" ${state.phase==='ready'||state.phase==='audio'||state.mock?.mode==='full'?'disabled':''}>${svg('play',20)}</button><div><div class="audio-title">Audio prompt · synthesized English voice</div><div class="audio-sub">${state.phase==='ready'?'Press Start to hear it automatically':state.mock?.mode==='full'?'Plays once in full mock':'Replay available after first playback in practice'}</div></div><div class="audio-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;}
  
  function chartWidget(c){const max=Math.max(...c.values);return `<div class="chart-viz" role="img" aria-label="${esc(c.title)}: ${c.labels.map((l,i)=>l+' '+c.values[i]+c.unit).join(', ')}"><h3 class="chart-title">${esc(c.title)}</h3><div class="chart-wrap">${c.labels.map((l,i)=>`<div class="chart-col"><span class="chart-val">${c.values[i]}${c.unit==='%'?'%':''}</span><div class="chart-bar" style="height:${Math.round(82*c.values[i]/max)}%"></div><span class="chart-label">${esc(l)}</span></div>`).join('')}</div><p class="small-caption" style="text-align:center;margin-bottom:0">${esc(c.unit==='%'?'Percentage of students':'Values in '+c.unit)}</p></div>`;}
  function blanksUI(q,t){let i=0;return `<div class="blanks-passage">${q.text.split(/\{\{\}\}/).map((p,j)=>{const part=esc(p);if(j===0)return part;const k=i++;return `${t.id==='listening-fib'?`<input class="blank-input" aria-label="Blank ${k+1}" data-blank="${k}" value="${esc(state.answer[k]||'')}" placeholder="Type word" autocomplete="off" ${state.phase==='ready'||state.phase==='finished'?'disabled':''}>`:`<select class="blank-select" aria-label="Blank ${k+1}" data-blank="${k}" ${state.phase==='ready'||state.phase==='finished'?'disabled':''}><option value="">Choose word</option>${q.blanks[k].map(o=>`<option value="${esc(o)}" ${state.answer[k]===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`}${part}`;}).join('')}</div>`;}
  function reorderUI(q){return `<div style="margin-bottom:22px">${state.answer.map((index,pos)=>`<div class="reorder-row"><span class="reorder-num">${pos+1}</span><span class="reorder-text">${esc(q.items[index])}</span><button class="move-button" data-action="move" data-pos="${pos}" data-dir="-1" aria-label="Move sentence up" ${pos===0||state.phase==='ready'||state.phase==='finished'?'disabled':''}>${svg('up',16)}</button><button class="move-button" data-action="move" data-pos="${pos}" data-dir="1" aria-label="Move sentence down" ${pos===state.answer.length-1||state.phase==='ready'||state.phase==='finished'?'disabled':''}>${svg('down',16)}</button></div>`).join('')}</div>`;}
  function answerUI(t,q){
    if(SPEAKING_TYPES.has(t.type)){
      if(state.phase!=='record'&&state.phase!=='finished')return `<div class="stage-lock">${state.phase==='ready'?'Start the question to begin your preparation or listening stage.':state.phase==='audio'?'Listen carefully. The microphone is not yet recording.':'Preparation is running. Audio capture begins automatically when it reaches zero, or tap Start speaking now to skip the remaining prep time.'}</div>`;
      return `<div class="mic-capture ${recording?'active':''}" id="mic-capture"><div class="mic-capture-icon">${svg('mic',24)}</div><div class="mic-capture-main"><div class="mic-capture-title">${state.phase==='finished'?'Your speaking attempt':recording?'Microphone is recording':'Connecting microphone'}</div><div id="record-status" class="mic-capture-hint" role="status">${esc(voiceMessage||'Requesting microphone access')}</div></div>${state.phase==='record'?`<button id="mic-button" class="button soft small" data-action="mic" ${recording?'disabled':''}>${svg(recording?'check':'mic',16)} ${recording?'Microphone live':'Try microphone'}</button>`:''}</div><label class="form-label" for="response-text">Your spoken response · transcript</label><textarea class="answer-box" id="response-text" data-answer="text" placeholder="Live speech-to-text appears here if supported. You can also type your words." ${state.phase==='finished'?'disabled':''}>${esc(state.answer)}</textarea><div class="answer-meta" id="word-count">${wordCount(state.answer)} words</div><div class="live-level"><span class="live-dot"></span><b>Microphone input</b><div class="mic-level-track"><div id="mic-level-fill" style="width:${audioMeterLevel}%"></div></div><small id="mic-level-text">${recording?'Listening':'Input meter'}</small></div>${recordingPlayback()}<p class="help-text">Your microphone audio is recorded in the browser and can be played back after submitting. Transcription and estimated scores are not pronunciation grading.</p>`;
    }
    if(t.type==='writing'||t.type==='dictation')return `<label class="form-label" for="response-text">Your answer</label><textarea class="answer-box" id="response-text" data-answer="text" placeholder="Write your answer here..." style="min-height:${t.id==='write-essay'?'230px':'150px'}" ${state.phase==='ready'||state.phase==='finished'?'disabled':''}>${esc(state.answer)}</textarea><div class="answer-meta" id="word-count">${wordCount(state.answer)} words</div>`;
    if(t.type==='single'||t.type==='multi')return `<div class="options">${q.choices.map((c,i)=>{const selected=t.type==='single'?state.answer===i:state.answer.includes(i);return `<button class="option ${selected?'selected':''}" data-action="option" data-choice="${i}" aria-pressed="${selected}" ${state.phase==='ready'||state.phase==='finished'?'disabled':''}><span class="option-marker">${selected?svg('check',14):String.fromCharCode(65+i)}</span><span>${esc(c)}</span></button>`;}).join('')}</div>`;
    if(t.type==='blanks')return blanksUI(q,t);
    if(t.type==='reorder')return reorderUI(q);
    if(t.type==='highlight')return `<div class="tokens">${q.text.split(/\s+/).map((w,i)=>`<button class="word-token ${state.answer.includes(i)?'active':''}" data-action="word" data-choice="${i}" aria-pressed="${state.answer.includes(i)}" ${state.phase==='ready'||state.phase==='finished'?'disabled':''}>${esc(w)}</button>`).join('')}</div><p class="help-text">Click words that differ from the audio.</p>`;
    return '';
  }
  
  function promptUI(t,q){let str='';if(q.chart)str+=chartWidget(q.chart);if(q.text&&t.type!=='blanks'&&t.type!=='highlight')str+=`<div class="passage ${t.type==='single'||t.type==='multi'?'compact':''}">${esc(q.text)}</div>`;if(q.prompt&&!(t.type==='speech-compare'&&t.id==='read-aloud')&&!(t.type==='writing'&&t.id==='write-essay'))str+=`<div class="prompt">${esc(q.prompt)}</div>`;if(t.id==='read-aloud')str+=`<div class="passage">${esc(q.prompt)}</div>`;if(t.id==='write-essay')str+=`<div class="passage compact">${esc(q.prompt)}</div>`;if(t.type==='speech-short'||t.id==='repeat-sentence'||t.id==='write-from-dictation')str+=`<div class="status-banner">The original sentence is hidden until you submit your answer.</div>`;return str+audioWidget(q);}
  function wordCompareHtml(ref,given){
    const got=words(given), original=String(ref||'').split(/\s+/).filter(Boolean);
    const available={};for(const w of got)available[w]=(available[w]||0)+1;
    return `<div class="word-comparison" aria-label="Reference words marked as recognized or missed">${original.map(w=>{const key=words(w)[0]||'';const hit=key&&available[key]>0;if(hit)available[key]--;return `<span class="word-mark ${hit?'match':'miss'}" title="${hit?'Recognized':'Not in transcript'}">${esc(w)}</span>`;}).join(' ')}</div>`;
  }
  function saveDetailedResult(){
    if(!state.feedback)return;
    const t=currentTask(),q=currentQuestion(),f=state.feedback;
    const report={app:'ScAry PTE',version:6,disclaimer:'Independent diagnostic AI traits are not Pearson or APEUni exam scoring; local estimates remain heuristic',date:new Date().toISOString(),task:t.name,question:state.qIndex+1,scoreEstimate:f.score,metrics:f.metrics,notes:f.tips,transcript:f.answer,reference:f.correctText,audioSummary:f.audioInfo,aiSpeech:f.aiSpeech||null,aiLanguage:f.aiLanguage||null};
    const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download=`scary-pte-${t.id}-q${state.qIndex+1}-report.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),4000);
  }
  function feedbackUI(){
    if(!state.feedback||state.mock?.mode==='full')return '';
    const t=currentTask(),f=state.feedback,isSpeaking=SPEAKING_TYPES.has(t.type);
    const title=f.score===null?'Audio captured — transcript required':f.score>=75?'Strong local practice attempt':f.score>=50?'Keep building consistency':'Review and try again';
    const showCompare=isSpeaking&&f.correctText&&f.answer&&(['read-aloud','repeat-sentence'].includes(t.id));
    return `<section class="feedback report-v5" id="feedback-card">
      <div class="report-v5-banner"><span class="label-chip">RESULTS & REVIEW</span><span class="review-note">Offline estimate + optional independent AI diagnostics · not exam scoring</span></div>
      <div class="feedback-head"><div class="feedback-score ${f.score===null?'unavailable':''}"><strong>${f.score===null?'—':f.score}</strong><span>${f.score===null?'No transcript':'Offline practice index · /90'}</span></div><div><div class="eyebrow">PRACTICE RESULT</div><h3>${esc(title)}</h3><p>${isSpeaking?'Content-match index compares transcript words with the target, while microphone activity is listed separately. True pronunciation and fluency are NOT graded.':'A rule-based estimate based on the practice answer, not a Pearson or APEUni result.'}</p></div></div>
      ${aiSummaryUI(f,t)}
      <h4 class="report-subtitle">Answer analysis</h4><div class="feedback-parts">${f.metrics.map(m=>`<div class="feedback-part"><span>${esc(m[0])}</span><b>${esc(m[1])}</b></div>`).join('')}</div>
      ${isSpeaking?`<div class="report-transcript"><div><small>YOUR RESPONSE · RECOGNIZED OR ENTERED TEXT</small><p>${esc(f.answer||'No transcript available. Your recording can still be played above if capture succeeded.')}</p></div><div><small>REFERENCE / MODEL ANSWER</small><p>${esc(f.correctText||'Open speaking response; compare main ideas with the sample response below.')}</p></div></div>`:''}
      ${showCompare?`<h4 class="report-subtitle">Word comparison</h4><p class="micro-copy">Green = word found in transcript; amber = word not recognized. This does not diagnose pronunciation.</p>${wordCompareHtml(f.correctText,f.answer)}`:''}
      <div class="feedback-tips"><strong>${svg('sparkle',14)} &nbsp; How to improve</strong>${f.tips.map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>
      ${f.correctText&&!isSpeaking?`<div class="answer-reveal"><b>${['speech-open','writing'].includes(t.type)?'Sample response / idea':'Correct answer'}</b>${esc(f.correctText)}</div>`:''}
      <div class="exercise-actions"><button class="button ghost" data-action="retry">${svg('refresh',16)} Try again</button><button class="button light" data-action="save-report">${svg('download',16)} Save result</button><button class="button" data-action="next">${state.mock?(state.mock.index===state.mock.queue.length-1?'See results':'Next task'):'Next question'} ${svg('right',16)}</button></div>
    </section>`;
  }
  function exercisePage(){const t=currentTask(),q=currentQuestion();if(!t||!q)return homePage();const m=state.mock;const questionNumber=m?m.index+1:state.qIndex+1;const total=m?m.queue.length:BANK[t.id].length;
    const stageName=({ready:'Ready to start',audio:'Listening to question audio',prepare:'Preparation time',record:'Speaking / recording',answer:'Answer time',finished:'Completed'})[state.phase];
    const phases=SPEAKING_TYPES.has(t.type)?`<div class="phase-steps"><span class="${state.phase==='audio'?'on':''}">1. ${AUDIO_SPEAK_IDS.has(t.id)?'Listen once':'Read prompt'}</span><span class="${state.phase==='prepare'?'on':''}">2. Prepare ${prepSeconds(t,q)?prepSeconds(t,q)+'s':'—'}</span><span class="${state.phase==='record'?'on':''}">3. Speak ${responseSeconds(t)}s</span></div>`:'';
    const clockValue=state.phase==='ready'?'—':state.phase==='audio'?'▶':state.originalSeconds?timeText(state.seconds):'—';
    const sectionLeft=m?.deadline?Math.max(0,Math.ceil((m.deadline-Date.now())/1000)):SECTION_LIMITS[groupFor(t)];
    return shell(`<div class="page-header"><div><button class="text-link" data-action="${m?'exit-mock':'browse'}" data-task="${t.id}" style="padding:0;margin-bottom:17px">${svg('left',15)} ${m?'Exit mock':'Back to '+t.name+' questions'}</button><div class="eyebrow">${t.section.toUpperCase()} · ${m?(m.mode==='full'?'FULL MOCK':'MINI MOCK'):'TIMED PRACTICE'}</div><h1 class="page-title">${esc(t.name)}</h1><p class="page-desc">${esc(t.desc)}</p></div><span class="label-chip">Question ${questionNumber} / ${total}</span></div>
      ${m?`<div class="mock-progress" style="margin:-5px 0 23px"><span style="width:${100*(m.index+1)/m.queue.length}%"></span></div>`:''}
      <div class="exercise-layout"><div class="surface exercise-main"><div class="exercise-topline"><span class="label-chip">${esc(t.section)}</span><span class="section-count">Original question ${state.qIndex+1}</span></div><h2 class="question-head">${esc(t.name)}</h2><p class="task-instruction">${instructions(t)}</p>
      ${phases}<div class="phase-callout ${state.phase==='record'?'is-recording':''}"><span class="phase-dot"></span><strong id="phase-title">${stageName}</strong>${state.phase==='ready'?`<button class="button small" data-action="begin">${svg('play',14)} Begin now</button>`:state.phase==='prepare'?`<button class="button early-speak" data-action="start-speaking-now">${svg('mic',16)} Start speaking now ${svg('right',14)}</button>`:''}<span>${state.phase==='ready'?'Questions and timers begin when you press Start.':state.phase==='audio'?'Listen carefully. Audio plays once in exam-style mock.':state.phase==='prepare'?(micStream?'Mic ready · recording starts automatically at 00:00, or press Start speaking now.':'Mic unavailable. Reopen microphone setup and allow permission.'):state.phase==='record'?'Speak now — recording time is running.':state.phase==='finished'?'Your attempt is saved.':'Work on your answer before time runs out.'}</span></div>
      ${state.phase==='ready'&&SPEAKING_TYPES.has(t.type)?micTools():''}${promptUI(t,q)}${answerUI(t,q)}
      ${state.phase==='ready'?`<div class="exercise-actions"><span class="small-caption">${svg('info',14)} ${SPEAKING_TYPES.has(t.type)?`Prep ${prepSeconds(t,q)}s · Speaking ${responseSeconds(t)}s`:FIXED_TIMED_IDS.has(t.id)?`Official item time ${t.id==='write-essay'?'20':'10'} min`:'No fixed official per-item limit'}</span><button class="button" data-action="begin">${svg('play',16)} Start timed question</button></div>`:''}
      ${['record','answer'].includes(state.phase)?`<div class="exercise-actions"><span class="small-caption">${svg('info',14)} Local estimate · optional AI traits</span><button class="button" data-action="submit">${SPEAKING_TYPES.has(t.type)?'Finish recording':'Submit answer'} ${svg('right',16)}</button></div>`:''}
      ${feedbackUI()}</div><aside class="exercise-side"><div class="surface"><h3 class="side-title" id="timer-label">${stageName}</h3><div class="timer-ring" id="timer-ring" style="--percent:${state.originalSeconds?100*state.seconds/state.originalSeconds:100}%"><div class="timer-inner"><div class="timer-value" id="timer-display">${clockValue}</div><div class="timer-caption">${state.phase==='record'?'SPEAK':state.phase==='prepare'?'PREP':state.phase==='audio'?'LISTEN':state.phase==='answer'?'ANSWER':'READY'}</div></div></div><p class="side-note" style="text-align:center">${SPEAKING_TYPES.has(t.type)?`Preparation and response timers follow published PTE task limits. Browser audio and speech recognition are approximations.`:FIXED_TIMED_IDS.has(t.id)?'This item has a published fixed answer time.':'PTE does not set a fixed individual limit for this type; work within the section clock in a full mock.'}</p></div>
      ${m?.mode==='full'?`<div class="surface"><h3 class="side-title">${groupFor(t)} section time</h3><div class="section-big-clock" id="section-timer">${timeText(sectionLeft)}</div><p class="side-note">Uses a representative section duration within the published range; real tests vary.</p></div>`:''}
      <div class="surface"><h3 class="side-title">Quick tips</h3><div class="side-list">${tipsBySection(t).map(x=>`<div class="side-list-item">${svg('check',16)} <span>${esc(x)}</span></div>`).join('')}</div></div><div class="surface"><h3 class="side-title">Question bank</h3><p class="side-note">${BANK[t.id].length} original questions available for this task.</p><button class="button ghost small full" data-action="browse" data-task="${t.id}">${svg('book',15)} All ${t.name} questions</button></div></aside></div>${disclaimer()}`);
  }
  
  const instructions=t=>({ 'speech-compare':'Speak the text or repeat the sentence using the microphone. Your recognized words will be compared with the model.', 'speech-open':'Speak in your own words. Include the main ideas and organize your response clearly.', 'speech-short':'Listen and answer using one word or a short phrase.', 'writing':t.id==='write-essay'?'Write an essay of 200–300 words with an introduction, body and conclusion.':t.id==='summarize-spoken-text'?'Listen, then summarize the main ideas in 50–70 words.':'Summarize the reading passage in one sentence of 5–75 words.', 'multi':'Select every correct answer. Incorrect selections can reduce your practice score.', 'single':'Choose the one best answer.', 'blanks':t.id==='listening-fib'?'Listen, then type the missing words.':'Choose the words that make the passage accurate and natural.', 'reorder':'Use the arrows to restore the logical order of the sentences.', 'highlight':'Listen to the audio and select the words in the displayed transcript that do not match.', 'dictation':'Listen to the recording, then type the complete sentence.'})[t.type]||'';
  const tipsBySection=t=>t.section==='Speaking'?['Speak clearly at a steady pace.','Cover the main idea before adding details.','Use the microphone for transcription, or type manually.']:t.section==='Writing'?['Follow the suggested word range.','Use clear grammar and punctuation.','Support your main point with relevant details.']:t.section==='Reading'?['Read the whole passage for context.','Notice relationships between sentences.','Review your choices before submitting.']:['Listen for meaning, not just isolated words.','Pay attention to keywords and details.','Practice using the audio instead of reading transcripts.'];
  function mockPage(){return shell(`${header('PRACTICE UNDER PRESSURE','Mock Tests','Choose a quick 22-task diagnostic or a longer 65-item timed exam-style simulation.')}<div class="mock-promo"><div class="mock-icon">${svg('test',32)}</div><div class="mock-text"><h2>Quick diagnostic · 22 questions</h2><p>One question from every PTE task type. Preparation and recording stages are timed; see practice feedback after each answer.</p></div><button class="button" data-action="start-mock" data-mode="mini">Start 22-task diagnostic ${svg('right',16)}</button></div><div class="mock-promo" style="margin-top:16px"><div class="mock-icon">${svg('clock',32)}</div><div class="mock-text"><h2>Exam-style full mock · 65 questions</h2><p>Uses a sample 2025-format task mix, automatic audio-first question sequences, and section clocks: Speaking & Writing 80 min, Reading 26 min, Listening 35 min. Results appear at the end. Exact test forms and duration vary.</p></div><button class="button" data-action="start-mock" data-mode="full">Start full mock ${svg('right',16)}</button></div><div class="section-row"><h2 class="section-heading">Included question types</h2><span class="section-count">${QUESTION_TOTAL} practice questions · 22 types</span></div><div class="mock-task-grid">${TASKS.map((t,i)=>`<div class="mock-mini"><b>${i+1}. ${esc(t.name)}</b><p>${t.section} · ${BANK[t.id].length} available</p></div>`).join('')}</div>${disclaimer()}`);}
  function mockResultsPage(){const m=state.mock;const results=m?.results||[];const mean=average(results.map(x=>x.score));return shell(`${header('PRACTICE COMPLETE',m?.mode==='full'?'Your full mock results':'Your mini mock results','Task scores are based on local rules, not equivalent to the official PTE scale.')}<div class="surface"><div class="report-top"><div class="report-circle"><strong>${mean??'—'}</strong><span>Practice avg.</span></div><div><h2 class="section-heading">${results.length} of ${m?.queue?.length||0} questions completed</h2><p class="page-desc">This is a practice diagnostic, not an accredited Pearson score or APEUni AI assessment. Browser voice recognition cannot grade oral fluency or pronunciation.</p><button class="button light small" data-action="nav" data-page="analytics" style="margin-top:15px">View analytics ${svg('right',14)}</button></div></div><div class="report-grid">${SECTIONS.map(x=>{let a=average(results.filter(r=>r.section===x).map(r=>r.score));return `<div class="report-skill">${secIcon(x)}<strong>${a??'—'}</strong><span>${x} average</span></div>`;}).join('')}</div><div class="exercise-actions"><button class="button ghost" data-action="nav" data-page="dashboard">Dashboard</button><button class="button" data-action="start-mock" data-mode="${m?.mode==='full'?'full':'mini'}">Try again ${svg('refresh',15)}</button></div></div>${disclaimer()}`);}
  
  function analyticsPage(){const avg=avgAll();return shell(`${header('YOUR IMPROVEMENT','Progress & Analytics','All results are stored locally in this browser.')}<div class="stat-grid" style="margin-top:0">${stat('Total attempts',records.length,'Across all question types','book','violet')}${stat('Average estimate',avg??'—','Unofficial local score','chart','green')}${stat('Skills attempted',new Set(records.map(r=>r.section)).size,'Of the four PTE skills','target','blue')}${stat('This week',records.filter(r=>(Date.now()-Date.parse(r.date))<7*86400000).length,'Practice responses','fire','orange')}</div><div class="section-row"><h2 class="section-heading">Performance overview</h2></div><div class="two-column"><div class="surface"><h3 class="surface-title">Score estimates by skill</h3><p class="surface-sub">Average based on attempts in this browser</p>${skillBars()}</div><div class="surface"><h3 class="surface-title">Daily activity</h3><p class="surface-sub">Last seven days</p>${activity()}</div></div><div class="section-row"><h2 class="section-heading">Recent answers</h2></div><div class="surface">${records.length?`<div class="history-list">${records.slice(0,15).map(r=>`<div class="history-row"><div><div class="history-title">${esc(taskById(r.taskId)?.name||r.taskId)}</div><div class="history-sub">${esc(r.section)} · ${esc(toDate(r.date))} · ${r.mode==='mock'?'Mini mock':'Practice'}</div></div><span class="history-score">${r.score===null?'—':r.score+'/90'}</span></div>`).join('')}</div>`:`<div class="empty"><h3>There is no progress to show yet</h3><p>Start with a practice task to build your history.</p><button class="button" data-action="nav" data-page="bank">Choose a task ${svg('right',15)}</button></div>`}</div>${disclaimer()}`);}
  function planPage(){const picks=recommendations();return shell(`${header('A LITTLE EVERY DAY','Your Free Study Plan','A simple, personalized study routine based on your saved practice estimates.')}<div class="hero" style="min-height:183px"><div class="hero-content"><span class="hero-pill">✦ &nbsp; YOUR DAILY ROUTINE</span><h2 style="font-size:28px">${settings.goal} minutes of focused practice</h2><p style="margin-bottom:0">Target score: ${settings.target} · Practice a little, review feedback, and come back tomorrow.</p></div><div class="hero-graphic" style="height:110px" aria-hidden="true"><div class="hero-score" style="width:107px;height:107px;right:50px;top:-2px"><strong style="font-size:40px">${settings.goal}</strong><span>MIN / DAY</span></div></div></div><div class="section-row"><h2 class="section-heading">Suggested session</h2><span class="section-count">Tailored to lower estimated skills first</span></div><div class="plan-grid">${picks.map((t,i)=>`<div class="plan-item"><div class="plan-head"><div class="plan-index">0${i+1}</div><h3>${esc(t.name)}</h3></div><p>${i===0?'Warm up your weakest estimated skill.':'Build your consistency with a different task type.'} ${esc(t.desc)}</p><div class="plan-time">${svg('clock',14)} Around ${Math.round(settings.goal/3)} minutes</div><div style="margin-top:18px"><button class="button soft small" data-action="practice" data-task="${t.id}">Practice now ${svg('right',14)}</button></div></div>`).join('')}</div><div class="section-row"><h2 class="section-heading">A few helpful habits</h2></div><div class="surface"><div class="side-list">${['Record yourself and compare the transcript with the target instead of chasing a number.','After every attempt, read the feedback and repeat the same task until it feels easier.','Include reading and listening in your routine, even if speaking is your main concern.','Use official Pearson materials to verify exam rules, scoring and difficulty.'].map(x=>`<div class="side-list-item">${svg('check',16)}<span>${esc(x)}</span></div>`).join('')}</div></div>${disclaimer()}`);}
  function settingsPage(){return shell(`${header('MAKE IT YOURS','Settings','Adjust your study targets and manage your saved history.')}<div style="margin-bottom:20px">${micTools()}</div>${aiSetupUI()}<div style="height:18px"></div><div class="settings-grid"><div class="surface"><h2 class="surface-title">Study preferences</h2><p class="surface-sub">Your choices are saved on this device</p><label class="settings-label" for="target-score">Target PTE score</label><select id="target-score" class="settings-select" data-setting="target">${[50,58,65,70,73,79,84,90].map(n=>`<option ${n==settings.target?'selected':''}>${n}</option>`).join('')}</select><label class="settings-label" for="daily-goal">Daily study goal</label><select id="daily-goal" class="settings-select" data-setting="goal">${[10,15,20,30,45,60].map(n=>`<option value="${n}" ${n==settings.goal?'selected':''}>${n} minutes</option>`).join('')}</select><p class="settings-note">These preferences update the dashboard and suggested study plan.</p></div><div class="surface"><h2 class="surface-title">Your data</h2><p class="surface-sub">Private browser storage · no account required</p><p class="settings-note">${records.length} saved attempts · ${favourites.length} favourites. Clearing your browser data will remove your progress from this device.</p><div class="divider"></div><button class="button light small" data-action="export">${svg('download',15)} Export progress as JSON</button><div style="height:13px"></div><button class="button danger small" data-action="reset">Delete saved progress</button><p class="settings-note">ScAry PTE uses offline checks by default. When AI providers are enabled, recordings/transcripts or writing answers may be processed remotely by Azure or OpenAI.</p></div></div><div class="section-row"><h2 class="section-heading">About ScAry PTE</h2></div><div class="surface"><p class="side-note">ScAry PTE is an independent, free, static practice application with ${QUESTION_TOTAL} original practice questions across all 22 scored PTE Academic task types. Some passages share topics and template structures. Offline feedback checks answer matching, keywords and form. When separately configured, Azure Speech and an independent language model provide additional AI measurements, <b>not official PTE exam scores</b>. There is no official pronunciation grading, no verified exam prediction, and no copied APEUni questions or software. It is not affiliated with Pearson or APEUni.</p><p class="side-note" style="margin-top:15px">For the official format and score guidance, visit <a href="https://www.pearsonpte.com/pte-academic/test-format/speaking-writing/" target="_blank" rel="noopener noreferrer">Pearson PTE</a>.</p></div>`);}
  function render(){let page;switch(state.page){case 'bank':page=bankPage();break;case 'questions':page=questionsPage();break;case 'exercise':page=exercisePage();break;case 'mock':page=mockPage();break;case 'mock-results':page=mockResultsPage();break;case 'analytics':page=analyticsPage();break;case 'plan':page=planPage();break;case 'settings':page=settingsPage();break;default:page=homePage();}app.innerHTML=page;document.title=`${pageName()} · ScAry PTE`;}
  app.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
    if(action==='nav'){navigate(b.dataset.page);return;}
    if(action==='menu'){state.mobileNav=!state.mobileNav;render();return;}
    if(action==='close-menu'){state.mobileNav=false;render();return;}
    if(action==='filter'){state.filter=b.dataset.filter;render();return;}
    if(action==='clear-filter'){state.filter='All';state.search='';render();return;}
    if(action==='favorite'){if(favourites.includes(b.dataset.task))favourites=favourites.filter(x=>x!==b.dataset.task);else favourites.push(b.dataset.task);persist();render();return;}
    if(action==='browse'){stopTimer();stopMedia();stopSectionTimer();state.mock=null;state.taskId=b.dataset.task;if(state.page!=='exercise'){state.qPage=0;state.qSearch='';}state.phase='ready';state.page='questions';render();window.scrollTo(0,0);return;}
    if(action==='question-page'){state.qPage=Number(b.dataset.page)||0;render();window.scrollTo({top:0,behavior:'instant'});return;}
    if(action==='question-jump'){const n=Number(document.getElementById('jump-number')?.value||0);const max=BANK[state.taskId]?.length||0;if(!Number.isInteger(n)||n<1||n>max){toast(`Enter a number between 1 and ${max}.`);return;}state.qSearch='';state.qPage=Math.floor((n-1)/QUESTION_PAGE_SIZE);openExercise(state.taskId,n-1);return;}
    if(action==='practice'){openExercise(b.dataset.task,Number(b.dataset.index||0));return;}
    if(action==='begin'){beginExercise();return;}
    if(action==='start-speaking-now'){if(state.page==='exercise'&&state.phase==='prepare'&&!state.feedback){stopTimer();startPhase('record',responseSeconds(currentTask()));}return;}
    if(action==='start-mock'){startMock(b.dataset.mode||'mini');return;}
    if(action==='exit-mock'){if(confirm('Leave this mini diagnostic? Your completed items are saved, but this diagnostic session will end.'))navigate('mock');return;}
    if(action==='audio'){if(state.phase==='ready'||state.phase==='audio'||state.mock?.mode==='full')return;speak(audioText(currentQuestion()));return;}
    if(action==='mic'){startRecording();return;}
    if(action==='test-mic'){
      requestMicrophone().then(ok=>{if(state.page==='exercise'&&state.phase==='ready'||state.page==='settings'){render();if(ok)toast('Microphone connected. Speak to check the input level.');}});
      return;
    }
    if(action==='save-report'){saveDetailedResult();return;}
    if(action==='save-ai-pin'){ai?.setPin(document.getElementById('ai-pin')?.value||'');toast('Access PIN saved for this tab.');render();return;}
    if(action==='refresh-ai'){ai?.refresh().then(()=>{if(state.page==='settings')render();toast('AI connection status refreshed.');});return;}
    if(action==='option'){if(state.phase!=='answer')return;const i=Number(b.dataset.choice),t=currentTask();if(t.type==='single')state.answer=i;else state.answer=state.answer.includes(i)?state.answer.filter(x=>x!==i):[...state.answer,i];render();return;}
    if(action==='word'){if(state.phase!=='answer')return;const i=Number(b.dataset.choice);state.answer=state.answer.includes(i)?state.answer.filter(x=>x!==i):[...state.answer,i];render();return;}
    if(action==='move'){if(state.phase!=='answer')return;const i=Number(b.dataset.pos),j=i+Number(b.dataset.dir),a=state.answer;if(j>=0&&j<a.length){[a[i],a[j]]=[a[j],a[i]];render();}return;}
    if(action==='submit'){submitAnswer();return;}
    if(action==='retry'){if(state.mock&&state.feedback)state.mock.results.pop();openExercise(state.taskId,state.qIndex,!!state.mock);return;}
    if(action==='next'){nextTask();return;}
    if(action==='export'){const blob=new Blob([JSON.stringify({app:'ScAry PTE',exportedAt:new Date().toISOString(),records,favourites,settings},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='scary-pte-progress.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Progress export started.');return;}
    if(action==='reset'){if(confirm('Delete all saved ScAry PTE practice attempts and favourites on this device?')){records=[];favourites=[];persist();render();toast('Local progress cleared.');}return;}
  });
  app.addEventListener('input',e=>{const el=e.target;if(el.id==='question-search'){const start=el.selectionStart;state.qSearch=el.value;state.qPage=0;render();const input=document.getElementById('question-search');if(input){input.focus();try{input.setSelectionRange(start,start);}catch{}}return;}if(el.id==='bank-search'){const start=el.selectionStart;state.search=el.value;render();const input=document.getElementById('bank-search');if(input){input.focus();input.setSelectionRange(start,start);}return;}if(el.dataset.answer==='text'&&(['record','answer'].includes(state.phase))){state.answer=el.value;if(SPEAKING_TYPES.has(currentTask()?.type))transcriptSource='manual';const count=document.getElementById('word-count');if(count)count.textContent=`${wordCount(state.answer)} words`;return;}if(el.dataset.blank!=null&&state.phase==='answer'){state.answer[Number(el.dataset.blank)]=el.value;}});
  app.addEventListener('keydown',e=>{if(e.target?.id==='jump-number'&&e.key==='Enter'){e.preventDefault();document.querySelector('[data-action="question-jump"]')?.click();}});
  app.addEventListener('change',e=>{const el=e.target;
    if(el.id==='mic-device-select'){
      selectedMicrophone=el.value;
      finishCapture();micStream=null;requestMicrophone().then(()=>render());return;
    }if(el.dataset.blank!=null&&state.phase==='answer')state.answer[Number(el.dataset.blank)]=el.value;if(el.dataset.setting){settings[el.dataset.setting]=Number(el.value);persist();toast('Preference saved.');}});
  window.addEventListener('beforeunload',()=>{stopMedia();stopTimer();stopSectionTimer();});
  render();
})();
