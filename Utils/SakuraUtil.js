/**************************************
*
✿　　╱╲*╱╲　✿
 ╱╳ ✿ ▲╱　　╲　✿
╱╱    ◢◣ ✿　　╳╲ 
╱   ✿ ◢█◣　／　　╲ ✿
✿　  ◢██◣   SakuraUtil
    _▂▂█▂▂  by Sliverkiss 2024.02.03
----------------------------------------
//Sakura多功能工具模块，引入模块方法如下：
async function loadSakuraUtils() {
    let code = ($.isNode() ? process.env['SakuraUtil_code'] : $.getdata('SakuraUtil_code')) || '';
    if (code && Object.keys(code).length) {
        console.log(`✅ ${$.name}: 缓存中存在SakuraUtil代码, 跳过下载`)
        eval(code)
        return creatUtils();
    }
    console.log(`🚀 ${$.name}: 开始下载SakuraUtil代码`)
    return new Promise(async (resolve) => {
        $.getScript(
            'https://cdn.jsdelivr.net/gh/Sliverkiss/QuantumultX@main/Utils/SakuraUtil.js'
        ).then((fn) => {
            $.setdata(fn, SakuraUtil_code)
            eval(fn)
            const SakuraUtil = creatUtils();
            console.log(`✅ SakuraUtil加载成功, 请继续`)
            resolve(SakuraUtil)
        })
    })
}
------------------------------------------
方法列表
------------------------------------------
MD5 加密 | @param string a 'xxx' => MD5_Encrypt(a)
SHA1 加密  ｜ @param string s 'xxx' => SHA1_Encrypt(s)
UTF8编码  ｜ @param string s 'xxx' => encodeUTF8(s)
随机MAC网络地址 ｜ randomMac()
随机UUID(由时间戳生成) 8-4-4-4-12 ｜ guid()
手机号中间遮挡 ｜ @param string phone_num 'xxx' => phone_num(phone_num)
随机 数字 + 大写字母 生成 ｜ @param int e 32 => randomszdx(e)
随机 数字 + 大写字母 生成 ｜ @param int e 32 => randomszxx(e)
随机整数生成 ｜ @param int min,max => randomInt(min, max)
时间戳 13位 | ts13()
时间戳 10位 | ts10()
时间戳 转 日期 ｜ @param string time 'xxx' => tmtoDate(time = +new Date())
获取当前小时数 ｜ local_hours()
获取当前分钟数 ｜ local_minutes()
获取当前年份 ｜ local_year()
获取当前月份(数字) ｜ local_month()
获取当前月份(数字) 补零 ｜ local_month_two()
获取当前天数(数字) ｜ local_day()
获取当前天数 补零 ｜ local_day_two()
base64 编码 ｜ @param string data 'xxx' => base64_encode(data)
base64 解码 ｜ @param string data 'xxx' => base64_encode(data)
统计对象属性数量 | @param array data,int col [{col:xxx}] => getTotal(data,col)
对象属性转换成小写 ｜ @param obj obj {} => ObjectKeys2LowerCase(obj)
Json转换成字符串拼接 ｜ @param obj data {} => JsonToUrl(data)
字符串拼接转换成Json ｜ @param string data {} => UrlToJson(data)
******************************************/
function creatUtils(){return new(class{MD5_Encrypt(a){function b(a,b){return(a<<b)|(a>>>(32-b));}function c(a,b){var c,d,e,f,g;return((e=2147483648&a),(f=2147483648&b),(c=1073741824&a),(d=1073741824&b),(g=(1073741823&a)+(1073741823&b)),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f);}function d(a,b,c){return(a&b)|(~a&c);}function e(a,b,c){return(a&c)|(b&~c);}function f(a,b,c){return a^b^c;}function g(a,b,c){return b^(a|~c);}function h(a,e,f,g,h,i,j){return(a=c(a,c(c(d(e,f,g),h),j))),c(b(a,i),e);}function i(a,d,f,g,h,i,j){return(a=c(a,c(c(e(d,f,g),h),j))),c(b(a,i),d);}function j(a,d,e,g,h,i,j){return(a=c(a,c(c(f(d,e,g),h),j))),c(b(a,i),d);}function k(a,d,e,f,h,i,j){return(a=c(a,c(c(g(d,e,f),h),j))),c(b(a,i),d);}function l(a){for(var b,c=a.length,d=c+8,e=(d-(d%64))/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)(b=(i-(i%4))/4),(h=(i%4)*8),(g[b]=g[b]|(a.charCodeAt(i)<<h)),i++;return((b=(i-(i%4))/4),(h=(i%4)*8),(g[b]=g[b]|(128<<h)),(g[f-2]=c<<3),(g[f-1]=c>>>29),g);}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)(b=(a>>>(8*c))&255),(e="0"+b.toString(16)),(d+=e.substr(e.length-2,2));return d;}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?(b+=String.fromCharCode(d)):d>127&&2048>d?((b+=String.fromCharCode((d>>6)|192)),(b+=String.fromCharCode((63&d)|128))):((b+=String.fromCharCode((d>>12)|224)),(b+=String.fromCharCode(((d>>6)&63)|128)),(b+=String.fromCharCode((63&d)|128)));}return b;}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)(p=t),(q=u),(r=v),(s=w),(t=h(t,u,v,w,x[o+0],y,3614090360)),(w=h(w,t,u,v,x[o+1],z,3905402710)),(v=h(v,w,t,u,x[o+2],A,606105819)),(u=h(u,v,w,t,x[o+3],B,3250441966)),(t=h(t,u,v,w,x[o+4],y,4118548399)),(w=h(w,t,u,v,x[o+5],z,1200080426)),(v=h(v,w,t,u,x[o+6],A,2821735955)),(u=h(u,v,w,t,x[o+7],B,4249261313)),(t=h(t,u,v,w,x[o+8],y,1770035416)),(w=h(w,t,u,v,x[o+9],z,2336552879)),(v=h(v,w,t,u,x[o+10],A,4294925233)),(u=h(u,v,w,t,x[o+11],B,2304563134)),(t=h(t,u,v,w,x[o+12],y,1804603682)),(w=h(w,t,u,v,x[o+13],z,4254626195)),(v=h(v,w,t,u,x[o+14],A,2792965006)),(u=h(u,v,w,t,x[o+15],B,1236535329)),(t=i(t,u,v,w,x[o+1],C,4129170786)),(w=i(w,t,u,v,x[o+6],D,3225465664)),(v=i(v,w,t,u,x[o+11],E,643717713)),(u=i(u,v,w,t,x[o+0],F,3921069994)),(t=i(t,u,v,w,x[o+5],C,3593408605)),(w=i(w,t,u,v,x[o+10],D,38016083)),(v=i(v,w,t,u,x[o+15],E,3634488961)),(u=i(u,v,w,t,x[o+4],F,3889429448)),(t=i(t,u,v,w,x[o+9],C,568446438)),(w=i(w,t,u,v,x[o+14],D,3275163606)),(v=i(v,w,t,u,x[o+3],E,4107603335)),(u=i(u,v,w,t,x[o+8],F,1163531501)),(t=i(t,u,v,w,x[o+13],C,2850285829)),(w=i(w,t,u,v,x[o+2],D,4243563512)),(v=i(v,w,t,u,x[o+7],E,1735328473)),(u=i(u,v,w,t,x[o+12],F,2368359562)),(t=j(t,u,v,w,x[o+5],G,4294588738)),(w=j(w,t,u,v,x[o+8],H,2272392833)),(v=j(v,w,t,u,x[o+11],I,1839030562)),(u=j(u,v,w,t,x[o+14],J,4259657740)),(t=j(t,u,v,w,x[o+1],G,2763975236)),(w=j(w,t,u,v,x[o+4],H,1272893353)),(v=j(v,w,t,u,x[o+7],I,4139469664)),(u=j(u,v,w,t,x[o+10],J,3200236656)),(t=j(t,u,v,w,x[o+13],G,681279174)),(w=j(w,t,u,v,x[o+0],H,3936430074)),(v=j(v,w,t,u,x[o+3],I,3572445317)),(u=j(u,v,w,t,x[o+6],J,76029189)),(t=j(t,u,v,w,x[o+9],G,3654602809)),(w=j(w,t,u,v,x[o+12],H,3873151461)),(v=j(v,w,t,u,x[o+15],I,530742520)),(u=j(u,v,w,t,x[o+2],J,3299628645)),(t=k(t,u,v,w,x[o+0],K,4096336452)),(w=k(w,t,u,v,x[o+7],L,1126891415)),(v=k(v,w,t,u,x[o+14],M,2878612391)),(u=k(u,v,w,t,x[o+5],N,4237533241)),(t=k(t,u,v,w,x[o+12],K,1700485571)),(w=k(w,t,u,v,x[o+3],L,2399980690)),(v=k(v,w,t,u,x[o+10],M,4293915773)),(u=k(u,v,w,t,x[o+1],N,2240044497)),(t=k(t,u,v,w,x[o+8],K,1873313359)),(w=k(w,t,u,v,x[o+15],L,4264355552)),(v=k(v,w,t,u,x[o+6],M,2734768916)),(u=k(u,v,w,t,x[o+13],N,1309151649)),(t=k(t,u,v,w,x[o+4],K,4149444226)),(w=k(w,t,u,v,x[o+11],L,3174756917)),(v=k(v,w,t,u,x[o+2],M,718787259)),(u=k(u,v,w,t,x[o+9],N,3951481745)),(t=c(t,p)),(u=c(u,q)),(v=c(v,r)),(w=c(w,s));var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase();}
SHA1_Encrypt(s){var data=new Uint8Array(encodeUTF8(s));
var i,j,t;var l=((data.length+8)>>>6<<4)+16,s=new Uint8Array(l<<2);s.set(new Uint8Array(data.buffer)),s=new Uint32Array(s.buffer);for(t=new DataView(s.buffer),i=0;i<l;i++)s[i]=t.getUint32(i<<2);s[data.length>>2]|=0x80<<(24-(data.length&3)*8);s[l-1]=data.length<<3;var w=[],f=[function(){return m[1]&m[2]|~m[1]&m[3];},function(){return m[1]^m[2]^m[3];},function(){return m[1]&m[2]|m[1]&m[3]|m[2]&m[3];},function(){return m[1]^m[2]^m[3];}],rol=function(n,c){return n<<c|n>>>(32-c);},k=[1518500249,1859775393,-1894007588,-899497514],m=[1732584193,-271733879,null,null,-1009589776];m[2]=~m[0],m[3]=~m[1];for(i=0;i<s.length;i+=16){var o=m.slice(0);for(j=0;j<80;j++)
w[j]=j<16?s[i+j]:rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1),t=rol(m[0],5)+f[j/20|0]()+m[4]+w[j]+k[j/20|0]|0,m[1]=rol(m[1],30),m.pop(),m.unshift(t);for(j=0;j<5;j++)m[j]=m[j]+o[j]|0;};t=new DataView(new Uint32Array(m).buffer);for(var i=0;i<5;i++)m[i]=t.getUint32(i<<2);var hex=Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer),function(e){return(e<16?"0":"")+e.toString(16);}).join("");return hex;}
encodeUTF8(s){var i,r=[],c,x;for(i=0;i<s.length;i++)
if((c=s.charCodeAt(i))<0x80)r.push(c);else if(c<0x800)r.push(0xC0+(c>>6&0x1F),0x80+(c&0x3F));else{if((x=c^0xD800)>>10==0)
c=(x<<10)+(s.charCodeAt(++i)^0xDC00)+0x10000,r.push(0xF0+(c>>18&0x7),0x80+(c>>12&0x3F));else r.push(0xE0+(c>>12&0xF));r.push(0x80+(c>>6&0x3F),0x80+(c&0x3F));};return r;}
randomMac(){return"XX:XX:XX:XX:XX:XX".replace(/X/g,function(){return"0123456789ABCDEF".charAt(Math.floor(Math.random()*16))});}
guid(){function S4(){return(((1+Math.random())*0x10000)|0).toString(16).substring(1);}
return(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());}
phone_num(phone_num){if(phone_num.length==11){let data=phone_num.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");return data;}else{return phone_num;}}
randomszdx(e){e=e||32;var t="QWERTYUIOPASDFGHJKLZXCVBNM1234567890",a=t.length,n="";for(i=0;i<e;i++)n+=t.charAt(Math.floor(Math.random()*a));return n;}
randomszxx(e){e=e||32;var t="qwertyuioplkjhgfdsazxcvbnm1234567890",a=t.length,n="";for(i=0;i<e;i++)n+=t.charAt(Math.floor(Math.random()*a));return n;}
randomInt(min,max){return Math.round(Math.random()*(max-min)+min);}
ts13(){return Math.round(new Date().getTime()).toString();}
ts10(){return Math.round(new Date().getTime()/1000).toString();}
tmtoDate(time=+new Date()){if(time.toString().length==13){var date=new Date(time+8*3600*1000);return date.toJSON().substr(0,19).replace("T"," ");}else if(time.toString().length==10){time=time*1000;var date=new Date(time+8*3600*1000);return date.toJSON().substr(0,19).replace("T"," ");}}
local_hours(){let myDate=new Date();let h=myDate.getHours();return h;}
local_minutes(){let myDate=new Date();let m=myDate.getMinutes();return m;}
local_year(){let myDate=new Date();y=myDate.getFullYear();return y;}
local_month(){let myDate=new Date();let m=myDate.getMonth();return m;}
local_month_two(){let myDate=new Date();let m=myDate.getMonth();if(m.toString().length==1){m=`0${m}`;};return m;}
local_day(){let myDate=new Date();let d=myDate.getDate();return d;}
local_day_two(){let myDate=new Date();let d=myDate.getDate();if(d.toString().length==1){d=`0${d}`;};return d;}
base64_encode(data){let a=Buffer.from(data,'utf-8').toString('base64');return a}
base64_decode(data){let a=Buffer.from(data,'base64').toString('utf8');return a}
getTotal(data,col){let dataContainer={};data.map((item)=>{dataContainer[item[`${col}`]]=dataContainer[item[`${col}`]]||[];dataContainer[item[`${col}`]].push(item)});let total=[];let dataName=Object.keys(dataContainer);dataName.map((nameItem)=>{let count=0;dataContainer[nameItem].map((item)=>{count++});total.push({name:nameItem,value:count})});return total}
ObjectKeys2LowerCase(obj) { const _lower = Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])); return new Proxy(_lower, { get: function (target, propKey, receiver) { return Reflect.get(target, propKey.toLowerCase(), receiver) }, set: function (target, propKey, value, receiver) { return Reflect.set(target, propKey.toLowerCase(), value, receiver) } }) };
JsonToUrl(data){var tempArr=[];for(var i in data){var key=encodeURIComponent(i);var value=encodeURIComponent(data[i]);tempArr.push(key+'='+value)};var urlParamsStr=tempArr.join('&');return urlParamsStr};
UrlToJson(data){let tempArr=data.split(`&`);let obj={};for(let item of tempArr){let itemInfo=item.split(`=`);let _key=itemInfo[0];let _value=decodeURIComponent(itemInfo[1]);obj[`${_key}`]=_value};return obj};
})();}
