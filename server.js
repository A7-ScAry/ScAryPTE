'use strict';
// Optional zero-dependency local development server: node server.js
const fs=require('fs'),http=require('http'),path=require('path');
const root=__dirname;
try{for(const line of fs.readFileSync(path.join(root,'.env'),'utf8').split(/\r?\n/)){const m=line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');}}catch{}
const handlers={'/api/config':require('./api/config'),'/api/speech-token':require('./api/speech-token'),'/api/language-feedback':require('./api/language-feedback')};
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const api=handlers[pathname];
  res.status=(s)=>{res.statusCode=s;return res;};res.json=(v)=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(v));return res;};
  if(api){if(req.method==='POST'){let s='';req.on('data',c=>{s+=c;if(s.length>32000){res.status(413).json({error:'Request too large'});req.destroy();}});req.on('end',()=>{try{req.body=JSON.parse(s||'{}');api(req,res);}catch{res.status(400).json({error:'Invalid JSON'});}});}else api(req,res);return;}
  if(req.method!=='GET'&&req.method!=='HEAD')return res.status(405).end();
  const p=pathname==='/'?'/index.html':pathname;
  const file=path.resolve(root,'.'+p);
  if(!file.startsWith(root+path.sep)||/(^|\/)\.(env|git)/.test(p)||p==='/server.js'||p.startsWith('/api/'))return res.status(403).end('Forbidden');
  fs.readFile(file,(err,data)=>{if(err){res.status(404).end('Not found');return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(req.method==='HEAD'?undefined:data);});
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('ScAry PTE v6: http://localhost:'+(process.env.PORT||3000)));
