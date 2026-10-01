import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');const requested=path.resolve(root,'.'+decodeURIComponent(url.pathname));
 if(requested!==root&&!requested.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 const file=url.pathname==='/'?path.join(root,'index.html'):requested;
 const content=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(content);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(5173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:5173/'));
