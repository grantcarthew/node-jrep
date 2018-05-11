'use strict';const symSplitOptions=Symbol('SplitOptions'),symOptions=Symbol('Options'),symTopString=Symbol('TopString'),symHeaders=Symbol('Headers'),symAddLogHeader=Symbol('AddLogHeader'),symAddLogFunction=Symbol('AddLogFunction'),dateTimeFunctions=Object.freeze({epoch(){return Date.now()},unix(){return Math.round(Date.now()/1e3)},iso(){return'"'+new Date().toISOString()+'"'}}),defaultOptions={levels:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},level:'info',levelKey:'level',levelNumberKey:'lvl',dateTimeKey:'time',dateTimeFunction:dateTimeFunctions.epoch,messageKey:'msg',dataKey:'data',write:defaultWriter()};function defaultWriter(){const a='undefined'!=typeof window&&'[object Window]'===Object.prototype.toString.call(window);return a?console.log:process.stdout.write.bind(process.stdout)}module.exports=Object.freeze({create(a){return new Perj(a)},dateTimeFunctions});class Perj{constructor(a){for(const b in this[symOptions]=Object.assign({},defaultOptions),this[symTopString]='',this[symSplitOptions](a),this[symHeaders]={},this[symOptions].levels)this[symAddLogHeader](b),this[symAddLogFunction](b)}get level(){return this[symOptions].level}set level(a){if(!this[symOptions].levels.hasOwnProperty(a))throw new Error('The level option must be a valid key in the levels object.');this[symOptions].level=a}get levels(){return this[symOptions].levels}addLevel(a){for(const b in a)this[b]||(this[symOptions].levels[b]=a[b],this[symAddLogHeader](b),this[symAddLogFunction](b))}get write(){return this[symOptions].write}[symSplitOptions](a){if(a)for(const b in a)if(defaultOptions.hasOwnProperty(b)){if('level'===b){this.level=a[b];continue}this[symOptions][b]=a[b]}else this[symTopString]+=',"'+b+'":'+stringify(a[b])}[symAddLogHeader](a){this[symHeaders][a]=`{"${this[symOptions].levelKey}":"${a}","${this[symOptions].levelNumberKey}":${this[symOptions].levels[a]}${this[symTopString]},"${this[symOptions].dateTimeKey}":`}[symAddLogFunction](a){this[a]=function(...b){if(!(this[symOptions].levels[this[symOptions].level]>this[symOptions].levels[a])){const c=stringifyLogItems(b),d=this[symHeaders][a]+this[symOptions].dateTimeFunction()+',"'+this[symOptions].messageKey+'":"'+c.msg+'","'+this[symOptions].dataKey+'":'+c.data+'}\n';this[symOptions].write(d)}}}child(a){if(!a)throw new Error('Provide top level arguments to create a child logger.');const b=Object.create(this);for(const c in a)defaultOptions.hasOwnProperty(c)||(b[symTopString]+=',"'+c+'":'+stringify(a[c]));for(const c in b.parent=this,this[symOptions].levels)b[symAddLogHeader](c);return b}stringify(a,b,c){this[symOptions].write(stringify(a,b,c))}json(a){this[symOptions].write(stringify(a,null,2))}}function stringifyLogItems(a){let b={msg:'',data:[]};for(const c of a){if('[object String]'===Object.prototype.toString.call(c)){b.msg?b.data.push(c):b.msg=c;continue}if(c instanceof Error){b.data.push(serializerr(c)),b.msg||(b.msg=c.message);continue}b.data.push(c)}return 1>b.data.length?b.data='':1===b.data.length&&(b.data=b.data[0]),b.data=stringify(b.data),b}const arr=[];function stringify(a,b,c){decirc(a,'',[],void 0);const d=JSON.stringify(a,b,c);for(;0!==arr.length;){const a=arr.pop();a[0][a[1]]=a[2]}return d}function decirc(a,b,c,d){let e;if('object'==typeof a&&null!==a){for(e=0;e<c.length;e++)if(c[e]===a)return d[b]='[Circular]',void arr.push([d,b,a]);if(c.push(a),Array.isArray(a))for(e=0;e<a.length;e++)decirc(a[e],e,c,a);else{const b=Object.keys(a);for(e=0;e<b.length;e++){const d=b[e];decirc(a[d],d,c,a)}}c.pop()}}function serializerr(a={}){const b=protochain(a).filter(a=>a!==Object.prototype);return[a].concat(b).map(a=>Object.getOwnPropertyNames(a)).reduce((b,c)=>(c.forEach(c=>{b[c]=a[c]}),b),{})}function protochain(a){const b=[];for(let c=getPrototypeOf(a);c;)b.push(c),c=getPrototypeOf(c);return b}function getPrototypeOf(a){return null==a?null:Object.getPrototypeOf(Object(a))}
