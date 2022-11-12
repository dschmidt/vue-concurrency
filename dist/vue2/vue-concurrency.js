var n,e=require("vue"),r=(n=require("caf"))&&"object"==typeof n&&"default"in n?n.default:n;function t(){return(t=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n}).apply(this,arguments)}function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var r=0,t=new Array(e);r<e;r++)t[r]=n[r];return t}function i(n){var e=0;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,e){if(n){if("string"==typeof n)return u(n,void 0);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(n,void 0):void 0}}(n)))return function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(e=n[Symbol.iterator]()).next.bind(e)}var c=function(n){return n._runningInstances.length>=n._maxConcurrency},o=function(n){var e=n._activeInstances[0];e&&e.cancel()},s=function(n){n._enqueuedInstances.forEach(function(n){n.isEnqueued=!1,n.isDropped=!0})};function a(n,r){return r?function(n,r,t){return e.computed(function(){return n().filter(function(n){return n[r]})})}(function(){return n()._instances},r):e.computed(function(){return[]})}function f(n){return e.computed(function(){return n().length})}function l(n){return e.computed(function(){var e=n();return e[e.length-1]})}function p(n){return e.computed(function(){return n()[0]})}function d(n){return e.reactive(n)}function _(n,t,u){var i,c,o=d({id:u.id,isDropped:!1,isEnqueued:!1,hasStarted:!1,isRunning:!1,isFinished:!1,isCanceling:!1,isCanceled:e.computed(function(){return o.isCanceling&&o.isFinished}),isActive:e.computed(function(){return o.isRunning&&!o.isCanceling}),isSuccessful:!1,isNotDropped:e.computed(function(){return!o.isDropped}),isError:e.computed(function(){return!!o.error}),status:e.computed(function(){var n=[[o.isRunning,"running"],[o.isEnqueued,"enqueued"],[o.isCanceled,"canceled"],[o.isCanceling,"canceling"],[o.isDropped,"dropped"],[o.isError,"error"],[o.isSuccessful,"success"]].find(function(n){return n[0]});return n&&n[1]}),error:null,value:null,cancel:function(n){if((void 0===n?{force:!1}:n).force||(o.isCanceling=!0,o.isEnqueued&&(o.isFinished=!0),o.isEnqueued=!1),o.token&&o._canAbort){o.token.abort("cancel");try{o.token.discard()}catch(n){}o.token=void 0,o._canAbort=!1}},canceledOn:function(n){return n.pr.catch(function(n){o.cancel()}),o},_run:function(){!function(n,e,t,u){var i=new r.cancelToken,c=r(e,i);function o(){n.isRunning=!1,n.isFinished=!0}n.token=i,n.hasStarted=!0,n.isRunning=!0,n.isEnqueued=!1,c.call.apply(c,[n,i].concat(t)).then(function(e){n.value=e,n.isSuccessful=!0,o(),n._deferredObject.resolve(e),n._canAbort=!1,u.onFinish(n)}).catch(function(e){"cancel"!==e&&(n.error=e),o(),n._shouldThrow&&n._deferredObject.reject(e),u.onFinish(n)})}(o,n,t,u)},_handled:!0,_deferredObject:(i={},c=new Promise(function(n,e){i.resolve=n,i.reject=e}),i.promise=c,i),_shouldThrow:!1,_canAbort:!0,then:function(n,e){return o._shouldThrow=!0,o._deferredObject.promise.then(n,e)},catch:function(n,e){return void 0===e&&(e=!0),o._shouldThrow=e,o._deferredObject.promise.catch(n)},finally:function(n){return o._shouldThrow=!0,o._deferredObject.promise.finally(n)}}),s=u.modifiers;return s.drop?o.isDropped=!0:s.enqueue?o.isEnqueued=!0:o._run(),o}function v(n,r){void 0===r&&(r={cancelOnUnmount:!0});var t=e.getCurrentInstance(),u=d({_scope:e.effectScope(),_isRestartable:!1,_isDropping:!1,_isEnqueuing:!1,_isKeepingLatest:!1,_maxConcurrency:1,_hasConcurrency:e.computed(function(){return u._isRestartable||u._isDropping||u._isEnqueuing||u._isKeepingLatest}),isIdle:e.computed(function(){return!u.isRunning}),isRunning:e.computed(function(){return!!u._instances.find(function(n){return n.isRunning})}),isError:e.computed(function(){return!(!u.last||!u.last.isError)}),_instances:[],_successfulInstances:a(function(){return u},"isSuccessful"),_runningInstances:a(function(){return u},"isRunning"),_enqueuedInstances:a(function(){return u},"isEnqueued"),_notDroppedInstances:a(function(){return u},"isNotDropped"),_activeInstances:a(function(){return u},"isActive"),performCount:f(function(){return u._instances}),last:l(function(){return u._notDroppedInstances}),lastSuccessful:l(function(){return u._successfulInstances}),firstEnqueued:p(function(){return u._enqueuedInstances}),cancelAll:function(n){var e=(void 0===n?{force:!1}:n).force;u._instances.forEach(function(n){try{(e||!n.isDropped&&!n.isFinished)&&n.cancel({force:e})}catch(n){if("cancel"!==n)throw n}})},perform:function(){var e=arguments,r={enqueue:!1,drop:!1};u._hasConcurrency&&c(u)&&(u._isDropping&&(r.drop=!0),u._isRestartable&&o(u),u._isKeepingLatest&&s(u),(u._isEnqueuing||u._isKeepingLatest)&&(r.enqueue=!0));var t=function(){return m(u)},i=u._scope.run(function(){return _(n,[].slice.call(e),{modifiers:r,onFinish:t,scope:u._scope,id:u._instances.length+1})});if(!i)throw new Error("Failed to create new task instance due inactive scope. Perhaps you are trying to run a task bound to destroyed component?");return u._instances=[].concat(u._instances,[i]),i},clear:function(){this.cancelAll({force:!0}),this._instances=[]},destroy:function(){this._scope.stop(),this.clear()},restartable:function(){return u._resetModifierFlags(),u._isRestartable=!0,u},drop:function(){return u._resetModifierFlags(),u._isDropping=!0,u},enqueue:function(){return u._resetModifierFlags(),u._isEnqueuing=!0,u},keepLatest:function(){return u._resetModifierFlags(),u._isKeepingLatest=!0,u},_resetModifierFlags:function(){u._isKeepingLatest=!1,u._isRestartable=!1,u._isEnqueuing=!1,u._isDropping=!1},maxConcurrency:function(n){return u._maxConcurrency=n,u}});return t&&r.cancelOnUnmount&&e.onBeforeUnmount(function(){u._instances&&u.destroy()}),u}function m(n){if(n._isEnqueuing||n._isKeepingLatest){var e=n.firstEnqueued;e&&e._run()}}var h=function(){return"undefined"==typeof window};function g(n){n._deferredObject.promise=n.isError?Promise.reject(n.error):Promise.resolve(n.value),n.cancel=function(){},n.canceledOn=function(){return n},n._run=function(){},n.then=function(){var e;return(e=n._deferredObject.promise).then.apply(e,[].slice.call(arguments))},n.catch=function(){var e;return(e=n._deferredObject.promise).catch.apply(e,[].slice.call(arguments))},n.finally=function(){var e;return(e=n._deferredObject.promise).finally.apply(e,[].slice.call(arguments))}}function y(n,r){var t=e.getCurrentInstance().$root,u=t&&t.context&&t.context.nuxtState;if(!u)throw new Error("Could not access $root.context.nuxtState");u.vueConcurrency||(u.vueConcurrency={}),u.vueConcurrency[n]=e.computed(function(){return{instances:r._instances}})}function b(n,e){var r=function(n){if(!w())throw Error("Could not access  window.__NUXT__");return w().vueConcurrency[n].value}(n);return r&&(e._instances=r.instances||[],e._instances.forEach(g),function(n){delete w().vueConcurrency[n]}(n)),e._instances}function w(){return window.__NUXT__}exports.getCancelToken=function(n,e){return new n.CancelToken(function(n){e.pr.catch(function(e){"cancel"===e&&n()})})},exports.printTask=function(n){var e="General";n._isDropping&&(e="Drop"),n._isEnqueuing&&(e="Enqueue"),n._isRestartable&&(e="Restartable"),n._isKeepingLatest&&(e="KeepLatest");var r=e+" Task";"General"!==e&&(r=r+" with maxConcurrency "+n._maxConcurrency);var t=n._instances.map(function(n){var e;return n.isSuccessful?e="🍏":n.isRunning||n.isEnqueued?e="🍊":(n.isError||n.isCanceled||n.isDropped)&&(e="🔴"),{status:e+" "+n.status,value:n.value,error:n.error}});console.log("🚦 "+r),console.table(t)},exports.timeout=function(n){return"test"===process.env.NODE_ENV?Promise.resolve():new Promise(function(e){return setTimeout(e,n)})},exports.useAsyncTask=function(n){return v(regeneratorRuntime.mark(function e(r){var t=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.apply(void 0,[r].concat([].slice.call(t,1))));case 1:case"end":return e.stop()}},e)}))},exports.useParallelTask=function(){return v(regeneratorRuntime.mark(function n(e){var r,t=arguments,u=arguments;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=[].slice.call(u).map(function(n){return n.perform.apply(n,[].slice.call(t,1)).canceledOn(e)}),n.next=3,Promise.all(r);case 3:return n.abrupt("return",n.sent);case 5:case"end":return n.stop()}},n)}))},exports.usePipeTask=function(n){return v(regeneratorRuntime.mark(function e(r){var t,u,c,o,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.perform.apply(n,[].slice.call(s,1)).canceledOn(r);case 2:t=e.sent,u=i([].slice.call(s,1));case 4:if((c=u()).done){e.next=11;break}return o=c.value,e.next=8,o.perform(t).canceledOn(r);case 8:t=e.sent;case 9:e.next=4;break;case 11:return e.abrupt("return",t);case 12:case"end":return e.stop()}},e)}))},exports.useSSRPersistance=function(n,e){h()?y(n,e):b(n,e)},exports.useSequentialTask=function(){return v(regeneratorRuntime.mark(function n(e){var r,t,u,c,o=arguments;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:r=[],t=i([].slice.call(o));case 2:if((u=t()).done){n.next=11;break}return c=u.value,n.t0=r,n.next=7,c.perform.apply(c,[].slice.call(o,1)).canceledOn(e);case 7:n.t1=n.sent,n.t0.push.call(n.t0,n.t1);case 9:n.next=2;break;case 11:return n.abrupt("return",r);case 12:case"end":return n.stop()}},n)}))},exports.useTask=v,exports.useTaskGroup=function(n){var r=Object.values(n),u=e.reactive(t({isRunning:e.computed(function(){return!!r.find(function(n){return n.isRunning})}),isIdle:e.computed(function(){return!u.isRunning}),isError:e.computed(function(){return!!r.find(function(n){return n.isError})})},n));return u},exports.useTaskPrefetch=function(n,r){if(h()){var t=r.perform();return e.onServerPrefetch(function(){try{var e=function(e,u){try{var i=Promise.resolve(t).then(function(){y(n,r)})}catch(n){return}return i&&i.then?i.then(void 0,function(){}):i}();return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(n){return Promise.reject(n)}}),t}return b(n,r).reverse()[0]||r.perform()},exports.waitForValue=function(n){return new Promise(function(r){var t=e.watch(n,function(n){null!=n&&(r(n),t&&t())},{immediate:!0})})};
//# sourceMappingURL=vue-concurrency.js.map
