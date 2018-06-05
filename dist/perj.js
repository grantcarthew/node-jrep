!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.perj=t():e.perj=t()}("undefined"==typeof self?this:self,function(){return function(e){function t(i){if(s[i])return s[i].exports;var n=s[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var s={};return t.m=e,t.c=s,t.d=function(e,s,i){t.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,s){if(1&s&&(e=t(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var n in e)t.d(i,n,function(t){return e[t]}.bind(null,n));return i},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e){e.exports=Object.freeze({epoch:()=>Date.now(),unix:()=>Math.round(Date.now()/1e3),iso:()=>'"'+(new Date).toISOString()+'"'})},function(e,t,s){const i=s(0);e.exports={levels:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},level:"info",levelKey:"level",levelKeyEnabled:!0,levelNumberKey:"lvl",levelNumberKeyEnabled:!0,dateTimeKey:"time",dateTimeFunction:i.epoch,messageKey:"msg",dataKey:"data",separatorString:":",serializers:!1,stringifyFunction:!1,passThrough:!1,write:"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)?process.stdout.write.bind(process.stdout):console.log}},function(e){function t(e){return null==e?null:Object.getPrototypeOf(Object(e))}e.exports=function(e){const s=[];for(let i=t(e);i;)s.push(i),i=t(i);return s}},function(e,t,s){const i=s(2);e.exports=function(e={}){const t=i(e).filter(e=>e!==Object.prototype);return[e].concat(t).map(e=>Object.getOwnPropertyNames(e)).reduce((t,s)=>(s.forEach(s=>{t[s]=e[s]}),t),{})}},function(e){e.exports=function(e,s,i){!function e(s,i,n,o){let r;if("object"==typeof s&&null!==s){for(r=0;r<n.length;r++)if(n[r]===s)return o[i]="[Circular]",void t.push([o,i,s]);if(n.push(s),Array.isArray(s))for(r=0;r<s.length;r++)e(s[r],r,n,s);else{const t=Object.keys(s);for(r=0;r<t.length;r++){const i=t[r];e(s[i],i,n,s)}}n.pop()}}(e,"",[],void 0);const n=JSON.stringify(e,s,i);for(;0!==t.length;){const e=t.pop();e[0][e[1]]=e[2]}return n};const t=[]},function(e,t,s){const i=s(4),n=s(3),o=s(1),r=s(0),l=Symbol("SplitOptions"),h=Symbol("Options"),u=Symbol("Stringify"),c=Symbol("TopSnip"),f=Symbol("TopValues"),a=Symbol("TopIsPrimitive"),p=Symbol("HeaderStrings"),y=Symbol("HeaderValues"),d=Symbol("SetLevelHeader"),b=Symbol("SetLevelFunction");e.exports=Object.freeze({Perj:class{constructor(e){for(const t in this[h]=Object.assign({},o),this[u]=e&&e.stringifyFunction?e.stringifyFunction:i,this[c]="",this[f]={},this[a]=!0,this[l](e),this[p]={},this[y]={},this[h].levels)this[d](t),this[b](t)}get level(){return this[h].level}set level(e){if(!this[h].levels.hasOwnProperty(e))throw new Error("The level option must be a valid key in the levels object.");this.hasOwnProperty(h)||(this[h]=Object.assign({},this[h])),this[h].level=e}get levels(){return this[h].levels}addLevel(e){for(const t in e)this[t]||(this[h].levels[t]=e[t],this[d](t),this[b](t))}get write(){return this[h].write}[l](e){if(e)for(const t in e)if(o.hasOwnProperty(t)){if("level"===t){this.level=e[t];continue}this[h][t]=e[t]}else{const s=typeof e[t];"string"==s?(this[c]+='"'+t+'":"'+e[t]+'",',this[f][t]=e[t]):"number"==s||"boolean"==s?(this[c]+='"'+t+'":'+e[t]+",",this[f][t]=e[t]):"undefined"==s?(this[c]+='"'+t+'":null,',this[f][t]=null):(this[c]+='"'+t+'":'+this[u](e[t])+",",this[f][t]=e[t],this[a]=!1)}}[d](e){if(this[p][e]="{",this[h].levelKeyEnabled&&(this[p][e]+='"'+this[h].levelKey+'":"'+e+'",'),this[h].levelNumberKeyEnabled&&(this[p][e]+='"'+this[h].levelNumberKey+'":'+this[h].levels[e]+","),""!==this[c]&&(this[p][e]+=this[c]),this[p][e]+='"'+this[h].dateTimeKey+'":',this[h].passThrough){const t={};this[h].levelKeyEnabled&&(t[this[h].levelKey]=e),this[h].levelNumberKeyEnabled&&(t[this[h].levelNumberKey]=this[h].levels[e]),this[y][e]=Object.assign(t,this[f])}}[b](e){this[e]=function(...t){if(this[h].levels[this[h].level]>this[h].levels[e])return;const s=this[h].dateTimeFunction();let i="",o="",r='""';const l=e=>{if(!this[h].serializers)return e;if(null==e)return null;const t={};for(const s in e){let i=e[s];e.hasOwnProperty&&e.hasOwnProperty(s)&&this[h].serializers[s]&&(i=this[h].serializers[s](i)),void 0!==i&&(t[s]=i)}return t};if(1===t.length){const e=t[0];"string"==typeof e?(i=e,o=""):e instanceof Error?(i=e.message,o=n(e),r=this[u](o)):void 0===e?o=r=null:(o=l(e),r=this[u](o))}else if(1<t.length){o=[];for(const e of t){const t=typeof e;"string"!=t?"undefined"!=t?e instanceof Error?(o.push(n(e)),i||(i=e.message)):o.push(l(e)):o.push(null):i?o.push(e):i=e}1===o.length&&(o=o[0]),r=this[u](o)}const c=this[p][e]+s+',"'+this[h].messageKey+'":"'+i+'","'+this[h].dataKey+'":'+r+"}\n";if(this[h].passThrough){const t=Object.assign(this[y][e],{[this[h].dateTimeKey]:s,[this[h].messageKey]:i,[this[h].dataKey]:o});this[h].write(c,t)}else this[h].write(c)}}child(e){if(!e)throw new Error("Provide top level arguments to create a child logger.");const t=Object.create(this);if(this[a])for(const e in t[f]={},t[a]=!0,this[f])t[f][e]=this[f][e];else t[f]=Object.assign({},this[f]),t[a]=!1;for(const s in e){if(o.hasOwnProperty(s)||this[h].levelKey===s||this[h].levelNumberKey===s||this[h].dateTimeKey===s||this[h].messageKey===s||this[h].dataKey===s)continue;const i=typeof e[s];"string"==i&&this[f].hasOwnProperty(s)&&"string"==typeof this[f][s]?t[f][s]=this[f][s]+this[h].separatorString+e[s]:"undefined"==i?t[f][s]=null:(t[f][s]=e[s],"string"!=i&&"number"!=i&&"boolean"!=i&&(this[a]=!1))}for(const e in t[c]="",t[f])if(!t[a]||this[h].stringifyFunction)t[c]+='"'+e+'":'+this[u](t[f][e])+",";else{const s=typeof t[f][e];t[c]+="string"==s?'"'+e+'":"'+t[f][e]+'",':'"'+e+'":'+t[f][e]+","}for(const e in t.parent=this,t[p]={},t[y]={},this[h].levels)t[d](e);return t}stringify(e,t,s){return this[u](e,t,s)}json(e){console.log(this[u](e,null,2))}},dateTimeFunctions:r})}])});