// In-process build for environments that restrict child process creation.
// The standard npm scripts remain available on normal developer machines.
import {build} from 'vite';
import ts from 'typescript';
import tailwindcss from '@tailwindcss/vite';
await build({configFile:false,resolve:{preserveSymlinks:true},plugins:[{
 name:'typescript-in-process',enforce:'pre',
 transform(code,id){
  if(id.includes('node_modules')&&code.includes('process.env')) return {code:code.replaceAll('process.env.NODE_ENV','"production"').replaceAll('process.env?.NODE_ENV','"production"'),map:null};
  if(/\.[tj]sx?$/.test(id)&&!id.includes('node_modules'))return {code:ts.transpileModule(code,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText,map:null};}
},tailwindcss()],esbuild:false,build:{target:'esnext',minify:false,cssMinify:false}});
