try{self["workbox:core:6.5.3"]&&_()}catch{}const M=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},S=M;class h extends Error{constructor(e,t){const s=S(e,t);super(s),this.name=e,this.details=t}}const W=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},P=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),A=a=>{for(const e of Object.keys(f))a(e)},R={updateDetails:a=>{A(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||P(f.googleAnalytics),getPrecacheName:a=>a||P(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||P(f.runtime),getSuffix:()=>f.suffix};function K(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function D(a,e,t,s){const n=K(e.url,t);if(e.url===n)return a.match(e,s);const c=Object.assign(Object.assign({},s),{ignoreSearch:!0}),r=await a.keys(e,c);for(const i of r){const o=K(i.url,t);if(n===o)return a.match(i,s)}}let w;function j(){if(w===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),w=!0}catch{w=!1}w=!1}return w}class F{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function q(){for(const a of W)await a()}const H=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function $(a){return new Promise(e=>setTimeout(e,a))}function x(a,e){const t=e();return a.waitUntil(t),t}async function B(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new h("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},c=e?e(n):n,r=j()?s.body:await s.blob();return new Response(r,c)}function V(){self.addEventListener("activate",()=>self.clients.claim())}function G(a){R.updateDetails(a)}function Q(){self.skipWaiting()}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const z="__WB_REVISION__";function J(a){if(!a)throw new h("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const c=new URL(a,location.href);return{cacheKey:c.href,url:c.href}}const{revision:e,url:t}=a;if(!t)throw new h("add-to-cache-list-unexpected-type",{entry:a});if(!e){const c=new URL(t,location.href);return{cacheKey:c.href,url:c.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(z,e),{cacheKey:s.href,url:n.href}}class X{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class Y{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=s?.cacheKey||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function U(a){return typeof a=="string"?new Request(a):a}class Z{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new F,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=U(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))s=await r({request:s.clone(),event:t})}catch(r){if(r instanceof Error)throw new h("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const c=s.clone();try{let r;r=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))r=await i({event:t,request:c,response:r});return r}catch(r){throw n&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:n.clone(),request:c.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=U(e);let s;const{cacheName:n,matchOptions:c}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},c),{cacheName:n});s=await caches.match(r,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:c,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=U(e);await $(0);const n=await this.getCacheKey(s,"write");if(!t)throw new h("cache-put-with-no-response",{url:H(n.url)});const c=await this._ensureResponseSafeToCache(t);if(!c)return!1;const{cacheName:r,matchOptions:i}=this._strategy,o=await self.caches.open(r),l=this.hasCallback("cacheDidUpdate"),p=l?await D(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,l?c.clone():c)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await q(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:r,oldResponse:p,newResponse:c.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const c of this.iterateCallbacks("cacheKeyWillBeUsed"))n=U(await c({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield c=>{const r=Object.assign(Object.assign({},c),{state:s});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class T{constructor(e={}){this.cacheName=R.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,c=new Z(this,{event:t,request:s,params:n}),r=this._getResponse(c,s,t),i=this._awaitComplete(r,c,s,t);return[r,i]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new h("no-response",{url:t.url})}catch(c){if(c instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:c,event:s,request:t}),n)break}if(!n)throw c}for(const c of e.iterateCallbacks("handlerWillRespond"))n=await c({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let c,r;try{c=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:c}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:c,error:r}),t.destroy(),r)throw r}}class d extends T{constructor(e={}){e.cacheName=R.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const c=n.integrity,r=e.integrity,i=!r||r===c;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||c:void 0})),c&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new h("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new h("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==d.copyRedirectedCacheableResponsesPlugin&&(n===d.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await B(a):a}};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:R.getPrecacheName(e),plugins:[...t,new Y({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:c}=J(s),r=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(c)&&this._urlsToCacheKeys.get(c)!==n)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(c),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:c});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(c,n),this._urlsToCacheModes.set(c,r),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return x(e,async()=>{const t=new X;this.strategy.plugins.push(t);for(const[c,r]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(r),o=this._urlsToCacheModes.get(c),l=new Request(c,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:l,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return x(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),c=[];for(const r of s)n.has(r.url)||(await t.delete(r),c.push(r.url));return{deletedURLs:c}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new h("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let L;const E=()=>(L||(L=new ee),L);try{self["workbox:routing:6.5.3"]&&_()}catch{}const v="GET",k=a=>a&&typeof a=="object"?a:{handle:a};class y{constructor(e,t,s=v){this.handler=k(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=k(e)}}class te extends y{constructor(e,t,s){const n=({url:c})=>{const r=e.exec(c.href);if(!!r&&!(c.origin!==location.origin&&r.index!==0))return r.slice(1)};super(n,t,s)}}class se{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const c=new Request(...n);return this.handleRequest({request:c,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:c,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let l;try{l=i.handle({url:s,request:e,event:t,params:c})}catch(u){l=Promise.reject(u)}const p=r&&r.catchHandler;return l instanceof Promise&&(this._catchHandler||p)&&(l=l.catch(async u=>{if(p)try{return await p.handle({url:s,request:e,event:t,params:c})}catch(N){N instanceof Error&&(u=N)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),l}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const c=this._routes.get(s.method)||[];for(const r of c){let i;const o=r.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(e,t=v){this._defaultHandlerMap.set(t,k(e))}setCatchHandler(e){this._catchHandler=k(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new h("unregister-route-route-not-registered")}}let m;const ae=()=>(m||(m=new se,m.addFetchListener(),m.addCacheListener()),m);function g(a,e,t){let s;if(typeof a=="string"){const c=new URL(a,location.href),r=({url:i})=>i.href===c.href;s=new y(r,e,t)}else if(a instanceof RegExp)s=new te(a,e,t);else if(typeof a=="function")s=new y(a,e,t);else if(a instanceof y)s=a;else throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return ae().registerRoute(s),s}function ne(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*ce(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const c=new URL(a,location.href);c.hash="",yield c.href;const r=ne(c,e);if(yield r.href,t&&r.pathname.endsWith("/")){const i=new URL(r.href);i.pathname+=t,yield i.href}if(s){const i=new URL(r.href);i.pathname+=".html",yield i.href}if(n){const i=n({url:c});for(const o of i)yield o.href}}class re extends y{constructor(e,t){const s=({request:n})=>{const c=e.getURLsToCacheKeys();for(const r of ce(n.url,t)){const i=c.get(r);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(s,e.strategy)}}function ie(a){const e=E(),t=new re(e,a);g(t)}const oe="-precache-",he=async(a,e=oe)=>{const s=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==a);return await Promise.all(s.map(n=>self.caches.delete(n))),s};function le(){self.addEventListener("activate",a=>{const e=R.getPrecacheName();a.waitUntil(he(e).then(t=>{}))})}function ue(a){E().precache(a)}function fe(a,e){ue(a),ie(e)}class de extends T{async _handle(e,t){let s=await t.cacheMatch(e),n;if(!s)try{s=await t.fetchAndCachePut(e)}catch(c){c instanceof Error&&(n=c)}if(!s)throw new h("no-response",{url:e.url,error:n});return s}}const pe={cacheWillUpdate:async({response:a})=>a.status===200||a.status===0?a:null};class C extends T{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(pe),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const s=[],n=[];let c;if(this._networkTimeoutSeconds){const{id:o,promise:l}=this._getTimeoutPromise({request:e,logs:s,handler:t});c=o,n.push(l)}const r=this._getNetworkPromise({timeoutId:c,request:e,logs:s,handler:t});n.push(r);const i=await t.waitUntil((async()=>await t.waitUntil(Promise.race(n))||await r)());if(!i)throw new h("no-response",{url:e.url});return i}_getTimeoutPromise({request:e,logs:t,handler:s}){let n;return{promise:new Promise(r=>{n=setTimeout(async()=>{r(await s.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:n}){let c,r;try{r=await n.fetchAndCachePut(t)}catch(i){i instanceof Error&&(c=i)}return e&&clearTimeout(e),(c||!r)&&(r=await n.cacheMatch(t)),r}}try{self["workbox:cacheable-response:6.5.3"]&&_()}catch{}class ge{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(s=>e.headers.get(s)===this._headers[s])),t}}class O{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new ge(e)}}const b="v1";V();Q();le();G({prefix:"WishSim",precache:"Core",suffix:b});let I=[{"revision":"70d923d7c7c958db16c27af9ead63fcd","url":"adkey.html"},{"revision":"e17d1c84f3922fdd9b2e6a8b45c404fa","url":"bnlist.html"},{"revision":"25da334300e788034489ab27f2cadc0e","url":"google77966abbed90508f.html"},{"revision":"b863f0cee5e109818539375292cf57c9","url":"icons.css"},{"revision":"99d3af9d51c7f5286a905e78be07797a","url":"index.html"},{"revision":"0cff8406183de4a085f11929e400e28f","url":"install.html"},{"revision":"73d805c2a3b2f4982156caaa876a5988","url":"internal/immutable/assets/_error-c9470412.css"},{"revision":"720e36774ed19c8fef12df22d8efe934","url":"internal/immutable/assets/_layout-930a1910.css"},{"revision":"c6021c470124781dd19dc434a11670b2","url":"internal/immutable/assets/_modal-balance-4f630c28.css"},{"revision":"4c72bcab45f9f87af8341ee2f327f87d","url":"internal/immutable/assets/_page-20242bb5.css"},{"revision":"dd86eaa1e1cf8a55c2ae1936a9c522c8","url":"internal/immutable/assets/_page-38811b6b.css"},{"revision":"c2e2da842b770c3a709ec40a036b0880","url":"internal/immutable/assets/_page-3c659a81.css"},{"revision":"93756d8efbeb015ff93b5a547179be61","url":"internal/immutable/assets/_page-41952c63.css"},{"revision":"fa8f7341aa557aa76cac376e936fc599","url":"internal/immutable/assets/_page-8ecfd270.css"},{"revision":"082d054c41e4f4660fcc55eec05aa792","url":"internal/immutable/assets/_page-c955f7fd.css"},{"revision":"bae944901319b14f11539191725a2c42","url":"internal/immutable/assets/_pagination-660172f1.css"},{"revision":"3b714768d8214f867ffc1b3eeac73532","url":"internal/immutable/assets/ButtonModal-dd0ea437.css"},{"revision":"210ed607c4dc2847eeba23a65962cff2","url":"internal/immutable/assets/CheckBox-4ae22161.css"},{"revision":"79e43e54d1e982fa93aa0c75b3e12cc2","url":"internal/immutable/assets/Iklan-27674bcf.css"},{"revision":"86f723c171db29e6292129bf853a3bc3","url":"internal/immutable/assets/index-191c38e6.css"},{"revision":"30f3e194a77bd882fe95ffbd89da9f10","url":"internal/immutable/assets/index-4096041d.css"},{"revision":"508284cfa6c77fbe48e501530b97c225","url":"internal/immutable/assets/index-9dd1fc3f.css"},{"revision":"245333c56fd3b82fc2a36a3fd2f9a2a6","url":"internal/immutable/assets/index-aeaf3858.css"},{"revision":"78644ca977771caf52bfafed61db8ace","url":"internal/immutable/assets/index-db37b75c.css"},{"revision":"4c837c3608c7c0534fe97aba708e6fca","url":"internal/immutable/assets/index-f0ee7e4a.css"},{"revision":"37e323b08cd3d6860f6ed186db2c5338","url":"internal/immutable/assets/lazyload-d703da40.css"},{"revision":"0ec10572699394d94060bd03ad967ee1","url":"internal/immutable/assets/ModalConvert-1cf56ccf.css"},{"revision":"4b27328128106f233f8a7735b30c4cb9","url":"internal/immutable/assets/ObtainedItem-64c93daf.css"},{"revision":"e9e71ea742b7fc8e5c8ceeeeacce77a5","url":"internal/immutable/assets/RandomBackground-c01fc64e.css"},{"revision":"3e9a1d464a915a8cefaafa8b4da42b38","url":"internal/immutable/assets/WishResult-218c775f.css"},{"revision":"9f05b2536f35f6a9ea39f545b9ea3d2b","url":"internal/immutable/chunks/_layout-0ebf6292.js"},{"revision":"37ff9c6073265aa93274b8ced2c87c6d","url":"internal/immutable/chunks/_modal-balance-3098dccf.js"},{"revision":"03067afbb0c57555770f3d21eb0371d5","url":"internal/immutable/chunks/_page-c8307a7f.js"},{"revision":"859befffdbcf631a0274bacee102b1f3","url":"internal/immutable/chunks/_pagination-5a11d6bf.js"},{"revision":"462b46f6370b81fd4ddffee819688fd2","url":"internal/immutable/chunks/0-d426c8fa.js"},{"revision":"8762474ed5ca3fe9922d644cf05ee0b4","url":"internal/immutable/chunks/1-f6dbfb5b.js"},{"revision":"1386d8aa062fe1c91593508cd8de5912","url":"internal/immutable/chunks/1.0-1c054612.js"},{"revision":"c35b142ed7eee443c075ade0794af07e","url":"internal/immutable/chunks/1.1-3cf30f8b.js"},{"revision":"fffb827ff57cc864c1afd3af0c88ae2d","url":"internal/immutable/chunks/1.2-aaf0e2fb.js"},{"revision":"d32e54833435ae06c0f17b4ff9dbccf2","url":"internal/immutable/chunks/1.3-6b0b0d5d.js"},{"revision":"e9c25c0251fec0f200487007caaebe86","url":"internal/immutable/chunks/1.4-ad0ba199.js"},{"revision":"8a9173ece12f102ccc15cbf9a7a3ec53","url":"internal/immutable/chunks/1.5-d00419ea.js"},{"revision":"8c3f45de545fa9d367d6bf62d147f156","url":"internal/immutable/chunks/1.6-5d274b2f.js"},{"revision":"fcbfbadab9871fdeaf90eed7a032b583","url":"internal/immutable/chunks/10-871a5679.js"},{"revision":"0a29aadd08c89e83d9e56f4846d16c4d","url":"internal/immutable/chunks/2-08ea18bf.js"},{"revision":"e65d404870d99e2ff0983f7e04d4f10d","url":"internal/immutable/chunks/2.0-d9400515.js"},{"revision":"56febe715719c51b384d2ba09ddd9b47","url":"internal/immutable/chunks/2.1-b1e02588.js"},{"revision":"52f2d96fd564b887a4b751d278f56fc6","url":"internal/immutable/chunks/2.2-a8d9f452.js"},{"revision":"522777874cf72382caadec8d2ddcd35d","url":"internal/immutable/chunks/2.3-63f68053.js"},{"revision":"d5571a6cd8a15d5544ca37c7f80164f8","url":"internal/immutable/chunks/2.4-36c15b7f.js"},{"revision":"9ff141aa4d4ac3d7a095a2f745a86eb4","url":"internal/immutable/chunks/2.5-5d57feac.js"},{"revision":"df767eb8a8f73eee131000ea994c2cbe","url":"internal/immutable/chunks/2.6-0570e3ed.js"},{"revision":"caa2181c3af07cf6cd4a85a67ccd5a8f","url":"internal/immutable/chunks/2.7-1162b8cf.js"},{"revision":"61a66ae469f9076eb61f3539061dd039","url":"internal/immutable/chunks/2.8-c43df701.js"},{"revision":"56bad97ec0b0e9b96bf41af42d384f3f","url":"internal/immutable/chunks/3-4e02e70a.js"},{"revision":"42fdae4922a7edaec69ab88117ad0924","url":"internal/immutable/chunks/3.0-3ac6ff72.js"},{"revision":"8f31adeed13e07b2e6737cc386311847","url":"internal/immutable/chunks/3.1-9f559463.js"},{"revision":"388b746da4cedbf04022465767d49ec7","url":"internal/immutable/chunks/3.2-deb84a02.js"},{"revision":"56a724c63b368780df9de7124d42d137","url":"internal/immutable/chunks/3.3-60e982e0.js"},{"revision":"da4de9a6ac750b07619ece8ad2cbe7fb","url":"internal/immutable/chunks/3.4-0159422c.js"},{"revision":"5b40898c5cb50f7847e423f5b8ffc9a4","url":"internal/immutable/chunks/3.5-0e9eadf4.js"},{"revision":"02b401d07d046fac2fd2db3b86e110bb","url":"internal/immutable/chunks/3.6-2d1ccd10.js"},{"revision":"9d1403d894370d68acd2731f04b418dd","url":"internal/immutable/chunks/3.7-dfc781bc.js"},{"revision":"bd71b088c7876a02a740ef2eedea8d3f","url":"internal/immutable/chunks/3.8-cab116ac.js"},{"revision":"bbda02d8ebee1e6cc459cb148f139bcf","url":"internal/immutable/chunks/4-2a997319.js"},{"revision":"745f136f1e3466dd1e27dab61a49a929","url":"internal/immutable/chunks/4.0-b6f7811b.js"},{"revision":"963e254c53d69285aab3642a2acd2a84","url":"internal/immutable/chunks/4.1-a7933656.js"},{"revision":"5a044676091b8aaa6bfac561c3e06f13","url":"internal/immutable/chunks/4.2-afc28708.js"},{"revision":"573176d9c826b62f64503fad090507ea","url":"internal/immutable/chunks/4.3-f9a28ea0.js"},{"revision":"cfb2bfae2383f7e17fcc9a3a6b9c94c1","url":"internal/immutable/chunks/5-3cabdf5f.js"},{"revision":"6a074e0054f8f9a72b554a61de50e1ec","url":"internal/immutable/chunks/6-d1d93549.js"},{"revision":"03c95608b8c8b2bb941c1a0a6356b503","url":"internal/immutable/chunks/7-c8256270.js"},{"revision":"ed0458d85864e6e8d839ae0e52e08ea2","url":"internal/immutable/chunks/8-4109e29b.js"},{"revision":"2cbdb09ef9fe5abf0f831546660707e6","url":"internal/immutable/chunks/9-8f9a7914.js"},{"revision":"ead82e34f49d8e946ee47e467e3185fa","url":"internal/immutable/chunks/api-cookie-e261ada1.js"},{"revision":"4e7af6694fe65ae8cce95093bb410d5b","url":"internal/immutable/chunks/app-stores-9073b00a.js"},{"revision":"cd41614ca7e7d27b364ef58522001f7c","url":"internal/immutable/chunks/audio-ebd834da.js"},{"revision":"e7cc1c0ad1038f0193db754a9d3dfad6","url":"internal/immutable/chunks/ButtonModal-0624aa7a.js"},{"revision":"8b3325501f9c5eb174ecd0d5f450fdb1","url":"internal/immutable/chunks/CheckBox-5b45cd03.js"},{"revision":"df52c2c8a54325f0811ab43ef392883f","url":"internal/immutable/chunks/custom-banner-b5b1c76d.js"},{"revision":"5137cd4ee493bc62a42dbe3b3f5abb09","url":"internal/immutable/chunks/de-DE-3814d14a.js"},{"revision":"f43c36db0fcfb6b6afa0828556390179","url":"internal/immutable/chunks/en-US-633c48a0.js"},{"revision":"3f6e0f11ac49a0d90c2142ec50dc450e","url":"internal/immutable/chunks/en-US-c052b9ea.js"},{"revision":"1955070b07e043adc1bf6032c9e9c55e","url":"internal/immutable/chunks/env-164b308d.js"},{"revision":"ad6b362faf44b75190624b919c73a748","url":"internal/immutable/chunks/fr-FR-79ee7566.js"},{"revision":"fc2c30c0163c3495a2072635ef956b7a","url":"internal/immutable/chunks/id-ID-e1da9308.js"},{"revision":"803ff73c9b3c850ecd6ee21ae32c6d30","url":"internal/immutable/chunks/Iklan-2037d606.js"},{"revision":"1c1674aed7b1f252aa5a017b01df53b2","url":"internal/immutable/chunks/index-18ae3ed7.js"},{"revision":"57fd7b8200d0aa50de288e8bd769ad3f","url":"internal/immutable/chunks/index-4af53f9a.js"},{"revision":"f6f433e5de63836c4eddb3b16a506aec","url":"internal/immutable/chunks/index-9ae4a19d.js"},{"revision":"a739a0918bbac132598756be47ceed29","url":"internal/immutable/chunks/index-b707e915.js"},{"revision":"2a6a882d1048f421b3aa6309e175f59a","url":"internal/immutable/chunks/index-ba3787f6.js"},{"revision":"13022383fb6e3d8642601faffa9a86ec","url":"internal/immutable/chunks/index-cf205689.js"},{"revision":"0789864126d4673f0eec69f2bffad0cb","url":"internal/immutable/chunks/index-d56a2d4f.js"},{"revision":"c5e66c1730ca4f3d4435eb115872c242","url":"internal/immutable/chunks/index-e60c51be.js"},{"revision":"5015d9f2507009834a91a73a4ae800f7","url":"internal/immutable/chunks/index-e9717c6d.js"},{"revision":"d40ce58d9e1eee265a167a0cf69cd45d","url":"internal/immutable/chunks/index-ed25e61b.js"},{"revision":"0d9de4cfb317f3f91a193a7f565cb7e7","url":"internal/immutable/chunks/it-IT-298ecc6e.js"},{"revision":"1f7feb4a30320545e67120f0b8fe7e31","url":"internal/immutable/chunks/it-IT-d4ace31e.js"},{"revision":"37a82cfcc332f0d81cc64d2d4d8f557e","url":"internal/immutable/chunks/ja-JP-76868286.js"},{"revision":"6d499ee19ab6d72f3ee10ac761f25e85","url":"internal/immutable/chunks/ja-JP-9a116936.js"},{"revision":"4eace3e1c4299192c3ad245b9558e62b","url":"internal/immutable/chunks/lazyload-58cd0117.js"},{"revision":"a1d18e6280b573d590f1ab2583c8f3ae","url":"internal/immutable/chunks/ModalConvert-7c602e18.js"},{"revision":"12490e0bfa9c499e029e1ed5ea5b9a4b","url":"internal/immutable/chunks/navigation-35cd9702.js"},{"revision":"a9ae845e488390ee79eed7932a0ac707","url":"internal/immutable/chunks/ObtainedItem-344ad5e9.js"},{"revision":"8039f0c531be8208d50409c2d2168145","url":"internal/immutable/chunks/outfit-ec220797.js"},{"revision":"02c605681ba12e962421711edcf214c4","url":"internal/immutable/chunks/preload-helper-176e53da.js"},{"revision":"04a98d8030681eea76c7ccd43f23cbc7","url":"internal/immutable/chunks/pt-BR-ed487c6b.js"},{"revision":"76d09616fc70314c58838a8b7b362c4f","url":"internal/immutable/chunks/pt-BR-ef6f28e8.js"},{"revision":"44f826fb398fd0e598469c5baf0fcf72","url":"internal/immutable/chunks/RandomBackground-2fa0e064.js"},{"revision":"b7e04d87389c1a61ec7aa012ed13ca80","url":"internal/immutable/chunks/ru-RU-cce9fb85.js"},{"revision":"851d02f64e42842c7820b8868f350aa6","url":"internal/immutable/chunks/ru-RU-dec1a909.js"},{"revision":"e6f6b0bbb265a9b58db592da52a4310f","url":"internal/immutable/chunks/runtime.esm-ee3b0ca4.js"},{"revision":"68fbfe8abe6c6b2f187f913d6fdb8ab4","url":"internal/immutable/chunks/singletons-c99563ef.js"},{"revision":"46353d295d002b7ef8af86d324b3efb4","url":"internal/immutable/chunks/stores-22c0261c.js"},{"revision":"d92194fcb9dd0006b2c0be73e7df8a71","url":"internal/immutable/chunks/sync-5d1bbb42.js"},{"revision":"c7974c0a85418f945d54087707435c5d","url":"internal/immutable/chunks/th-TH-4b2a93d4.js"},{"revision":"6513538ecd7f42be37e2e0df4d4deaea","url":"internal/immutable/chunks/timeago-633a0c94.js"},{"revision":"a8bd4c3ef5907a6d11558368c4920e25","url":"internal/immutable/chunks/toast-dfa56fe5.js"},{"revision":"b95ad1041ff5133ce6dfc4b23a36dec8","url":"internal/immutable/chunks/vi-VN-32e2d47a.js"},{"revision":"83b1f74ace86867ee4d889abcdc39546","url":"internal/immutable/chunks/vi-VN-5f277aef.js"},{"revision":"f711c9b4f3e2cb58481807a20844d196","url":"internal/immutable/chunks/WishResult-63624cb7.js"},{"revision":"b8c9397a5a7bdb9aee024d2c57d41845","url":"internal/immutable/chunks/workbox-window.prod.es5-9f0a6626.js"},{"revision":"a237c92e1a569fa1f72d64f6ae22901f","url":"internal/immutable/chunks/zh-CN-682e266a.js"},{"revision":"17fa0dec1735cb41a9bdb8b6f2244d70","url":"internal/immutable/chunks/zh-CN-c88eacac.js"},{"revision":"0d87ec1fd8269a81fb31bfb55579e356","url":"internal/immutable/chunks/zh-TW-2597c741.js"},{"revision":"8fd09d9088a9a55c2e8c570a10b7e88c","url":"internal/immutable/chunks/zh-TW-f14f9f89.js"},{"revision":"eb1705fa2154efa900ecf8022d003459","url":"internal/immutable/components/pages/_error.svelte-d2e98e07.js"},{"revision":"13cfe2ea80ee4ce2abc8399c4fc96c14","url":"internal/immutable/components/pages/_layout.svelte-dab0effc.js"},{"revision":"974b543d4cfa6f510e50f4ee9c1ea0de","url":"internal/immutable/components/pages/_page.svelte-a64b655d.js"},{"revision":"7c7ffeb220ddbe939fa783b4eaea95c2","url":"internal/immutable/components/pages/adkey/_page.svelte-d1e505d3.js"},{"revision":"2f5db868bf25a87f780c40caf81baa96","url":"internal/immutable/components/pages/bnlist/_page.svelte-d6ebb757.js"},{"revision":"b8568bb5c1e5db5a827ef95138d00936","url":"internal/immutable/components/pages/install/_page.svelte-fe3da5fb.js"},{"revision":"d3c7f40341f961b0863c5fde0516828c","url":"internal/immutable/components/pages/privacy-policy/_page.svelte-153a5769.js"},{"revision":"368d7343335ddc0d99091ef4fbc6b07b","url":"internal/immutable/components/pages/screen/_page.svelte-324b92bb.js"},{"revision":"bd05860799d58266d9f9e0946a62c64c","url":"internal/immutable/components/pages/screen/chars/_page.svelte-9880e9f8.js"},{"revision":"e1eb1ff8e20c524274b660a79574ee1e","url":"internal/immutable/components/pages/screen/wishitem/_page.svelte-7506a047.js"},{"revision":"5392a9611428197493db8808baa49723","url":"internal/immutable/components/pages/screen/wishlist/_page.svelte-d01ff4bc.js"},{"revision":"bb21119a8f9a8941139a7a1e7bb4e73b","url":"internal/immutable/modules/pages/_layout.js-04cad6c0.js"},{"revision":"4fbe86f5fad55469ddf04b9fde5994ed","url":"internal/immutable/start-42d6b898.js"},{"revision":"a7fce8416038e33e3109cede0ca60166","url":"privacy-policy.html"},{"revision":"265cfc03c712e6a1f8a2824119ec1219","url":"screen.html"},{"revision":"b9744e1a6f5f9f8a24d68e445f1bdcf7","url":"screen/chars.html"},{"revision":"e1feaedc0473348072612dc0d0545f80","url":"screen/wishitem.html"},{"revision":"030e9c93dffb1684679c214914863e3e","url":"screen/wishlist.html"},{"revision":"8c963b2682677bc062bf302c70578a56","url":"./icons/icon-16x16.png"},{"revision":"2a64a39d90420e3be4ce3327f07cdb72","url":"./icons/icon-32x32.png"},{"revision":"4ead7560331331e4312bc253a979d2e7","url":"./icons/icon-72x72.png"},{"revision":"10ede533a31ab3ed07ad5e7bf718c5fd","url":"./icons/icon-96x96.png"},{"revision":"5a38603e311a289095450ec62f1f516d","url":"./icons/icon-128x128.png"},{"revision":"3fac8e1ae6fcb0db38ebe268a3812c40","url":"./icons/icon-144x144.png"},{"revision":"de4fc1e20e059eb961f1916873bed171","url":"./icons/icon-152x152.png"},{"revision":"4f5b19ddc351130a8bd37714cf5ac566","url":"./icons/icon-192x192.png"},{"revision":"e1c1b158f9777394ed646d875ef51692","url":"./icons/icon-256x256.png"},{"revision":"81070905639d4fd45c2d74a5cc7a41e5","url":"./icons/icon-384x384.png"},{"revision":"2220c3e385820520b7e291e385dbe9cb","url":"./icons/icon-512x512.png"},{"revision":"6a2f151959c4681c46fd35d06a2a3eb3","url":"appmanifest.json"}];I=[];fe(I,{ignoreURLParametersMatching:[/.*/]});g("/",new C({cacheName:`Static-${b}`}));g(new RegExp(".(?:/?pwa=true|/?pwasc)"),new C({cacheName:`Static-${b}`,plugins:[{cachedResponseWillBeUsed:({cachedResponse:a})=>a||caches.match("/"),cacheWillUpdate:()=>null}]}));g(({url:a,request:e})=>{const t=a.href.includes("sfx"),s=a.href.includes("/videos"),n=a.pathname.includes("/internal/immutable/assets"),c=a.pathname.includes("/icons"),r=a.href.match(/(\/transform\/|\/cb\/)/),i=n||c||r,l=(a.href.match(new RegExp(".(?:svg|webp|jpg|png|jpeg)"))||[]).length>0,p=(e.destination==="image"||l)&&i;return t||p||s},new de({cacheName:`Static-${b}`}));g(({url:a})=>(a.href.match(new RegExp(".(?:woff|woff2|ttf)$"))||[]).length>0,new C({cacheName:`Static-${b}`,plugins:[new O({statuses:[0,200]})]}));g(new RegExp(".(?:css|js|json)$"),new C({cacheName:"Chunks"}));g(({url:a})=>a.href.match("/js/image-cdn"),new C({cacheName:"Chunks",plugins:[new O({statuses:[0,200]})]})); 