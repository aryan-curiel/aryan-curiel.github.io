/* Aryan in ASCII · portfolio drawn entirely in text characters.
   All content lives in the PROFILE, EXPERIENCE, SKILLS, EDUCATION, TIMELINE and WORDS constants below. */
(() => {
const scr = document.getElementById('screen');
const bgEl = document.getElementById('bg');
const toastEl = document.getElementById('toast');
const arcEl = document.getElementById('arcade');
const ascr = document.getElementById('ascreen');
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion = !reduced;
// ✏️  set your public email here (shown in the contact box and recruiter mode)
const EMAIL = 'you@yourdomain.dev';
const LINKS = [['linkedin', 'https://www.linkedin.com/in/aryan-curiel/', 'linkedin.com/in/aryan-curiel'], ['github', 'https://github.com/aryan-curiel', 'github.com/aryan-curiel']];
const rand = n => Math.floor(Math.random() * n);
const pick = a => a[rand(a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);

const CS = {
  unicode: { tl:'┌', tr:'┐', bl:'└', br:'┘', h:'─', v:'│', full:'█', empty:'░', head:'▓', node:'●', on:'•', blk:'█',
             spin:['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'], pulse:['●','•','·','•'],
             star:['.','·','*'], fade:['.','·','+','*'], obs:'▲', pillar:'█', coin:'◆', gnd:'─', gnd2:'╌', scrBlk:'░▒▓█',
             ship:'/▲\\', ball:'●', paddle:'▀', pad:'█', net:'┊', bug:'ж', splat:'*', closed:'■', flag:'▲',
             snakeH:'●', snakeB:'▓', cell:'██', ghost:'░░', e2:' ·', corr:'░', nl:'¶',
             arrows:{ '←':'←', '↑':'↑', '↓':'↓', '→':'→' }, rock:['/"\\', '\\_/'] },
  ascii:   { tl:'+', tr:'+', bl:'+', br:'+', h:'-', v:'|', full:'#', empty:'.', head:'=', node:'o', on:'*', blk:'#',
             spin:['|','/','-','\\'], pulse:['*','o','.','o'],
             star:['.','.','*'], fade:['.','.','+','*'], obs:'^', pillar:'#', coin:'$', gnd:'_', gnd2:'.', scrBlk:'.:+#',
             ship:'/^\\', ball:'o', paddle:'=', pad:'#', net:':', bug:'x', splat:'*', closed:'#', flag:'F',
             snakeH:'O', snakeB:'o', cell:'[]', ghost:'::', e2:' .', corr:':', nl:'<',
             arrows:{ '←':'<', '↑':'^', '↓':'v', '→':'>' }, rock:['/"\\', '\\_/'] }
};
const SCR_SYM = '!<>-_/[]{}=+*^?#%&';
const PRESETS = {
  phosphor: { bg:'#0b110d', fg:'#b9dcc1', dim:'#5c7a64', acc:'#7ff0a0', hi:'#eafff0' },
  amber:    { bg:'#15100a', fg:'#efc47f', dim:'#86683f', acc:'#ffac3f', hi:'#fff2da' },
  ice:      { bg:'#0d1620', fg:'#c3d5e6', dim:'#5d7287', acc:'#7cc6ff', hi:'#ffffff' },
  paper:    { bg:'#ecedea', fg:'#23272a', dim:'#7b8285', acc:'#c03e12', hi:'#000000' }
};
const KEYS = [['bg','background'],['fg','text'],['dim','muted'],['acc','accent'],['hi','highlight']];
const ACH = {
  jump:'first jump', coin:'grabbed a coin', score100:'100 points in run.exe',
  explorer:'opened every role', hacker:'mixed a custom color', ascii:'went full 7-bit',
  spark:'made some sparks', konami:'found the secret', arcade5:'played 5 arcade games',
  shell:'read every file in the shell', typist:'typed code at 50+ wpm', sweeper:'cleared a minefield',
  hidden:'launched the hidden game', astronomer:'clicked every planet and the moon'
};
const NEED = 5;

const DEFAULTS = () => ({ cs:'unicode', preset:'system', custom:{}, fx:{ stars:true, space:true, sparks:true, crt:false, glow:false }, open:{}, hs:{}, ach:{}, played:{}, matrix:false, recruiter:false });
let S = DEFAULTS();
try {
  const s = JSON.parse(localStorage.getItem('ascii-portfolio') || 'null');
  if (s) {
    S = Object.assign(S, s);
    S.fx = Object.assign(DEFAULTS().fx, s.fx || {});
    S.hs = s.hs || {}; S.played = s.played || {};
    if (typeof s.hi === 'number' && s.hi) S.hs.run = Math.max(S.hs.run || 0, s.hi);
    if (s.glow) S.fx.glow = true;
  }
} catch (e) {}
const msg = {};
const save = () => { try { localStorage.setItem('ascii-portfolio', JSON.stringify(S)); } catch (e) {} };
const achCount = () => Object.keys(S.ach).filter(k => ACH[k]).length;

/* ---------- content (from aryan-curiel.github.io) ---------- */
const PROFILE = {
  name: 'Aryan Curiel Pardo',
  title: 'senior software engineer & tech lead',
  summary: 'Senior Software Engineer and Tech Lead with 8+ years of experience. I build AI-powered products, async APIs and distributed systems: LLM agents, RAG systems and FastAPI backends.'
};
const EXPERIENCE = [
  { id:'frontier', co:'Frontier Teams', role:'Senior Software Engineer / Tech Lead', when:'2025 - now', dates:'Oct 2025 - present', loc:'Zaragoza, Spain', current:true,
    tags:['fastapi','agents','mcp','etl'], desc:'AI-focused tools for non-tech businesses: async FastAPI services, ETL pipelines, multi-agent systems and MCP servers.' },
  { id:'modsy', co:'Modsy / Lennar', role:'Senior Software Engineer / Engineering Team Leader', when:'2021 - 2025', dates:'Oct 2021 - Oct 2025', loc:'Sofia, Bulgaria',
    tags:['leadership','ai/ml'], desc:'Online interior design platform. Managed delivery, mentored engineers and guided AI/ML initiatives.' },
  { id:'loyalize', co:'Loyalize', role:'Senior Software Engineer / Team Leader', when:'2020 - 2022', dates:'Oct 2020 - Oct 2022', loc:'London, UK',
    tags:['rest','apis','leadership'], desc:'Coordinated engineering projects and built RESTful APIs.' },
  { id:'commerzbank', co:'DTC Commerzbank', role:'Senior Software Engineer (via Bulpros)', when:'2020 - 2021', dates:'Nov 2020 - Oct 2021', loc:'Sofia, Bulgaria',
    tags:['migration','spring','react','python'], desc:'Led a migration from legacy Silverlight systems to Spring, React and Python.' },
  { id:'vmware', co:'VMware PSCoE', role:'Software Engineer (via Musala Soft)', when:'2019 - 2020', dates:'Oct 2019 - Oct 2020', loc:'Sofia, Bulgaria',
    tags:['automation','vision'], desc:'Built migration automation and a background-removal service using image segmentation.' },
  { id:'liberty', co:'Liberty Power', role:'Full-Stack Developer', when:'2018 - 2019', dates:'Sep 2018 - Oct 2019', loc:'Florida, USA',
    tags:['react','python','microservices'], desc:'Modernized legacy systems into React and Python microservices.' },
  { id:'segurmatica', co:'Segurmatica', role:'Software Engineer', when:'2018 - 2019', dates:'Sep 2018 - May 2019', loc:'Havana, Cuba',
    tags:['ml','security'], desc:'Built ML-powered false-alarm detection tools for antivirus software.' },
  { id:'zanahoria', co:'La Zanahoria', role:'Full-Stack Developer', when:'2016 - 2019', dates:'May 2016 - Jun 2019', loc:'Havana, Cuba',
    tags:['full-stack','mentoring'], desc:'Built applications and mentored junior team members.' }
];
const SKILLS = [
  ['languages', ['Python','JavaScript','TypeScript','C#','Java','Dart','Go','Rust','Ruby','PHP','C/C++','Haskell','Prolog']],
  ['databases', ['PostgreSQL','MySQL','MongoDB','SQLite','T-SQL']],
  ['frameworks', ['FastAPI','asyncio','Django/DRF','React','React Native','Node.js','Flask','LangChain','Pydantic AI','Polars/Pandas','Keras','PyTorch','TensorFlow','Pillow/OpenCV']],
  ['infra & devops', ['AWS','Docker','GitHub Actions','CircleCI','RabbitMQ','Sentry','Datadog','Keycloak','Auth0','Git']],
  ['ai/ml & design', ['RAG systems','LLM agents','MCP servers','NeuralProphet','OpenRouter','SOLID','design patterns','system design','pytest','NLP','web scraping']]
];
const EDUCATION = { school:'University of Havana', degree:'Lic. in Computer Science', when:'2013 - 2018', loc:'Havana, Cuba', thesis:'Learning Semantic Representations from Knowledge Bases' };
const LANGS = 'Spanish (native) · English (fluent)';
const TIMELINE = [
  { when:'2025', title:'Frontier Teams', text:'Tech lead. AI tools, agents and MCP servers. Zaragoza.' },
  { when:'2021', title:'Modsy / Lennar', text:'Engineering team leader. Sofia.' },
  { when:'2020', title:'Loyalize · DTC Commerzbank', text:'Team lead in London, legacy migration in Sofia.' },
  { when:'2019', title:'VMware PSCoE', text:'Automation and image segmentation. Sofia.' },
  { when:'2018', title:'Liberty Power · Segurmatica', text:'Microservices for Florida, ML for antivirus in Havana.' },
  { when:'2016', title:'La Zanahoria', text:'First full-stack role. Havana.' },
  { when:'2013', title:'University of Havana', text:'Computer Science. Thesis on semantic representations from knowledge bases.' }
];
const WORDS = [
  ['python','core language: FastAPI, asyncio, Django/DRF'], ['fastapi','async API services at Frontier Teams'],
  ['rag','retrieval-augmented generation systems'], ['agents','LLM and multi-agent systems'],
  ['mcp','MCP servers for AI tooling'], ['react','front ends, plus React Native'],
  ['typescript','typed front ends and Node.js'], ['postgres','go-to relational database'],
  ['docker','containers, shipped on AWS'], ['aws','cloud infrastructure'],
  ['pytorch','deep learning, with Keras and TensorFlow'], ['langchain','LLM orchestration'],
  ['pydantic','Pydantic AI for typed agents'], ['rust','one of 13 languages on the list'],
  ['go','one of 13 languages on the list'], ['haskell','functional roots from university'],
  ['rabbitmq','queues for distributed systems'], ['polars','data work, alongside Pandas'],
  ['opencv','image work, like background removal at VMware'], ['sentry','error tracking in production']
];

/* ---------- segments ---------- */
const T = (t, c, deco) => ({ t, c, deco });
const D = t => ({ t, c:'b', deco:true });
const B = (t, act, c, pressed) => ({ k:'b', t, act, c, pressed });
const A = (t, href) => ({ k:'a', t, href });
const L = (t, forId) => ({ k:'l', t, for: forId });
const I = (id, n, ph) => ({ k:'i', id, t:' '.repeat(n), ph });
const R = (html, n) => ({ k:'r', html, t:' '.repeat(n) });
const esc = s => String(s).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const len = line => line.reduce((n, s) => n + s.t.length, 0);
const pad = (line, w) => { const n = len(line); return n < w ? [...line, T(' '.repeat(w - n))] : line; };
const slot = (text, cls, attrs = '') => R(`<span class="${cls}" ${attrs}>${esc(text)}</span>`, text.length);
const scrSlot = (text, cls, key, set) => R(`<span class="scr ${cls}" data-key="${esc(key)}" data-set="${set}" data-text="${esc(text)}">${esc(text)}</span>`, text.length);

function segHTML(s) {
  const t = esc(s.t);
  switch (s.k) {
    case 'b': return `<button type="button" class="lk ${s.c||''}" data-act="${esc(s.act)}"${s.pressed!==undefined?` aria-pressed="${s.pressed}"`:''}>${t}</button>`;
    case 'a': return `<a class="lk" href="${esc(s.href)}" target="_blank" rel="noopener">${t}</a>`;
    case 'l': return `<label class="lk" for="${s.for}">${t}</label>`;
    case 'i': return `<input id="${s.id}" class="fi" style="width:${s.t.length}ch" autocomplete="off" aria-label="${esc(s.ph)}" placeholder="${esc(s.ph)}">`;
    case 'r': return s.html;
    default: return s.c ? `<span class="${s.c}"${s.deco?' aria-hidden="true"':''}>${t}</span>` : t;
  }
}
const toHTML = lines => lines.map(l => l.map(segHTML).join('')).join('\n');

/* ---------- layout helpers ---------- */
function wrap(text, w) {
  const out = []; let cur = '';
  for (const wd of String(text).split(/ +/)) {
    if (!cur) cur = wd;
    else if (cur.length + 1 + wd.length <= w) cur += ' ' + wd;
    else { out.push(cur); cur = wd; }
    while (cur.length > w) { out.push(cur.slice(0, w)); cur = cur.slice(w); }
  }
  if (cur || !out.length) out.push(cur);
  return out;
}
function flow(items, w, gap = 2) {
  const lines = []; let cur = [], n = 0;
  for (const it of items) {
    const l = it.t.length;
    if (n && n + gap + l > w) { lines.push(cur); cur = []; n = 0; }
    if (n) { cur.push(T(' '.repeat(gap))); n += gap; }
    cur.push(it); n += l;
  }
  if (cur.length) lines.push(cur);
  return lines;
}
const labeled = (label, lw, lines) => lines.map((l, i) => [T((i ? '' : label).padEnd(lw), 'dim'), ...l]);
function box(title, body, w, id) {
  const c = CS[S.cs];
  const top = [];
  if (id) top.push(R(`<span id="s-${id}"></span>`, 0));
  top.push(D(c.tl + c.h));
  if (title) top.push(id ? scrSlot(' ' + title + ' ', 'hi', 't:' + id, 'sym') : T(' ' + title + ' ', 'hi'));
  top.push(D(c.h.repeat(Math.max(0, w - len(top) - 1)) + c.tr));
  const out = [top];
  for (const l of body) out.push([D(c.v + ' '), ...pad(l, w - 4), D(' ' + c.v)]);
  out.push([D(c.bl + c.h.repeat(w - 2) + c.br)]);
  return out;
}
function cols(blocks, ws, gap) {
  const h = Math.max(...blocks.map(b => b.length)); const out = [];
  for (let i = 0; i < h; i++) {
    const line = [];
    blocks.forEach((b, j) => { if (j) line.push(T(' '.repeat(gap))); line.push(...pad(b[i] || [], ws[j])); });
    out.push(line);
  }
  return out;
}
function kv(k, v, iw, cls, valSeg) {
  const kw = 14, vw = Math.max(8, iw - kw - 1);
  return wrap(v, vw).map((p, i) => i
    ? [T(' '.repeat(kw + 1)), T(p, cls)]
    : [T(k + ' ', 'dim'), D('.'.repeat(Math.max(1, kw - k.length - 1))), T(' '), ...(valSeg ? [valSeg] : []), T(p, cls)]);
}

/* ---------- banner ---------- */
const GL = {
  A:[' ███ ','█   █','█████','█   █','█   █'],
  R:['████ ','█   █','████ ','█  █ ','█   █'],
  Y:['█   █',' █ █ ','  █  ','  █  ','  █  '],
  N:['█   █','██  █','█ █ █','█  ██','█   █']
};
const banner = word => [0,1,2,3,4].map(r => {
  const row = word.split('').map(ch => GL[ch][r]).join(' ');
  return S.cs === 'ascii' ? row.replace(/█/g, '#') : row;
});

/* ---------- page sections ---------- */
function card(p, w, extra = 0) {
  const iw = w - 4, c = CS[S.cs];
  const btxt = p.current ? `[ ${c.spin[0]} ${p.when} ]` : `[ ${p.when} ]`;
  const badge = p.current
    ? R(`<span class="hi">[ <span class="spin acc">${esc(c.spin[0])}</span> ${esc(p.when)} ]</span>`, btxt.length)
    : T(btxt, 'dim');
  const body = [];
  if (p.co.length + btxt.length + 1 <= iw) body.push([T(p.co, 'hi'), T(' '.repeat(iw - p.co.length - btxt.length)), badge]);
  else body.push([T(p.co, 'hi')], [badge]);
  body.push(...wrap(p.role, iw).map(l => [T(l, 'acc')]));
  body.push(...flow(p.tags.map(t => T('#' + t, 'dim')), iw, 1));
  body.push([]);
  body.push(...wrap(p.desc, iw).map(l => [T(l)]));
  if (S.open[p.id]) {
    body.push([]);
    body.push(...kv('dates', p.dates, iw), ...kv('location', p.loc, iw));
  }
  for (let i = 0; i < extra; i++) body.push([]);
  body.push([]);
  body.push([B(S.open[p.id] ? '[ - less ]' : '[ + more ]', 'tog:' + p.id, '', !!S.open[p.id])]);
  return body;
}

function gameBox(W) {
  const iw = W - 4;
  const body = [];
  body.push(...flow([
    T('score', 'dim'), slot('000000', 'hi', 'id="g-score"'),
    T('hi', 'dim'), slot(String(S.hs.run || 0).padStart(6, '0'), 'acc', 'id="g-hi"'),
    B('[ play ]', 'arcade')
  ], iw, 1));
  body.push([]);
  for (let r = 0; r < 3; r++) body.push([slot(' '.repeat(iw), 'gm', `id="g-r${r}"`)]);
  body.push([slot(' '.repeat(iw), 'gm b', 'id="g-gr" aria-hidden="true"')]);
  body.push(...wrap(`press play for the arcade · ${GAME_ORDER.length - 1} games and a secret one`, iw).map(l => [T(l, 'dim')]));
  return box('run.exe', body, W, 'play');
}

function themeBox(W) {
  const iw = W - 4, c = CS[S.cs], lw = 9;
  const radio = (on, label, act) => B(`(${on ? c.on : ' '}) ${label}`, act, on ? 'hi' : '', on);
  const check = (key, label) => B(`[${S.fx[key] ? 'x' : ' '}] ${label}`, 'fx:' + key, S.fx[key] ? 'hi' : '', S.fx[key]);
  const body = [];
  body.push(...labeled('preset', lw, flow(['system','phosphor','amber','ice','paper'].map(p => radio(S.preset === p && !Object.keys(S.custom).length, p, 'preset:' + p)), iw - lw)));
  body.push(...labeled('charset', lw, flow([radio(S.cs === 'unicode', 'unicode', 'cs:unicode'), radio(S.cs === 'ascii', 'ascii 7-bit', 'cs:ascii')], iw - lw)));
  body.push(...labeled('effects', lw, flow([check('stars','stars'), check('space','space'), check('sparks','sparks'), check('crt','crt'), check('glow','glow')], iw - lw)));
  body.push([]);
  const cs = getComputedStyle(root);
  for (const [k, name] of KEYS) {
    const v = toHex(cs.getPropertyValue('--' + k).trim());
    document.getElementById('ci-' + k).value = v;
    body.push([R(`<span style="color:var(--${k})" aria-hidden="true">${c.blk + c.blk}</span>`, 2), T(' ' + name.padEnd(11)), T(v, 'dim'), T('  '), L('[ edit ]', 'ci-' + k)]);
  }
  body.push([]);
  const note = Object.keys(S.custom).length ? 'custom colors · saved in this browser' : 'saved in this browser';
  body.push(...flow([B('[ reset ]', 'reset'), T(note, 'dim')], iw));
  return box('theme', body, W, 'theme');
}

function build(W) {
  if (S.recruiter) return buildRecruiter(W);
  const c = CS[S.cs], out = [];
  const push = (...ls) => out.push(...ls), blank = () => out.push([]);
  const iw = W - 4;

  // header
  const ban = banner('ARYAN').map((r, i) => [scrSlot(r, 'acc', 'ban' + i, 'blk')]);
  const info = [[T(PROFILE.name.toLowerCase(), 'hi')], [T(PROFILE.title, 'acc')], [T('8+ years · zaragoza, spain', 'dim')], [T('llm agents · rag · fastapi', 'dim')], []];
  if (W >= 29 + 4 + 37) push(...cols([ban, info], [29, W - 33], 4));
  else { push(...ban); blank(); push(...info.slice(0, 4)); }
  blank();
  push([T('aryan@zaragoza', 'acc'), T(':', 'dim'), T('~', 'hi'), T('$ ', 'dim'), R(`<span id="typed"></span><span class="cur" aria-hidden="true">${c.blk}</span>`, 1)]);
  push([T('in a hurry? ', 'dim'), B('[ recruiter mode ]', 'recruiter'), T(' plain cv, no games', 'dim')]);
  blank();
  push(...flow(['play','theme','about','experience','skills','timeline','contact'].map(n => B(`[ ${n} ]`, n === 'play' ? 'arcade' : 'go:' + n)), W, 1));
  blank();

  push(...gameBox(W)); blank();
  push(...themeBox(W)); blank();

  // about
  const about = [
    ...wrap(PROFILE.summary, iw).map(l => [T(l)]),
    [],
    ...kv('location', 'Zaragoza, Spain (CET)', iw),
    ...kv('currently', 'Tech Lead at Frontier Teams', iw, '', slot(c.pulse[0], 'pulse acc')),
    ...kv('education', EDUCATION.degree + ', ' + EDUCATION.school, iw),
    ...kv('languages', LANGS, iw)
  ];
  push(...box('about', about, W, 'about')); blank();

  // experience
  push([R('<span id="s-experience"></span>', 0), D(c.h + c.h + ' '), scrSlot('experience', 'hi', 't:experience', 'sym'), T(' '), D(c.h.repeat(Math.max(0, W - 14)))]);
  blank();
  if (W >= 84) {
    const w1 = Math.floor((W - 2) / 2), w2 = W - 2 - w1;
    for (let i = 0; i < EXPERIENCE.length; i += 2) {
      const a = EXPERIENCE[i], b = EXPERIENCE[i + 1];
      if (!b) { push(...box(null, card(a, w1), w1)); break; }
      const la = card(a, w1).length, lb = card(b, w2).length, h = Math.max(la, lb);
      push(...cols([box(null, card(a, w1, h - la), w1), box(null, card(b, w2, h - lb), w2)], [w1, w2], 2));
      blank();
    }
  } else {
    EXPERIENCE.forEach(p => { push(...box(null, card(p, W), W)); blank(); });
  }
  blank();

  // skills
  const lw = 16;
  const sk = [];
  SKILLS.forEach(([cat, list], i) => {
    if (i) sk.push([]);
    if (iw >= 50) sk.push(...labeled(cat, lw, flow(list.map(t => T(t)), iw - lw, 1).map((l, j) => j ? l : l)).map((l, j) => j ? l : [scrSlot(cat.padEnd(lw), 'acc', 'sk:' + cat, 'sym'), ...l.slice(1)]));
    else { sk.push([scrSlot(cat, 'acc', 'sk:' + cat, 'sym')]); sk.push(...flow(list.map(t => T(t)), iw, 1)); }
  });
  push(...box('skills', sk, W, 'skills')); blank();

  // timeline
  const tl = [];
  TIMELINE.forEach((e, i) => {
    const last = i === TIMELINE.length - 1, tw = iw - 10;
    tl.push([T(e.when.padEnd(7), 'dim'), slot(c.node, i === 0 ? 'pulse acc' : 'acc'), T('  '), T(e.title.slice(0, iw - 10), 'hi')]);
    wrap(e.text, tw).forEach(l => tl.push([T(' '.repeat(7)), D(last ? ' ' : c.v), T('  ' + l)]));
    if (!last) tl.push([T(' '.repeat(7)), D(c.v)]);
  });
  push(...box('timeline', tl, W, 'timeline')); blank();

  // contact
  const fw = iw - 9;
  const contact = [
    ...LINKS.map(([k, href, label]) => [T(k.padEnd(9), 'dim'), A(label.slice(0, fw), href)]),
    [T('email'.padEnd(9), 'dim'), T(EMAIL, 'hi'), T('  '), B(msg.copy ? '[ copied ]' : '[ copy ]', 'copy')],
    [],
    [T('name'.padEnd(9), 'dim'), I('f-name', Math.min(28, fw), 'your name')],
    [T('message'.padEnd(9), 'dim'), I('f-msg', fw, 'what are you building?')],
    [],
    [T(' '.repeat(9)), B('[ send ]', 'send'), ...(msg.send ? [T('  '), T(msg.send.slice(0, Math.max(0, fw - 10)), 'dim')] : [])]
  ];
  push(...box('contact', contact, W, 'contact')); blank();

  // footer
  const total = Object.keys(ACH).length;
  const foot = [D(c.h.repeat(2)), T(' 0 images · ', 'dim'), slot('     0', 'dim', 'id="count"'), T(' chars · ', 'dim'),
    T(S.cs === 'ascii' ? '* ' : '★ ', 'acc'), slot(String(achCount()), 'acc', 'id="achc"'), T('/' + total + ' ', 'dim')];
  foot.push(D(c.h.repeat(Math.max(0, W - len(foot)))));
  push(foot);
  push(...wrap('hint: the konami code still works here', W).map(l => [T(l, 'dim')]));
  return out;
}

/* ---------- render ---------- */
let W = 0, typed = '', CW = 8.4, LH = 19.6;
const RATIO = () => CW / LH;
function measure() {
  scr.innerHTML = '<span id="m">' + 'M'.repeat(100) + '</span>';
  CW = document.getElementById('m').getBoundingClientRect().width / 100 || 8.4;
  LH = parseFloat(getComputedStyle(scr).lineHeight) || CW * 1.66;
  const avail = scr.getBoundingClientRect().width;
  return Math.max(30, Math.min(100, Math.floor((avail - 1) / CW)));
}
function render() {
  const keep = {};
  scr.querySelectorAll('input').forEach(i => keep[i.id] = i.value);
  const ae = document.activeElement;
  const active = ae && scr.contains(ae) ? (ae.id || ae.dataset.act) : null;
  W = measure();
  if (!Gp || Gp.w !== W - 4) Gp = runInit(W - 4, 5, true);
  scr.innerHTML = toHTML(build(W));
  for (const id in keep) { const el = document.getElementById(id); if (el) el.value = keep[id]; }
  const tyEl = document.getElementById('typed'); if (tyEl) tyEl.textContent = typed;
  const cnEl = document.getElementById('count'); if (cnEl) cnEl.textContent = scr.textContent.length.toLocaleString('en').padStart(6);
  if (active) {
    const el = document.getElementById(active) || scr.querySelector(`[data-act="${active}"]`);
    if (el) el.focus({ preventScroll: true });
  }
  gDraw();
  observe();
  bgSize();
  spaceLayout();
  if (ARC.open && ARC.view === 'menu') { arcadeSize(); arcadeRender(); }
}

/* ---------- theme ---------- */
function toHex(v) {
  if (/^#[0-9a-f]{6}$/i.test(v)) return v.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(v)) return '#' + v.slice(1).split('').map(x => x + x).join('').toLowerCase();
  const m = v.match(/\d+/g);
  return m ? '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('') : '#000000';
}
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
function applyTheme() {
  KEYS.forEach(([k]) => root.style.removeProperty('--' + k));
  root.style.colorScheme = '';
  const vals = Object.assign({}, PRESETS[S.preset] || {}, S.custom);
  for (const k in vals) root.style.setProperty('--' + k, vals[k]);
  if (Object.keys(vals).length) {
    const bg = vals.bg || toHex(getComputedStyle(root).getPropertyValue('--bg').trim());
    root.style.colorScheme = lum(bg) > 0.5 ? 'light' : 'dark';
  }
  root.classList.toggle('glow', !!S.fx.glow && !S.recruiter);
  root.classList.toggle('crt', !!S.fx.crt && !S.recruiter);
}

/* ---------- achievements ---------- */
const toastQ = []; let toastBusy = false;
function achieve(key) {
  if (S.ach[key] || !ACH[key]) return;
  S.ach[key] = 1; save();
  const el = document.getElementById('achc');
  if (el) el.textContent = achCount();
  toastQ.push(ACH[key]);
  if (achCount() === NEED) toastQ.push('hidden game unlocked in the arcade');
  nextToast();
  if (ARC.open && ARC.view === 'menu') arcadeRender();
}
function nextToast() {
  if (toastBusy || !toastQ.length) return;
  toastBusy = true;
  const text = toastQ.shift();
  const star = S.cs === 'ascii' ? '*' : '★';
  const w = Math.min(Math.max(28, text.length + 6), Math.max(24, W));
  toastEl.innerHTML = toHTML(box(`${star} achievement ${achCount()}/${Object.keys(ACH).length}`, wrap(text, w - 4).map(l => [T(l, 'hi')]), w));
  requestAnimationFrame(() => toastEl.classList.add('show'));
  setTimeout(() => { toastEl.classList.remove('show'); setTimeout(() => { toastBusy = false; nextToast(); }, 450); }, 2800);
}

/* ---------- text grid used by every game ---------- */
class Grid {
  constructor(w, h) { this.w = w; this.h = h; this.c = new Array(w * h); this.k = new Array(w * h); this.clear(); }
  clear() { this.c.fill(' '); this.k.fill(''); }
  set(x, y, ch, k = '') { x = Math.floor(x); y = Math.floor(y); if (x < 0 || y < 0 || x >= this.w || y >= this.h) return; const i = y * this.w + x; this.c[i] = ch; this.k[i] = k; }
  get(x, y) { return this.c[y * this.w + x]; }
  text(x, y, s, k = '') { let i = 0; for (const ch of String(s)) { this.set(x + i, y, ch, k); i++; } }
  center(y, s, k = '') { this.text(Math.floor((this.w - [...s].length) / 2), y, s, k); }
  rect(x, y, w, h, k = 'b') {
    const c = CS[S.cs];
    for (let i = 1; i < w - 1; i++) { this.set(x + i, y, c.h, k); this.set(x + i, y + h - 1, c.h, k); }
    for (let j = 1; j < h - 1; j++) { this.set(x, y + j, c.v, k); this.set(x + w - 1, y + j, c.v, k); }
    this.set(x, y, c.tl, k); this.set(x + w - 1, y, c.tr, k); this.set(x, y + h - 1, c.bl, k); this.set(x + w - 1, y + h - 1, c.br, k);
  }
  row(y) {
    let out = '', run = '', cls = null;
    for (let x = 0; x < this.w; x++) {
      const i = y * this.w + x, k = this.k[i];
      if (k !== cls) { if (run) out += cls ? `<span class="${cls}">${esc(run)}</span>` : esc(run); run = ''; cls = k; }
      run += this.c[i];
    }
    if (run) out += cls ? `<span class="${cls}">${esc(run)}</span>` : esc(run);
    return out;
  }
}
const DIRS = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };

/* ---------- run.exe (page demo + arcade game) ---------- */
const JUMP = [1, 2, 2, 2, 2, 1];
const RPX = 4;
const CLOUDS = ['.-~~-.', '.--.', '~-~', '.-~-.'];
function runInit(w, h, auto) {
  const gy = h - 3;
  const s = { w, h, auto, score:0, obs:[], coins:[], ground:Array.from({ length:w }, () => Math.random() < .12), clouds:[],
    cy0: auto ? 0 : 1, cyN: auto ? 1 : Math.max(1, gy - 4), jt:-1, want:-99, frame:0, next:14, ht:0, flash:0 };
  for (let x = 2; x < w; x += 12 + rand(12)) s.clouds.push({ x, y: s.cy0 + rand(s.cyN), s: pick(CLOUDS) });
  return s;
}
function runStep(s) {
  if (s.over) return;
  s.frame++;
  s.obs.forEach(o => o.x--); s.coins.forEach(o => o.x--);
  s.obs = s.obs.filter(o => o.x > -3); s.coins = s.coins.filter(o => o.x > -1 && !o.got);
  s.ground.push(Math.random() < .12); s.ground.shift();
  if (s.frame % 4 === 0) {
    s.clouds.forEach(cl => cl.x--);
    s.clouds = s.clouds.filter(cl => cl.x + cl.s.length > 0);
    const last = s.clouds[s.clouds.length - 1];
    if (!last || last.x < s.w - 14 - rand(14)) s.clouds.push({ x: s.w, y: s.cy0 + rand(s.cyN), s: pick(CLOUDS) });
  }
  if (--s.next <= 0) {
    const r = Math.random();
    s.obs.push(r < .2 ? { x: s.w, w: 1, tall: true } : r < .45 ? { x: s.w, w: 2 } : { x: s.w, w: 1 });
    s.next = 10 + rand(14);
    if (Math.random() < .6 && s.next > 9) s.coins.push({ x: s.w + 4 + rand(s.next - 9), h: 2 });
  }
  if (s.jt >= 0) { s.jt++; if (s.jt >= JUMP.length) s.jt = -1; }
  if (s.auto && s.jt < 0) {
    const d = s.obs.map(o => o.x - RPX);
    if (d.some(x => x === 1 || x === 2)) s.want = s.frame;
    else if (s.coins.some(cn => cn.x - RPX === 2) && !d.some(x => x >= 3 && x <= 8)) s.want = s.frame;
  }
  if (s.jt < 0 && s.frame - s.want <= 2) { s.jt = 0; s.want = -99; }
  s.ht = s.jt >= 0 ? JUMP[s.jt] : 0;
  for (const o of s.obs) if (RPX >= o.x && RPX < o.x + o.w && (s.ht === 0 || (o.tall && s.ht < 2))) { s.over = true; return; }
  for (const cn of s.coins) if (cn.x === RPX && cn.h === s.ht) { cn.got = true; s.score += 10; s.flash = 4; if (!s.auto) achieve('coin'); }
  if (s.frame % 2 === 0) s.score++;
  if (!s.auto && s.score >= 100) achieve('score100');
}
function runDraw(s, g, gy) {
  const c = CS[S.cs];
  s.clouds.forEach(cl => g.text(cl.x, cl.y, cl.s, 'b'));
  s.coins.forEach(cn => g.set(cn.x, gy - cn.h, c.coin, 'coin'));
  s.obs.forEach(o => {
    for (let i = 0; i < o.w; i++) g.set(o.x + i, gy, o.tall ? c.pillar : c.obs, 'ob');
    if (o.tall) g.set(o.x, gy - 1, c.obs, 'ob');
  });
  g.set(RPX, gy - s.ht, s.over ? 'X' : '@', 'pl');
  if (s.ht > 0 && s.jt < 3) g.set(RPX - 1, gy, c.fade[1], 'b');
}
let Gp = null, Gvis = true, Gacc = 0, gReset = 0;
function gDraw() {
  const r0 = document.getElementById('g-r0');
  if (!r0 || !Gp) return;
  const c = CS[S.cs], g = new Grid(Gp.w, 3);
  runDraw(Gp, g, 2);
  if (Math.floor(Gp.frame / 10) % 2 === 0 && !Gp.over) g.text(Gp.w - 4, 0, 'DEMO', 'dim');
  for (let i = 0; i < 3; i++) document.getElementById('g-r' + i).innerHTML = g.row(i);
  document.getElementById('g-gr').textContent = Gp.ground.map(v => v ? c.gnd2 : c.gnd).join('');
  const sc = document.getElementById('g-score');
  sc.textContent = String(Gp.score).padStart(6, '0');
  sc.className = Gp.flash > 0 ? 'flash' : 'hi';
  if (Gp.flash > 0) Gp.flash--;
  document.getElementById('g-hi').textContent = String(S.hs.run || 0).padStart(6, '0');
}

/* =====================================================================
   ARCADE GAMES
   each game: name, blurb, help, ctrl(s) -> [[label, action]], init(w,h),
   optional step (fixed rate) / update(dt, held) / input(a, raw) / tap(x,y) / point(x,y), draw(g)
   ===================================================================== */
const GAMES = {};

GAMES.run = {
  name:'run.exe', blurb:'endless runner, grab the coins', help:'space, up or tap to jump. coins are worth 10.',
  ctrl: () => [['jump','fire']],
  rate: s => Math.max(38, 80 - s.score * 0.08),
  init: (w, h) => runInit(w, h, false),
  input(s, a) { if (a === 'fire' || a === 'up') { s.want = s.frame; achieve('jump'); } },
  step: runStep,
  draw(s, g) {
    const c = CS[S.cs], gy = g.h - 3;
    runDraw(s, g, gy);
    s.ground.forEach((v, x) => { g.set(x, gy + 1, v ? c.gnd2 : c.gnd, 'b'); if (((x + s.frame) * 37) % 13 === 0) g.set(x, gy + 2, '.', 'b'); });
  }
};

/* snake: eat the tags */
GAMES.snake = {
  name:'snake', blurb:'eat the skills, grow the stack', help:'arrows, wasd or swipe to steer. each word you eat tells you something.',
  ctrl: () => [['←','left'],['↑','up'],['↓','down'],['→','right']],
  rate: s => Math.max(50, 115 - s.body.length * 1.5) * (s.dir[1] ? 1.55 : 1),
  init(w, h) {
    const y = Math.floor(h / 2);
    const s = { w, h, score:0, body:[[6,y],[5,y],[4,y]], dir:[1,0], q:[], grow:0, foods:[] };
    snFood(s); snFood(s); snFood(s);
    return s;
  },
  input(s, a) { if (DIRS[a] && s.q.length < 3) s.q.push(DIRS[a]); },
  step(s) {
    while (s.q.length) { const d = s.q.shift(); if (d[0] === -s.dir[0] && d[1] === -s.dir[1]) continue; s.dir = d; break; }
    const h = s.body[0], n = [h[0] + s.dir[0], h[1] + s.dir[1]];
    if (n[0] < 0 || n[1] < 0 || n[0] >= s.w || n[1] >= s.h || s.body.some(b => b[0] === n[0] && b[1] === n[1])) { s.over = true; return; }
    s.body.unshift(n);
    const fi = s.foods.findIndex(f => f.y === n[1] && n[0] >= f.x && n[0] < f.x + f.t.length);
    if (fi >= 0) { const f = s.foods[fi]; s.foods.splice(fi, 1); s.grow += Math.ceil(f.t.length / 2); s.score += 10 * f.t.length; s.msg = f.t + ': ' + f.info; snFood(s); }
    if (s.grow > 0) s.grow--; else s.body.pop();
  },
  draw(s, g) {
    const c = CS[S.cs];
    s.foods.forEach(f => g.text(f.x, f.y, f.t, 'acc'));
    s.body.forEach((b, i) => g.set(b[0], b[1], i ? c.snakeB : c.snakeH, i ? 'ob' : 'pl'));
  }
};
function snFood(s) {
  for (let k = 0; k < 60; k++) {
    const [word, info] = pick(WORDS), t = '#' + word;
    const x = rand(Math.max(1, s.w - t.length)), y = rand(s.h);
    const clash = s.body.some(b => b[1] === y && b[0] >= x - 1 && b[0] <= x + t.length) ||
      s.foods.some(f => f.y === y && x < f.x + f.t.length + 2 && x + t.length + 2 > f.x) || Math.abs(y - s.body[0][1]) < 1 && Math.abs(x - s.body[0][0]) < 6;
    if (!clash) { s.foods.push({ x, y, t, info }); return; }
  }
}

/* tetris */
const TP = { I:[[0,1],[1,1],[2,1],[3,1]], O:[[0,0],[1,0],[0,1],[1,1]], T:[[1,0],[0,1],[1,1],[2,1]], S:[[1,0],[2,0],[0,1],[1,1]], Z:[[0,0],[1,0],[1,1],[2,1]], J:[[0,0],[0,1],[1,1],[2,1]], L:[[2,0],[0,1],[1,1],[2,1]] };
const TN = { I:4, O:2, T:3, S:3, Z:3, J:3, L:3 };
const TCLS = { I:'acc', O:'hi', T:'pl', S:'ob', Z:'acc', J:'hi', L:'ob' };
GAMES.tetris = {
  name:'tetris', blurb:'stack blocks, clear lines', help:'left/right move, up rotates, down drops faster. space makes the piece fall fast until it lands.',
  ctrl: () => [['←','left'],['rotate','up'],['↓','down'],['→','right'],['drop','fire']],
  rate: s => Math.max(90, 600 - s.level * 50),
  init(w, h) {
    const bh = Math.min(20, h);
    const s = { w, h, bw:10, bh, board:Array.from({ length:bh }, () => Array(10).fill(null)), score:0, lines:0, level:0, bag:[] };
    s.next = tBag(s); tSpawn(s);
    return s;
  },
  input(s, a) {
    if (s.fast) return;
    if (a === 'left') tMove(s, -1, 0);
    else if (a === 'right') tMove(s, 1, 0);
    else if (a === 'down') { if (tMove(s, 0, 1)) s.score += 1; }
    else if (a === 'up') tRot(s);
    else if (a === 'fire') { s.fast = true; s.fastAcc = 0; }
  },
  update(s, dt) {
    if (!s.fast) return;
    s.fastAcc += dt;
    while (s.fastAcc >= 0.014 && s.fast) {
      s.fastAcc -= 0.014;
      if (tMove(s, 0, 1)) s.score += 2; else { s.fast = false; tLock(s); }
    }
  },
  step(s) { if (s.fast) return; if (!tMove(s, 0, 1)) tLock(s); },
  draw(s, g) {
    const c = CS[S.cs];
    const panel = s.w >= 36;
    const ox = Math.max(1, Math.floor((s.w - 22 - (panel ? 14 : 0)) / 2) + 1), oy = Math.floor((s.h - s.bh) / 2);
    for (let y = 0; y < s.bh; y++) {
      g.set(ox - 1, oy + y, c.v, 'b'); g.set(ox + 20, oy + y, c.v, 'b');
      for (let x = 0; x < 10; x++) {
        const v = s.board[y][x];
        if (v) g.text(ox + x * 2, oy + y, c.cell, TCLS[v]); else g.text(ox + x * 2, oy + y, c.e2, 'b');
      }
    }
    if (oy + s.bh < s.h) g.text(ox - 1, oy + s.bh, c.bl + c.h.repeat(20) + c.br, 'b');
    if (s.cur && !s.over) {
      let gy = s.cur.y; while (tFits(s, s.cur.cells, s.cur.x, gy + 1)) gy++;
      s.cur.cells.forEach(([x, y]) => { if (gy + y >= 0) g.text(ox + (s.cur.x + x) * 2, oy + gy + y, c.ghost, 'b'); });
      s.cur.cells.forEach(([x, y]) => { if (s.cur.y + y >= 0) g.text(ox + (s.cur.x + x) * 2, oy + s.cur.y + y, c.cell, TCLS[s.cur.k]); });
    }
    if (panel) {
      const px = ox + 23;
      g.text(px, oy + 1, 'next', 'dim');
      TP[s.next].forEach(([x, y]) => g.text(px + x * 2, oy + 3 + y, c.cell, TCLS[s.next]));
      g.text(px, oy + 7, 'lines', 'dim'); g.text(px, oy + 8, String(s.lines), 'hi');
      g.text(px, oy + 10, 'level', 'dim'); g.text(px, oy + 11, String(s.level + 1), 'hi');
    }
  }
};
function tBag(s) { if (!s.bag.length) s.bag = shuffle('IOTSZJL'.split('')); return s.bag.pop(); }
function tSpawn(s) { const k = s.next; s.next = tBag(s); s.cur = { k, cells: TP[k].map(p => [...p]), x: 3, y: 0 }; if (!tFits(s, s.cur.cells, s.cur.x, s.cur.y)) s.over = true; }
function tFits(s, cells, x, y) { return cells.every(([cx, cy]) => { const X = x + cx, Y = y + cy; return X >= 0 && X < s.bw && Y < s.bh && (Y < 0 || !s.board[Y][X]); }); }
function tMove(s, dx, dy) { if (tFits(s, s.cur.cells, s.cur.x + dx, s.cur.y + dy)) { s.cur.x += dx; s.cur.y += dy; return true; } return false; }
function tRot(s) {
  const n = TN[s.cur.k]; if (n === 2) return;
  const r = s.cur.cells.map(([x, y]) => [n - 1 - y, x]);
  for (const k of [0, -1, 1, -2, 2]) if (tFits(s, r, s.cur.x + k, s.cur.y)) { s.cur.cells = r; s.cur.x += k; return; }
}
function tLock(s) {
  s.cur.cells.forEach(([x, y]) => { const Y = s.cur.y + y; if (Y >= 0) s.board[Y][s.cur.x + x] = s.cur.k; else s.over = true; });
  let n = 0;
  for (let y = s.bh - 1; y >= 0; y--) if (s.board[y].every(v => v)) { s.board.splice(y, 1); s.board.unshift(Array(10).fill(null)); n++; y++; }
  if (n) { s.lines += n; s.score += [0, 100, 300, 500, 800][n] * (s.level + 1); s.level = Math.floor(s.lines / 10); s.msg = n === 4 ? 'tetris!' : `${n} line${n > 1 ? 's' : ''}`; }
  if (!s.over) tSpawn(s);
}

/* minesweeper */
GAMES.mines = {
  name:'minesweeper', blurb:'clear the field, flag the mines', help:'arrows move, space opens, f flags. on touch, tap opens; switch flag mode on to flag by tapping.',
  ctrl: s => [['←','left'],['↑','up'],['↓','down'],['→','right'],['open','fire'],[s && s.flagMode ? 'flag mode: on' : 'flag mode: off', 'mode']],
  init(w, h) {
    const cols = Math.min(16, Math.floor((w - 2) / 2)), rows = Math.min(h - 2, 12);
    const s = { w, h, cols, rows, cells: Array.from({ length: cols * rows }, () => ({ m:0, n:0, o:0, f:0 })), cx: Math.floor(cols / 2), cy: Math.floor(rows / 2),
      first:true, score:0, mines: Math.round(cols * rows * 0.15), flagMode:false, t:0, opened:0 };
    s.ox = Math.floor((w - cols * 2) / 2); s.oy = Math.max(1, Math.floor((h - rows) / 2));
    return s;
  },
  update(s, dt) { if (!s.first) s.t += dt; },
  input(s, a, raw) {
    const d = DIRS[a];
    if (d) { s.cx = clamp(s.cx + d[0], 0, s.cols - 1); s.cy = clamp(s.cy + d[1], 0, s.rows - 1); }
    else if (a === 'fire') mOpen(s, s.cx, s.cy);
    else if (a === 'mode') { s.flagMode = !s.flagMode; arcadeRender(); }
    else if (raw === 'f') mFlag(s, s.cx, s.cy);
  },
  tap(s, x, y) {
    const cx = Math.floor((x - s.ox) / 2), cy = y - s.oy;
    if (cx < 0 || cy < 0 || cx >= s.cols || cy >= s.rows) return;
    s.cx = cx; s.cy = cy;
    if (s.flagMode) mFlag(s, cx, cy); else mOpen(s, cx, cy);
  },
  draw(s, g) {
    const c = CS[S.cs];
    const flags = s.cells.filter(x => x.f).length;
    g.text(s.ox, s.oy - 1, `mines ${String(s.mines - flags).padStart(2)}  time ${String(Math.floor(s.t)).padStart(3)}s`, 'dim');
    for (let y = 0; y < s.rows; y++) for (let x = 0; x < s.cols; x++) {
      const cell = s.cells[y * s.cols + x];
      let ch, k;
      if (cell.o) {
        if (cell.m) { ch = '*'; k = 'over'; }
        else if (cell.n) { ch = String(cell.n); k = cell.n >= 3 ? 'hi' : cell.n === 2 ? 'acc' : 'ob'; }
        else { ch = c.e2[1]; k = 'b'; }
      } else if (cell.f) { ch = c.flag; k = 'acc'; }
      else if (s.over && cell.m) { ch = '*'; k = 'acc'; }
      else { ch = c.closed; k = 'ob'; }
      const cur = x === s.cx && y === s.cy && !s.over;
      g.set(s.ox + x * 2, s.oy + y, ch, cur ? 'over' : k);
      g.set(s.ox + x * 2 + 1, s.oy + y, ' ', cur ? 'over' : '');
    }
  }
};
function mNb(s, x, y) { const out = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if ((dx || dy) && X >= 0 && Y >= 0 && X < s.cols && Y < s.rows) out.push([X, Y]); } return out; }
function mFlag(s, x, y) { const c = s.cells[y * s.cols + x]; if (!c.o) c.f ^= 1; }
function mOpen(s, x, y) {
  if (s.first) {
    s.first = false;
    const safe = new Set([y * s.cols + x, ...mNb(s, x, y).map(([X, Y]) => Y * s.cols + X)]);
    let placed = 0;
    while (placed < s.mines) { const i = rand(s.cells.length); if (!safe.has(i) && !s.cells[i].m) { s.cells[i].m = 1; placed++; } }
    for (let Y = 0; Y < s.rows; Y++) for (let X = 0; X < s.cols; X++) s.cells[Y * s.cols + X].n = mNb(s, X, Y).filter(([a, b]) => s.cells[b * s.cols + a].m).length;
  }
  const c0 = s.cells[y * s.cols + x];
  if (c0.o || c0.f) return;
  if (c0.m) { c0.o = 1; s.over = true; s.msg = 'boom.'; return; }
  const st = [[x, y]];
  while (st.length) {
    const [X, Y] = st.pop(), c = s.cells[Y * s.cols + X];
    if (c.o || c.f) continue;
    c.o = 1; s.opened++;
    if (!c.n) mNb(s, X, Y).forEach(p => st.push(p));
  }
  s.score = s.opened * 5;
  if (s.opened === s.cells.length - s.mines) { s.won = true; s.over = true; s.score += Math.max(0, 500 - Math.floor(s.t) * 2); s.msg = 'field cleared'; achieve('sweeper'); }
}

/* 2048 with tech tiles */
const T2048 = { 2:'html', 4:'css', 8:'js', 16:'ts', 32:'react', 64:'python', 128:'fastapi', 256:'docker', 512:'aws', 1024:'rag', 2048:'agent', 4096:'mcp', 8192:'lead' };
GAMES.g2048 = {
  name:'2048', blurb:'merge tech up to an agent', help:'arrows or swipe. html + html = css, all the way up to agent.',
  ctrl: () => [['←','left'],['↑','up'],['↓','down'],['→','right']],
  init(w, h) {
    const tw = Math.min(10, Math.floor((w - 1) / 4)), th = h >= 17 ? 4 : 3;
    const s = { w, h, tw, th, b: Array(16).fill(0), score:0, best:2 };
    s.ox = Math.floor((w - tw * 4) / 2); s.oy = Math.max(0, Math.floor((h - th * 4) / 2));
    t2Add(s); t2Add(s);
    return s;
  },
  input(s, a) {
    if (!DIRS[a]) return;
    if (t2Slide(s, a)) { t2Add(s); if (!t2Can(s)) s.over = true; }
  },
  draw(s, g) {
    for (let i = 0; i < 16; i++) {
      const v = s.b[i], x = s.ox + (i % 4) * s.tw, y = s.oy + Math.floor(i / 4) * s.th;
      const k = !v ? 'b' : v >= 256 ? 'hi' : v >= 16 ? 'acc' : 'ob';
      g.rect(x, y, s.tw, s.th, v ? k : 'b');
      const lab = v ? T2048[v] || String(v) : '·';
      g.text(x + Math.floor((s.tw - lab.length) / 2), y + 1, lab.slice(0, s.tw - 2), v ? k : 'b');
      if (v && s.th >= 4) { const n = String(v); g.text(x + Math.floor((s.tw - n.length) / 2), y + 2, n, 'b'); }
    }
  }
};
function t2Add(s) { const e = s.b.map((v, i) => v ? -1 : i).filter(i => i >= 0); if (e.length) s.b[pick(e)] = Math.random() < .9 ? 2 : 4; }
function t2Can(s) { for (let i = 0; i < 16; i++) { if (!s.b[i]) return true; if (i % 4 < 3 && s.b[i] === s.b[i + 1]) return true; if (i < 12 && s.b[i] === s.b[i + 4]) return true; } return false; }
function t2Slide(s, a) {
  let moved = false; const b = s.b;
  for (let i = 0; i < 4; i++) {
    const idx = [0, 1, 2, 3].map(j => a === 'left' ? i * 4 + j : a === 'right' ? i * 4 + (3 - j) : a === 'up' ? j * 4 + i : (3 - j) * 4 + i);
    const vals = idx.map(k => b[k]).filter(v => v), out = [];
    for (let k = 0; k < vals.length; k++) {
      if (vals[k] === vals[k + 1]) { const v = vals[k] * 2; out.push(v); s.score += v; if (v > s.best) { s.best = v; s.msg = `new tile: ${T2048[v] || v}`; if (v === 2048) s.msg = 'you shipped an agent!'; } k++; }
      else out.push(vals[k]);
    }
    while (out.length < 4) out.push(0);
    idx.forEach((k, j) => { if (b[k] !== out[j]) moved = true; b[k] = out[j]; });
  }
  return moved;
}

/* breakout: bricks are the CV */
GAMES.breakout = {
  name:'breakout', blurb:'break bricks, read the cv', help:'move with arrows or the mouse, space or tap launches. every brick says something.',
  ctrl: () => [['←','left'],['launch','fire'],['→','right']],
  init(w, h) { const s = { w, h, score:0, lives:3, round:1, px:w / 2, pw:Math.max(7, Math.floor(w / 7)), stuck:true, bx:0, by:0, vx:0, vy:0, sp:22 }; boBuild(s); return s; },
  input(s, a) { if (a === 'fire' && s.stuck) boLaunch(s); },
  point(s, x) { s.px = clamp(x, s.pw / 2, s.w - s.pw / 2); },
  update(s, dt, held) {
    if (held.has('left')) s.px -= 40 * dt;
    if (held.has('right')) s.px += 40 * dt;
    s.px = clamp(s.px, s.pw / 2, s.w - s.pw / 2);
    const py = s.h - 2;
    if (s.stuck) { s.bx = s.px; s.by = py - 1; return; }
    const n = 6;
    for (let i = 0; i < n; i++) {
      const ox = s.bx, oy = s.by;
      s.bx += s.vx * dt / n; s.by += s.vy * dt / n;
      if (s.bx < 0) { s.bx = 0; s.vx = Math.abs(s.vx); }
      if (s.bx >= s.w) { s.bx = s.w - 0.01; s.vx = -Math.abs(s.vx); }
      if (s.by < 0) { s.by = 0; s.vy = Math.abs(s.vy); }
      const cx = Math.floor(s.bx), cy = Math.floor(s.by);
      const br = s.bricks.find(b => b.alive && b.y === cy && cx >= b.x && cx < b.x + b.w);
      if (br) {
        br.alive = false; s.score += 10 * s.round; s.msg = br.info;
        if (Math.floor(oy) !== cy) s.vy = -s.vy; else s.vx = -s.vx;
        s.bx = ox; s.by = oy;
        if (!s.bricks.some(b => b.alive)) { s.round++; s.sp += 3; boBuild(s); s.stuck = true; s.msg = 'round ' + s.round; }
        break;
      }
      if (s.vy > 0 && Math.floor(s.by) === py && Math.abs(s.bx - s.px) <= s.pw / 2 + 0.5) {
        const off = clamp((s.bx - s.px) / (s.pw / 2), -1, 1), a = -Math.PI / 2 + off * 1.05;
        s.vx = Math.cos(a) * s.sp; s.vy = Math.sin(a) * s.sp * RATIO(); s.by = py - 0.01;
      }
      if (s.by >= s.h) { s.lives--; if (s.lives <= 0) s.over = true; else { s.stuck = true; s.msg = s.lives + ' balls left'; } return; }
    }
  },
  draw(s, g) {
    const c = CS[S.cs];
    s.bricks.forEach(b => { if (b.alive) g.text(b.x, b.y, b.label, b.k); });
    g.text(Math.round(s.px - s.pw / 2), s.h - 2, c.paddle.repeat(s.pw), 'pl');
    g.set(s.bx, s.by, c.ball, 'hi');
    g.text(s.w - 8, 0, 'balls ' + s.lives, 'dim');
  }
};
function boBuild(s) {
  const items = shuffle([
    ...EXPERIENCE.map(e => [e.co.toLowerCase(), `${e.co}: ${e.role}, ${e.dates}, ${e.loc}`]),
    ...WORDS.map(([w, i]) => [w, w + ': ' + i]),
    ['havana', 'Lic. in Computer Science, University of Havana'], ['zaragoza', 'based in Zaragoza, Spain']
  ]);
  s.bricks = [];
  const rows = clamp(Math.floor((s.h - 8) / 2) + 1, 3, 6), ks = ['acc', 'hi', 'ob'];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    const row = []; let x = 0;
    for (let tries = 0; tries < items.length; tries++) {
      const [word, info] = items[k % items.length], label = '[' + word + ']';
      if (x + label.length > s.w) break;
      row.push({ x, y: 2 + r, w: label.length, label, info, alive: true, k: ks[r % 3] });
      x += label.length + 1; k++;
    }
    const used = x - 1, off = Math.floor((s.w - used) / 2);
    row.forEach(b => b.x += off);
    s.bricks.push(...row);
  }
}
function boLaunch(s) { const a = -Math.PI / 2 + (Math.random() - .5) * 0.8; s.vx = Math.cos(a) * s.sp; s.vy = Math.sin(a) * s.sp * RATIO(); s.stuck = false; }

/* invaders: shoot the stack */
GAMES.invaders = {
  name:'invaders', blurb:'shoot down the stack', help:'move with arrows or the mouse, space or tap fires. every word you hit says something.',
  ctrl: () => [['←','left'],['fire','fire'],['→','right']],
  init(w, h) { const s = { w, h, score:0, lives:3, wave:1, px:w / 2, cool:0 }; inWave(s); return s; },
  input(s, a) { if (a === 'fire') inFire(s); },
  point(s, x) { s.px = clamp(x, 1, s.w - 2); },
  tap(s, x) { s.px = clamp(x, 1, s.w - 2); inFire(s); },
  update(s, dt, held) {
    if (held.has('left')) s.px -= 26 * dt;
    if (held.has('right')) s.px += 26 * dt;
    s.px = clamp(s.px, 1, s.w - 2);
    s.cool -= dt;
    if (held.has('fire')) inFire(s);
    const alive = s.en.filter(e => e.alive);
    s.ft += dt;
    const iv = Math.max(0.06, (0.55 * alive.length / s.en.length + 0.05) / (1 + 0.15 * (s.wave - 1)));
    if (s.ft >= iv && alive.length) {
      s.ft = 0;
      const minX = Math.min(...alive.map(e => s.fx + e.rx)), maxX = Math.max(...alive.map(e => s.fx + e.rx + e.t.length));
      if ((s.dir > 0 && maxX >= s.w) || (s.dir < 0 && minX <= 0)) { s.fy++; s.dir *= -1; } else s.fx += s.dir;
    }
    if (alive.some(e => s.fy + e.ry >= s.h - 2)) { s.over = true; s.msg = 'the stack landed'; return; }
    if (alive.length && Math.random() < dt * (0.9 + 0.25 * s.wave)) { const e = pick(alive); s.bombs.push({ x: s.fx + e.rx + Math.floor(e.t.length / 2), y: s.fy + e.ry + 1 }); }
    s.shots.forEach(b => b.y -= 22 * dt);
    s.bombs.forEach(b => b.y += 9 * dt);
    s.shots = s.shots.filter(b => {
      if (b.y < 0) return false;
      const cx = Math.floor(b.x), cy = Math.floor(b.y);
      const e = s.en.find(e => e.alive && s.fy + e.ry === cy && cx >= s.fx + e.rx && cx < s.fx + e.rx + e.t.length);
      if (e) { e.alive = false; s.score += 10 * e.t.length; s.msg = e.t + ': ' + e.info; return false; }
      return true;
    });
    s.bombs = s.bombs.filter(b => {
      if (b.y >= s.h) return false;
      if (Math.floor(b.y) === s.h - 1 && Math.abs(b.x - Math.round(s.px)) <= 1) { s.lives--; s.msg = s.lives > 0 ? `hit, ${s.lives} lives left` : 'shot down'; if (s.lives <= 0) s.over = true; return false; }
      return true;
    });
    if (!s.en.some(e => e.alive)) { s.wave++; s.msg = 'wave ' + s.wave; inWave(s); }
  },
  draw(s, g) {
    const c = CS[S.cs], ks = ['hi', 'acc', 'ob', 'acc'];
    s.en.forEach(e => { if (e.alive) g.text(s.fx + e.rx, s.fy + e.ry, e.t, ks[(e.ry / 2) % 4]); });
    s.shots.forEach(b => g.set(b.x, b.y, '|', 'hi'));
    s.bombs.forEach(b => g.set(b.x, b.y, '!', 'acc'));
    g.text(Math.round(s.px) - 1, s.h - 1, c.ship, 'pl');
    g.text(s.w - 8, 0, 'lives ' + s.lives, 'dim');
  }
};
function inWave(s) {
  const words = shuffle(WORDS); s.en = [];
  const rows = Math.min(4, 2 + Math.floor(s.wave / 2), Math.floor((s.h - 6) / 2));
  let k = 0;
  for (let r = 0; r < rows; r++) {
    let x = 0;
    for (;;) { const [t, info] = words[k % words.length]; if (x + t.length > s.w * 0.68) break; s.en.push({ t, info, rx: x, ry: r * 2, alive: true }); x += t.length + 3; k++; }
  }
  s.fx = 1; s.fy = 1; s.dir = 1; s.ft = 0; s.shots = []; s.bombs = [];
}
function inFire(s) { if (s.cool > 0 || s.shots.length >= 3) return; s.shots.push({ x: Math.round(s.px), y: s.h - 2 }); s.cool = 0.25; }

/* asteroids */
const SHIP_U = ['→','↘','↓','↙','←','↖','↑','↗'], SHIP_A = ['>','\\','v','/','<','\\','^','/'];
const RAD = [0, 0.9, 1.6, 2.4];
GAMES.asteroids = {
  name:'asteroids', blurb:'turn, thrust, shoot rocks', help:'left/right turn, up thrusts, space fires. big rocks split in two.',
  ctrl: () => [['turn ←','left'],['thrust','up'],['turn →','right'],['fire','fire']],
  init(w, h) { const s = { w, h, score:0, lives:3, ship:{ x:w / 2, y:h / 2, a:6, vx:0, vy:0 }, bullets:[], rocks:[], level:0, inv:2, rt:0, cool:0 }; asLevel(s); return s; },
  input(s, a) {
    if (a === 'left') { s.ship.a = (s.ship.a + 7) % 8; s.rt = -0.15; }
    if (a === 'right') { s.ship.a = (s.ship.a + 1) % 8; s.rt = -0.15; }
    if (a === 'fire') asFire(s);
  },
  update(s, dt, held) {
    const sh = s.ship, Rr = RATIO();
    s.rt += dt;
    if (s.rt > 0.11) { if (held.has('left')) { sh.a = (sh.a + 7) % 8; s.rt = 0; } else if (held.has('right')) { sh.a = (sh.a + 1) % 8; s.rt = 0; } }
    const ang = sh.a * Math.PI / 4;
    s.thrust = held.has('up');
    if (s.thrust) { sh.vx += Math.cos(ang) * 20 * dt; sh.vy += Math.sin(ang) * 20 * dt * Rr; }
    const fr = Math.pow(0.55, dt); sh.vx *= fr; sh.vy *= fr;
    s.cool -= dt; if (held.has('fire')) asFire(s);
    const wr = o => { o.x = (o.x + s.w) % s.w; o.y = (o.y + s.h) % s.h; };
    sh.x += sh.vx * dt; sh.y += sh.vy * dt; wr(sh); s.inv -= dt;
    s.bullets.forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; wr(b); });
    s.bullets = s.bullets.filter(b => b.life > 0);
    s.rocks.forEach(r => { r.x += r.vx * dt; r.y += r.vy * dt; wr(r); });
    const dist = (a, b) => { let dx = Math.abs(a.x - b.x); dx = Math.min(dx, s.w - dx); let dy = Math.abs(a.y - b.y); dy = Math.min(dy, s.h - dy) / Rr; return Math.hypot(dx, dy); };
    for (const b of s.bullets) {
      const r = s.rocks.find(r => !r.dead && dist(r, b) < RAD[r.size]);
      if (r) {
        r.dead = true; b.life = 0; s.score += [0, 100, 50, 20][r.size];
        if (r.size > 1) for (let i = 0; i < 2; i++) { const a = Math.random() * 6.28, sp = 4 + Math.random() * 5 + (3 - r.size) * 2; s.rocks.push({ x:r.x, y:r.y, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp * Rr, size:r.size - 1 }); }
      }
    }
    s.rocks = s.rocks.filter(r => !r.dead);
    if (s.inv <= 0 && s.rocks.some(r => dist(r, sh) < RAD[r.size] + 0.3)) {
      s.lives--; s.msg = s.lives > 0 ? `ship lost, ${s.lives} left` : 'out of ships';
      if (s.lives <= 0) { s.over = true; return; }
      Object.assign(sh, { x:s.w / 2, y:s.h / 2, vx:0, vy:0 }); s.inv = 2.5;
    }
    if (!s.rocks.length) asLevel(s);
  },
  draw(s, g) {
    const c = CS[S.cs], sh = s.ship;
    s.rocks.forEach(r => {
      if (r.size === 3) { g.text(Math.floor(r.x) - 1, Math.floor(r.y) - 1, c.rock[0], 'ob'); g.text(Math.floor(r.x) - 1, Math.floor(r.y), c.rock[1], 'ob'); }
      else if (r.size === 2) g.text(Math.floor(r.x) - 1, Math.floor(r.y), '()', 'ob');
      else g.set(r.x, r.y, '*', 'ob');
    });
    s.bullets.forEach(b => g.set(b.x, b.y, c.fade[1], 'hi'));
    if (s.inv <= 0 || Math.floor(s.inv * 8) % 2 === 0) {
      if (s.thrust) { const a = sh.a * Math.PI / 4; g.set(sh.x - Math.cos(a) * 1.2, sh.y - Math.sin(a) * 1.2 * RATIO(), c.fade[2], 'acc'); }
      g.set(sh.x, sh.y, (S.cs === 'ascii' ? SHIP_A : SHIP_U)[sh.a], 'pl');
    }
    g.text(s.w - 8, 0, 'ships ' + s.lives, 'dim');
  }
};
function asLevel(s) {
  s.level++; s.msg = 'level ' + s.level;
  const Rr = RATIO();
  for (let i = 0; i < 2 + s.level; i++) {
    let x, y, n = 0;
    do { x = Math.random() * s.w; y = Math.random() * s.h; n++; } while (Math.hypot(x - s.ship.x, (y - s.ship.y) / Rr) < 10 && n < 50);
    const a = Math.random() * 6.28, sp = 3 + Math.random() * 3;
    s.rocks.push({ x, y, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp * Rr, size:3 });
  }
  s.inv = Math.max(s.inv, 1.5);
}
function asFire(s) {
  if (s.cool > 0 || s.bullets.length > 6) return;
  const sh = s.ship, a = sh.a * Math.PI / 4, Rr = RATIO();
  s.bullets.push({ x: sh.x + Math.cos(a), y: sh.y + Math.sin(a) * Rr, vx: Math.cos(a) * 32 + sh.vx, vy: Math.sin(a) * 32 * Rr + sh.vy, life: 0.9 });
  s.cool = 0.18;
}

/* pong */
GAMES.pong = {
  name:'pong', blurb:'first to 7 against the cpu', help:'up/down or drag on the field to move your paddle on the left.',
  ctrl: () => [['↑','up'],['↓','down']],
  init(w, h) { const s = { w, h, score:0, p:h / 2, cpu:h / 2, ph:Math.max(3, Math.floor(h / 5)), me:0, ai:0 }; pServe(s, 1); return s; },
  point(s, x, y) { s.p = clamp(y, s.ph / 2, s.h - s.ph / 2); },
  update(s, dt, held) {
    if (held.has('up')) s.p -= 18 * dt;
    if (held.has('down')) s.p += 18 * dt;
    s.p = clamp(s.p, s.ph / 2, s.h - s.ph / 2);
    if (s.wait > 0) { s.wait -= dt; return; }
    const target = s.vx > 0 ? s.by : s.h / 2, md = (9 + s.me) * dt;
    s.cpu = clamp(s.cpu + clamp(target - s.cpu, -md, md), s.ph / 2, s.h - s.ph / 2);
    s.bx += s.vx * dt; s.by += s.vy * dt;
    if (s.by < 0) { s.by = -s.by; s.vy = Math.abs(s.vy); }
    if (s.by > s.h - 0.01) { s.by = s.h - 0.01; s.vy = -Math.abs(s.vy); }
    if (s.vx < 0 && s.bx <= 2 && s.bx >= 0.5 && Math.abs(s.by - s.p) <= s.ph / 2 + 0.5) pHit(s, s.p, 1);
    if (s.vx > 0 && s.bx >= s.w - 2 && s.bx <= s.w - 0.5 && Math.abs(s.by - s.cpu) <= s.ph / 2 + 0.5) pHit(s, s.cpu, -1);
    if (s.bx < 0) { s.ai++; s.msg = 'cpu scores'; pCheck(s, -1); }
    else if (s.bx > s.w) { s.me++; s.score += 100; s.msg = 'you score'; pCheck(s, 1); }
  },
  draw(s, g) {
    const c = CS[S.cs];
    for (let y = 0; y < s.h; y += 2) g.set(Math.floor(s.w / 2), y, c.net, 'b');
    g.text(Math.floor(s.w / 2) - 4, 0, String(s.me).padStart(2), 'hi'); g.text(Math.floor(s.w / 2) + 3, 0, String(s.ai), 'hi');
    for (let i = 0; i < s.ph; i++) { g.set(1, Math.round(s.p - s.ph / 2) + i, c.pad, 'pl'); g.set(s.w - 2, Math.round(s.cpu - s.ph / 2) + i, c.pad, 'ob'); }
    g.set(s.bx, s.by, c.ball, 'hi');
  }
};
function pServe(s, dir) { s.bx = s.w / 2; s.by = s.h / 2; const a = (Math.random() - .5) * 0.8; s.sp = 22; s.vx = Math.cos(a) * s.sp * dir; s.vy = Math.sin(a) * s.sp * RATIO(); s.wait = 0.8; }
function pHit(s, py, dir) { const off = clamp((s.by - py) / (s.ph / 2), -1, 1); s.sp = Math.min(s.sp * 1.06, 50); s.vx = Math.cos(off) * s.sp * dir; s.vy = Math.sin(off) * s.sp * RATIO(); s.bx = dir > 0 ? 2.01 : s.w - 2.01; }
function pCheck(s, dir) { if (s.me >= 7 || s.ai >= 7) { s.over = true; s.won = s.me >= 7; if (s.won) s.score += 500; } else pServe(s, dir); }

/* bug hunt */
const CODE = [
  'from fastapi import FastAPI, Depends',
  'from pydantic_ai import Agent',
  '',
  'app = FastAPI()',
  'agent = Agent("openrouter:claude", system_prompt=PROMPT)',
  '',
  '@app.post("/ask")',
  'async def ask(q: Question, db=Depends(get_db)):',
  '    docs = await retrieve(db, q.text, k=5)',
  '    result = await agent.run(q.text, deps=docs)',
  '    return {"answer": result.output}',
  '',
  'async def retrieve(db, text, k):',
  '    vec = await embed(text)',
  '    return await db.search(vec, limit=k)',
  ''
];
GAMES.bugs = {
  name:'bug hunt', blurb:'squash bugs before deploy', help:'tap or click a bug to squash it. keyboard: arrows aim, space squashes.',
  ctrl: () => [['←','left'],['↑','up'],['↓','down'],['→','right'],['squash','fire']],
  init(w, h) { return { w, h, score:0, lives:3, bugs:[], splats:[], cx:Math.floor(w / 2), cy:Math.floor(h / 2), t:0, spawn:0.5, combo:0 }; },
  input(s, a) { const d = DIRS[a]; if (d) { s.cx = clamp(s.cx + d[0] * 2, 0, s.w - 1); s.cy = clamp(s.cy + d[1], 0, s.h - 2); } if (a === 'fire') bgSquash(s, s.cx, s.cy); },
  tap(s, x, y) { s.cx = clamp(x, 0, s.w - 1); s.cy = clamp(y, 0, s.h - 2); bgSquash(s, x, y); },
  update(s, dt) {
    s.t += dt; s.spawn -= dt;
    if (s.spawn <= 0) { s.bugs.push({ x: 1 + rand(s.w - 2), y: 0, mv: 0, iv: Math.max(0.16, 0.7 - s.t * 0.006) }); s.spawn = Math.max(0.3, 1.5 - s.t * 0.02); }
    s.bugs.forEach(b => { b.mv += dt; if (b.mv >= b.iv) { b.mv = 0; b.y += 1; b.x = clamp(b.x + rand(3) - 1, 0, s.w - 1); } });
    s.bugs = s.bugs.filter(b => {
      if (b.y >= s.h - 1) { s.lives--; s.combo = 0; s.msg = `a bug reached production, ${Math.max(0, s.lives)} lives left`; if (s.lives <= 0) s.over = true; return false; }
      return true;
    });
    s.splats.forEach(p => p.t -= dt); s.splats = s.splats.filter(p => p.t > 0);
  },
  draw(s, g) {
    const c = CS[S.cs];
    for (let y = 0; y < s.h - 1; y++) g.text(0, y, CODE[y % CODE.length].slice(0, s.w), 'b');
    g.text(0, s.h - 1, c.h.repeat(s.w), 'acc'); g.center(s.h - 1, ' deploy ', 'acc');
    s.splats.forEach(p => g.set(p.x, p.y, c.splat, 'acc'));
    s.bugs.forEach(b => g.set(b.x, b.y, c.bug, 'hi'));
    const ch = g.get(s.cx, s.cy); g.set(s.cx, s.cy, ch === ' ' ? '+' : ch, 'over');
    g.text(s.w - 8, 0, 'lives ' + s.lives, 'dim');
  }
};
function bgSquash(s, x, y) {
  const hit = s.bugs.filter(b => Math.abs(b.x - x) <= 1 && Math.abs(b.y - y) <= 1);
  if (hit.length) {
    hit.forEach(b => s.splats.push({ x: b.x, y: b.y, t: 0.45 }));
    s.bugs = s.bugs.filter(b => !hit.includes(b));
    s.combo += hit.length; s.score += 10 * hit.length * Math.min(5, s.combo);
    if (s.combo >= 3) s.msg = 'combo x' + Math.min(5, s.combo);
  } else s.combo = 0;
}

/* typing race */
const SNIPPETS = [
`@app.get("/claims/{claim_id}")
async def get_claim(claim_id: int):
    claim = await db.fetch(claim_id)
    return {"status": claim.status}`,
`agent = Agent("openrouter:claude")
result = await agent.run(question)
print(result.output)`,
`docs = await retrieve(query, k=5)
context = "\\n".join(d.text for d in docs)
answer = await llm.complete(context)`,
`const total = invoices
  .filter((i) => i.open)
  .reduce((sum, i) => sum + i.amount, 0);`,
`fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`
];
GAMES.typing = {
  name:'typing race', blurb:'type real code against the clock', help:'type the snippet exactly. enter makes a new line and the indentation fills itself in.', text:true, ph:'start typing',
  ctrl: () => [['new snippet','new']],
  init(w, h) { return { w, h, score:0, src:pick(SNIPPETS), buf:'', t0:0, t:0, errs:0, keys:0, wpm:0, acc:100 }; },
  input(s, a) { if (a === 'new') Object.assign(s, { src:pick(SNIPPETS), buf:'', t0:0, t:0, errs:0, keys:0, wpm:0, acc:100, over:false }); },
  update(s) {
    if (s.t0 && !s.over) s.t = (performance.now() - s.t0) / 1000;
    s.wpm = s.t > 1 ? Math.round((s.buf.length / 5) / (s.t / 60)) : 0;
    s.acc = s.keys ? Math.round(100 * (s.keys - s.errs) / s.keys) : 100;
    s.msg = `wpm ${s.wpm} · accuracy ${s.acc}% · ${s.t.toFixed(1)}s`;
  },
  draw(s, g) {
    const c = CS[S.cs];
    let x = 0, y = 1;
    for (let i = 0; i <= s.src.length; i++) {
      const ch = s.src[i];
      const k = i < s.buf.length ? (s.buf[i] === ch ? 'acc' : 'over') : i === s.buf.length ? 'flash' : 'b';
      if (ch === undefined) { if (k === 'flash') g.set(x, y, ' ', 'flash'); break; }
      if (ch === '\n') { if (k !== 'acc') g.set(x, y, c.nl, k === 'b' ? 'b' : k); x = 0; y += 1; continue; }
      if (x >= s.w) { x = 0; y++; }
      g.set(x, y, ch === ' ' && k === 'over' ? '_' : ch, k);
      x++;
    }
  }
};
function tyType(s, ch) {
  if (s.over) return;
  if (!s.t0) s.t0 = performance.now();
  s.buf += ch; s.keys++;
  if (ch !== s.src[s.buf.length - 1]) s.errs++;
  if (ch === '\n') while (s.src[s.buf.length] === ' ' && s.buf.length < s.src.length) s.buf += ' ';
  if (s.buf.length >= s.src.length) {
    GAMES.typing.update(s);
    s.over = true; s.won = true; s.score = Math.round(s.wpm * s.acc / 100);
    if (s.wpm >= 50) achieve('typist');
  }
}

/* shell: the portfolio as a filesystem */
const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function shFS() {
  const f = {};
  f['~/about.txt'] = `${PROFILE.name}\n${PROFILE.title}\n\n${PROFILE.summary}`;
  f['~/contact.txt'] = LINKS.map(([k, , l]) => `${k.padEnd(9)}${l}`).join('\n') + '\n\ntip: sudo hire aryan';
  EXPERIENCE.forEach(e => { f[`~/experience/${slug(e.co)}.md`] = `# ${e.co}\n${e.role}\n${e.dates} · ${e.loc}\n\n${e.desc}`; });
  SKILLS.forEach(([cat, list]) => { f[`~/skills/${slug(cat)}.txt`] = list.join(', '); });
  f['~/education.txt'] = `${EDUCATION.degree}\n${EDUCATION.school}, ${EDUCATION.when}\nthesis: ${EDUCATION.thesis}\n\nlanguages: ${LANGS}`;
  f['~/.secret/README'] = 'you found the secret folder.\n1. the konami code works on the main page.\n2. collect 5 achievements to unlock a hidden game in the arcade.';
  return f;
}
let FS = null, FSDIRS = null;
function fsInit() {
  FS = shFS(); FSDIRS = new Set(['~']);
  Object.keys(FS).forEach(p => { const parts = p.split('/'); for (let i = 1; i < parts.length; i++) FSDIRS.add(parts.slice(0, i).join('/')); });
}
function shPath(s, p) {
  if (!p || p === '.') return s.cwd;
  let parts = p.startsWith('~') ? p.split('/') : (s.cwd + '/' + p).split('/');
  const out = [];
  for (const x of parts) { if (!x || x === '.') continue; if (x === '..') { if (out.length > 1) out.pop(); } else out.push(x); }
  return out.join('/') || '~';
}
function shKids(p, all) {
  const set = new Set();
  [...Object.keys(FS), ...FSDIRS].forEach(k => {
    if (k === p || !k.startsWith(p + '/')) return;
    const rest = k.slice(p.length + 1); if (rest.includes('/')) return;
    if (!all && rest.startsWith('.')) return;
    set.add(rest + (FSDIRS.has(k) ? '/' : ''));
  });
  return [...set].sort();
}
const shSay = (s, t, k = '') => String(t).split('\n').forEach(l => s.out.push({ t: l, k }));
const shPrompt = s => `aryan@zaragoza:${s.cwd}$`;
GAMES.shell = {
  name:'shell', blurb:'explore the cv as a filesystem', help:'try help, ls, cd experience, cat about.txt. tab completes, up recalls the last command.', text:true, ph:'type a command',
  ctrl: () => [],
  init(w, h) {
    if (!FS) fsInit();
    const s = { w, h, score:0, cwd:'~', out:[], read:{}, hist:[], hp:-1 };
    shSay(s, 'portfolio shell. type help to start.', 'acc'); shSay(s, '');
    s.msg = `files read 0/${Object.keys(FS).length}`;
    return s;
  },
  draw(s, g) {
    const lines = [];
    s.out.forEach(o => wrap(o.t, s.w).forEach(l => lines.push({ t: l, k: o.k })));
    const start = Math.max(0, lines.length - s.h);
    lines.slice(start).forEach((l, i) => g.text(0, i, l.t, l.k));
  }
};
function shRun(s, line) {
  shSay(s, shPrompt(s) + ' ' + line, 'dim');
  if (line.trim()) { s.hist.push(line); s.hp = s.hist.length; }
  const [cmd, ...args] = line.trim().split(/\s+/);
  const arg = args.filter(a => !a.startsWith('-')).join(' ');
  const total = Object.keys(FS).length;
  switch (cmd || '') {
    case '': break;
    case 'help':
      shSay(s, 'ls [-a]      list files (-a shows hidden ones)\ncd <dir>     change directory\ncat <file>   read a file\npwd · whoami · clear · neofetch · games · exit');
      break;
    case 'ls': case 'dir': {
      const p = shPath(s, arg);
      if (FS[p]) shSay(s, p.split('/').pop());
      else if (FSDIRS.has(p)) shSay(s, shKids(p, args.includes('-a')).join('  ') || '(empty)', 'acc');
      else shSay(s, `ls: ${arg}: no such file or directory`, 'hi');
      break;
    }
    case 'cd': {
      const p = shPath(s, arg || '~');
      if (FSDIRS.has(p)) { s.cwd = p; arcadeRender(); }
      else shSay(s, `cd: ${arg}: no such directory`, 'hi');
      break;
    }
    case 'cat': case 'less': case 'more': case 'open': {
      const p = shPath(s, arg);
      if (FS[p]) { shSay(s, FS[p]); if (!s.read[p]) { s.read[p] = 1; s.score += 10; } }
      else if (FSDIRS.has(p)) shSay(s, `${cmd}: ${arg}: is a directory`, 'hi');
      else shSay(s, `${cmd}: ${arg || '(nothing)'}: no such file`, 'hi');
      break;
    }
    case 'pwd': shSay(s, s.cwd.replace('~', '/home/aryan')); break;
    case 'whoami': shSay(s, `aryan · ${PROFILE.title}`); break;
    case 'clear': s.out = []; break;
    case 'echo': shSay(s, args.join(' ')); break;
    case 'date': shSay(s, new Date().toString()); break;
    case 'neofetch':
      shSay(s, [
        '   .--.      ' + PROFILE.name.toLowerCase(),
        '  |o_o |     ----------------',
        '  |:_/ |     role    tech lead',
        ' //   \\ \\    years   8+',
        '(|     | )   based   zaragoza, es',
        "/'\\_   _/`\\  stack   python, fastapi, rag",
        '\\___)=(___/  langs   ' + LANGS
      ].join('\n'), 'acc');
      break;
    case 'games': shSay(s, GAME_ORDER.filter(id => !GAMES[id].hidden).map(id => GAMES[id].name).join('  ')); break;
    case 'sudo':
      if (/hire/.test(args.join(' '))) {
        shSay(s, '[sudo] permission granted. opening contact...', 'acc');
        setTimeout(() => { closeArcade(); const el = document.getElementById('s-contact'); if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }, 900);
      } else shSay(s, 'aryan is not in the sudoers file. this incident will be reported.', 'hi');
      break;
    case 'rm': shSay(s, 'nice try.', 'hi'); break;
    case 'exit': case 'quit': ARC.view = 'menu'; ARC.s = null; arcadeRender(); focusSel(); return;
    default: shSay(s, `command not found: ${cmd}. try help`, 'hi');
  }
  const n = Object.keys(s.read).length;
  s.msg = `files read ${n}/${total}`;
  if (n === total) { s.msg += ' · every file read'; achieve('shell'); }
}
function shComplete(s, v) {
  const m = v.match(/^(.*\s)?(\S*)$/); const head = m[1] || '', tok = m[2] || '';
  const slash = tok.lastIndexOf('/');
  const dir = slash >= 0 ? shPath(s, tok.slice(0, slash) || '/') : s.cwd, pre = slash >= 0 ? tok.slice(0, slash + 1) : '', part = tok.slice(slash + 1);
  const opts = shKids(dir, part.startsWith('.')).filter(k => k.startsWith(part));
  if (opts.length === 1) return head + pre + opts[0];
  if (opts.length > 1) shSay(s, opts.join('  '), 'acc');
  return v;
}

/* roguelike cv */
GAMES.rogue = {
  name:'roguelike cv', blurb:'explore jobs, collect skills', help:'arrows, wasd or swipe to move. walk into bugs and deadlines to fight. collect every ! to get hired.',
  ctrl: () => [['←','left'],['↑','up'],['↓','down'],['→','right'],['wait','fire']],
  init: (w, h) => rgGen(w, h),
  input(s, a) { const d = DIRS[a]; if (d) rgMove(s, d[0], d[1]); else if (a === 'fire') rgTurn(s); },
  tap(s, x, y) { const dx = x - s.p.x, dy = y - s.p.y; if (!dx && !dy) return rgTurn(s); if (Math.abs(dx) * RATIO() > Math.abs(dy)) rgMove(s, Math.sign(dx), 0); else rgMove(s, 0, Math.sign(dy)); },
  draw(s, g) {
    const c = CS[S.cs], w = s.w;
    for (let y = 0; y < s.h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x; if (!s.seen[i]) continue;
      const t = s.t[i];
      if (t === 1) g.set(x, y, '.', 'b');
      else if (t === 2) g.set(x, y, c.corr, 'b');
      else {
        let near = false;
        for (let dy = -1; dy <= 1 && !near; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < w && Y < s.h && s.t[Y * w + X]) { near = true; break; } }
        if (near) g.set(x, y, '#', 'ob');
      }
    }
    s.rooms.forEach(r => { if (s.visited.has(r)) g.text(r.x, r.y - 1, (' ' + r.name + ' ').slice(0, r.w), 'acc'); });
    s.items.forEach(it => { if (s.seen[it.y * w + it.x]) g.set(it.x, it.y, '!', 'acc'); });
    s.mons.forEach(m => { if (s.seen[m.y * w + m.x]) g.set(m.x, m.y, m.ch, 'hi'); });
    g.set(s.p.x, s.p.y, '@', 'pl');
    const hud = `hp ${s.hp}/${s.maxhp} · skills ${s.got}/${s.total}`;
    g.text(w - hud.length, 0, hud, s.hp <= 3 ? 'over' : 'dim');
  }
};
function rgGen(w, h) {
  const t = new Uint8Array(w * h), rooms = [];
  const names = shuffle([...EXPERIENCE.map(e => [e.co, `${e.co}: ${e.role}, ${e.dates}`]), [EDUCATION.school, `${EDUCATION.degree}, ${EDUCATION.when}`]]);
  for (let tries = 0; tries < 300 && rooms.length < Math.min(7, names.length); tries++) {
    const rw = 7 + rand(Math.max(2, Math.min(10, Math.floor(w / 5)))), rh = 3 + rand(Math.max(1, Math.min(4, Math.floor(h / 5))));
    const x = 1 + rand(Math.max(1, w - rw - 2)), y = 2 + rand(Math.max(1, h - rh - 3));
    if (x + rw >= w - 1 || y + rh >= h - 1) continue;
    if (rooms.some(r => x < r.x + r.w + 2 && x + rw + 2 > r.x && y < r.y + r.h + 2 && y + rh + 2 > r.y)) continue;
    const [name, info] = names[rooms.length];
    rooms.push({ x, y, w: rw, h: rh, name, info });
  }
  rooms.forEach(r => { for (let j = 0; j < r.h; j++) for (let i = 0; i < r.w; i++) t[(r.y + j) * w + r.x + i] = 1; });
  rooms.sort((a, b) => a.x - b.x);
  const cx = r => Math.floor(r.x + r.w / 2), cy = r => Math.floor(r.y + r.h / 2);
  for (let i = 1; i < rooms.length; i++) {
    let x = cx(rooms[i - 1]), y = cy(rooms[i - 1]);
    const x2 = cx(rooms[i]), y2 = cy(rooms[i]);
    while (x !== x2) { if (!t[y * w + x]) t[y * w + x] = 2; x += Math.sign(x2 - x); }
    while (y !== y2) { if (!t[y * w + x]) t[y * w + x] = 2; y += Math.sign(y2 - y); }
  }
  const s = { w, h, t, rooms, seen: new Uint8Array(w * h), score:0, hp:10, maxhp:10, items:[], mons:[], visited:new Set(), got:0 };
  const skills = shuffle(WORDS.map(x => x[0]));
  s.p = { x: cx(rooms[0]), y: cy(rooms[0]) };
  const free = r => {
    for (let k = 0; k < 60; k++) {
      const x = r.x + rand(r.w), y = r.y + rand(r.h);
      if (!s.items.some(i => i.x === x && i.y === y) && !s.mons.some(m => m.x === x && m.y === y) && !(s.p.x === x && s.p.y === y)) return [x, y];
    }
    return [r.x, r.y];
  };
  rooms.forEach((r, i) => {
    const [ix, iy] = free(r); s.items.push({ x: ix, y: iy, name: skills[i % skills.length] });
    if (i > 0) for (let k = 0; k < 1 + (Math.random() < .45 ? 1 : 0); k++) {
      const [mx, my] = free(r), boss = Math.random() < .35;
      s.mons.push({ x: mx, y: my, ch: boss ? 'D' : 'b', name: boss ? 'deadline' : 'bug', hp: boss ? 2 : 1, dmg: boss ? 2 : 1 });
    }
  });
  s.total = s.items.length;
  rgSee(s); rgEnter(s);
  return s;
}
function rgSee(s) {
  const { p, w, h } = s;
  for (let dy = -3; dy <= 3; dy++) for (let dx = -6; dx <= 6; dx++) { const x = p.x + dx, y = p.y + dy; if (x >= 0 && y >= 0 && x < w && y < h) s.seen[y * w + x] = 1; }
  s.rooms.forEach(r => {
    if (p.x >= r.x && p.x < r.x + r.w && p.y >= r.y && p.y < r.y + r.h)
      for (let y = r.y - 1; y <= r.y + r.h; y++) for (let x = r.x - 1; x <= r.x + r.w; x++) if (x >= 0 && y >= 0 && x < w && y < h) s.seen[y * w + x] = 1;
  });
}
function rgEnter(s) {
  const r = s.rooms.find(r => s.p.x >= r.x && s.p.x < r.x + r.w && s.p.y >= r.y && s.p.y < r.y + r.h);
  if (r && !s.visited.has(r)) { s.visited.add(r); s.msg = r.info; }
}
function rgMove(s, dx, dy) {
  const nx = s.p.x + dx, ny = s.p.y + dy;
  if (nx < 0 || ny < 0 || nx >= s.w || ny >= s.h || !s.t[ny * s.w + nx]) return;
  const m = s.mons.find(m => m.x === nx && m.y === ny);
  if (m) {
    m.hp--;
    if (m.hp <= 0) { s.mons = s.mons.filter(x => x !== m); s.score += 20; s.msg = `you fixed the ${m.name}`; }
    else s.msg = `you hit the ${m.name}`;
  } else {
    s.p.x = nx; s.p.y = ny;
    const it = s.items.find(i => i.x === nx && i.y === ny);
    if (it) {
      s.items = s.items.filter(i => i !== it); s.got++; s.score += 50; s.msg = `picked up ${it.name} (${s.got}/${s.total})`;
      if (s.got === s.total) { s.won = true; s.over = true; s.score += s.hp * 20; s.msg = 'every skill collected. you are hired!'; return; }
    }
  }
  rgTurn(s);
}
function rgTurn(s) {
  for (const m of s.mons) {
    const dx = s.p.x - m.x, dy = s.p.y - m.y;
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      if (Math.random() < .6) { s.hp -= m.dmg; s.msg = `the ${m.name} hits you (-${m.dmg})`; if (s.hp <= 0) { s.hp = 0; s.over = true; s.msg = `the ${m.name} got you`; return; } }
      continue;
    }
    if (Math.abs(dx) > 8 || Math.abs(dy) > 4 || !s.seen[m.y * s.w + m.x]) continue;
    const opts = Math.abs(dx) > Math.abs(dy) ? [[Math.sign(dx), 0], [0, Math.sign(dy)]] : [[0, Math.sign(dy)], [Math.sign(dx), 0]];
    for (const [ox, oy] of opts) {
      if (!ox && !oy) continue;
      const X = m.x + ox, Y = m.y + oy;
      if (s.t[Y * s.w + X] && !s.mons.some(o => o.x === X && o.y === Y) && !(X === s.p.x && Y === s.p.y)) { m.x = X; m.y = Y; break; }
    }
  }
  rgSee(s); rgEnter(s);
}

/* hidden: game of life */
GAMES.life = {
  name:'life.exe', blurb:"conway's game of life", hidden:true, help:'tap cells to toggle them. space pauses, r reseeds, c clears.',
  ctrl: s => [[s && !s.run ? 'run' : 'pause', 'fire'], ['reseed', 'r'], ['clear', 'c']],
  rate: () => 110,
  init(w, h) { const s = { w, h, score:0, a: new Uint8Array(w * h), run: true }; lfSeed(s); return s; },
  input(s, a, raw) {
    if (a === 'fire') { s.run = !s.run; arcadeRender(); }
    else if (a === 'r' || raw === 'r') lfSeed(s);
    else if (a === 'c' || raw === 'c') { s.a.fill(0); s.run = false; arcadeRender(); }
  },
  tap(s, x, y) { if (x >= 0 && y >= 0 && x < s.w && y < s.h) s.a[y * s.w + x] ^= 1; },
  step(s) {
    if (!s.run) return;
    const { w, h, a } = s, n = new Uint8Array(w * h); let pop = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let k = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (dx || dy) k += a[((y + dy + h) % h) * w + ((x + dx + w) % w)];
      const v = a[y * w + x] ? (k === 2 || k === 3) : k === 3;
      n[y * w + x] = v ? 1 : 0; pop += v ? 1 : 0;
    }
    s.a = n; s.score++; s.msg = `generation ${s.score} · population ${pop}`;
  },
  draw(s, g) { const c = CS[S.cs]; for (let i = 0; i < s.a.length; i++) if (s.a[i]) g.set(i % s.w, Math.floor(i / s.w), c.blk, 'acc'); }
};
function lfSeed(s) { for (let i = 0; i < s.a.length; i++) s.a[i] = Math.random() < .22 ? 1 : 0; s.score = 0; }

const GAME_ORDER = ['run','snake','tetris','mines','g2048','breakout','invaders','asteroids','pong','bugs','typing','shell','rogue','life'];

/* ---------- arcade manager ---------- */
const ARC = { open:false, view:'menu', sel:0, id:null, s:null, held:new Set(), paused:false, acc:0, mw:60, fw:56, fh:20, grid:null, rows:[], ptr:null };
function arcadeSize() {
  const ac = Math.floor((innerWidth - 28) / CW);
  ARC.mw = clamp(ac, 30, 84); ARC.fw = ARC.mw - 4;
  const ar = Math.floor((innerHeight - 28) / LH);
  ARC.fh = clamp(ar - 12, 10, 24);
}
const lbl = l => CS[S.cs].arrows[l] || l.replace(/[←→]/g, ch => CS[S.cs].arrows[ch]);
function arcadeLines() {
  const c = CS[S.cs], MW = ARC.mw, iw = MW - 4, body = [];
  if (ARC.view === 'menu') {
    const head = [T('pick a game', 'hi')], close = B('[ esc ]', 'aclose');
    body.push([...head, T(' '.repeat(Math.max(1, iw - 11 - close.t.length))), close]);
    body.push(...wrap('arrows + enter, or tap a game', iw).map(l => [T(l, 'dim')]));
    body.push([]);
    GAME_ORDER.forEach((id, i) => {
      const g = GAMES[id], locked = g.hidden && achCount() < NEED, sel = i === ARC.sel;
      const hs = S.hs[id] ? 'hi ' + S.hs[id] : '';
      const nm = (locked ? '???' : g.name).padEnd(13);
      let bl = locked ? `unlock: ${NEED} achievements (${achCount()}/${NEED})` : g.blurb;
      const room = iw - 2 - 13 - (hs ? hs.length + 1 : 0);
      bl = room < 8 ? '' : bl.length <= room ? bl : bl.slice(0, bl.lastIndexOf(' ', room) > 0 ? bl.lastIndexOf(' ', room) : room);
      const txt = `${sel ? (S.cs === 'ascii' ? '>' : '▸') : ' '} ${nm}${bl}`;
      body.push([B(txt.padEnd(iw - hs.length) + hs, 'pick:' + id, locked ? 'dim' : sel ? 'hi' : '')]);
    });
    body.push([]);
    body.push(...wrap(`achievements ${achCount()}/${Object.keys(ACH).length} · high scores are saved in this browser`, iw).map(l => [T(l, 'dim')]));
    return box('arcade', body, MW);
  }
  const g = GAMES[ARC.id], s = ARC.s;
  body.push(...flow([
    T(g.name, 'hi'), T('score', 'dim'), slot('000000', 'hi', 'id="a-score"'), T('hi', 'dim'), slot(String(S.hs[ARC.id] || 0).padStart(6, '0'), 'acc', 'id="a-hi"'),
    B(ARC.paused ? '[ resume ]' : '[ pause ]', 'apause'), B('[ menu ]', 'amenu'), B('[ esc ]', 'aclose')
  ], iw, 1));
  body.push([D(c.h.repeat(iw))]);
  for (let y = 0; y < ARC.fh; y++) body.push([R(`<span class="af" data-row="${y}">${' '.repeat(ARC.fw)}</span>`, ARC.fw)]);
  body.push([D(c.h.repeat(iw))]);
  body.push([slot(' '.repeat(iw), 'dim', 'id="a-msg"')]);
  if (g.text) {
    const label = ARC.id === 'shell' ? shPrompt(s) : 'type ' + (S.cs === 'ascii' ? '>' : '▸');
    const iwid = iw - label.length - 1;
    const inp = R(`<input id="a-in" class="fi" style="width:${Math.max(10, iwid >= 10 ? iwid : iw)}ch" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${esc(g.ph)}" placeholder="${esc(g.ph)}">`, Math.max(10, iwid >= 10 ? iwid : iw));
    if (iwid >= 10) body.push([T(label, 'acc'), T(' '), inp]); else { body.push([T(label, 'acc')]); body.push([inp]); }
  }
  const ctrl = g.ctrl(s);
  if (ctrl.length) body.push(...flow(ctrl.map(([l, a]) => ({ k:'r', html:`<button type="button" class="lk" data-ga="${a}">[ ${esc(lbl(l))} ]</button>`, t:`[ ${lbl(l)} ]` })), iw, 1));
  body.push(...wrap(g.help, iw).map(l => [T(l, 'dim')]));
  return box('arcade', body, MW);
}
function arcadeRender() {
  if (!ARC.open) return;
  const prev = document.getElementById('a-in');
  const keepVal = prev ? prev.value : '', hadFocus = prev && document.activeElement === prev;
  ascr.innerHTML = toHTML(arcadeLines());
  ARC.rows = [...ascr.querySelectorAll('.af')];
  const inp = document.getElementById('a-in');
  if (inp) {
    inp.value = keepVal;
    inp.addEventListener('keydown', onTextKey);
    inp.addEventListener('input', onTextInput);
    if (hadFocus || ARC.view === 'game') inp.focus({ preventScroll: true });
  }
  arcadeDraw();
}
function arcadeDraw() {
  if (!ARC.open || ARC.view !== 'game' || !ARC.s || !ARC.grid) return;
  const g = ARC.grid, s = ARC.s, game = GAMES[ARC.id];
  g.clear();
  game.draw(s, g);
  if (s.over) {
    const lines = [s.won ? ' YOU WIN ' : ' GAME OVER ', ` score ${s.score}${s.newHi ? ' · new high score' : ''} `, game.text ? ' press enter to play again ' : ' space or tap to play again '];
    const y0 = Math.floor(g.h / 2) - 1;
    lines.forEach((l, i) => g.center(y0 + i, l, i ? 'flash' : 'over'));
  } else if (ARC.paused) g.center(Math.floor(g.h / 2), ' PAUSED · p to resume ', 'over');
  ARC.rows.forEach((el, y) => { el.innerHTML = g.row(y); });
  const sc = document.getElementById('a-score'); if (sc) sc.textContent = String(s.score).padStart(6, '0');
  const hi = document.getElementById('a-hi'); if (hi) hi.textContent = String(Math.max(S.hs[ARC.id] || 0, s.over ? s.score : 0)).padStart(6, '0');
  const m = document.getElementById('a-msg'); if (m) m.textContent = String(s.msg || '').slice(0, ARC.mw - 4).padEnd(ARC.mw - 4);
}
function openArcade() {
  ARC.open = true; ARC.view = 'menu'; arcadeSize();
  arcEl.hidden = false; document.body.style.overflow = 'hidden';
  arcadeRender(); focusSel();
}
function closeArcade() {
  ARC.open = false; ARC.s = null; ARC.view = 'menu'; ARC.held.clear();
  arcEl.hidden = true; document.body.style.overflow = '';
  const b = scr.querySelector('[data-act="arcade"]'); if (b) b.focus({ preventScroll: true });
}
function focusSel() { setTimeout(() => { const b = ascr.querySelector(`[data-act="pick:${GAME_ORDER[ARC.sel]}"]`); if (b) b.focus({ preventScroll: true }); }, 0); }
function startGame(id) {
  const g = GAMES[id];
  if (g.hidden && achCount() < NEED) return;
  ARC.id = id; ARC.sel = GAME_ORDER.indexOf(id); ARC.view = 'game'; ARC.paused = false; ARC.held.clear();
  arcadeSize();
  ARC.grid = new Grid(ARC.fw, ARC.fh);
  ARC.s = g.init(ARC.fw, ARC.fh); ARC.acc = 0;
  S.played[id] = 1; save();
  if (Object.keys(S.played).length >= 5) achieve('arcade5');
  if (id === 'life') achieve('hidden');
  arcadeRender();
  if (!g.text) { const f = document.activeElement; if (f && ascr.contains(f)) f.blur(); }
}
function actA(a, raw) {
  const s = ARC.s; if (!s) return;
  const g = GAMES[ARC.id];
  if (s.over) { if ((a === 'fire' || a === 'enter') && !g.text) startGame(ARC.id); return; }
  if (ARC.paused) return;
  if (g.input) g.input(s, a, raw);
  arcadeDraw();
}
function arcadeLoop(dt) {
  if (!ARC.open || ARC.view !== 'game' || !ARC.s) return;
  const g = GAMES[ARC.id], s = ARC.s;
  if (!ARC.paused && !s.over) {
    if (g.update) g.update(s, dt, ARC.held);
    if (g.step && !s.over) {
      ARC.acc += dt * 1000;
      const iv = g.rate ? g.rate(s) : 100;
      let n = 0;
      while (ARC.acc >= iv && n < 5 && !s.over) { ARC.acc -= iv; g.step(s); n++; }
      if (ARC.acc > iv) ARC.acc = 0;
    }
  }
  if (s.over && !s.rec) {
    s.rec = true;
    if (s.score > (S.hs[ARC.id] || 0)) { S.hs[ARC.id] = s.score; s.newHi = true; save(); }
  }
  arcadeDraw();
}
function onTextKey(e) {
  const s = ARC.s, inp = e.target; if (!s) return;
  if (e.key === 'Escape') return;
  if (ARC.id === 'typing') {
    if (e.key === 'Enter') { e.preventDefault(); if (s.over) { startGame('typing'); return; } tyType(s, '\n'); }
    else if (e.key === 'Backspace' && !inp.value) { e.preventDefault(); if (s.buf.length && !s.over) s.buf = s.buf.slice(0, -1); }
    else if (e.key === 'Tab') e.preventDefault();
  } else if (ARC.id === 'shell') {
    if (e.key === 'Enter') { e.preventDefault(); const v = inp.value; inp.value = ''; shRun(s, v); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (!s.hist.length) return;
      s.hp = clamp(s.hp + (e.key === 'ArrowUp' ? -1 : 1), 0, s.hist.length);
      inp.value = s.hist[s.hp] || '';
    } else if (e.key === 'Tab') { e.preventDefault(); inp.value = shComplete(s, inp.value); }
  }
  arcadeDraw();
}
function onTextInput(e) {
  if (ARC.id !== 'typing' || !ARC.s) return;
  const v = e.target.value; e.target.value = '';
  for (const ch of v) tyType(ARC.s, ch);
  arcadeDraw();
}

/* arcade input */
const KEYMAP = { ArrowUp:'up', w:'up', ArrowDown:'down', s:'down', ArrowLeft:'left', a:'left', ArrowRight:'right', d:'right', ' ':'fire', Enter:'fire' };
addEventListener('keydown', e => {
  if (!ARC.open) return;
  const inInput = e.target && e.target.id === 'a-in';
  if (e.key === 'Escape') {
    e.preventDefault();
    if (ARC.view === 'game') { ARC.view = 'menu'; ARC.s = null; ARC.held.clear(); arcadeRender(); focusSel(); } else closeArcade();
    return;
  }
  if (inInput) return;
  if (ARC.view === 'menu') {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      ARC.sel = (ARC.sel + (e.key === 'ArrowDown' ? 1 : GAME_ORDER.length - 1)) % GAME_ORDER.length;
      arcadeRender(); focusSel();
    }
    return;
  }
  if (e.key === 'p') { ARC.paused = !ARC.paused; arcadeRender(); return; }
  if (e.target.closest && e.target.closest('button, a, label') && (e.key === ' ' || e.key === 'Enter')) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const a = KEYMAP[key];
  if (a) {
    e.preventDefault();
    ARC.held.add(a);
    if (!e.repeat || a !== 'fire') actA(a, key);
  } else if (key.length === 1) actA(null, key);
}, true);
addEventListener('keyup', e => { const key = e.key.length === 1 ? e.key.toLowerCase() : e.key; const a = KEYMAP[key]; if (a) ARC.held.delete(a); });
addEventListener('blur', () => ARC.held.clear());

function cellAt(e) {
  const r0 = ARC.rows[0]; if (!r0) return { x: 0, y: 0 };
  const r = r0.getBoundingClientRect();
  return { x: Math.floor((e.clientX - r.left) / CW), y: Math.floor((e.clientY - (r.top + r.height / 2)) / LH + 0.5) };
}
ascr.addEventListener('pointerdown', e => {
  const btn = e.target.closest('[data-ga]');
  if (btn) {
    e.preventDefault();
    btn.dataset.pd = '1';
    const a = btn.dataset.ga;
    ARC.held.add(a); actA(a);
    const up = () => { ARC.held.delete(a); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); };
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    return;
  }
  const f = e.target.closest('.af');
  if (!f || !ARC.s) return;
  e.preventDefault();
  const c = cellAt(e);
  ARC.ptr = { x: e.clientX, y: e.clientY, c };
  const g = GAMES[ARC.id];
  if (g.point && !ARC.s.over) g.point(ARC.s, c.x, c.y);
});
ascr.addEventListener('pointermove', e => {
  if (!ARC.s || ARC.s.over) return;
  const g = GAMES[ARC.id];
  if (!g.point) return;
  if (e.pointerType !== 'mouse' && !ARC.ptr) return;
  const c = cellAt(e);
  if (c.y < -3 || c.y > ARC.fh + 3) return;
  g.point(ARC.s, clamp(c.x, 0, ARC.fw - 1), clamp(c.y, 0, ARC.fh - 1));
});
addEventListener('pointerup', e => {
  if (!ARC.ptr) return;
  const p = ARC.ptr; ARC.ptr = null;
  if (!ARC.s) return;
  const g = GAMES[ARC.id], dx = e.clientX - p.x, dy = e.clientY - p.y, d = Math.hypot(dx, dy);
  if (g.text) { const inp = document.getElementById('a-in'); if (inp) inp.focus(); return; }
  if (ARC.s.over) { if (d <= 24) startGame(ARC.id); return; }
  if (d > 24 && !g.point) actA(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  else if (d <= 24) { if (g.tap) { if (!ARC.paused) g.tap(ARC.s, p.c.x, p.c.y); arcadeDraw(); } else actA('fire'); }
});
ascr.addEventListener('click', e => {
  const ga = e.target.closest('[data-ga]');
  if (ga) { if (ga.dataset.pd) { delete ga.dataset.pd; return; } actA(ga.dataset.ga); return; }
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const [act, arg] = btn.dataset.act.split(':');
  if (act === 'pick') startGame(arg);
  else if (act === 'aclose') closeArcade();
  else if (act === 'amenu') { ARC.view = 'menu'; ARC.s = null; ARC.held.clear(); arcadeRender(); focusSel(); }
  else if (act === 'apause') { ARC.paused = !ARC.paused; arcadeRender(); }
});
arcEl.addEventListener('click', e => { if (e.target === arcEl) closeArcade(); });

/* ---------- reveal effects: scramble titles ---------- */
const decoded = new Set(), scrambles = new Map();
let io;
function observe() {
  if (io) io.disconnect();
  io = new IntersectionObserver(entries => {
    const now = performance.now();
    for (const e of entries) {
      const el = e.target;
      if (el.id === 'g-r1') { Gvis = e.isIntersecting; continue; }
      if (!e.isIntersecting || !motion) continue;
      const key = el.dataset.key;
      if (!decoded.has(key)) {
        decoded.add(key);
        const isBan = key.startsWith('ban');
        scrambles.set(key, { start: now + (isBan ? +key.slice(3) * 110 : 0), dur: isBan ? 900 : 520 });
      }
    }
  }, { threshold: 0.1 });
  scr.querySelectorAll('.scr').forEach(el => io.observe(el));
  const g = document.getElementById('g-r1'); if (g) io.observe(g);
}
function stepScrambles(now) {
  for (const [key, s] of scrambles) {
    const el = scr.querySelector(`[data-key="${CSS.escape(key)}"]`);
    if (!el) { scrambles.delete(key); continue; }
    const text = el.dataset.text, set = el.dataset.set === 'blk' ? CS[S.cs].scrBlk : SCR_SYM;
    const p = (now - s.start) / s.dur;
    if (p < 0) { el.textContent = text.replace(/\S/g, ' '); continue; }
    if (p >= 1) { el.textContent = text; scrambles.delete(key); continue; }
    const shown = Math.floor(p * text.length);
    el.textContent = [...text].map((ch, i) => ch === ' ' || i < shown ? ch : set[rand(set.length)]).join('');
  }
}

/* ---------- space journey: moon, planets, nebulae along the scroll ---------- */
const BGC = ['', 'p', 'm', 'mh', 'n', 'n2', 'q', 'qa', 'qh', 'qd', 'qad', 'qhd', 'ql'];
const CI = { q:6, qa:7, qh:8, n:4, n2:5, ql:12, p:1 };
const dimc = (k, dim) => dim ? ({ q:9, qa:10, qh:11 }[k] || CI[k]) : CI[k];
function hash2(x, y) { let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; }
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x, y) => vnoise(x, y) * 0.6 + vnoise(x * 2.1, y * 2.1) * 0.3 + vnoise(x * 4.3, y * 4.3) * 0.1;
function moonPhase() { const syn = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14) / 86400000, d = Date.now() / 86400000 - ref; return (((d % syn) + syn) % syn) / syn; }
function moonName(p) {
  if (p < 0.03 || p > 0.97) return 'new moon';
  if (p < 0.22) return 'waxing crescent'; if (p < 0.28) return 'first quarter'; if (p < 0.47) return 'waxing gibbous';
  if (p < 0.53) return 'full moon'; if (p < 0.72) return 'waning gibbous'; if (p < 0.78) return 'last quarter'; return 'waning crescent';
}
const FACTS = {
  moon: () => { const p = moonPhase(); return `the moon tonight · ${moonName(p)} · ${Math.round((1 - Math.cos(2 * Math.PI * p)) / 2 * 100)}% lit`; },
  sun: () => 'the sun · light mode is daytime',
  mars: () => 'mars · home of Olympus Mons, the tallest volcano in the solar system',
  jupiter: () => 'jupiter · the great red spot is a storm wider than earth',
  saturn: () => 'saturn · its rings are mostly water ice',
  neptune: () => 'neptune · the fastest winds in the solar system',
  galaxy: () => 'a spiral galaxy · thanks for scrolling this far'
};
const SP = { bodies:[], neb:[], belt:null, ms:0, vr:0, cl:0, cr:0, hits:[], label:null, sat:null, nextSat:10, light:false, gal:null };
function spaceLayout() {
  const de = document.documentElement;
  SP.vr = innerHeight / LH;
  SP.ms = Math.max(0, (de.scrollHeight - innerHeight) / LH);
  const r = document.getElementById('main').getBoundingClientRect();
  SP.cl = (r.left + 16) / CW; SP.cr = (r.right - 16) / CW;
  SP.light = lum(toHex(getComputedStyle(root).getPropertyValue('--bg').trim())) > 0.5;
  const k = BG.cols < 70 ? 0.72 : 1, n = v => Math.max(3, Math.round(v * k));
  SP.bodies = [
    { id:'moon', frac:0, f:.35, side:'right', rx:n(7) },
    { id:'mars', frac:.15, f:.45, side:'left', rx:n(5) },
    { id:'jupiter', frac:.42, f:.45, side:'right', rx:n(12) },
    { id:'saturn', frac:.63, f:.45, side:'left', rx:n(6) },
    { id:'neptune', frac:.83, f:.45, side:'right', rx:n(5) },
    { id:'galaxy', frac:1, f:.45, side:'left', rx:n(18) }
  ];
  // same parallax for every planet so they never overtake each other, then keep a gap on each side
  const Rr = RATIO();
  SP.bodies.forEach(o => {
    o.vh = (o.id === 'galaxy' ? o.rx * 0.6 : o.rx) * Rr;
    o.wy = o.frac * SP.ms * o.f + SP.vr * 0.5;
  });
  ['left', 'right'].forEach(side => {
    const list = SP.bodies.filter(o => o.side === side && o.id !== 'moon').sort((a, b) => a.wy - b.wy);
    for (let i = 1; i < list.length; i++) {
      const min = list[i - 1].wy + list[i - 1].vh + list[i].vh + 4;
      if (list[i].wy < min) list[i].wy = min;
    }
    const limit = SP.ms * 0.45 + SP.vr * 0.62;
    for (let i = list.length - 1; i >= 0; i--) {
      const cap = i === list.length - 1 ? limit : list[i + 1].wy - list[i + 1].vh - list[i].vh - 4;
      if (list[i].wy > cap) list[i].wy = cap;
    }
  });
  SP.neb = [
    { frac:.06, f:.22, side:'left', rx:n(36), ry:9 * k + 2, seed:1 },
    { frac:.5, f:.22, side:'right', rx:n(42), ry:11 * k + 2, seed:2 },
    { frac:.92, f:.22, side:'right', rx:n(38), ry:10 * k + 2, seed:3 }
  ];
  if (!SP.belt || SP.belt.cols !== BG.cols) {
    SP.belt = { cols: BG.cols, frac:.28, f:.5, rocks: Array.from({ length: Math.round(BG.cols * 0.45) }, () => ({ x: Math.random() * BG.cols, dy: (Math.random() - .5) * 5, v: 0.3 + Math.random() * 0.9, i: rand(4) })) };
  }
  if (!SP.gal) {
    SP.gal = [];
    for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 150; i++) {
      const tt = i / 150, rr = 0.1 + tt * 0.9, a = tt * 5.2 + arm * Math.PI + (Math.random() - .5) * 0.35;
      SP.gal.push({ r: rr + (Math.random() - .5) * 0.05, a, b: 1 - tt * 0.75 + (Math.random() - .5) * 0.2 });
    }
    for (let i = 0; i < 40; i++) SP.gal.push({ r: Math.random() * 0.14, a: Math.random() * 6.28, b: 1.2 });
  }
  if (!motion) bgStep(0, 0);
}
function bodyX(side, half, fit) {
  const ml = SP.cl, mr = BG.cols - SP.cr;
  if (side === 'left') return ml >= half * 2 + 2 ? ml / 2 : (fit ? half + 1 : half * 0.45);
  return mr >= half * 2 + 2 ? SP.cr + mr / 2 : (fit ? BG.cols - half - 2 : BG.cols - half * 0.45);
}
function spaceNebula(set, t, sy) {
  const ramp = S.cs === 'ascii' ? [':', '.', '.'] : [':', '·', '.'];
  for (const nb of SP.neb) {
    const cy = nb.frac * SP.ms * nb.f + SP.vr * 0.5 - sy * nb.f;
    if (cy + nb.ry < 0 || cy - nb.ry > BG.rows) continue;
    const cx = nb.side === 'left' ? nb.rx * 0.45 : BG.cols - nb.rx * 0.45;
    for (let y = Math.max(0, Math.floor(cy - nb.ry)); y <= Math.min(BG.rows - 1, Math.ceil(cy + nb.ry)); y++)
      for (let x = Math.max(0, Math.floor(cx - nb.rx)); x <= Math.min(BG.cols - 1, Math.ceil(cx + nb.rx)); x++) {
        const dx = (x - cx) / nb.rx, dy = (y - cy) / nb.ry, d = dx * dx + dy * dy;
        if (d > 1) continue;
        const v = fbm((x - cx) * 0.09 + nb.seed * 13 + t * 0.03, (y - cy) * 0.2 + nb.seed * 7) * (1 - d) * 1.7;
        if (v < 0.34 || hash2(x * 7 + nb.seed, y * 13 + nb.seed) > v * 0.5) continue;
        if (v > 0.62) set(x, y, ramp[0], CI.n); else if (v > 0.47) set(x, y, ramp[1], CI.n); else set(x, y, ramp[2], CI.n2);
      }
  }
}
function drawSphere(set, cx, cy, rx, tex, dim) {
  const ry = rx * RATIO(), ramp = ['.', ':', '-', '=', '+', '*', '#', '%', '@'];
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
    const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry, d = nx * nx + ny * ny;
    if (d > 1) continue;
    const z = Math.sqrt(1 - d), lam = Math.max(0, -0.55 * nx - 0.45 * ny + 0.7 * z);
    const tx = tex(Math.atan2(nx, z), Math.asin(clamp(ny, -1, 1)));
    const v = lam * (0.35 + 0.65 * tx.v) + 0.06;
    set(x, y, v < 0.14 ? ' ' : ramp[clamp(Math.floor(v * ramp.length), 0, ramp.length - 1)], dimc(tx.k || 'q', dim));
  }
}
function spaceBodies(set, t, sy, dt) {
  if (!SP.belt) return;
  const R = RATIO(), c = CS[S.cs], mt = motion ? t : 0;
  SP.hits = [];
  // asteroid belt
  const b = SP.belt, by = b.frac * SP.ms * b.f + SP.vr * 0.5 - sy * b.f;
  if (by > -4 && by < BG.rows + 4) {
    const rch = S.cs === 'ascii' ? ['.', 'o', '.', ','] : ['·', 'o', '°', '.'];
    b.rocks.forEach(r => { r.x -= r.v * dt; if (r.x < 0) r.x += BG.cols; set(r.x, by + r.dy, rch[r.i], CI.q); });
  }
  for (const o of SP.bodies) {
    const isSat = o.id === 'saturn', half = o.id === 'galaxy' ? o.rx : isSat ? o.rx * 2.3 : o.rx;
    const vh = (o.id === 'galaxy' ? o.rx * 0.6 : isSat ? o.rx : o.rx) * R;
    const cy = o.id === 'moon' ? (o.rx * R + 2.5) - sy * o.f : o.wy - sy * o.f;
    if (cy + vh + 2 < 0 || cy - vh - 2 > BG.rows) continue;
    const cx = bodyX(o.side, half + 1, o.id === 'moon');
    const dim = o.id !== 'moon' && cx + half > SP.cl && cx - half < SP.cr;
    const id = o.id === 'moon' && SP.light ? 'sun' : o.id;
    if (id === 'moon') {
      const p = moonPhase(), ry = o.rx * R;
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - o.rx); x <= Math.ceil(cx + o.rx); x++) {
        const nx = (x + 0.5 - cx) / o.rx, ny = (y + 0.5 - cy) / ry, d = nx * nx + ny * ny;
        if (d > 1) continue;
        const xt = Math.sqrt(Math.max(0, 1 - ny * ny));
        const lit = p < 0.5 ? nx > xt * Math.cos(2 * Math.PI * p) : nx < xt * Math.cos(2 * Math.PI * (p - 0.5));
        const cr = vnoise(nx * 3.2 + 11, ny * 3.2 + 5);
        if (lit) set(x, y, cr > 0.64 ? '*' : cr > 0.55 ? '%' : d > 0.82 ? '#' : '@', CI.qh);
        else set(x, y, d > 0.85 ? '.' : ' ', CI.n2);
      }
    } else if (id === 'sun') {
      drawSphere(set, cx, cy, o.rx, () => ({ v: 1, k: 'qa' }), false);
      const rays = S.cs === 'ascii' ? ['-', '\\', '|', '/'] : ['─', '╲', '│', '╱'];
      for (let a = 0; a < 8; a++) {
        const ang = a * Math.PI / 4, ext = 1.6 + (Math.sin(mt * 2 + a) > 0 ? 1 : 0);
        for (let k = 1.4; k <= ext + 0.6; k += 1) set(cx + Math.cos(ang) * (o.rx + k), cy + Math.sin(ang) * (o.rx + k) * R, rays[a % 4], CI.qa);
      }
    } else if (id === 'mars') {
      drawSphere(set, cx, cy, o.rx, (lon, lat) => ({ v: 0.55 + 0.9 * (fbm((lon + mt * 0.12) * 1.6 + 3, lat * 2 + 7) - 0.5), k: Math.abs(lat) > 1.15 ? 'qh' : 'qa' }), dim);
    } else if (id === 'jupiter') {
      drawSphere(set, cx, cy, o.rx, (lon, lat) => {
        const L = lon + mt * 0.07, sl = Math.atan2(Math.sin(L - 2), Math.cos(L - 2));
        if ((sl / 0.38) ** 2 + ((lat - 0.36) / 0.13) ** 2 < 1) return { v: 0.95, k: 'qa' };
        const band = 0.5 + 0.5 * Math.sin(lat * 10 + (fbm(L * 1.3, lat * 5) - 0.5) * 3);
        return { v: 0.35 + 0.65 * band, k: band > 0.72 ? 'qh' : 'q' };
      }, dim);
    } else if (id === 'saturn') {
      drawSphere(set, cx, cy, o.rx, (lon, lat) => ({ v: 0.65 + 0.3 * Math.sin(lat * 7), k: 'q' }), dim);
      const Rx = o.rx * 2.3, Ry = Rx * R * 0.34, rch = ['=', '-'];
      for (let y = Math.floor(cy - Ry); y <= Math.ceil(cy + Ry); y++) for (let x = Math.floor(cx - Rx); x <= Math.ceil(cx + Rx); x++) {
        const dx = (x + 0.5 - cx) / Rx, dy = (y + 0.5 - cy) / Ry, e = Math.sqrt(dx * dx + dy * dy);
        if (e < 0.56 || e > 1 || (e > 0.8 && e < 0.86)) continue;
        const inBody = ((x + 0.5 - cx) / o.rx) ** 2 + ((y + 0.5 - cy) / (o.rx * R)) ** 2 <= 1;
        if (inBody && dy < 0) continue;
        set(x, y, rch[e < 0.8 ? 0 : 1], dimc(e < 0.8 ? 'qh' : 'q', dim));
      }
    } else if (id === 'neptune') {
      drawSphere(set, cx, cy, o.rx, (lon, lat) => {
        const L = lon + mt * 0.1, sl = Math.atan2(Math.sin(L), Math.cos(L));
        if ((sl / 0.35) ** 2 + ((lat + 0.3) / 0.15) ** 2 < 1) return { v: 0.2, k: 'q' };
        return { v: 0.6 + 0.3 * Math.sin(lat * 6 + fbm(L * 2, lat * 3) * 2), k: 'qh' };
      }, dim);
    } else if (id === 'galaxy') {
      const rot = mt * 0.04;
      for (const g of SP.gal) {
        const a = g.a + rot, x = cx + Math.cos(a) * g.r * o.rx, y = cy + Math.sin(a) * g.r * o.rx * R * 0.55;
        const ch = g.b > 1 ? (S.cs === 'ascii' ? '@' : '█') : g.b > 0.75 ? '*' : g.b > 0.5 ? '+' : (S.cs === 'ascii' ? '.' : '·');
        set(x, y, ch, dimc(g.b > 1 ? 'qh' : g.b > 0.6 ? 'qa' : 'q', dim));
      }
    }
    SP.hits.push({ id, x0: cx - half - 1, x1: cx + half + 1, y0: cy - vh - 1, y1: cy + vh + 1, cx, by: cy + vh + 1 });
    if (id === 'moon' || (SP.label && SP.label.id === id && SP.label.until > performance.now())) {
      const text = id === 'moon' && !(SP.label && SP.label.id === 'moon' && SP.label.until > performance.now()) ? moonName(moonPhase()) : FACTS[id]();
      const tx = clamp(Math.round(cx - text.length / 2), 0, Math.max(0, BG.cols - text.length - 1));
      for (let i = 0; i < text.length; i++) set(tx + i, cy + vh + 1.2, text[i], id === 'moon' && text === moonName(moonPhase()) ? CI.ql : CI.qh);
    }
  }
  // a satellite now and then
  SP.nextSat -= dt;
  if (!SP.sat && SP.nextSat <= 0) { SP.sat = { x: -4, y: 2 + Math.random() * (BG.rows * 0.7), v: 5 + Math.random() * 4 }; SP.nextSat = 18 + Math.random() * 20; }
  if (SP.sat) {
    SP.sat.x += SP.sat.v * dt;
    const s = SP.sat, blink = Math.floor(t * 2) % 2;
    const art = S.cs === 'ascii' ? '-o-' : '╺●╸';
    for (let i = 0; i < 3; i++) set(s.x + i, s.y, art[i], i === 1 && blink ? CI.p : CI.q);
    if (s.x > BG.cols + 4) SP.sat = null;
  }
}
function spaceClick(e) {
  const x = e.clientX / CW, y = e.clientY / LH;
  const h = SP.hits.find(h => x >= h.x0 && x <= h.x1 && y >= h.y0 && y <= h.y1);
  if (!h) return false;
  SP.label = { id: h.id, until: performance.now() + 4000 };
  S.astro = S.astro || {};
  S.astro[h.id === 'sun' ? 'moon' : h.id] = 1; save();
  if (['moon', 'mars', 'jupiter', 'saturn', 'neptune', 'galaxy'].every(k => S.astro[k])) achieve('astronomer');
  if (!motion) bgStep(0, 0);
  return true;
}

/* ---------- background: stars, comets, sparks, matrix rain ---------- */
const BG = { cols:0, rows:0, stars:[], parts:[], comets:[], drops:[], acc:0, nextComet:3 };
const SPD = [0.4, 1.0, 2.2], PAR = [0.05, 0.12, 0.25];
const GLYPHS = '0123456789ABCDEF<>/\\=+*:';
function bgSize() {
  const cols = Math.ceil(innerWidth / CW) + 1, rows = Math.ceil(innerHeight / LH) + 1;
  if (cols === BG.cols && rows === BG.rows) return;
  BG.cols = cols; BG.rows = rows;
  const n = Math.round(cols * rows * 0.022);
  BG.stars = Array.from({ length: n }, () => ({ x: Math.random() * cols, y: Math.random() * rows, z: rand(3), ph: Math.random() * 6.28 }));
  BG.drops = Array.from({ length: cols }, () => ({ y: -Math.random() * rows, v: 5 + Math.random() * 12, len: 4 + rand(12), seed: rand(999) }));
  if (!motion) bgStep(0, 0);
}
function bgStep(dt, t) {
  const { cols, rows } = BG; if (!cols) return;
  if (S.recruiter) { if (bgEl.firstChild) bgEl.innerHTML = ''; return; }
  const c = CS[S.cs];
  const ch = new Array(cols * rows).fill(' '), cl = new Uint8Array(cols * rows);
  const set = (x, y, g, k) => { x = Math.floor(x); y = Math.floor(y); if (x < 0 || y < 0 || x >= cols || y >= rows) return; ch[y * cols + x] = g; cl[y * cols + x] = k; };
  const sy = scrollY / LH;
  if (S.matrix) {
    BG.drops.forEach((d, i) => {
      d.y += d.v * dt;
      if (d.y - d.len > rows) { d.y = -rand(rows / 2); d.v = 5 + Math.random() * 12; d.len = 4 + rand(12); }
      for (let k = 0; k < d.len; k++) {
        const y = Math.floor(d.y) - k;
        const g = GLYPHS[Math.abs(i * 7 + y * 13 + d.seed + (k === 0 ? Math.floor(t * 20) : Math.floor(t * 2))) % GLYPHS.length];
        set(i, y, g, k === 0 ? 3 : 2);
      }
    });
  } else {
    if (S.fx.space) spaceNebula(set, t, sy);
    if (S.fx.stars) for (const s of BG.stars) {
      s.x -= SPD[s.z] * dt; if (s.x < 0) s.x += cols;
      const y = (((s.y - sy * PAR[s.z]) % rows) + rows) % rows;
      set(s.x, y, Math.sin(t * 1.6 + s.ph) > 0.97 ? '+' : c.star[s.z], 0);
    }
    if (S.fx.space) spaceBodies(set, t, sy, dt);
    if (S.fx.stars) BG.nextComet -= dt;
    if (BG.nextComet <= 0) {
      BG.comets.push({ x: cols + 2, y: Math.random() * rows * 0.5, vx: -(26 + Math.random() * 18), vy: 6 + Math.random() * 5 });
      BG.nextComet = 6 + Math.random() * 8;
    }
    BG.comets = BG.comets.filter(k => k.x > -12 && k.y < rows + 4);
    for (const k of BG.comets) {
      k.x += k.vx * dt; k.y += k.vy * dt;
      for (let i = 7; i >= 1; i--) set(k.x - k.vx * i * 0.03, k.y - k.vy * i * 0.03, i < 3 ? '=' : i < 5 ? '-' : '.', i < 3 ? 1 : 0);
      set(k.x, k.y, '*', 1);
    }
  }
  if (!S.fx.stars) BG.comets = [];
  BG.parts = BG.parts.filter(p => (p.life -= dt) > 0);
  for (const p of BG.parts) {
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += p.g * dt;
    const f = p.life / p.max;
    set(p.x, p.y, p.dir && f > 0.55 ? p.dir : c.fade[Math.min(3, Math.floor(f * 4))], 1);
  }
  let html = '';
  for (let y = 0; y < rows; y++) {
    let run = '', k = 0;
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x, kk = cl[i];
      if (kk !== k) { html += k ? `<span class="${BGC[k]}">${esc(run)}</span>` : esc(run); run = ''; k = kk; }
      run += ch[i];
    }
    html += k ? `<span class="${BGC[k]}">${esc(run)}</span>` : esc(run);
    html += '\n';
  }
  bgEl.innerHTML = html;
}
let lastCell = '';
addEventListener('pointermove', e => {
  if (!motion || !S.fx.sparks || e.pointerType !== 'mouse' || ARC.open || S.recruiter) return;
  const x = Math.floor(e.clientX / CW), y = Math.floor(e.clientY / LH), key = x + ',' + y;
  if (key === lastCell) return; lastCell = key;
  if (BG.parts.length > 160) return;
  BG.parts.push({ x: x + 0.5, y: y + 0.5, vx: (Math.random() - .5) * 3, vy: -0.5 - Math.random() * 1.5, g: 0, life: .7, max: .7 });
});
addEventListener('pointerdown', e => {
  if (ARC.open || S.recruiter || e.target.closest('button, a, label, input, .gm')) return;
  if (S.fx.space && !S.matrix) spaceClick(e);
  if (!motion || !S.fx.sparks) return;
  const x = e.clientX / CW, y = e.clientY / LH, ratio = CW / LH;
  const dirs = ['-', '\\', '|', '/'];
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + Math.random() * 0.2, sp = 10 + Math.random() * 10, life = .7 + Math.random() * .5;
    BG.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * ratio, g: 7, life, max: life,
      dir: dirs[Math.round(((a % Math.PI) + Math.PI) % Math.PI / (Math.PI / 4)) % 4] });
  }
  achieve('spark');
});

/* ---------- main loop ---------- */
let lastT = performance.now(), uiAcc = 0, spinI = 0, pulseAcc = 0, pulseI = 0;
function loop(now) {
  const dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
  arcadeLoop(dt);
  if (!ARC.open && !S.recruiter && Gvis && motion && Gp) {
    Gacc += dt * 1000;
    let ticked = false;
    const iv = Math.max(38, 80 - Gp.score * 0.08);
    while (Gacc >= iv) { Gacc -= iv; runStep(Gp); ticked = true; }
    if (Gp.over && !gReset) gReset = setTimeout(() => { Gp = runInit(Gp.w, 5, true); gReset = 0; }, 900);
    if (ticked) gDraw();
  }
  if (motion) {
    uiAcc += dt;
    if (uiAcc > 0.08) {
      uiAcc = 0; spinI++;
      const sp = CS[S.cs].spin;
      scr.querySelectorAll('.spin').forEach(el => el.textContent = sp[spinI % sp.length]);
    }
    pulseAcc += dt;
    if (pulseAcc > 0.35) {
      pulseAcc = 0; pulseI++;
      const pu = CS[S.cs].pulse;
      scr.querySelectorAll('.pulse').forEach(el => el.textContent = pu[pulseI % pu.length]);
    }
    if (scrambles.size) stepScrambles(now);
    BG.acc += dt;
    if (BG.acc > 0.045 || scrollY !== BG.lastSy) { bgStep(BG.acc, now / 1000); BG.acc = 0; BG.lastSy = scrollY; }
  }
  requestAnimationFrame(loop);
}

/* ---------- recruiter mode: the plain CV ---------- */
function buildRecruiter(Wfull) {
  const W = Math.min(Wfull, 80), out = [];
  const push = (...ls) => out.push(...ls), blank = () => out.push([]);
  const para = (t, ind = 0, k = '') => wrap(t, W - ind).forEach(l => push([T(' '.repeat(ind) + l, k)]));
  const head = t => { blank(); push([T(t.toUpperCase(), 'acc')]); push([D('-'.repeat(t.length))]); };
  const lr = (left, right, kl, kr) => {
    if (left.length + right.length + 2 <= W) push([T(left, kl), T(' '.repeat(W - left.length - right.length)), T(right, kr)]);
    else { para(left, 0, kl); push([T(right, kr)]); }
  };
  push(...flow([B('[ back to the full portfolio ]', 'recruiter'), B(msg.rcopy ? '[ copied ]' : '[ copy as plain text ]', 'rcopy')], W, 2));
  blank();
  out.toolbar = out.length;
  push([T(PROFILE.name.toUpperCase(), 'hi')]);
  para('Senior Software Engineer & Tech Lead · 8+ years');
  para('Zaragoza, Spain (CET)', 0, 'dim');
  push(...flow(LINKS.map(([, href, label]) => A(label, href)), W, 3));
  head('Summary');
  para(PROFILE.summary);
  head('Experience');
  EXPERIENCE.forEach((e, i) => {
    if (i) blank();
    lr(e.co, e.dates, 'hi', 'dim');
    para(`${e.role} · ${e.loc}`, 0, 'acc');
    para(e.desc, 2);
  });
  head('Skills');
  const kw = 16;
  SKILLS.forEach(([cat, list]) => {
    const lines = wrap(list.join(', '), Math.max(20, W - kw));
    lines.forEach((l, i) => push([T((i ? '' : cat).padEnd(kw), 'dim'), T(l)]));
  });
  head('Education');
  lr(EDUCATION.school, EDUCATION.when, 'hi', 'dim');
  para(`${EDUCATION.degree} · ${EDUCATION.loc}`, 0, 'acc');
  para('Thesis: ' + EDUCATION.thesis, 2);
  head('Languages');
  para(LANGS);
  head('Contact');
  LINKS.forEach(([k, href, label]) => push([T(k.padEnd(10), 'dim'), A(label, href)]));
  push([T('email'.padEnd(10), 'dim'), T(EMAIL)]);
  blank();
  return out;
}
function recruiterText() {
  const lines = buildRecruiter(80);
  return lines.slice(lines.toolbar).map(l => l.map(s => s.t).join('').trimEnd()).join('\n').trim() + '\n';
}
function setRecruiter(on) {
  S.recruiter = on; save();
  try { history.replaceState(null, '', on ? '#recruiter' : location.pathname + location.search); } catch (e) {}
  if (on) { BG.parts = []; bgEl.innerHTML = ''; }
  applyTheme(); render(); scrollTo(0, 0);
  const b = scr.querySelector('[data-act="recruiter"]'); if (b) b.focus({ preventScroll: true });
}

/* ---------- page events ---------- */
scr.addEventListener('click', e => {
  if (e.target.closest('.gm')) { openArcade(); return; }
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const [act, arg] = btn.dataset.act.split(':');
  if (act === 'arcade') { openArcade(); return; }
  if (act === 'recruiter') { setRecruiter(!S.recruiter); return; }
  if (act === 'rcopy') {
    const done = () => { msg.rcopy = true; render(); setTimeout(() => { msg.rcopy = false; render(); }, 1600); };
    try { navigator.clipboard.writeText(recruiterText()).then(done, () => {}); } catch (err) {}
    return;
  }
  if (act === 'go') {
    const el = document.getElementById('s-' + arg);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    return;
  }
  if (act === 'preset') { S.preset = arg; S.custom = {}; }
  else if (act === 'cs') { S.cs = arg; if (arg === 'ascii') achieve('ascii'); }
  else if (act === 'fx') S.fx[arg] = !S.fx[arg];
  else if (act === 'tog') { S.open[arg] = !S.open[arg]; if (EXPERIENCE.every(p => S.open[p.id])) achieve('explorer'); }
  else if (act === 'reset') { const keep = { hs: S.hs, ach: S.ach, played: S.played }; S = Object.assign(DEFAULTS(), keep); }
  else if (act === 'copy') {
    const done = () => { msg.copy = true; render(); setTimeout(() => { msg.copy = false; render(); }, 1600); };
    try { navigator.clipboard.writeText(EMAIL).then(done, selectEmail); } catch (err) { selectEmail(); }
    return;
  }
  else if (act === 'send') {
    const n = document.getElementById('f-name').value.trim(), m = document.getElementById('f-msg').value.trim();
    msg.send = n && m ? 'demo only, nothing was sent' : 'fill in both fields';
  }
  applyTheme(); save(); render();
});
function selectEmail() {
  const r = document.createRange();
  const walker = document.createTreeWalker(scr, NodeFilter.SHOW_TEXT);
  let node; while ((node = walker.nextNode())) {
    const i = node.textContent.indexOf(EMAIL);
    if (i >= 0) { r.setStart(node, i); r.setEnd(node, i + EMAIL.length); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return; }
  }
}
KEYS.forEach(([k]) => {
  document.getElementById('ci-' + k).addEventListener('input', e => {
    if (S.preset !== 'system' && !Object.keys(S.custom).length) S.custom = Object.assign({}, PRESETS[S.preset]);
    S.custom[k] = e.target.value;
    achieve('hacker');
    applyTheme(); save(); render();
  });
});
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIdx = 0;
addEventListener('keydown', e => {
  if (ARC.open) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kIdx = key === KONAMI[kIdx] ? kIdx + 1 : (key === KONAMI[0] ? 1 : 0);
  if (kIdx === KONAMI.length) { kIdx = 0; S.matrix = !S.matrix; save(); achieve('konami'); }
});

let rt, lastW = 0;
new ResizeObserver(entries => {
  const w = Math.round(entries[0].contentRect.width);
  if (w === lastW) return;
  lastW = w; clearTimeout(rt); rt = setTimeout(render, 60);
}).observe(document.getElementById('main'));
addEventListener('scroll', () => { if (!motion) bgStep(0, 0); }, { passive: true });
addEventListener('resize', () => { bgSize(); spaceLayout(); if (ARC.open && ARC.view === 'menu') { arcadeSize(); arcadeRender(); } });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
new MutationObserver(() => render()).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

/* ---------- boot ---------- */
if (location.hash === '#recruiter') S.recruiter = true;
addEventListener('hashchange', () => { const on = location.hash === '#recruiter'; if (on !== !!S.recruiter) setRecruiter(on); });
applyTheme();
render();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => render());
const CMD = 'cat portfolio.txt';
if (reduced) { typed = CMD; render(); }
else {
  let i = 0;
  const tick = () => {
    typed = CMD.slice(0, ++i);
    const el = document.getElementById('typed'); if (el) el.textContent = typed;
    if (i < CMD.length) setTimeout(tick, 70 + Math.random() * 60);
  };
  setTimeout(tick, 500);
}
requestAnimationFrame(loop);
})();
