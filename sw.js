if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const d=e=>i(e,o),f={module:{uri:o},exports:c,require:d};s[o]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"b2aecd6e82d0dcac66dd3d538cfbf71e"},{url:"assets/default-kid-2d44724f.svg",revision:null},{url:"assets/default-workshop-235f8461.svg",revision:null},{url:"assets/index-6f709c06.js",revision:null},{url:"assets/index-eb3c73e4.css",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"favicon.svg",revision:"06bfc3c931efe3b6cd3426d23a953c75"},{url:"index.html",revision:"716fc1b8a934abbc45636d6b6f3fa7f7"},{url:"masked-favicon.svg",revision:"1f8cb1ab3273970b2c1f432a3d6ccf39"},{url:"pwa-192x192.png",revision:"d89c96660e30af3049142fe73137d063"},{url:"pwa-512x512.png",revision:"b383ec1439d16617960e0ef21b4e0f54"},{url:"apple-touch-icon.png",revision:"b2aecd6e82d0dcac66dd3d538cfbf71e"},{url:"pwa-192x192.png",revision:"d89c96660e30af3049142fe73137d063"},{url:"pwa-512x512.png",revision:"b383ec1439d16617960e0ef21b4e0f54"},{url:"manifest.webmanifest",revision:"d71a916d92938476491f20c22f18666a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
