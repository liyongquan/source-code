module.exports=function(){const{ipcRenderer:e}=require("electron"),t=require("./qrcode.js"),{passwdLoginPage:o}=require("./paths.js"),{getRandomNumberBetween:n,realMouseClickOn:r}=require("./util.js"),{getCaptchaText:c}=require("./captcha.js"),i=document.createElement.bind(document),s=async()=>{const o=await new Promise(e=>{const t=new MutationObserver(()=>{const o=document.querySelector("#ddlogin-iframe");o&&(t.disconnect(),e(o.contentWindow))});t.observe(document.querySelector("#ddlogin"),{childList:!0})}),n=await new Promise(e=>{const t=setInterval(()=>{o.currentCode&&(e(o.currentCode),clearInterval(t))},1e3)});(e=>{const t=e.document.querySelector(".login_qrcode_refresh");new MutationObserver(()=>{"block"==t.style.display&&top.location.reload()}).observe(t,{attributes:!0})})(o);const r=new URL(o.GOTO).searchParams,c=r.get("appid"),i=r.get("redirect_uri"),s=`https://oapi.dingtalk.com/connect/qrcommit?showmenu=false&code=${n}&appid=${c}&redirect_uri=${encodeURIComponent(i)}`,d=await t.generatePromise(s,{small:!0});return console.log(s),e.send("log",`\n请使用学习强国APP扫码登录:\n${d}\n`),e.send("log",`或者使用学习强国APP打开此链接:\n${s}\n`),s},d=/^(?:(\+\d+)-)?(\d+)$/;return{onLogin:()=>{document.querySelectorAll(".header, .redflagbox, .footer").forEach(e=>{e.style.display="none"}),e.sendSync("isHeadless")&&s();const t=i("a");t.href=o,t.style.color="#2db7f5",t.text="使用用户名和密码登录",document.querySelector(".ddlogintext").append(i("br"),i("br"),t),[document.documentElement,document.body].forEach(e=>{e.style.minWidth="unset"})},isLoggedIn:()=>document.cookie.includes("token="),onAutoLogin:async e=>{if(!e)return;const{userName:t,passwd:o}=e,i=t.match(d);if(!i)return;const s=i[1],u=i[2],a=document.querySelector("#mobile"),l=document.querySelector("#pwd");await new Promise(e=>{const t=new MutationObserver(()=>{let{width:o}=a.getBoundingClientRect();o>0&&(t.disconnect(),e())});t.observe(document.querySelector(".loginBox"),{subtree:!0,childList:!0})}),[a,l].forEach(e=>{r(e)}),a.value=u,l.value=o,s&&(document.querySelector("#countryCode").value=s);const m=document.querySelector("#loginBtn");setTimeout(()=>{r(m)},1e3*(10+n(0,3)));const y=document.querySelector(".indentify_content > img"),g=document.querySelector("#identifyCode");new MutationObserver(async()=>{if(y.src){const e=await c(y.src);g.value=e,m.click()}}).observe(y,{attributes:!0,attributeFilter:["src"]})}}}();