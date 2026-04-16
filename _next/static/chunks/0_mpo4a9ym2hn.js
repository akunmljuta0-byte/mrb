(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let o=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let d=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),d&&"?"!==d[0]&&(d="?"+d),a=a.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${c}${a}${d}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(71645);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=o(e,n)),t&&(a.current=o(t,n))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let n=e.r(18967),a=e.r(52817);function o(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return m},useLinkStatus:function(){return v}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let o=e.r(90809),i=e.r(43476),l=o._(e.r(71645)),s=e.r(95057),c=e.r(8372),d=e.r(18581),p=e.r(18967),f=e.r(5550);e.r(33525);let u=e.r(88540),g=e.r(91949),h=e.r(73668),x=e.r(9396);function m(t){var r,n;let a,o,m,[v,y]=(0,l.useOptimistic)(g.IDLE_LINK_STATUS),j=(0,l.useRef)(null),{href:w,as:S,children:k,prefetch:N=null,passHref:C,replace:T,shallow:O,scroll:z,onClick:_,onMouseEnter:P,onTouchStart:R,legacyBehavior:E=!1,onNavigate:M,transitionTypes:A,ref:I,unstable_dynamicOnHover:L,...W}=t;a=k,E&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let U=l.default.useContext(c.AppRouterContext),D=!1!==N,B=!1!==N?null===(n=N)||"auto"===n?x.FetchStrategy.PPR:x.FetchStrategy.Full:x.FetchStrategy.PPR,$="string"==typeof(r=S||w)?r:(0,s.formatUrl)(r);if(E){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=l.default.Children.only(a)}let K=E?o&&"object"==typeof o&&o.ref:I,F=l.default.useCallback(e=>(null!==U&&(j.current=(0,g.mountLinkInstance)(e,$,U,B,D,y)),()=>{j.current&&((0,g.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,g.unmountPrefetchableInstance)(e)}),[D,$,U,B,y]),G={ref:(0,d.useMergedRef)(F,K),onClick(t){E||"function"!=typeof _||_(t),E&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!U||t.defaultPrevented||function(t,r,n,a,o,i,s){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:p}=e.r(99781);l.default.startTransition(()=>{p(r,a?"replace":"push",!1===o?u.ScrollBehavior.NoScroll:u.ScrollBehavior.Default,n.current,s)})}}(t,$,j,T,z,M,A)},onMouseEnter(e){E||"function"!=typeof P||P(e),E&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),U&&D&&(0,g.onNavigationIntent)(e.currentTarget,!0===L)},onTouchStart:function(e){E||"function"!=typeof R||R(e),E&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),U&&D&&(0,g.onNavigationIntent)(e.currentTarget,!0===L)}};return(0,p.isAbsoluteUrl)($)?G.href=$:E&&!C&&("a"!==o.type||"href"in o.props)||(G.href=(0,f.addBasePath)($)),m=E?l.default.cloneElement(o,G):(0,i.jsx)("a",{...W,...G,children:a}),(0,i.jsx)(b.Provider,{value:v,children:m})}e.r(84508);let b=(0,l.createContext)(g.IDLE_LINK_STATUS),v=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},31713,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(22016);let a=["All platform","Android","iOS","PC","Steam","PS5"];e.s(["default",0,function(){let[e,o]=(0,r.useState)([]),[i,l]=(0,r.useState)(!0),[s,c]=(0,r.useState)(""),[d,p]=(0,r.useState)("Tất cả"),[f,u]=(0,r.useState)("Tất cả");(0,r.useEffect)(()=>{fetch("/mrb/data/games.json").then(e=>e.json()).then(e=>{o(e.games??[]),l(!1)}).catch(()=>l(!1))},[]);let g=(0,r.useMemo)(()=>["Tất cả",...Array.from(new Set(e.map(e=>e.publisher)))],[e]),h=(0,r.useMemo)(()=>e.filter(e=>{let t=""===s.trim()||e.name.toLowerCase().includes(s.toLowerCase())||e.publisher.toLowerCase().includes(s.toLowerCase()),r="Tất cả"===d||e.platform===d,n="Tất cả"===f||e.publisher===f;return t&&r&&n}),[e,s,d,f]);return(0,t.jsxs)("div",{className:"min-h-screen",style:{background:"var(--bg)",color:"var(--text)"},children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&display=swap');
        :root {
          --bg: #0a0a0f;
          --bg2: #12121a;
          --bg3: #1a1a28;
          --accent: #7c3aed;
          --accent2: #a855f7;
          --neon: #c084fc;
          --text: #e2e8f0;
          --muted: #94a3b8;
          --border: rgba(124,58,237,0.3);
          --card: rgba(18,18,26,0.9);
          --gold: #f59e0b;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Rajdhani', sans-serif; }
        .orbitron { font-family: 'Orbitron', sans-serif; }

        .hero-bg {
          background: linear-gradient(135deg, #0a0a0f 0%, #0f0a1f 50%, #0a0a0f 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 60%, rgba(168,85,247,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .search-input {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 18px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .search-input:focus {
          border-color: var(--accent2);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
        }
        .search-input::placeholder { color: var(--muted); }

        .filter-btn {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--muted);
          cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .filter-btn:hover { border-color: var(--accent2); color: var(--text); }
        .filter-btn.active {
          background: var(--accent);
          border-color: var(--accent2);
          color: #fff;
        }

        .select-filter {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 12px;
          outline: none;
          cursor: pointer;
        }
        .select-filter:focus { border-color: var(--accent2); }
        .select-filter option { background: var(--bg3); }

        .game-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
        }
        .game-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent2);
          box-shadow: 0 8px 32px rgba(124,58,237,0.25);
        }
        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--bg3);
        }
        .card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .game-card:hover .card-img-wrap img { transform: scale(1.05); }
        .platform-badge {
          position: absolute;
          top: 10px; right: 10px;
          background: rgba(10,10,15,0.85);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--neon);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
        }
        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 10px;
        }
        .card-publisher {
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .card-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .login-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 4px;
          color: var(--neon);
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          width: fit-content;
        }
        .warning-box {
          background: rgba(245,158,11,0.08);
          border-left: 3px solid var(--gold);
          border-radius: 0 4px 4px 0;
          color: #fbbf24;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 10px;
          line-height: 1.4;
        }
        .steps-mini {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .steps-mini-label {
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .step-item-mini {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--muted);
        }
        .step-num-mini {
          background: var(--accent);
          border-radius: 3px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 9px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .detail-btn {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 10px;
          text-align: center;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          display: block;
          margin-top: auto;
        }
        .detail-btn:hover { opacity: 0.85; transform: scale(1.02); }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--muted);
        }

        .count-badge {
          background: rgba(124,58,237,0.2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 14px;
        }

        @media (max-width: 640px) {
          .filter-row { flex-wrap: wrap; }
          .platform-scroll { overflow-x: auto; padding-bottom: 8px; }
        }
      `}),(0,t.jsxs)("div",{className:"hero-bg",style:{padding:"60px 20px 40px"},children:[(0,t.jsx)("div",{className:"grid-overlay"}),(0,t.jsxs)("div",{style:{position:"relative",maxWidth:960,margin:"0 auto",textAlign:"center"},children:[(0,t.jsx)("div",{style:{marginBottom:8},children:(0,t.jsx)("span",{style:{color:"var(--accent2)",fontFamily:"Orbitron",fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase"},children:"▸ GAME GUIDE SYSTEM"})}),(0,t.jsxs)("h1",{className:"orbitron",style:{fontSize:"clamp(28px, 5vw, 52px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16},children:["HƯỚNG DẪN"," ",(0,t.jsx)("span",{style:{background:"linear-gradient(90deg, #7c3aed, #c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"ĐĂNG NHẬP GAME"})]}),(0,t.jsx)("p",{style:{color:"var(--muted)",fontSize:16,fontWeight:500,maxWidth:480,margin:"0 auto 32px"},children:"Hướng dẫn chi tiết từng bước đăng nhập cho các tựa game phổ biến"}),(0,t.jsxs)("div",{style:{maxWidth:520,margin:"0 auto 24px",position:"relative"},children:[(0,t.jsx)("span",{style:{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",color:"var(--muted)",fontSize:18},children:"⌕"}),(0,t.jsx)("input",{className:"search-input",placeholder:"Tìm kiếm game...",style:{paddingLeft:44},value:s,onChange:e=>c(e.target.value)})]}),(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:12,alignItems:"center"},children:[(0,t.jsx)("div",{className:"platform-scroll",style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"},children:["Tất cả",...a].map(e=>(0,t.jsx)("button",{className:`filter-btn${d===e?" active":""}`,onClick:()=>p(e),children:e},e))}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10},children:[(0,t.jsx)("span",{style:{color:"var(--muted)",fontSize:13,fontWeight:600},children:"Publisher:"}),(0,t.jsx)("select",{className:"select-filter",value:f,onChange:e=>u(e.target.value),children:g.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]})]})]})]}),(0,t.jsxs)("div",{style:{maxWidth:1200,margin:"0 auto",padding:"32px 20px"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsx)("span",{className:"orbitron",style:{color:"var(--text)",fontWeight:700,fontSize:15},children:"DANH SÁCH GAME"}),(0,t.jsxs)("span",{className:"count-badge",children:[h.length," game"]})]}),(0,t.jsx)(n.default,{href:"/admin",style:{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:6,color:"var(--muted)",fontSize:13,fontFamily:"Orbitron",fontWeight:700,padding:"8px 16px",textDecoration:"none",transition:"color 0.2s, border-color 0.2s"},children:"⚙ ADMIN"})]}),i&&(0,t.jsx)("div",{style:{textAlign:"center",padding:80,color:"var(--muted)",fontFamily:"Orbitron",fontSize:14},children:"LOADING..."}),!i&&0===h.length&&(0,t.jsxs)("div",{className:"empty-state",children:[(0,t.jsx)("div",{style:{fontSize:48,marginBottom:16},children:"🎮"}),(0,t.jsx)("div",{className:"orbitron",style:{fontSize:18,fontWeight:700,marginBottom:8},children:"Không tìm thấy game"}),(0,t.jsx)("div",{style:{fontSize:14},children:"Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"})]}),!i&&h.length>0&&(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:20},children:h.map((e,r)=>(0,t.jsxs)("div",{className:"game-card",children:[(0,t.jsxs)("div",{className:"card-img-wrap",children:[e.image?(0,t.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):(0,t.jsx)("div",{style:{width:"100%",height:"100%",background:"linear-gradient(135deg, #1a1a28, #0f0a1f)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,t.jsx)("span",{style:{fontSize:48},children:"🎮"})}),(0,t.jsx)("span",{className:"platform-badge",children:e.platform})]}),(0,t.jsxs)("div",{className:"card-body",children:[(0,t.jsx)("div",{className:"card-publisher",children:e.publisher}),(0,t.jsx)("div",{className:"card-name",children:e.name}),(0,t.jsxs)("div",{className:"login-tag",children:[(0,t.jsx)("span",{children:"🔑"}),e.loginOption]}),e.warning&&(0,t.jsxs)("div",{className:"warning-box",children:["⚠ ",e.warning]}),e.steps.length>0&&(0,t.jsxs)("div",{className:"steps-mini",children:[(0,t.jsx)("div",{className:"steps-mini-label",children:"Các bước"}),e.steps.slice(0,3).map((e,r)=>(0,t.jsxs)("div",{className:"step-item-mini",children:[(0,t.jsx)("span",{className:"step-num-mini",children:r+1}),(0,t.jsx)("span",{children:e})]},r)),e.steps.length>3&&(0,t.jsxs)("div",{style:{color:"var(--accent2)",fontSize:12,fontWeight:600,marginTop:2},children:["+",e.steps.length-3," bước nữa..."]})]}),(0,t.jsx)(n.default,{href:`/game/${encodeURIComponent(e.publisher)}/${encodeURIComponent(e.name)}`,className:"detail-btn",style:{display:"block",marginTop:"auto"},children:"XEM CHI TIẾT →"})]})]},r))})]}),(0,t.jsxs)("div",{style:{borderTop:"1px solid var(--border)",padding:"24px 20px",textAlign:"center",color:"var(--muted)",fontSize:13},children:[(0,t.jsx)("span",{className:"orbitron",style:{color:"var(--accent2)",fontWeight:700},children:"GAME GUIDE SYSTEM"})," ","— Hướng dẫn đăng nhập game"]})]})}])}]);