import{watch as e,computed as n,reactive as r,getCurrentInstance as s,effectScope as t,onBeforeUnmount as i,onServerPrefetch as c}from"vue";import o,{cancelToken as u}from"caf";function a(n){return new Promise(r=>{const s=e(n,e=>{null!=e&&(r(e),s&&s())},{immediate:!0})})}function l(e,r){return r?function(e,r,s){return n(()=>e().filter(e=>e[r]))}(()=>e()._instances,r):n(()=>[])}function d(e){return n(()=>e().length)}function f(e){return n(()=>{const n=e();return n[n.length-1]})}function _(e){return n(()=>e()[0])}function p(e){return r(e)}function h(){const e={},n=new Promise((n,r)=>{e.resolve=n,e.reject=r});return e.promise=n,e}function g(e){let n="General";e._isDropping&&(n="Drop"),e._isEnqueuing&&(n="Enqueue"),e._isRestartable&&(n="Restartable"),e._isKeepingLatest&&(n="KeepLatest");let r=`${n} Task`;"General"!==n&&(r=`${r} with maxConcurrency ${e._maxConcurrency}`);const s=e._instances.map(e=>{let n;e.isSuccessful?n="🍏":e.isRunning||e.isEnqueued?n="🍊":(e.isError||e.isCanceled||e.isDropped)&&(n="🔴");const{status:r,value:s,error:t}=e;return{status:`${n} ${r}`,value:s,error:t}});console.log(`🚦 ${r}`),console.table(s)}function m(e){return"test"===process.env.NODE_ENV?Promise.resolve():new Promise(n=>setTimeout(n,e))}function E(e,n){return new e.CancelToken(e=>{n.pr.catch(n=>{"cancel"===n&&e()})})}function y(e){return b(function*(n,...r){return e(n,...r)})}function b(e,r={cancelOnUnmount:!0}){const c=s(),a=t(),g=p({_isRestartable:!1,_isDropping:!1,_isEnqueuing:!1,_isKeepingLatest:!1,_maxConcurrency:1,_hasConcurrency:n(()=>g._isRestartable||g._isDropping||g._isEnqueuing||g._isKeepingLatest),isIdle:n(()=>!g.isRunning),isRunning:n(()=>!!g._instances.find(e=>e.isRunning)),isError:n(()=>!(!g.last||!g.last.isError)),_instances:[],_successfulInstances:l(()=>g,"isSuccessful"),_runningInstances:l(()=>g,"isRunning"),_enqueuedInstances:l(()=>g,"isEnqueued"),_notDroppedInstances:l(()=>g,"isNotDropped"),_activeInstances:l(()=>g,"isActive"),performCount:d(()=>g._instances),last:f(()=>g._notDroppedInstances),lastSuccessful:f(()=>g._successfulInstances),firstEnqueued:_(()=>g._enqueuedInstances),cancelAll({force:e}={force:!1}){g._instances.forEach(n=>{try{(e||!n.isDropped&&!n.isFinished)&&n.cancel({force:e})}catch(e){if("cancel"!==e)throw e}})},perform(...r){const s={enqueue:!1,drop:!1};g._hasConcurrency&&(e=>e._runningInstances.length>=e._maxConcurrency)(g)&&(g._isDropping&&(s.drop=!0),g._isRestartable&&(e=>{const n=e._activeInstances[0];n&&n.cancel()})(g),g._isKeepingLatest&&(e=>{e._enqueuedInstances.forEach(e=>{e.isEnqueued=!1,e.isDropped=!0})})(g),(g._isEnqueuing||g._isKeepingLatest)&&(s.enqueue=!0));const t=()=>function(e){if(e._isEnqueuing||e._isKeepingLatest){const{firstEnqueued:n}=e;n&&n._run()}}(g),i=()=>function(e,r,s){const t={id:s.id,isDropped:!1,isEnqueued:!1,hasStarted:!1,isRunning:!1,isFinished:!1,isCanceling:!1,isCanceled:n(()=>i.isCanceling&&i.isFinished),isActive:n(()=>i.isRunning&&!i.isCanceling),isSuccessful:!1,isNotDropped:n(()=>!i.isDropped),isError:n(()=>!!i.error),status:n(()=>{const e=[[i.isRunning,"running"],[i.isEnqueued,"enqueued"],[i.isCanceled,"canceled"],[i.isCanceling,"canceling"],[i.isDropped,"dropped"],[i.isError,"error"],[i.isSuccessful,"success"]].find(([e])=>e);return e&&e[1]}),error:null,value:null,cancel({force:e}={force:!1}){if(e||(i.isCanceling=!0,i.isEnqueued&&(i.isFinished=!0),i.isEnqueued=!1),i.token&&i._canAbort){i.token.abort("cancel");try{i.token.discard()}catch(e){}i.token=void 0,i._canAbort=!1}},canceledOn:e=>(e.pr.catch(e=>{i.cancel()}),i),_run(){!function(e,n,r,s){const t=new u,i=o(n,t);function c(){e.isRunning=!1,e.isFinished=!0}e.token=t,e.hasStarted=!0,e.isRunning=!0,e.isEnqueued=!1,i.call(e,t,...r).then(n=>{e.value=n,e.isSuccessful=!0,c(),e._deferredObject.resolve(n),e._canAbort=!1,s.onFinish(e)}).catch(n=>{"cancel"!==n&&(e.error=n),c(),e._shouldThrow&&e._deferredObject.reject(n),s.onFinish(e)})}(i,e,r,s)},_handled:!0,_deferredObject:h(),_shouldThrow:!1,_canAbort:!0,then:(e,n)=>(i._shouldThrow=!0,i._deferredObject.promise.then(e,n)),catch:(e,n=!0)=>(i._shouldThrow=n,i._deferredObject.promise.catch(e)),finally:e=>(i._shouldThrow=!0,i._deferredObject.promise.finally(e))},i=p(t),{modifiers:c}=s;return c.drop?i.isDropped=!0:c.enqueue?i.isEnqueued=!0:i._run(),i}(e,r,{modifiers:s,onFinish:t,scope:a,id:g._instances.length+1}),c=a.active?a.run(i):i();return a.active||console.warn("Task instance has been created in inactive scope. Perhaps youre creating task out of setup?"),g._instances=[...g._instances,c],c},clear(){this.cancelAll({force:!0}),this._instances=[]},destroy(){a.stop(),this.clear()},restartable:()=>(g._resetModifierFlags(),g._isRestartable=!0,g),drop:()=>(g._resetModifierFlags(),g._isDropping=!0,g),enqueue:()=>(g._resetModifierFlags(),g._isEnqueuing=!0,g),keepLatest:()=>(g._resetModifierFlags(),g._isKeepingLatest=!0,g),_resetModifierFlags(){g._isKeepingLatest=!1,g._isRestartable=!1,g._isEnqueuing=!1,g._isDropping=!1},maxConcurrency:e=>(g._maxConcurrency=e,g)});return c&&r.cancelOnUnmount&&i(()=>{g._instances&&g.destroy()}),g}function v(e,...n){return b(function*(r,...s){let t=yield e.perform(...s).canceledOn(r);for(let e of n)t=yield e.perform(t).canceledOn(r);return t})}function q(...e){return b(function*(n,...r){const s=e.map(e=>e.perform(...r).canceledOn(n));return yield Promise.all(s)})}function C(...e){return b(function*(n,...r){const s=[];for(let t of e)s.push(yield t.perform(...r).canceledOn(n));return s})}const w=()=>"undefined"==typeof window;function O(e){e._deferredObject.promise=e.isError?Promise.reject(e.error):Promise.resolve(e.value),e.cancel=()=>{},e.canceledOn=()=>e,e._run=()=>{},e.then=(...n)=>e._deferredObject.promise.then(...n),e.catch=(...n)=>e._deferredObject.promise.catch(...n),e.finally=(...n)=>e._deferredObject.promise.finally(...n)}function R(e,n){if(w()){const r=n.perform();return c(async()=>{try{await r,D(e,n)}catch(e){}}),r}const[r]=j(e,n).reverse();return r||n.perform()}function D(e,r){const{$root:t}=s(),i=t&&t.context&&t.context.nuxtState;if(!i)throw new Error("Could not access $root.context.nuxtState");i.vueConcurrency||(i.vueConcurrency={}),i.vueConcurrency[e]=n(()=>({instances:r._instances}))}function j(e,n){const r=function(e){if(!F())throw Error("Could not access  window.__NUXT__");return F().vueConcurrency[e].value}(e);return r&&(n._instances=r.instances||[],n._instances.forEach(O),function(e){delete F().vueConcurrency[e]}(e)),n._instances}function F(){return window.__NUXT__}function I(e,n){w()?D(e,n):j(e,n)}function x(){return x=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},x.apply(this,arguments)}function T(e){const s=Object.values(e),t=r(x({isRunning:n(()=>!!s.find(e=>e.isRunning)),isIdle:n(()=>!t.isRunning),isError:n(()=>!!s.find(e=>e.isError))},e));return t}export{E as getCancelToken,g as printTask,m as timeout,y as useAsyncTask,q as useParallelTask,v as usePipeTask,I as useSSRPersistance,C as useSequentialTask,b as useTask,T as useTaskGroup,R as useTaskPrefetch,a as waitForValue};
//# sourceMappingURL=index.modern.js.map
