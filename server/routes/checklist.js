const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="AEC Checklist">
  <meta name="theme-color" content="#0D0D0D">
  <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230D0D0D' width='100' height='100' rx='20'/><text y='68' x='50' text-anchor='middle' font-size='50'>🏗️</text></svg>">
  <title>AEC Hub — Checklist</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
    html{background:#0D0D0D}
    body{
      font-family:'JetBrains Mono',monospace;background:#0D0D0D;color:#E0E0E0;
      min-height:100vh;min-height:100dvh;
      padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0;
      overscroll-behavior:none;
    }
    .c{max-width:600px;margin:0 auto;padding:20px 16px 100px}

    /* Header */
    .hdr-row{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}
    .hdr-tag{font-size:10px;letter-spacing:3px;color:#E8572A;font-weight:600}
    .hdr-sep{color:#333;font-size:10px}
    .hdr-sub{font-size:10px;letter-spacing:3px;color:#555}
    h1{font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px;margin-bottom:14px}

    /* Progress */
    .prog{display:flex;align-items:center;gap:12px;margin-bottom:6px}
    .prog-bar{flex:1;height:4px;background:#1a1a1a;border-radius:2px;overflow:hidden}
    .prog-fill{height:100%;border-radius:2px;transition:width .4s ease}
    .prog-n{font-size:12px;color:#666;font-weight:500;flex-shrink:0}

    .legend{display:flex;gap:16px;margin:10px 0 24px;flex-wrap:wrap}
    .leg{display:flex;align-items:center;gap:5px}
    .leg-dot{width:7px;height:7px;border-radius:50%}
    .leg-lbl{font-size:10px;color:#777;letter-spacing:1px}

    /* Phase */
    .phase{margin-bottom:20px}
    .ph{
      width:100%;display:flex;align-items:center;justify-content:space-between;
      padding:12px 14px;background:#141414;border:1px solid #222;border-radius:8px;
      cursor:pointer;-webkit-user-select:none;user-select:none;
      transition:border-color .2s;
    }
    .ph:active{background:#1a1a1a}
    .ph-l{display:flex;align-items:center;gap:10px;min-width:0}
    .ph-arrow{font-size:12px;transition:transform .2s;display:inline-block;flex-shrink:0}
    .ph-arrow.open{transform:rotate(90deg)}
    .ph-t{font-size:11px;font-weight:600;letter-spacing:1.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ph-tm{font-size:10px;color:#555;display:none}
    @media(min-width:480px){.ph-tm{display:inline}}
    .ph-r{display:flex;align-items:center;gap:8px;flex-shrink:0}
    .ph-pb{width:50px;height:3px;background:#1a1a1a;border-radius:2px;overflow:hidden}
    .ph-pf{height:100%;transition:width .3s ease}
    .ph-pc{font-size:10px;font-weight:500;min-width:28px;text-align:right}

    /* Items */
    .items{margin-top:3px}
    .item{
      display:flex;align-items:flex-start;gap:10px;
      padding:11px 12px 11px 32px;border-left:2px solid #1a1a1a;
      cursor:pointer;-webkit-user-select:none;user-select:none;
      transition:all .15s;
    }
    .item:active{background:rgba(255,255,255,0.04)}
    .item.done{background:rgba(42,232,107,0.03);border-left-color:#2AE86B33;opacity:.55}
    .item.blocked{cursor:not-allowed;opacity:.35}

    .cb{
      width:22px;height:22px;border-radius:5px;border:1.5px solid #444;
      display:flex;align-items:center;justify-content:center;
      flex-shrink:0;margin-top:0;transition:all .12s;background:transparent;
    }
    .item.done .cb{background:#2AE86B;border-color:#2AE86B}
    .item.blocked .cb{border-color:#333}

    .item-body{flex:1;min-width:0}
    .item-txt{font-size:12px;line-height:1.5;color:#ccc}
    .item.done .item-txt{color:#666;text-decoration:line-through}
    .item-tags{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap}
    .tag{
      font-size:8px;font-weight:600;letter-spacing:.8px;
      padding:2px 6px;border-radius:3px;
    }

    /* Footer */
    .foot{
      margin-top:32px;padding-top:14px;border-top:1px solid #1a1a1a;
      display:flex;justify-content:space-between;align-items:center;
    }
    .foot-lbl{font-size:10px;color:#333;letter-spacing:2px}
    .rst{
      font-size:9px;color:#444;background:none;border:1px solid #222;
      padding:5px 12px;border-radius:4px;cursor:pointer;
      font-family:inherit;letter-spacing:1px;
    }
    .rst:active{background:#1a1a1a}

    /* iOS standalone padding */
    @media(display-mode:standalone){
      .c{padding-top:52px}
    }
  </style>
</head>
<body>
<div class="c">
  <div class="hdr-row">
    <span class="hdr-tag">PROJECT</span>
    <span class="hdr-sep">///</span>
    <span class="hdr-sub">AEC INTELLIGENCE HUB</span>
  </div>
  <h1>Execution Checklist</h1>
  <div class="prog">
    <div class="prog-bar"><div class="prog-fill" id="tbar"></div></div>
    <span class="prog-n" id="tcnt"></span>
  </div>
  <div class="legend">
    <div class="leg"><div class="leg-dot" style="background:#2A8BE8"></div><span class="leg-lbl">DAVE</span></div>
    <div class="leg"><div class="leg-dot" style="background:#E8572A"></div><span class="leg-lbl">GARTH</span></div>
    <div class="leg"><div class="leg-dot" style="background:#9B59B6"></div><span class="leg-lbl">BOTH</span></div>
  </div>
  <div id="app"></div>
  <div class="foot">
    <span class="foot-lbl">DAVE × GARTH</span>
    <button class="rst" onclick="resetAll()">RESET</button>
  </div>
</div>

<script>
const SK='aec-checklist-v2';
const OC={Dave:'#2A8BE8',Garth:'#E8572A',Both:'#9B59B6','—':'#666'};
const PC={
  critical:{l:'CRITICAL',c:'#E8572A',bg:'rgba(232,87,42,0.12)'},
  high:{l:'HIGH',c:'#2A8BE8',bg:'rgba(42,139,232,0.1)'},
  medium:{l:'MED',c:'#C4B225',bg:'rgba(232,212,42,0.1)'},
  blocked:{l:'BLOCKED',c:'#666',bg:'rgba(136,136,136,0.08)'}
};

const PHASES=[
  {id:'infra',title:'DO NOW',tf:'This Week',color:'#E8D42A',items:[
    {id:'i1',t:'Create new GitHub repo (separate from CallCoach — clean start)',o:'Dave',p:'critical'},
    {id:'i2',t:'Set up shared workspace — Claude Teams or Google Doc for async collaboration',o:'Dave',p:'critical'},
    {id:'i3',t:'Keep recording and transcribing every conversation about this project',o:'Both',p:'critical'},
    {id:'i4',t:'Create shared folder for competitive research, screenshots, notes',o:'Dave',p:'high'},
    {id:'i5',t:'Garth: Get a personal Bluebeam/ACC login if possible (not work-tied) for dev testing',o:'Garth',p:'medium'},
  ]},
  {id:'validate',title:'PHASE 1 — VALIDATE',tf:'Weeks 1–2',color:'#E8572A',items:[
    {id:'v1',t:'Garth records screen walkthrough of daily workflow (Construction Cloud → Bluebeam → Teams → Outlook)',o:'Garth',p:'critical'},
    {id:'v2',t:'Document 3 real project derailments: what broke, cost, who was involved, where info got lost',o:'Garth',p:'critical'},
    {id:'v3',t:'Identify 5–10 people at firm or other firms for 20-min pain-point interviews',o:'Garth',p:'critical'},
    {id:'v4',t:'Get Dave read-only access to Construction Cloud (schedule work-from-home day)',o:'Garth',p:'high'},
    {id:'v5',t:'Document the naming convention chaos across teams — what breaks, what varies',o:'Garth',p:'high'},
    {id:'v6',t:'Garth dumps every daily frustration into shared doc for 2 weeks (raw, unfiltered)',o:'Garth',p:'high'},
    {id:'v7',t:'Dave conducts 3–5 of the pain-point interviews (sales ear, listen for buying signals)',o:'Dave',p:'high'},
    {id:'v8',t:'Research Construction Cloud API — data model, auth flow, what\\'s accessible',o:'Dave',p:'high'},
    {id:'v9',t:'Research Bluebeam Studio API — sessions, webhooks, markup endpoints',o:'Dave',p:'medium'},
    {id:'v10',t:'Research Microsoft Graph API — Teams transcript access, meeting insights, permissions',o:'Dave',p:'high'},
  ]},
  {id:'prototype',title:'PHASE 2 — PROTOTYPE',tf:'Weeks 3–5',color:'#2A8BE8',items:[
    {id:'p1',t:'Build MVP: Teams transcript → AI-parsed action items + decision log per project',o:'Dave',p:'critical'},
    {id:'p2',t:'Use existing CallCoach architecture — retarget prompts for AEC coordination',o:'Dave',p:'critical'},
    {id:'p3',t:'Deploy to Railway, get Garth a login',o:'Dave',p:'critical'},
    {id:'p4',t:'Garth uses prototype on 5+ real meetings over 2 weeks',o:'Garth',p:'critical'},
    {id:'p5',t:'Collect feedback: what\\'s useful, what\\'s missing, what would make coworkers want it',o:'Both',p:'critical'},
    {id:'p6',t:'Show prototype to 2–3 coworkers — observe reactions, note exact words they use',o:'Garth',p:'high'},
    {id:'p7',t:'Iterate on AI prompt engineering — make action items architecture-specific, not generic',o:'Dave',p:'high'},
  ]},
  {id:'decide',title:'PHASE 3 — GO / NO-GO',tf:'Week 6',color:'#2AE86B',items:[
    {id:'d1',t:'Debrief: Did Garth use it every day? Did coworkers ask for access?',o:'Both',p:'critical'},
    {id:'d2',t:'Assess: Would Garth\\'s firm pay for this? What\\'s the price anchor?',o:'Both',p:'critical'},
    {id:'d3',t:'Decide: Kill it, pivot it, or go build Phase 4',o:'Both',p:'critical'},
    {id:'d4',t:'If GO → outline Phase 4 roadmap: ACC integration, Bluebeam sync, code compliance AI',o:'Dave',p:'high'},
  ]},
  {id:'notyet',title:'DO NOT DO YET',tf:'After validation',color:'#888',items:[
    {id:'n1',t:'Name the company',o:'—',p:'blocked'},
    {id:'n2',t:'Build a pitch deck',o:'—',p:'blocked'},
    {id:'n3',t:'Think about pricing or business model',o:'—',p:'blocked'},
    {id:'n4',t:'Build Construction Cloud or Bluebeam integrations',o:'—',p:'blocked'},
    {id:'n5',t:'Worry about Newforma or Egnyte competitive positioning',o:'—',p:'blocked'},
    {id:'n6',t:'Register a domain or build a landing page',o:'—',p:'blocked'},
  ]},
];

let checked={};
let expanded={infra:true,validate:true,prototype:false,decide:false,notyet:false};

function load(){try{const s=localStorage.getItem(SK);if(s)checked=JSON.parse(s)}catch{}}
function save(){try{localStorage.setItem(SK,JSON.stringify(checked))}catch{}}

function toggle(id){
  if(PHASES.find(p=>p.id==='notyet').items.some(i=>i.id===id))return;
  checked[id]=!checked[id];
  save();render();
  // haptic feedback on iOS
  if(navigator.vibrate)navigator.vibrate(10);
}

function togglePhase(id){
  expanded[id]=!expanded[id];
  render();
}

function resetAll(){
  if(confirm('Reset all checkboxes? This can\\'t be undone.')){
    checked={};save();render();
  }
}

function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function render(){
  const app=document.getElementById('app');
  const actionable=PHASES.filter(p=>p.id!=='notyet');
  const total=actionable.reduce((s,p)=>s+p.items.length,0);
  const done=actionable.reduce((s,p)=>s+p.items.filter(i=>checked[i.id]).length,0);
  const pct=Math.round(done/total*100);

  const tbar=document.getElementById('tbar');
  tbar.style.width=pct+'%';
  tbar.style.background=done===total?'#2AE86B':'linear-gradient(90deg,#E8572A,#2A8BE8)';
  document.getElementById('tcnt').textContent=done+'/'+total;

  let h='';
  PHASES.forEach(phase=>{
    const isNot=phase.id==='notyet';
    const isOpen=expanded[phase.id];
    const pItems=phase.items;
    const pDone=isNot?null:pItems.filter(i=>checked[i.id]).length;
    const pTotal=isNot?null:pItems.length;
    const pPct=isNot?0:Math.round(pDone/pTotal*100);

    h+='<div class="phase">';
    h+='<div class="ph" style="border-color:'+(isNot?'#222':phase.color+'33')+'" onclick="togglePhase(\\''+phase.id+'\\')">';
    h+='<div class="ph-l">';
    h+='<span class="ph-arrow '+(isOpen?'open':'')+'" style="color:'+(isOpen?phase.color:'#555')+'">▶</span>';
    h+='<span class="ph-t" style="color:'+(isNot?'#555':'#ccc')+'">'+phase.title+'</span>';
    h+='<span class="ph-tm">'+phase.tf+'</span>';
    h+='</div>';

    if(!isNot){
      h+='<div class="ph-r">';
      h+='<div class="ph-pb"><div class="ph-pf" style="width:'+pPct+'%;background:'+(pPct===100?'#2AE86B':phase.color)+'"></div></div>';
      h+='<span class="ph-pc" style="color:'+(pPct===100?'#2AE86B':'#555')+'">'+pDone+'/'+pTotal+'</span>';
      h+='</div>';
    }
    h+='</div>';

    if(isOpen){
      h+='<div class="items">';
      pItems.forEach(item=>{
        const isDone=!!checked[item.id];
        const cls='item'+(isDone?' done':'')+(isNot?' blocked':'');
        const oc=OC[item.o]||'#666';
        const pc=PC[item.p];

        h+='<div class="'+cls+'" onclick="'+(isNot?'':'toggle(\\''+item.id+'\\')' )+'">';
        h+='<div class="cb">'+(isDone?'<span style="color:#0D0D0D;font-size:11px;font-weight:700">✓</span>':(isNot?'<span style="color:#444;font-size:10px">✕</span>':''))+'</div>';
        h+='<div class="item-body">';
        h+='<div class="item-txt">'+esc(item.t)+'</div>';
        h+='<div class="item-tags">';
        h+='<span class="tag" style="color:'+oc+';background:'+oc+'15">'+esc(item.o)+'</span>';
        if(item.p!=='blocked')h+='<span class="tag" style="color:'+pc.c+';background:'+pc.bg+'">'+pc.l+'</span>';
        h+='</div></div></div>';
      });
      h+='</div>';
    }
    h+='</div>';
  });

  app.innerHTML=h;
}

load();
render();
</script>
</body>
</html>`);
});

module.exports = router;
