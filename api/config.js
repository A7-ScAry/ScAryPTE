'use strict';
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error:'Method not allowed' });
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json({
    speech: Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    language: Boolean(process.env.OPENAI_API_KEY),
    accessPinRequired: Boolean(process.env.SCARY_ACCESS_PIN),
    message:'Independent AI practice feedback only; not Pearson or APEUni scoring.'
  });
};
