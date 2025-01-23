"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[325],{9669:function(t,e,n){n.d(e,{Z:function(){return h}});var r=n(4051),a=n.n(r),o=n(9755),c=n.n(o),s=n(794);function i(t,e,n,r,a,o,c){try{var s=t[o](c),i=s.value}catch(u){return void n(u)}s.done?e(i):Promise.resolve(i).then(r,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function c(t){i(o,r,a,c,s,"next",t)}function s(t){i(o,r,a,c,s,"throw",t)}c(void 0)}))}}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}Math.pow(10,8);var d="https://api.nuls.io/",h=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.init=!1}var e,n,r;return e=t,(n=[{key:"initialize",value:function(){var t=this;return u(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=4,window.nabox.createSession();case 4:t.account=e.sent;case 5:return t.init=!0,e.abrupt("return",t);case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}},{key:"getAccount",value:function(){var t;return void 0!==this&&!0===this.init?null===(t=this.account)||void 0===t?void 0:t.toString():""}},{key:"approve",value:function(t,e){var n=this;return u(a().mark((function r(){var o,i;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s.Z.config({EXPONENTIAL_AT:1e9}),o=new s.Z("99999999999999999999999999999999999999999999999999999999999999999999999"),i={from:n.account.toString(),value:0,contractAddress:t.toString(),methodName:"approve",methodDesc:"(Address spender, BigInteger value) return boolean",args:[e.toString(),o.toString()]},r.next=5,window.nabox.contractCall(i).then((function(t){c()(".alertInfo").toggle(),c()("#appro"+e).addClass("greyBtn"),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>"),console.log(t)})).catch((function(t){console.log(t)}));case 5:r.sent;case 6:case"end":return r.stop()}}),r)})))()}},{key:"stake",value:function(t,e,n,r,o){var i=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return s.Z.config({EXPONENTIAL_AT:1e9}),new s.Z("99999999999999999999999999999999999999999999999999999999999999999999999"),r={from:i.account.toString(),value:.5,contractAddress:t.toString(),methodName:"stake",methodDesc:"(BigInteger amount) return void",args:[new s.Z(e).multipliedBy(Math.pow(10,8)).toString()]},n.next=5,window.nabox.contractCall(r).then((function(e){c()(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>"),c()(".alertInfo").toggle(),c()("#inputToStake"+t).val("")})).catch((function(t){c()(".errorInfo").toggle()}));case 5:n.sent;case 6:case"end":return n.stop()}}),n)})))()}},{key:"stakeWithCharge",value:function(t,e,n,r,o,i){var l=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return s.Z.config({EXPONENTIAL_AT:1e9}),new s.Z("99999999999999999999999999999999999999999999999999999999999999999999999"),r={from:l.account.toString(),value:i,contractAddress:t.toString(),methodName:"stake",methodDesc:"(BigInteger amount) return void",args:[new s.Z(e).multipliedBy(Math.pow(10,8)).toString()]},n.next=5,window.nabox.contractCall(r).then((function(e){c()(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>"),c()(".alertInfo").toggle(),c()("#inputToStake"+t).val("")})).catch((function(t){c()(".errorInfo").toggle()}));case 5:n.sent;case 6:case"end":return n.stop()}}),n)})))()}},{key:"stakeMulti",value:function(t,e,n,r,o,i,l){var d=this;return u(a().mark((function o(){var i;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s.Z.config({EXPONENTIAL_AT:1e9}),new s.Z("99999999999999999999999999999999999999999999999999999999999999999999999"),i={from:d.account.toString(),value:.5,contractAddress:t.toString(),methodName:"stake",methodDesc:"(BigInteger value) return BigInteger",args:[new s.Z(e).multipliedBy(Math.pow(10,18)).toString()],multyAssetValues:[[e,parseInt(n),parseInt(r)]]},a.next=5,window.nabox.contractCall(i).then((function(e){c()(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>"),c()(".alertInfo").toggle(),c()("#inputToStake"+t).val("")})).catch((function(t){c()(".errorInfo").toggle()}));case 5:a.sent;case 6:case"end":return a.stop()}}),o)})))()}},{key:"stakeMultiBNB",value:function(t,e,n,r,o,i,l){var d=this;return u(a().mark((function o(){var i;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s.Z.config({EXPONENTIAL_AT:1e9}),new s.Z("99999999999999999999999999999999999999999999999999999999999999999999999"),i={from:d.account.toString(),value:.5,contractAddress:t.toString(),methodName:"stake",methodDesc:"(BigInteger value) return BigInteger",args:[new s.Z(e).multipliedBy(Math.pow(10,18)).toString()],multyAssetValues:[[e,parseInt(n),parseInt(r)]]},a.next=5,window.nabox.contractCall(i).then((function(e){c()(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>"),c()(".alertInfo").toggle(),c()("#inputToStake"+t).val("")})).catch((function(t){c()(".errorInfo").toggle()}));case 5:a.sent;case 6:case"end":return a.stop()}}),o)})))()}},{key:"migrateNow",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"migrate",methodDesc:"() return void",args:[]},n.next=3,window.nabox.contractCall(r).then((function(t){})).catch((function(t){}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"compound",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:1,contractAddress:t.toString(),methodName:"compound",methodDesc:"() return void",args:[]},n.next=3,window.nabox.contractCall(r).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"compoundMulti",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:0,contractAddress:t.toString(),methodName:"compound",methodDesc:"() return void",args:[]},n.next=3,window.nabox.contractCall(r).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"getReward",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"getReward",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"getRewardSpecial",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:0,contractAddress:t.toString(),methodName:"getReward",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"getRewardWithCharge",value:function(t,e){var n=this;return u(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={from:n.account.toString(),value:e,contractAddress:t.toString(),methodName:"getReward",methodDesc:"() return BigInteger",args:[]},r.next=3,window.nabox.contractCall(o).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:r.sent;case 4:case"end":return r.stop()}}),r)})))()}},{key:"getRewardWithChargeOnly",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"getRewardFirstToken",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(e){document.getElementById("pClaimable"+t).innerHTML="0 WTF",c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+e+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"getRewardMulti",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"claim",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"getRewardMultiBNB",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"claim",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"exit",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:.5,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"exitSpecial",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={from:e.account.toString(),value:0,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"() return BigInteger",args:[]},n.next=3,window.nabox.contractCall(r).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:n.sent;case 4:case"end":return n.stop()}}),n)})))()}},{key:"withdraw",value:function(t,e){var n=this;return u(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={from:n.account.toString(),value:.5,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"(BigInteger val) return BigInteger",args:[new s.Z(e).toString()]},r.next=3,window.nabox.contractCall(o).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:r.sent;case 4:case"end":return r.stop()}}),r)})))()}},{key:"withdrawSpecial",value:function(t,e){var n=this;return u(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={from:n.account.toString(),value:0,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"(BigInteger val) return BigInteger",args:[new s.Z(e).toString()]},r.next=3,window.nabox.contractCall(o).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:r.sent;case 4:case"end":return r.stop()}}),r)})))()}},{key:"withdrawWithCharge",value:function(t,e,n){var r=this;return u(a().mark((function o(){var i;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return i={from:r.account.toString(),value:n,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"(BigInteger val) return BigInteger",args:[new s.Z(e).toString()]},a.next=3,window.nabox.contractCall(i).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:a.sent;case 4:case"end":return a.stop()}}),o)})))()}},{key:"notifyReward",value:function(t,e,n){var r=this;return u(a().mark((function o(){var c;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={from:r.account.toString(),value:0,contractAddress:t.toString(),methodName:"notifyReward",methodDesc:"(BigInteger value) return void",args:["9000000000000000000000000"],multyAssetValues:[[9e6,parseInt(e),parseInt(n)]]},a.next=3,window.nabox.contractCall(c).then((function(t){})).catch((function(t){}));case 3:a.sent;case 4:case"end":return a.stop()}}),o)})))()}},{key:"notify",value:function(t,e,n){var r=this;return u(a().mark((function o(){var c;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={from:r.account.toString(),value:0,contractAddress:t.toString(),methodName:"deposit",methodDesc:"(BigInteger value) return boolean",args:["10000000000000000000000000"],multyAssetValues:[[1e7,parseInt(e),parseInt(n)]]},a.next=3,window.nabox.contractCall(c).then((function(t){})).catch((function(t){}));case 3:a.sent;case 4:case"end":return a.stop()}}),o)})))()}},{key:"withdrawMulti",value:function(t,e,n){var r=this;return u(a().mark((function o(){var i,u,l;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:for(i=new s.Z(e).multipliedBy(1e4).toFixed(0).toString(),u=0;u<n-4;)i+="0",u+=1;return l={from:r.account.toString(),value:.5,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"(BigInteger value) return BigInteger",args:[i]},a.next=6,window.nabox.contractCall(l).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 6:a.sent;case 7:case"end":return a.stop()}}),o)})))()}},{key:"withdrawMultiBNB",value:function(t,e,n){var r=this;return u(a().mark((function o(){var i,u,l;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:for(i=new s.Z(e).multipliedBy(1e4).toFixed(0).toString(),u=0;u<n-4;)i+="0",u+=1;return l={from:r.account.toString(),value:.5,contractAddress:t.toString(),methodName:"withdraw",methodDesc:"(BigInteger value) return BigInteger",args:[i]},a.next=6,window.nabox.contractCall(l).then((function(t){c()(".alertInfo").toggle(),c()(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+t+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 6:a.sent;case 7:case"end":return a.stop()}}),o)})))()}},{key:"earned",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"earned",methodDesc:"(Address account) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"earnedN",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"earnedNuls",methodDesc:"(Address account) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"staked",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"_balanceOf",methodDesc:"(Address account) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"isMigratedV1",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"isMigrated",methodDesc:"(Address acc) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"getBoost",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"getCurrentUserTier",methodDesc:"(Address user) return int",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"getTimestampClaimUnlock",value:function(t,e){return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"releasePercentage",methodDesc:"(int batch) return BigInteger",args:[e.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"getTotalSupply",value:function(t){return u(a().mark((function e(){var n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={contractAddress:t.toString(),methodName:"totalSupply",methodDesc:"() return BigInteger",args:[]},e.next=3,window.nabox.invokeView(n);case 3:return r=e.sent,e.abrupt("return",r.result);case 5:case"end":return e.stop()}}),e)})))()}},{key:"getUserClaimed",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"getTokenBalance",methodDesc:"(Address owner) return BigDecimal",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,console.log(o.result),n.abrupt("return",o.result);case 6:case"end":return n.stop()}}),n)})))()}},{key:"getUserLockTime",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"getUserLockTime",methodDesc:"(Address user) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,console.log(o.result),n.abrupt("return",o.result);case 6:case"end":return n.stop()}}),n)})))()}},{key:"balanceOf",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"balanceOf",methodDesc:"(Address owner) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"getAllowance",value:function(t,e){var n=this;return u(a().mark((function r(){var o,c;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={contractAddress:t.toString(),methodName:"allowance",methodDesc:"(Address owner, Address spender) return BigInteger",args:[n.account.toString(),e]},r.next=3,window.nabox.invokeView(o);case 3:return c=r.sent,r.abrupt("return",c.result);case 5:case"end":return r.stop()}}),r)})))()}},{key:"tknBalanceOf",value:function(t){var e=this;return u(a().mark((function n(){var r,o;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={contractAddress:t.toString(),methodName:"balanceOf",methodDesc:"(Address owner) return BigInteger",args:[e.account.toString()]},n.next=3,window.nabox.invokeView(r);case 3:return o=n.sent,n.abrupt("return",o.result);case 5:case"end":return n.stop()}}),n)})))()}},{key:"bothReserves",value:function(t){return u(a().mark((function e(){var n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={contractAddress:t.toString(),methodName:"bothTokensReserve",methodDesc:"() return String",args:[]},e.next=3,window.nabox.invokeView(n);case 3:return r=e.sent,console.log(r.result+"1"),e.abrupt("return",r.result);case 6:case"end":return e.stop()}}),e)})))()}},{key:"isClaimed",value:function(t,e){var n=this;return u(a().mark((function r(){var o,c;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={contractAddress:t.toString(),methodName:"isClaimed",methodDesc:"(Address addr, int batch) return boolean",args:[n.account.toString(),e]},r.next=3,window.nabox.invokeView(o);case 3:return c=r.sent,r.abrupt("return",c.result);case 5:case"end":return r.stop()}}),r)})))()}},{key:"createAndUpdatePair",value:function(t){var e=this;return u(a().mark((function n(){var r;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:(r=new XMLHttpRequest).onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText);console.log(t)}},r.open("POST","https://api.bestdevteam.xyz/api/v1/userLiq",!0),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify({user:e.account.toString(),pair:t,lp:"",lpAmount:"100000000",amountTknA:"3894",amountTknB:"200"}));case 5:case"end":return n.stop()}}),n)})))()}},{key:"saleValid",value:function(t,e){var n=this;return u(a().mark((function e(){var r,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={contractAddress:t,methodName:"getEarned",methodDesc:"(Address earner) return BigInteger",args:[n.account.toString()]},e.next=3,window.nabox.invokeView(r);case 3:return o=e.sent,e.abrupt("return",o.result);case 5:case"end":return e.stop()}}),e)})))()}},{key:"claimBatch",value:function(t,e){var n=this;return u(a().mark((function r(){var o;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={from:n.account.toString(),value:0,contractAddress:t.toString(),methodName:"claimBatch",methodDesc:"(int batch) return boolean",args:[e]},r.next=3,window.nabox.contractCall(o).then((function(n){c()(".alertInfo").toggle(),localStorage.setItem("txHash",n),c()("#m"+e+t).css("background","#9ca3af"),c()(".alertInfo").html("<p>Tx Succeeded Submited</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+n+"' style='text-decoration:underline'>Check tx</a>")})).catch((function(t){c()(".errorInfo").toggle()}));case 3:r.sent;case 4:case"end":return r.stop()}}),r)})))()}},{key:"queryTransaction",value:function(t){return u(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=new XMLHttpRequest).onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText);console.log(t),1===t.data.status&&localStorage.setItem("txHash","")}},n.open("GET",d+"api/tx/"+t.toString(),!0),n.setRequestHeader("Content-Type","application/json"),n.send();case 5:case"end":return e.stop()}}),e)})))()}},{key:"multiBalance",value:function(t,e,n,r){var o=this;return u(a().mark((function c(){var i;return a().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:localStorage.setItem("t",t),(i=new XMLHttpRequest).onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText);console.log(t),document.getElementById("balm"+localStorage.getItem("t")).innerHTML=new s.Z(t.data.total).dividedBy(Math.pow(10,r)).toFixed(2).toString()}},i.open("POST",d+"api/accountledger/balance/"+o.account.toString(),!0),i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify({assetChainId:e,assetId:n}));case 6:case"end":return a.stop()}}),c)})))()}}])&&l(e.prototype,n),r&&l(e,r),t}()},7565:function(t,e,n){n.d(e,{Z:function(){return y}});var r=n(5893),a=n(7294),o=n(9008),c=n(6893),s=n(1190),i=n(6580),u=n(4051),l=n.n(u),d=n(1664),h=n(8193),f=n(5434),g=n(4447),p=n(9669),m=n(794);function v(t,e,n,r,a,o,c){try{var s=t[o](c),i=s.value}catch(u){return void n(u)}s.done?e(i):Promise.resolve(i).then(r,a)}function w(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function c(t){v(o,r,a,c,s,"next",t)}function s(t){v(o,r,a,c,s,"throw",t)}c(void 0)}))}}var x={closed:{transition:{duration:.2},opacity:0},open:{transition:{duration:.3},opacity:1}},k={closed:{transition:{staggerChildren:.3,staggerDirection:-1}},open:{transition:{staggerChildren:.3,staggerDirection:1}}},S=function(){var t=function(){c((function(t){return!t}))},e=(0,a.useState)(!1),n=(e[0],e[1],(0,a.useState)(!1)),o=n[0],c=n[1],u=(0,a.useState)(),v=u[0],S=u[1],y=(0,a.useState)(""),b=y[0],I=y[1],N=(0,a.useState)(""),C=N[0],T=N[1],A=(0,a.useState)(""),B=A[0],j=A[1],D=(0,a.useState)(new p.Z),E=D[0],L=D[1],Z=(0,a.useState)(""),_=Z[0],M=Z[1],V=(0,a.useState)(!0),R=(V[0],V[1]),W=(0,a.useState)(!0),H=(W[0],W[1]),O=(0,a.useState)(!0),F=(O[0],O[1]),U=(0,a.useState)(!0),P=(U[0],U[1]),q=(0,a.useState)(0),X=(q[0],q[1],(0,a.useState)(0)),z=(X[0],X[1]),J=function(){var t=w(l().mark((function t(){var e;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=L,t.next=3,E.initialize();case 3:t.t1=t.sent,(0,t.t0)(t.t1),e=E.getAccount(),M(e),j((null===(e=null!==e?e:"Wrong Address")||void 0===e?void 0:e.substring(0,8))+"..."+(null===e||void 0===e?void 0:e.substring(e.length-5)));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return J(),(0,a.useEffect)((function(){function t(){return(t=w(l().mark((function t(){var e,n,r;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.bothReserves("NULSd6HgnMqcZX3oRBWqDReUyD8BWCErCxawg");case 2:e=t.sent,n=e.split(","),r=new m.Z(n[0]).dividedBy(n[1]).toString(),T(r);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function e(){return(e=w(l().mark((function t(){var e,n,r;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.bothReserves("NULSd6Hgts1DifVoftWah8jvhf9qizektZVN5");case 2:e=t.sent,n=e.split(","),r=new m.Z(n[1]).dividedBy(n[0]).toString(),I(r);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function n(){return(n=w(l().mark((function t(){var e;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.saleValid("NULSd6HgrYbnW4EtD3ojDwxog5AMyez6v7jET");case 2:e=t.sent,R(e>0);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function r(){return(r=w(l().mark((function t(){var e;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.saleValid("NULSd6Hgp8g3jiyK6xrAxFU3PPnabRD9as6vK");case 2:e=t.sent,H(e>0);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function a(){return(a=w(l().mark((function t(){var e;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.saleValid("NULSd6HgoQSqtRnun8Qdoh9bkE3T9v2NiWAeB");case 2:e=t.sent,F(e>0);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function o(){return(o=w(l().mark((function t(){var e;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.saleValid("NULSd6HgoQSqtRnun8Qdoh9bkE3T9v2NiWAeB");case 2:e=t.sent,P(e>0);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function c(){return(c=w(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=z,t.next=3,E.saleValid("NULSd6HgyCB78LugX88yUrCrMNZt99FVrKj4H",_.toString());case 3:t.t1=t.sent,(0,t.t0)(t.t1);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}fetch("https://api.binance.com/api/v3/ticker/price?symbol=NULSUSDT").then((function(t){return t.json()})).then((function(t){return S(t.price)})),function(){t.apply(this,arguments)}(),function(){e.apply(this,arguments)}(),function(){n.apply(this,arguments)}(),function(){r.apply(this,arguments)}(),function(){a.apply(this,arguments)}(),function(){o.apply(this,arguments)}(),function(){c.apply(this,arguments)}()}),[]),(0,r.jsxs)("nav",{className:"flex w-full items-center justify-between bg-tekGreen py-3 px-10 font-semibold text-white",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,r.jsxs)("div",{children:[" ",(0,r.jsx)("img",{src:"/images/logos/WT.png",className:"imgMainLogo"})]}),(0,r.jsxs)("div",{className:"hidden items-center space-x-5 pl-20 md:flex",children:[(0,r.jsx)(d.default,{href:"/",children:(0,r.jsx)("button",{className:"font-semibold",children:"Stake"})}),(0,r.jsx)(d.default,{href:"/claim",children:(0,r.jsx)("button",{className:"font-semibold ",children:"Airdrop"})})]})]}),(0,r.jsxs)("div",{className:"hidden items-center space-x-14 md:flex",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-1",style:{},children:[(0,r.jsx)("img",{src:"/images/logos/nuls.png",className:"imgLogo"}),(0,r.jsxs)("p",{children:["$",parseFloat(v).toFixed(3)]})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,r.jsx)("img",{src:"/images/logos/nswap-circ.svg",className:"imgLogo"}),(0,r.jsxs)("p",{children:["$",new m.Z(C).multipliedBy(v).toFixed(4).toString()]})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,r.jsx)("img",{src:"/images/logos/Water_T-02.png",className:"imgLogo"}),(0,r.jsxs)("p",{id:"wtfPrice",children:["$",new m.Z(b).multipliedBy(C).multipliedBy(v).toFixed(5).toString()]})]}),(0,r.jsx)(g.Z,{children:(0,r.jsx)("button",{className:"font-semibold",children:B})})]}),(0,r.jsx)("div",{onClick:t,className:"flex items-center justify-center text-4xl md:hidden",children:(0,r.jsx)(i.E.button,{whileTap:{scale:.3},children:o?(0,r.jsx)(f.lTq,{}):(0,r.jsx)(h.qTj,{})})}),(0,r.jsx)(s.M,{children:o&&(0,r.jsx)(i.E.div,{className:"absolute left-0 top-0 bg-white/50",onClick:t,initial:{opacity:0},animate:{opacity:1,width:"100%",transition:{duration:0,damping:100}},exit:{width:1,transition:{duration:0}},children:(0,r.jsx)(i.E.div,{className:"relative left-0 top-0 z-50",initial:{width:0},animate:{width:300},exit:{width:1,transition:{duration:.3}},onClick:t,children:(0,r.jsx)(i.E.div,{className:"h-screen bg-tekGreen text-white",initial:"closed",animate:"open",exit:"closed",variants:k,onClick:t,children:(0,r.jsxs)(i.E.div,{className:"flex flex-col items-center space-y-5 py-10",variants:x,children:[(0,r.jsxs)("ul",{className:"flex flex-col space-y-3",children:[(0,r.jsx)("li",{children:(0,r.jsx)(d.default,{href:"/",children:(0,r.jsx)("a",{children:"Stake"})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d.default,{href:"/claim",children:(0,r.jsx)("a",{children:"Airdrop"})})})]}),(0,r.jsx)(g.Z,{children:(0,r.jsx)(d.default,{href:"https://app.nulswap.com/",children:(0,r.jsx)("button",{className:"font-semibold",children:"Buy $WTF"})})})]})})})})})]})},y=function(t){var e=t.children,n=t.title,u=void 0===n?"WaterTiger Finance":n,l=(0,a.useState)(0),d=l[0],h=l[1],f=function(){h(window.scrollY)};return(0,a.useEffect)((function(){return window.addEventListener("scroll",f),function(){return window.removeEventListener("scroll",f)}})),(0,r.jsxs)("div",{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:u}),(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,r.jsx)(S,{}),(0,r.jsx)("main",{children:e}),(0,r.jsx)(s.M,{children:d>10&&(0,r.jsx)(i.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:function(){window.scrollTo(0,0)},className:"cursor-pointer",children:(0,r.jsx)("a",{className:"fixed right-5 bottom-5 rounded-xl bg-tekGreen p-4 text-2xl font-bold text-white/75",children:(0,r.jsx)(c.OeJ,{})})})})]})}},4447:function(t,e,n){var r=n(5893);e.Z=function(t){var e=t.children;return(0,r.jsx)("div",{className:"w-full rounded bg-tekDark py-1.5 px-5 text-center text-base uppercase text-white transition-all hover:bg-gray-800",children:e})}},4189:function(t){t.exports=function(t){var e=t.src;return"/images/".concat(e)}}}]);