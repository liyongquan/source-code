!function(){const e=require("path"),{app:n,BrowserWindow:o,ipcMain:t,Menu:s}=require("electron"),{getRandomNumberBetween:a}=require("./preload/util.js"),l=require("./preload/flags.js");let i=null,r=!1;const{headless:u,dev:c,multiUser:d,userID:w,UA:p,autoLoginSettings:g,proxy:b}=l();let m=void 0;w?m=`persist:${w}`:g&&g.userName?m=`persist:user-${g.userName}`:!d&&n.requestSingleInstanceLock()||(m=`${Math.random()}`);const k=e=>{s.setApplicationMenu(s.buildFromTemplate(e))},h=[{label:"Fuck学习强国"},{label:`v${n.getVersion()}`}];let x=[];n.commandLine.appendSwitch("autoplay-policy","no-user-gesture-required"),n.on("window-all-closed",function(){n.quit()}),n.on("ready",function(){if(i=new o({title:"Fuck 学习强国",width:1e3,height:600,show:!1,icon:e.join(__dirname,"logo.png"),webPreferences:{nodeIntegration:!1,webSecurity:!u,preload:e.join(__dirname,"preload/preload.js"),partition:m,backgroundThrottling:!1,contextIsolation:!0}}),k(h),i.webContents.setWebRTCIPHandlingPolicy("disable_non_proxied_udp"),c&&i.webContents.openDevTools(),p)i.webContents.setUserAgent(p);else{const e=i.webContents.getUserAgent().replace(/\w+-xuexiqiangguo.+? /,"").replace(/Electron.+? /,"");i.webContents.setUserAgent(e)}if(i.webContents.session.webRequest.onBeforeRequest({urls:["*://fourier.taobao.com/*","*://csp.dingtalk.com/*"]},(e,n)=>{n({cancel:!0})}),b){const e={proxyRules:b};i.webContents.session.setProxy(e,()=>{})}i.loadURL("https://www.xuexi.cn/"),i.once("ready-to-show",()=>{i.show()}),i.on("closed",()=>{i=null}),i.webContents.on("new-window",(e,n)=>{e.preventDefault(),i.webContents.loadURL(n)}),i.webContents.setAudioMuted(!0),setInterval(async()=>{await new Promise(e=>{setTimeout(()=>{e()},1e3*a(0,2e3))}),r||i.webContents.reload()},864e5)}),t.on("lock",()=>{r=!0}),t.on("unlock",()=>{r=!1}),t.on("islocked",e=>{e.returnValue=r});let y=[];t.on("tasks-getAll",e=>{e.returnValue=y}),t.on("tasks-set",(e,n)=>{c&&console.log("tasks-set",n),y=n}),t.on("tasks-add",(e,...n)=>{c&&console.log("tasks-add",n),y.push(...n)}),t.on("isHeadless",e=>{e.returnValue=u}),t.on("log",(e,...n)=>{console.log(...n)});t.on("save-cookies",async()=>{const e=i.webContents.session.cookies,n=i.webContents.getURL(),o=+new Date/1e3+31536e4,t=t=>{e.set({url:n,...t,expirationDate:o},e=>{if(e)throw e})};e.on("changed",(e,n,o)=>{"__UID__"!=n.name&&"token"!=n.name||!("expired"==o||"explicit"==o&&(e=>(e-+new Date/1e3)/86400/365)(n.expirationDate)<8)||(c&&console.log([e,n,o]),t(n))}),(await(()=>new Promise((n,o)=>{e.get({domain:"xuexi.cn"},(e,t)=>{e?o(e):n(t.filter(e=>"__UID__"==e.name||"token"==e.name))})}))()).forEach(e=>{t(e)})}),t.on("getAutoLoginSettings",e=>{e.returnValue=g}),t.on("refresh-menu",(e,n)=>{if(n.score){const{today:e,total:o,types:t}=n.score;x=[{label:`今日积分: ${e}`},{label:`总积分: ${o}`},...t.map(e=>({label:`${e}`}))]}k([...h,...x])}),t.on("realMouseClick",(e,n,o)=>{const t=i.webContents;t.sendInputEvent({type:"mousedown",x:n,y:o,clickCount:1}),t.sendInputEvent({type:"mouseup",x:n,y:o})})}();