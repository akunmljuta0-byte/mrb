(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var a=e.i(43476),r=e.i(71645);let t=["All platform","Android","iOS","PC","Steam","PS5"];e.s(["default",0,function(){let[e,n]=(0,r.useState)([]),[i,o]=(0,r.useState)(""),[s,l]=(0,r.useState)(null),[d,c]=(0,r.useState)(null),[p,m]=(0,r.useState)(!1),g=(0,r.useRef)(null);(0,r.useEffect)(()=>{fetch("/mrb/data/games.json").then(e=>e.json()).then(e=>{Array.isArray(e.games)&&n(e.games),m(!0)}).catch(()=>m(!0))},[]);let x=(0,r.useCallback)((e,a="ok")=>{c({msg:e,type:a}),setTimeout(()=>c(null),2800)},[]),f=(0,r.useMemo)(()=>JSON.stringify({games:e},null,2),[e]),h=(0,r.useMemo)(()=>{if(!i.trim())return e.map((e,a)=>({g:e,i:a}));let a=i.toLowerCase();return e.map((e,a)=>({g:e,i:a})).filter(({g:e})=>e.name.toLowerCase().includes(a)||e.publisher.toLowerCase().includes(a))},[e,i]),b=(e,a,r)=>{n(t=>t.map((t,n)=>n===e?{...t,[a]:r}:t))},u=()=>{navigator.clipboard.writeText(f).then(()=>x("✔ Đã copy JSON!")).catch(()=>x("✖ Copy thất bại","err"))};return(0,a.jsxs)("div",{className:"admin-root",children:[(0,a.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&display=swap');
        :root {
          --bg: #0a0a0f;
          --bg2: #12121a;
          --bg3: #1a1a28;
          --bg4: #20202f;
          --accent: #7c3aed;
          --accent2: #a855f7;
          --neon: #c084fc;
          --text: #e2e8f0;
          --muted: #64748b;
          --border: rgba(124,58,237,0.25);
          --gold: #f59e0b;
          --red: #ef4444;
          --green: #22c55e;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-root {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
        }

        /* HEADER */
        .admin-header {
          background: rgba(18,18,26,0.98);
          border-bottom: 1px solid var(--border);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }
        .admin-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 16px;
          font-weight: 900;
          color: var(--neon);
          letter-spacing: 1px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .header-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* BUTTONS */
        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 9px 14px;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn:hover { opacity: 0.85; transform: scale(1.02); }
        .btn:active { transform: scale(0.98); }
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
        }
        .btn-ghost {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .btn-ghost:hover { border-color: var(--accent2); color: var(--text); }
        .btn-danger {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          color: var(--red);
        }
        .btn-import {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          color: var(--green);
        }

        /* LAYOUT */
        .admin-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          height: calc(100vh - 65px);
        }
        @media (max-width: 900px) {
          .admin-body { grid-template-columns: 1fr; height: auto; }
          .json-panel { display: none; }
        }
        @media (max-width: 600px) {
          .admin-header { padding: 10px 14px; }
          .admin-title { font-size: 13px; }
          .btn { font-size: 10px; padding: 7px 10px; }
          .two-col { grid-template-columns: 1fr; }
        }

        /* GAME LIST PANEL */
        .game-list-panel {
          overflow-y: auto;
          padding: 20px;
          border-right: 1px solid var(--border);
        }
        .search-wrap {
          position: relative;
          margin-bottom: 16px;
        }
        .search-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 16px;
          pointer-events: none;
        }
        .search-input {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 14px 9px 36px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .search-input:focus { border-color: var(--accent2); }
        .search-input::placeholder { color: var(--muted); }

        /* GAME EDITOR CARD */
        .game-editor-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .game-editor-card.expanded { border-color: var(--accent2); }
        .card-header-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          user-select: none;
        }
        .card-header-row:hover { background: rgba(124,58,237,0.05); }
        .card-index {
          background: var(--accent);
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          min-width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-title-info { flex: 1; min-width: 0; }
        .card-game-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-sub {
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
        }
        .chevron {
          color: var(--muted);
          font-size: 11px;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .chevron.open { transform: rotate(180deg); }
        .card-edit-body {
          padding: 16px;
          border-top: 1px solid var(--border);
        }

        /* FORM */
        .field-group { margin-bottom: 14px; }
        .field-label {
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .field-input {
          background: var(--bg3);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .field-input:focus { border-color: var(--accent2); }
        .field-input::placeholder { color: var(--muted); }
        .field-select {
          background: var(--bg3);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 12px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .field-select option { background: var(--bg3); }
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* STEPS */
        .steps-editor { display: flex; flex-direction: column; gap: 8px; }
        .steps-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .step-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .step-num {
          background: var(--accent);
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .remove-step-btn {
          background: none;
          border: none;
          color: var(--red);
          cursor: pointer;
          font-size: 18px;
          padding: 0 2px;
          line-height: 1;
          opacity: 0.6;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .remove-step-btn:hover { opacity: 1; }

        /* JSON PANEL */
        .json-panel {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: var(--bg);
        }
        .json-panel-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: var(--bg);
          z-index: 1;
        }
        .json-pre {
          flex: 1;
          margin: 0;
          padding: 16px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.6;
          color: #64748b;
          background: none;
          white-space: pre;
          overflow: auto;
        }

        /* TOAST */
        .toast {
          position: fixed;
          bottom: 24px; right: 24px;
          z-index: 9999;
          padding: 12px 20px;
          border-radius: 8px;
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          animation: slideUp 0.3s ease;
          pointer-events: none;
        }
        .toast-ok {
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.4);
          color: var(--green);
        }
        .toast-err {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: var(--red);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .back-link {
          color: var(--muted);
          text-decoration: none;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--neon); }

        .count-pill {
          background: rgba(124,58,237,0.2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 12px;
        }
      `}),(0,a.jsx)("input",{ref:g,type:"file",accept:".json,application/json",style:{display:"none"},onChange:a=>{let r=a.target.files?.[0];if(!r)return;let t=new FileReader;t.onload=a=>{try{let r=JSON.parse(a.target?.result);if(Array.isArray(r.games)){if(e.length>0&&!confirm("Import sẽ ghi đè dữ liệu hiện tại. Tiếp tục?"))return;n(r.games),l(null),x(`✔ Đ\xe3 import ${r.games.length} game!`)}else x("✖ File JSON không đúng format (cần có games[])","err")}catch{x("✖ Lỗi parse JSON","err")}},t.readAsText(r),a.target.value=""}}),d&&(0,a.jsx)("div",{className:`toast ${"ok"===d.type?"toast-ok":"toast-err"}`,children:d.msg}),(0,a.jsxs)("div",{className:"admin-header",children:[(0,a.jsxs)("div",{className:"header-left",children:[(0,a.jsx)("a",{href:"/mrb/",className:"back-link",children:"← HOME"}),(0,a.jsx)("span",{className:"admin-title",children:"⚙ ADMIN"}),(0,a.jsxs)("span",{className:"count-pill",children:[e.length," GAMES"]})]}),(0,a.jsxs)("div",{className:"header-actions",children:[(0,a.jsx)("button",{className:"btn btn-import",onClick:()=>{g.current?.click()},children:"↑ IMPORT"}),(0,a.jsx)("button",{className:"btn btn-ghost",onClick:u,children:"⎘ COPY JSON"}),(0,a.jsx)("button",{className:"btn btn-ghost",onClick:()=>{try{let e=new Blob([f],{type:"application/json"}),a=URL.createObjectURL(e),r=document.createElement("a");r.href=a,r.download="games.json",document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(a)},200),x("✔ Đã tải games.json!")}catch{x("✖ Không thể tải file. Hãy dùng Copy JSON.","err")}},children:"↓ TẢI JSON"}),(0,a.jsx)("button",{className:"btn btn-primary",onClick:()=>{n(e=>[...e,{publisher:"",name:"",platform:"All platform",loginOption:"",warning:"",steps:[""],image:"",video:""}]),l(e.length)},children:"+ THÊM GAME"})]})]}),(0,a.jsxs)("div",{className:"admin-body",children:[(0,a.jsxs)("div",{className:"game-list-panel",children:[!p&&(0,a.jsx)("div",{style:{textAlign:"center",padding:60,color:"var(--muted)",fontFamily:"Orbitron",fontSize:13},children:"LOADING..."}),p&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"search-wrap",children:[(0,a.jsx)("span",{className:"search-icon",children:"⌕"}),(0,a.jsx)("input",{className:"search-input",placeholder:"Tìm game theo tên hoặc publisher...",value:i,onChange:e=>o(e.target.value)})]}),0===h.length&&(0,a.jsx)("div",{style:{textAlign:"center",padding:40,color:"var(--muted)",fontFamily:"Orbitron",fontSize:12},children:0===e.length?"Chưa có game nào. Nhấn + THÊM GAME.":"Không tìm thấy game nào."}),h.map(({g:r,i})=>(0,a.jsxs)("div",{className:`game-editor-card${s===i?" expanded":""}`,children:[(0,a.jsxs)("div",{className:"card-header-row",onClick:()=>l(s===i?null:i),children:[(0,a.jsx)("span",{className:"card-index",children:i+1}),(0,a.jsxs)("div",{className:"card-title-info",children:[(0,a.jsx)("div",{className:"card-game-name",children:r.name||"(Chưa đặt tên)"}),(0,a.jsxs)("div",{className:"card-sub",children:[r.publisher||"—"," · ",r.platform]})]}),(0,a.jsx)("button",{className:"btn btn-danger",style:{padding:"5px 10px",fontSize:10},onClick:a=>{a.stopPropagation(),confirm(`X\xf3a game "${e[i]?.name||"chưa đặt tên"}"?`)&&(n(e=>e.filter((e,a)=>a!==i)),l(null))},children:"XÓA"}),(0,a.jsx)("span",{className:`chevron${s===i?" open":""}`,children:"▼"})]}),s===i&&(0,a.jsxs)("div",{className:"card-edit-body",children:[(0,a.jsxs)("div",{className:"two-col",children:[(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"Publisher"}),(0,a.jsx)("input",{className:"field-input",value:r.publisher,onChange:e=>b(i,"publisher",e.target.value),placeholder:"IGG, Garena..."})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"Tên game"}),(0,a.jsx)("input",{className:"field-input",value:r.name,onChange:e=>b(i,"name",e.target.value),placeholder:"Lords Mobile..."})]})]}),(0,a.jsxs)("div",{className:"two-col",children:[(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"Platform"}),(0,a.jsx)("select",{className:"field-select",value:r.platform,onChange:e=>b(i,"platform",e.target.value),children:t.map(e=>(0,a.jsx)("option",{value:e,children:e},e))})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"Login Option"}),(0,a.jsx)("input",{className:"field-input",value:r.loginOption,onChange:e=>b(i,"loginOption",e.target.value),placeholder:"Unlink, Facebook..."})]})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"Cảnh báo"}),(0,a.jsx)("input",{className:"field-input",value:r.warning,onChange:e=>b(i,"warning",e.target.value),placeholder:"Lưu ý quan trọng..."})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"URL Ảnh"}),(0,a.jsx)("input",{className:"field-input",value:r.image,onChange:e=>b(i,"image",e.target.value),placeholder:"https://..."})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsx)("label",{className:"field-label",children:"URL Video (YouTube embed)"}),(0,a.jsx)("input",{className:"field-input",value:r.video,onChange:e=>b(i,"video",e.target.value),placeholder:"https://www.youtube.com/embed/..."})]}),(0,a.jsxs)("div",{className:"field-group",children:[(0,a.jsxs)("div",{className:"steps-label-row",children:[(0,a.jsx)("label",{className:"field-label",style:{margin:0},children:"Các bước"}),(0,a.jsx)("button",{className:"btn btn-ghost",style:{padding:"4px 10px",fontSize:10},onClick:()=>{n(e=>e.map((e,a)=>a===i?{...e,steps:[...e.steps,""]}:e))},children:"+ THÊM BƯỚC"})]}),(0,a.jsxs)("div",{className:"steps-editor",children:[0===r.steps.length&&(0,a.jsx)("div",{style:{color:"var(--muted)",fontSize:13,fontStyle:"italic"},children:"Chưa có bước nào."}),r.steps.map((e,r)=>(0,a.jsxs)("div",{className:"step-row",children:[(0,a.jsx)("span",{className:"step-num",children:r+1}),(0,a.jsx)("input",{className:"field-input",style:{marginBottom:0},value:e,onChange:e=>{var a;return a=e.target.value,void n(e=>e.map((e,t)=>t===i?{...e,steps:e.steps.map((e,t)=>t===r?a:e)}:e))},placeholder:`Bước ${r+1}...`}),(0,a.jsx)("button",{className:"remove-step-btn",onClick:()=>{n(e=>e.map((e,a)=>a===i?{...e,steps:e.steps.filter((e,a)=>a!==r)}:e))},title:"Xóa bước",children:"×"})]},r))]})]})]})]},i))]})]}),(0,a.jsxs)("div",{className:"json-panel",children:[(0,a.jsxs)("div",{className:"json-panel-header",children:[(0,a.jsx)("span",{children:"JSON PREVIEW"}),(0,a.jsx)("button",{className:"btn btn-ghost",style:{padding:"4px 10px",fontSize:10},onClick:u,children:"COPY"})]}),(0,a.jsx)("pre",{className:"json-pre",children:f})]})]})]})}])}]);