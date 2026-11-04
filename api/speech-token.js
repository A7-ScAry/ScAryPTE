'use strict';
function allowed(req){
  return !process.env.SCARY_ACCESS_PIN || req.headers['x-scary-access-pin'] === process.env.SCARY_ACCESS_PIN;
}
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!allowed(req))return res.status(403).json({error:'Access PIN incorrect or missing.'});
  const key=process.env.AZURE_SPEECH_KEY, region=process.env.AZURE_SPEECH_REGION;
  if(!key||!region)return res.status(503).json({error:'Azure Speech is not configured on the server.'});
  if(!/^[a-z0-9-]{2,35}$/.test(region))return res.status(500).json({error:'Invalid Azure region configuration.'});
  try{
    const response=await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,{method:'POST',headers:{'Ocp-Apim-Subscription-Key':key,'Content-Type':'application/x-www-form-urlencoded'},signal:AbortSignal.timeout(12000)});
    if(!response.ok)return res.status(502).json({error:`Azure authorization failed (${response.status}). Check server credentials and region.`});
    const token=await response.text();
    return res.status(200).json({token,region,expiresInSeconds:540});
  }catch(e){return res.status(502).json({error:`Azure token service unavailable: ${String(e.message||e).slice(0,180)}`});}
};
