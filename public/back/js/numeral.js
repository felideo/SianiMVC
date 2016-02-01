!function(e,r){"function"==typeof define&&define.amd?define(r):"object"==typeof module&&module.exports?module.exports=r():e.numeral=r()}(this,function(){function e(e,r){this._input=e,this._value=r}var r,t,n="2.0.6",i={},o={},a={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},l={currentLocale:a.currentLocale,zeroFormat:a.zeroFormat,nullFormat:a.nullFormat,defaultFormat:a.defaultFormat,scalePercentBy100:a.scalePercentBy100};return r=function(n){var o,a,u,s;if(r.isNumeral(n))o=n.value();else if(0===n||"undefined"==typeof n)o=0;else if(null===n||t.isNaN(n))o=null;else if("string"==typeof n)if(l.zeroFormat&&n===l.zeroFormat)o=0;else if(l.nullFormat&&n===l.nullFormat||!n.replace(/[^0-9]+/g,"").length)o=null;else{for(a in i)if(s="function"==typeof i[a].regexps.unformat?i[a].regexps.unformat():i[a].regexps.unformat,s&&n.match(s)){u=i[a].unformat;break}u=u||r._.stringToNumber,o=u(n)}else o=Number(n)||null;return new e(n,o)},r.version=n,r.isNumeral=function(r){return r instanceof e},r._=t={numberToFormat:function(e,t,n){var i,a,l,u,s,c,f,m=o[r.options.currentLocale],h=!1,d=!1,b=0,p="",g=1e12,v=1e9,_=1e6,y=1e3,F="",x=!1;if(e=e||0,a=Math.abs(e),r._.includes(t,"(")?(h=!0,t=t.replace(/[\(|\)]/g,"")):(r._.includes(t,"+")||r._.includes(t,"-"))&&(s=r._.includes(t,"+")?t.indexOf("+"):e<0?t.indexOf("-"):-1,t=t.replace(/[\+|\-]/g,"")),r._.includes(t,"a")&&(i=t.match(/a(k|m|b|t)?/),i=!!i&&i[1],r._.includes(t," a")&&(p=" "),t=t.replace(new RegExp(p+"a[kmbt]?"),""),a>=g&&!i||"t"===i?(p+=m.abbreviations.trillion,e/=g):a<g&&a>=v&&!i||"b"===i?(p+=m.abbreviations.billion,e/=v):a<v&&a>=_&&!i||"m"===i?(p+=m.abbreviations.million,e/=_):(a<_&&a>=y&&!i||"k"===i)&&(p+=m.abbreviations.thousand,e/=y)),r._.includes(t,"[.]")&&(d=!0,t=t.replace("[.]",".")),l=e.toString().split(".")[0],u=t.split(".")[1],c=t.indexOf(","),b=(t.split(".")[0].split(",")[0].match(/0/g)||[]).length,u?(r._.includes(u,"[")?(u=u.replace("]",""),u=u.split("["),F=r._.toFixed(e,u[0].length+u[1].length,n,u[1].length)):F=r._.toFixed(e,u.length,n),l=F.split(".")[0],F=r._.includes(F,".")?m.delimiters.decimal+F.split(".")[1]:"",d&&0===Number(F.slice(1))&&(F="")):l=r._.toFixed(e,0,n),p&&!i&&Number(l)>=1e3&&p!==m.abbreviations.trillion)switch(l=String(Number(l)/1e3),p){case m.abbreviations.thousand:p=m.abbreviations.million;break;case m.abbreviations.million:p=m.abbreviations.billion;break;case m.abbreviations.billion:p=m.abbreviations.trillion}if(r._.includes(l,"-")&&(l=l.slice(1),x=!0),l.length<b)for(var w=b-l.length;w>0;w--)l="0"+l;return c>-1&&(l=l.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+m.delimiters.thousands)),0===t.indexOf(".")&&(l=""),f=l+F+(p?p:""),h?f=(h&&x?"(":"")+f+(h&&x?")":""):s>=0?f=0===s?(x?"-":"+")+f:f+(x?"-":"+"):x&&(f="-"+f),f},stringToNumber:function(e){var r,t,n,i=o[l.currentLocale],a=e,u={thousand:3,million:6,billion:9,trillion:12};if(l.zeroFormat&&e===l.zeroFormat)t=0;else if(l.nullFormat&&e===l.nullFormat||!e.replace(/[^0-9]+/g,"").length)t=null;else{t=1,"."!==i.delimiters.decimal&&(e=e.replace(/\./g,"").replace(i.delimiters.decimal,"."));for(r in u)if(n=new RegExp("[^a-zA-Z]"+i.abbreviations[r]+"(?:\\)|(\\"+i.currency.symbol+")?(?:\\))?)?$"),a.match(n)){t*=Math.pow(10,u[r]);break}t*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),t*=Number(e)}return t},isNaN:function(e){return"number"==typeof e&&isNaN(e)},includes:function(e,r){return e.indexOf(r)!==-1},insert:function(e,r,t){return e.slice(0,t)+r+e.slice(t)},reduce:function(e,r){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof r)throw new TypeError(r+" is not a function");var t,n=Object(e),i=n.length>>>0,o=0;if(3===arguments.length)t=arguments[2];else{for(;o<i&&!(o in n);)o++;if(o>=i)throw new TypeError("Reduce of empty array with no initial value");t=n[o++]}for(;o<i;o++)o in n&&(t=r(t,n[o],o,n));return t},multiplier:function(e){var r=e.toString().split(".");return r.length<2?1:Math.pow(10,r[1].length)},correctionFactor:function(){var e=Array.prototype.slice.call(arguments);return e.reduce(function(e,r){var n=t.multiplier(r);return e>n?e:n},1)},toFixed:function(e,r,t,n){var i,o,a,l,u=e.toString().split("."),s=r-(n||0);return i=2===u.length?Math.min(Math.max(u[1].length,s),r):s,a=Math.pow(10,i),l=(t(e+"e+"+i)/a).toFixed(i),n>r-i&&(o=new RegExp("\\.?0{1,"+(n-(r-i))+"}$"),l=l.replace(o,"")),l}},r.options=l,r.formats=i,r.locales=o,r.locale=function(e){return e&&(l.currentLocale=e.toLowerCase()),l.currentLocale},r.localeData=function(e){if(!e)return o[l.currentLocale];if(e=e.toLowerCase(),!o[e])throw new Error("Unknown locale : "+e);return o[e]},r.reset=function(){for(var e in a)l[e]=a[e]},r.zeroFormat=function(e){l.zeroFormat="string"==typeof e?e:null},r.nullFormat=function(e){l.nullFormat="string"==typeof e?e:null},r.defaultFormat=function(e){l.defaultFormat="string"==typeof e?e:"0.0"},r.register=function(e,r,t){if(r=r.toLowerCase(),this[e+"s"][r])throw new TypeError(r+" "+e+" already registered.");return this[e+"s"][r]=t,t},r.validate=function(e,t){var n,i,o,a,l,u,s,c;if("string"!=typeof e&&(e+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",e)),e=e.trim(),e.match(/^\d+$/))return!0;if(""===e)return!1;try{s=r.localeData(t)}catch(f){s=r.localeData(r.locale())}return o=s.currency.symbol,l=s.abbreviations,n=s.delimiters.decimal,i="."===s.delimiters.thousands?"\\.":s.delimiters.thousands,c=e.match(/^[^\d]+/),(null===c||(e=e.substr(1),c[0]===o))&&(c=e.match(/[^\d]+$/),(null===c||(e=e.slice(0,-1),c[0]===l.thousand||c[0]===l.million||c[0]===l.billion||c[0]===l.trillion))&&(u=new RegExp(i+"{2}"),!e.match(/[^\d.,]/g)&&(a=e.split(n),!(a.length>2)&&(a.length<2?!!a[0].match(/^\d+.*\d$/)&&!a[0].match(u):1===a[0].length?!!a[0].match(/^\d+$/)&&!a[0].match(u)&&!!a[1].match(/^\d+$/):!!a[0].match(/^\d+.*\d$/)&&!a[0].match(u)&&!!a[1].match(/^\d+$/)))))},r.fn=e.prototype={clone:function(){return r(this)},format:function(e,t){var n,o,a,u=this._value,s=e||l.defaultFormat;if(t=t||Math.round,0===u&&null!==l.zeroFormat)o=l.zeroFormat;else if(null===u&&null!==l.nullFormat)o=l.nullFormat;else{for(n in i)if(s.match(i[n].regexps.format)){a=i[n].format;break}a=a||r._.numberToFormat,o=a(u,s,t)}return o},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){function r(e,r,t,i){return e+Math.round(n*r)}var n=t.correctionFactor.call(null,this._value,e);return this._value=t.reduce([this._value,e],r,0)/n,this},subtract:function(e){function r(e,r,t,i){return e-Math.round(n*r)}var n=t.correctionFactor.call(null,this._value,e);return this._value=t.reduce([e],r,Math.round(this._value*n))/n,this},multiply:function(e){function r(e,r,n,i){var o=t.correctionFactor(e,r);return Math.round(e*o)*Math.round(r*o)/Math.round(o*o)}return this._value=t.reduce([this._value,e],r,1),this},divide:function(e){function r(e,r,n,i){var o=t.correctionFactor(e,r);return Math.round(e*o)/Math.round(r*o)}return this._value=t.reduce([this._value,e],r),this},difference:function(e){return Math.abs(r(this._value).subtract(e).value())}},r.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var r=e%10;return 1===~~(e%100/10)?"th":1===r?"st":2===r?"nd":3===r?"rd":"th"},currency:{symbol:"$"}}),function(){r.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(e,t,n){var i,o=r._.includes(t," BPS")?" ":"";return e=1e4*e,t=t.replace(/\s?BPS/,""),i=r._.numberToFormat(e,t,n),r._.includes(i,")")?(i=i.split(""),i.splice(-1,0,o+"BPS"),i=i.join("")):i=i+o+"BPS",i},unformat:function(e){return+(1e-4*r._.stringToNumber(e)).toFixed(15)}})}(),function(){var e={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},t={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},n=e.suffixes.concat(t.suffixes.filter(function(r){return e.suffixes.indexOf(r)<0})),i=n.join("|");i="("+i.replace("B","B(?!PS)")+")",r.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(i)},format:function(n,i,o){var a,l,u,s,c=r._.includes(i,"ib")?t:e,f=r._.includes(i," b")||r._.includes(i," ib")?" ":"";for(i=i.replace(/\s?i?b/,""),l=0;l<=c.suffixes.length;l++)if(u=Math.pow(c.base,l),s=Math.pow(c.base,l+1),null===n||0===n||n>=u&&n<s){f+=c.suffixes[l],u>0&&(n/=u);break}return a=r._.numberToFormat(n,i,o),a+f},unformat:function(n){var i,o,a=r._.stringToNumber(n);if(a){for(i=e.suffixes.length-1;i>=0;i--){if(r._.includes(n,e.suffixes[i])){o=Math.pow(e.base,i);break}if(r._.includes(n,t.suffixes[i])){o=Math.pow(t.base,i);break}}a*=o||1}return a}})}(),function(){r.register("format","currency",{regexps:{format:/(\$)/},format:function(e,t,n){var i,o,a,l=r.locales[r.options.currentLocale],u={before:t.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:t.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(t=t.replace(/\s?\$\s?/,""),i=r._.numberToFormat(e,t,n),e>=0?(u.before=u.before.replace(/[\-\(]/,""),u.after=u.after.replace(/[\-\)]/,"")):e<0&&!r._.includes(u.before,"-")&&!r._.includes(u.before,"(")&&(u.before="-"+u.before),a=0;a<u.before.length;a++)switch(o=u.before[a]){case"$":i=r._.insert(i,l.currency.symbol,a);break;case" ":i=r._.insert(i," ",a+l.currency.symbol.length-1)}for(a=u.after.length-1;a>=0;a--)switch(o=u.after[a]){case"$":i=a===u.after.length-1?i+l.currency.symbol:r._.insert(i,l.currency.symbol,-(u.after.length-(1+a)));break;case" ":i=a===u.after.length-1?i+" ":r._.insert(i," ",-(u.after.length-(1+a)+l.currency.symbol.length-1))}return i}})}(),function(){r.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(e,t,n){var i,o="number"!=typeof e||r._.isNaN(e)?"0e+0":e.toExponential(),a=o.split("e");return t=t.replace(/e[\+|\-]{1}0/,""),i=r._.numberToFormat(Number(a[0]),t,n),i+"e"+a[1]},unformat:function(e){function t(e,t,n,i){var o=r._.correctionFactor(e,t),a=e*o*(t*o)/(o*o);return a}var n=r._.includes(e,"e+")?e.split("e+"):e.split("e-"),i=Number(n[0]),o=Number(n[1]);return o=r._.includes(e,"e-")?o*=-1:o,r._.reduce([i,Math.pow(10,o)],t,1)}})}(),function(){r.register("format","ordinal",{regexps:{format:/(o)/},format:function(e,t,n){var i,o=r.locales[r.options.currentLocale],a=r._.includes(t," o")?" ":"";return t=t.replace(/\s?o/,""),a+=o.ordinal(e),i=r._.numberToFormat(e,t,n),i+a}})}(),function(){r.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(e,t,n){var i,o=r._.includes(t," %")?" ":"";return r.options.scalePercentBy100&&(e=100*e),t=t.replace(/\s?\%/,""),i=r._.numberToFormat(e,t,n),r._.includes(i,")")?(i=i.split(""),i.splice(-1,0,o+"%"),i=i.join("")):i=i+o+"%",i},unformat:function(e){var t=r._.stringToNumber(e);return r.options.scalePercentBy100?.01*t:t}})}(),function(){r.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,r,t){var n=Math.floor(e/60/60),i=Math.floor((e-60*n*60)/60),o=Math.round(e-60*n*60-60*i);return n+":"+(i<10?"0"+i:i)+":"+(o<10?"0"+o:o)},unformat:function(e){var r=e.split(":"),t=0;return 3===r.length?(t+=60*Number(r[0])*60,t+=60*Number(r[1]),t+=Number(r[2])):2===r.length&&(t+=60*Number(r[0]),t+=Number(r[1])),Number(t)}})}(),r});