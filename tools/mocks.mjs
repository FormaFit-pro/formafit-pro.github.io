// Pantallas de la app recreadas para los pasos del entrenador (conectar, asignar,
// sesiones que llegan), con el aspecto de la ficha de cliente de la app.
// Uso (desde la raíz del repo): node tools/mocks.mjs — necesita Microsoft Edge. Deja PNG
// (600×1300) en una carpeta temporal; pasarlos a JPG en img/ como los de tools/shots.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const T = {
  es: {
    client: 'Cliente', tabs: ['Programa', 'Historial', 'Progreso', 'Info'],
    program: 'Programa', progName: 'Fuerza 3 días', progSub: 'Etapa 1 de 4 · semana 1 de 12', sessions: 'Sesiones de esta etapa',
    rows: [['A', 'Empuje', '5 ejercicios · ~55 min'], ['B', 'Tirón', '5 ejercicios · ~55 min'], ['C', 'Pierna', '5 ejercicios · ~60 min']],
    waiting: 'Esperando a Ana', waitLine: 'Que descargue Budi e introduzca este código.', share: 'Compartir',
    noProg: 'Sin programa activo', noProgSub: 'Asígnale uno para empezar. Podrás editarlo cuando quieras.', assign: 'Asignar programa', close: 'Cerrar',
    opts: [['Desde tus plantillas', 'Fuerza 3 días, Hipertrofia PPL…', '3'], ['Copiar de otro cliente', 'Parte del programa de Ana o de Vidal', ''], ['Del catálogo', 'Full Body, Upper/Lower, PPL…', ''], ['Crear desde cero', 'Prepáralo en el editor', '']],
    tpls: 'Tus plantillas', tplRows: [['Fuerza 3 días', 'Programa · 4 etapas'], ['Hipertrofia PPL', 'Programa · 3 etapas']], assignBtn: 'Asignar',
    week: 'Semana 1 de 12', weekDone: '2 de 3 esta semana', histH: 'Sesiones del cliente', unrev: '2 sin revisar',
    s: [
      { n: 'Sesión A · Empuje', when: 'hoy · 19:42', meta: '5 ejercicios · 52 min', new: true,
        ex: [['Press banca', '60 kg × 8 · 8 · 7'], ['Press militar', '40 kg × 10 · 9 · 9'], ['Fondos', '+10 kg × 8 · 8 · 6']], note: '«Hombro mucho mejor hoy»' },
      { n: 'Sesión C · Pierna', when: 'ayer · 08:15', meta: '5 ejercicios · 61 min', new: true,
        ex: [['Sentadilla', '80 kg × 5 · 5 · 5', 'PR'], ['Peso muerto rumano', '70 kg × 8 · 8 · 8']] },
      { n: 'Sesión B · Tirón', when: 'lun 13 oct', meta: '5 ejercicios · 55 min', ex: [] },
    ],
  },
  en: {
    client: 'Client', tabs: ['Program', 'History', 'Progress', 'Info'],
    program: 'Program', progName: '3-day strength', progSub: 'Stage 1 of 4 · week 1 of 12', sessions: 'Sessions in this stage',
    rows: [['A', 'Push', '5 exercises · ~55 min'], ['B', 'Pull', '5 exercises · ~55 min'], ['C', 'Legs', '5 exercises · ~60 min']],
    waiting: 'Waiting for Ana', waitLine: 'Ask her to download Budi and enter this code.', share: 'Share',
    noProg: 'No active program', noProgSub: 'Assign one to get started. You can edit it anytime.', assign: 'Assign program', close: 'Close',
    opts: [['From your templates', '3-day strength, PPL hypertrophy…', '3'], ['Copy from another client', 'Start from Ana’s or Vidal’s program', ''], ['From the catalog', 'Full Body, Upper/Lower, PPL…', ''], ['Build from scratch', 'Set it up in the editor', '']],
    tpls: 'Your templates', tplRows: [['3-day strength', 'Program · 4 stages'], ['PPL hypertrophy', 'Program · 3 stages']], assignBtn: 'Assign',
    week: 'Week 1 of 12', weekDone: '2 of 3 this week', histH: 'Client sessions', unrev: '2 to review',
    s: [
      { n: 'Session A · Push', when: 'today · 7:42 pm', meta: '5 exercises · 52 min', new: true,
        ex: [['Bench press', '60 kg × 8 · 8 · 7'], ['Overhead press', '40 kg × 10 · 9 · 9'], ['Dips', '+10 kg × 8 · 8 · 6']], note: '“Shoulder felt much better today”' },
      { n: 'Session C · Legs', when: 'yesterday · 8:15 am', meta: '5 exercises · 61 min', new: true,
        ex: [['Squat', '80 kg × 5 · 5 · 5', 'PR'], ['Romanian deadlift', '70 kg × 8 · 8 · 8']] },
      { n: 'Session B · Pull', when: 'Mon, Oct 13', meta: '5 exercises · 55 min', ex: [] },
    ],
  },
};

const chev = '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
const header = (t, name, tab) => `
<div class="hdr"><span class="back"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span>
  <div class="ttl"><small>${t.client}</small><b>${name}</b></div><span class="dots">•••</span></div>
<div class="seg">${t.tabs.map((x, i) => `<span${i === tab ? ' class="on"' : ''}>${x}</span>`).join('')}</div>`;

const SCREENS = {
  conectar: (t) => `${header(t, 'Ana Castillo', 0)}
<div class="card code"><p class="caps lime">${t.waiting}</p><p class="mut">${t.waitLine}</p>
  <div class="crow"><div class="cbox">XK7M-2P4T</div><span class="copy"><svg viewBox="0 0 24 24"><path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2zm0 0H6a2 2 0 00-2 2v12"/></svg></span></div>
  <div class="share"><svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>${t.share}</div></div>
<p class="caps sec">${t.program}</p>
<div class="card"><b class="big">${t.progName}</b><p class="mut">${t.progSub}</p><div class="bar"><i class="on"></i><i></i><i></i><i></i></div></div>
<p class="caps sec">${t.sessions}</p>
${t.rows.map(([l, n, m]) => `<div class="card row"><span class="let">${l}</span><div><b>${n}</b><p class="mut">${m}</p></div></div>`).join('')}`,

  asignar: (t) => `${header(t, 'Sara', 0)}
<div class="card empty"><b class="big">${t.noProg}</b><p class="mut">${t.noProgSub}</p><div class="share">+ ${t.assign}</div></div>
<div class="dim"></div>
<div class="sheet"><span class="handle"></span><div class="sh"><b>${t.assign}</b><span class="lime">${t.close}</span></div>
  ${t.opts.map(([a, b, n]) => `<div class="opt"><div><b>${a}</b><p class="mut">${b}</p></div>${n ? `<span class="n">${n}</span>` : ''}${chev}</div>`).join('')}
  <p class="caps sec">${t.tpls}</p>
  ${t.tplRows.map(([a, b]) => `<div class="opt"><div><b>${a}</b><p class="mut">${b}</p></div><span class="pill">${t.assignBtn}</span></div>`).join('')}
</div>`,

  actividad: (t) => `${header(t, 'Ana Castillo', 1)}
<div class="card wk"><div><b>${t.week}</b><p class="mut">${t.weekDone}</p></div><div class="sq"><i class="on"></i><i class="on"></i><i></i></div></div>
<div class="hh"><p class="caps">${t.histH}</p><span class="pill">${t.unrev}</span></div>
${t.s.map((s) => `<div class="card ses${s.new ? ' new' : ''}"><div class="sr"><b>${s.new ? '<i class="dot"></i>' : ''}${s.n}</b><span class="mut">${s.when}</span></div><p class="mut">${s.meta}</p>
  ${s.ex.map(([e, v, pr]) => `<div class="ex"><span>${e}</span><span>${v}${pr ? ` <em>${pr}</em>` : ''}</span></div>`).join('')}${s.note ? `<p class="note">${s.note}</p>` : ''}</div>`).join('')}`,
};

// ── Pantallas con la cabecera de Inicio (logo, fecha, menú) y la barra de pestañas ──
const LOGO = fs.readFileSync('soporte/index.html', 'utf8').match(/<svg viewBox="0 0 380 185"[\s\S]*?<\/svg>/)[0];
const ICONS = [ // Entreno, Programa, Progresión, Clientes, Plantillas
  '<path d="M3 12h18M6 8v8M3 10v4M18 8v8M21 10v4"/>',
  '<path d="M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  '<path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/>',
  '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 13.6c2.7.2 4.5 2.2 4.5 5"/>',
  '<rect x="4" y="7" width="13" height="13" rx="3"/><path d="M8 4h9a3 3 0 0 1 3 3v9"/>',
];
const appTop = (t) => `<div class="atop"><span class="alogo">${LOGO}</span><span class="adate">${t.date}</span><span class="amenu"><i></i><i></i><i></i></span></div>`;
const tabbar = (t, on) => `<div class="tabbar">${t.tabbar.map((x, i) => `<span${i === on ? ' class="on"' : ''}><svg viewBox="0 0 24 24">${ICONS[i]}</svg>${x}</span>`).join('')}</div>`;
const T2 = {
  es: { date: '20:04 · sáb 17 oct', tabbar: ['Entreno', 'Programa', 'Progresión', 'Clientes', 'Plantillas'],
    clients: 'Clientes', newClient: '+ Cliente', search: 'Buscar cliente...', risk: 'En riesgo', kpi: [['2', 'Pendientes', ''], ['86 %', 'Adherencia', 'media 4 sem'], ['+12 %', 'Mejora', 'media 8 sem']],
    listH: 'Clientes', sort: 'Actividad', program: '+ Programar',
    rows: [
      { i: 'AC', c: '#a78bfa', n: 'Ana Castillo', p: 'Fuerza 10 · Hipertrofia', sq: 3, w: 'hoy', tag: ['lime', '2 sin revisar'] },
      { i: 'MR', c: '#f59e0b', n: 'Marta Ruiz', p: 'Full Body · Etapa 2', sq: 2, w: 'ayer' },
      { i: 'S', c: '#2dd4bf', n: 'Sergio', p: 'Fuerza 1n1 · Hipertrofia · sem 2 de 4', sq: 1, w: 'hace 3 días', tag: ['blue', 'Cambios sin enviar'] },
      { i: 'VM', c: '#f472b6', n: 'Vidal Martínez', p: 'Calistenia iniciación · Básicos', sq: 0, w: 'hace 12 días', red: true, tag: ['red', 'Sin entrenar'] },
      { i: 'S', c: '#d6b48a', n: 'Sara', p: 'Sin programa activo', none: true },
    ],
    tplTitle: 'Plantillas', tplNew: '+ Plantilla', seg: ['Programas', 'Sesiones'], badge: 'Plantilla', use: 'Usar con cliente',
    tpls: [['Fuerza 3 días', '4 etapas · 12 semanas · 3 sesiones', ['A · Empuje', 'B · Tirón', 'C · Pierna']], ['Hipertrofia PPL', '3 etapas · 9 semanas · 6 sesiones', ['A · Push', 'B · Pull', 'C · Legs']], ['Full Body principiante', '2 etapas · 8 semanas · 3 sesiones', ['A', 'B', 'C']]],
    exEyebrow: 'Ejercicio propio', exTitle: 'Nuevo ejercicio', exAdd: 'Añadir', name: 'Nombre', exName: 'Remo en polea baja, agarre neutro',
    sumH: 'Resumen del ejercicio', sum: '3 × 8–12 reps · 90s descanso · Polea', sumSub: 'Sube 2,5 kg cuando todas las series lleguen a 12 · baja si fallan 2 de 3',
    vol: 'Volumen', reps: 'Reps', time: 'Tiempo', range: 'Rango', fixed: 'Reps fijas', f: [['Series', '3', ''], ['Descanso', '90', 's'], ['Reps mín', '8', ''], ['Reps máx', '12', '']],
    progH: 'Programación', prog: ['Progresión', 'Peso · +2,5 kg al llegar a 12 reps'], cls: ['Clasificación', 'Tirón horizontal · Espalda · Polea · Compuesto'] },
  en: { date: '8:04 pm · Sat, Oct 17', tabbar: ['Workout', 'Program', 'Progress', 'Clients', 'Templates'],
    clients: 'Clients', newClient: '+ Client', search: 'Search client...', risk: 'At risk', kpi: [['2', 'To review', ''], ['86%', 'Adherence', '4-week avg'], ['+12%', 'Improvement', '8-week avg']],
    listH: 'Clients', sort: 'Activity', program: '+ Program',
    rows: [
      { i: 'AC', c: '#a78bfa', n: 'Ana Castillo', p: '3-day strength · Hypertrophy', sq: 3, w: 'today', tag: ['lime', '2 to review'] },
      { i: 'MR', c: '#f59e0b', n: 'Marta Ruiz', p: 'Full Body · Stage 2', sq: 2, w: 'yesterday' },
      { i: 'S', c: '#2dd4bf', n: 'Sergio', p: '1-on-1 strength · Hypertrophy · wk 2 of 4', sq: 1, w: '3 days ago', tag: ['blue', 'Unsent changes'] },
      { i: 'VM', c: '#f472b6', n: 'Vidal Martínez', p: 'Calisthenics basics · Basics', sq: 0, w: '12 days ago', red: true, tag: ['red', 'Not training'] },
      { i: 'S', c: '#d6b48a', n: 'Sara', p: 'No active program', none: true },
    ],
    tplTitle: 'Templates', tplNew: '+ Template', seg: ['Programs', 'Sessions'], badge: 'Template', use: 'Use with client',
    tpls: [['3-day strength', '4 stages · 12 weeks · 3 sessions', ['A · Push', 'B · Pull', 'C · Legs']], ['PPL hypertrophy', '3 stages · 9 weeks · 6 sessions', ['A · Push', 'B · Pull', 'C · Legs']], ['Beginner full body', '2 stages · 8 weeks · 3 sessions', ['A', 'B', 'C']]],
    exEyebrow: 'Custom exercise', exTitle: 'New exercise', exAdd: 'Add', name: 'Name', exName: 'Seated cable row, neutral grip',
    sumH: 'Exercise summary', sum: '3 × 8–12 reps · 90s rest · Cable', sumSub: 'Add 2.5 kg when every set hits 12 · drop if 2 of 3 fall short',
    vol: 'Volume', reps: 'Reps', time: 'Time', range: 'Range', fixed: 'Fixed reps', f: [['Sets', '3', ''], ['Rest', '90', 's'], ['Min reps', '8', ''], ['Max reps', '12', '']],
    progH: 'Programming', prog: ['Progression', 'Weight · +2.5 kg at 12 reps'], cls: ['Classification', 'Horizontal pull · Back · Cable · Compound'] },
};
const stepper = ([l, v, u]) => `<div class="stp"><small>${l}</small><div><span class="pm">−</span><b>${v}${u ? `<em> ${u}</em>` : ''}</b><span class="pm">+</span></div></div>`;
const clientRow = (r, t) => `<div class="crowc"><span class="av" style="color:${r.c};background:${r.c}33">${r.i}</span>
  <div class="cmid"><b>${r.n}</b><p class="${r.none ? 'strong' : 'mut'}">${r.p}</p>${r.tag ? `<span class="tag ${r.tag[0]}">${r.tag[1]}</span>` : ''}</div>
  ${r.none ? `<span class="prg">${t.program}</span>` : `<div class="cright"><div class="sq">${[0, 1, 2].map((i) => `<i${i < r.sq ? ' class="on"' : ''}></i>`).join('')}</div><span class="${r.red ? 'red' : 'mut'}">${r.w}</span></div>`}</div>`;
Object.assign(SCREENS, {
  'clientes-estados': (x, t = T2[x.lang]) => `${appTop(t)}<div class="ch"><b>${t.clients.toUpperCase()}<span> · 5</span></b><span class="nb">${t.newClient}</span></div>
<div class="srch">⌕ ${t.search}</div><span class="risk">${t.risk} <i>1</i></span>
<div class="kpis">${t.kpi.map(([v, l, s], i) => `<div><b${i === 2 ? ' class="lime"' : ''}>${v}</b><span>${l}</span>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>
<div class="hh"><p class="caps">${t.listH}</p><span class="mut">↕ ${t.sort}</span></div>
${t.rows.map((r) => clientRow(r, t)).join('')}${tabbar(t, 3)}`,
  plantillas: (x, t = T2[x.lang]) => `${appTop(t)}<div class="ch"><b>${t.tplTitle.toUpperCase()}<span> · 3</span></b><span class="nb">${t.tplNew}</span></div>
<div class="seg">${t.seg.map((s, i) => `<span${i ? '' : ' class="on"'}>${s}</span>`).join('')}</div>
${t.tpls.map(([n, m, ss], i) => `<div class="card tpl"><span class="badge">${t.badge}</span><b class="big">${n}</b><p class="mut">${m}</p><div class="chips">${ss.map((s) => `<span>${s}</span>`).join('')}</div>${i === 0 ? `<div class="use">${t.use} →</div>` : ''}</div>`).join('')}${tabbar(t, 4)}`,
  ejercicio: (x, t = T2[x.lang]) => `<div class="hdr"><span class="back"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span><div class="ttl"><small>${t.exEyebrow}</small><b>${t.exTitle}</b></div><span class="add">${t.exAdd}</span></div>
<p class="caps sec0">${t.name}</p><div class="field">${t.exName}</div>
<div class="sum"><p class="caps lime">${t.sumH}</p><b>${t.sum}</b><p>${t.sumSub}</p></div>
<p class="caps sec">${t.vol}</p><div class="seg2"><span class="on">${t.reps}</span><span>${t.time}</span></div><div class="seg2"><span class="on">${t.range}</span><span>${t.fixed}</span></div>
<div class="grid">${t.f.map(stepper).join('')}</div>
<p class="caps sec">${t.progH}</p>${[t.prog, t.cls].map(([a, b]) => `<div class="opt"><div><b>${a}</b><p class="mut">${b}</p></div><svg viewBox="0 0 24 24" class="lime"><path d="M9 6l6 6-6 6"/></svg></div>`).join('')}`,
});

// ── Hoja de progresión, WhatsApp y «Pegar entreno» ──
const T3 = {
  es: { progTitle: 'Progresión', close: 'Cerrar', exName: 'Press banca con barra', exMeta: '3 × 6–8 reps',
    tiles: ['Peso', 'Reps', 'Esfuerzo', 'Nada'], say: '<b>Sube el peso</b> al completar el número máximo de reps del rango.',
    nextH: 'En la próxima sesión', raise: 'Se recomendará subir', big: '+2,5 kg', goal: 'al completar <b>8 en todas las series</b> y sin pasar de <b>RPE 9</b>',
    foot: 'Si fallas por mucho o varias veces seguidas, se recomendará bajar un 10 %.', how: 'Cómo progresa',
    rows: [['Cuánto sube', 'Kilos fijos cada vez', '+2,5 kg'], ['Cuándo sube', 'Series que llegan arriba', 'Todas'], ['Si fallas', 'Fallo grande o dos seguidos', '−10 %'], ['Freno por esfuerzo', 'No sube si cuesta demasiado', 'RPE 9'], ['Escalón', 'Redondeo del peso', '2,5 kg']],
    chatName: 'Vidal', chatSub: 'en línea',
    out: 'Sesión A · Empuje\nPress banca · 4x6-8 · 60kg:\nPress militar · 3x8-10 · 40kg:\nFondos · 3x8-12:\n\nEscribe detrás de cada «:» lo que hiciste: «ok» si salió como está, o el peso x reps de cada serie (100x6 100x6 95x5).',
    in: 'Sesión A · Empuje\nPress banca · 4x6-8 · 60kg: 60x8 60x8 60x7 60x6\nPress militar · 3x8-10 · 40kg: ok\nFondos · 3x8-12: 10 9 8',
    pEyebrow: 'Lo que te devolvió', pTitle: 'Pegar entreno', who: 'De quién', review: 'Lo que se ha entendido', cont: 'Continuar',
    parsed: [['Press banca', '60×8 · 60×8 · 60×7 · 60×6'], ['Press militar', '40×10 · 40×10 · 40×10'], ['Fondos', '10 · 9 · 8']], block: 'Se apunta en el entreno · Sesión A · hoy' },
  en: { progTitle: 'Progression', close: 'Close', exName: 'Barbell bench press', exMeta: '3 × 6–8 reps',
    tiles: ['Weight', 'Reps', 'Effort', 'None'], say: '<b>The weight goes up</b> when you complete the top of the rep range.',
    nextH: 'Next session', raise: 'We’ll suggest going up', big: '+2.5 kg', goal: 'once you complete <b>8 on every set</b> and stay under <b>RPE 9</b>',
    foot: 'If you miss by a lot or several times in a row, we’ll suggest dropping 10 %.', how: 'How it progresses',
    rows: [['How much it goes up', 'Fixed amount each time', '+2.5 kg'], ['When it goes up', 'Sets that reach the top', 'All'], ['If you miss', 'Big miss or two in a row', '−10 %'], ['Effort brake', 'Holds if it feels too hard', 'RPE 9'], ['Step', 'Weight rounding', '2.5 kg']],
    chatName: 'Vidal', chatSub: 'online',
    out: 'Session A · Push\nBench press · 4x6-8 · 60kg:\nOverhead press · 3x8-10 · 40kg:\nDips · 3x8-12:\n\nWrite what you did after each ":": "ok" if it went as written, or the weight x reps of each set (100x6 100x6 95x5).',
    in: 'Session A · Push\nBench press · 4x6-8 · 60kg: 60x8 60x8 60x7 60x6\nOverhead press · 3x8-10 · 40kg: ok\nDips · 3x8-12: 10 9 8',
    pEyebrow: 'What they sent back', pTitle: 'Paste workout', who: 'Whose', review: 'What was understood', cont: 'Continue',
    parsed: [['Bench press', '60×8 · 60×8 · 60×7 · 60×6'], ['Overhead press', '40×10 · 40×10 · 40×10'], ['Dips', '10 · 9 · 8']], block: 'Logged in the workout · Session A · today' },
};
const TILE_SVG = ['<path d="M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12"/>', '<path d="M7 7h10M7 12h10M7 17h6"/>', '<path d="M12 3c3 4 5 6.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 2 1.5 3 3 3-1-3 0-5.5 0-8Z"/>', '<circle cx="12" cy="12" r="8"/><path d="M8 16 16 8"/>'];
const ROW_SVG = ['<path d="M12 19V5M6 11l6-6 6 6"/>', '<rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="16" y="4" width="4" height="16" rx="1"/>', '<path d="M12 5v14M6 13l6 6 6-6"/>', '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>', '<path d="M4 18h4v-4h4v-4h4V6h4"/>'];
const br = (s) => s.replace(/\n/g, '<br>');
Object.assign(SCREENS, {
  'progresion-hoja': (x, t = T3[x.lang]) => `<div class="hdr dimmed"><span class="back"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span><div class="ttl"><small>Editor</small><b>${t.exName}</b></div><span class="dots">•••</span></div>
<div class="dim"></div>
<div class="sheet tall"><span class="handle"></span><div class="sh"><b>${t.progTitle}</b><span class="lime">${t.close}</span></div>
  <div class="pex"><span class="trend"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg></span><div><b>${t.exName}</b><p class="mut">${t.exMeta}</p></div></div>
  <div class="tiles">${t.tiles.map((n, i) => `<span${i ? '' : ' class="on"'}><svg viewBox="0 0 24 24">${TILE_SVG[i]}</svg>${n}</span>`).join('')}</div>
  <p class="say">${t.say}</p>
  <div class="next"><p class="caps mutc">${t.nextH}</p><p class="mut">${t.raise}</p><b class="nbig">${t.big}</b><p class="mut">${t.goal}</p><p class="nfoot">${t.foot}</p></div>
  <p class="caps mutc sec">${t.how}</p>
  <div class="grp">${t.rows.map(([a, b, v], i) => `<div class="grow"><span class="ricon"><svg viewBox="0 0 24 24">${ROW_SVG[i]}</svg></span><div><b>${a}</b><p class="mut">${b}</p></div><span class="rval">${v}</span></div>`).join('')}</div>
</div>`,
  whatsapp: (x, t = T3[x.lang]) => `<div class="wa"><div class="wah"><span>‹</span><span class="wav">V</span><div><b>${t.chatName}</b><small>${t.chatSub}</small></div></div>
<div class="wab"><div class="bub out">${br(t.out)}<small>19:02 ✓✓</small></div><div class="bub in">${br(t.in)}<small>20:47</small></div></div></div>`,
  pegar: (x, t = T3[x.lang]) => `<div class="hdr"><span class="back"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span><div class="ttl"><small>${t.pEyebrow}</small><b>${t.pTitle}</b></div><span class="dots"></span></div>
<p class="caps sec0">${t.who}</p><div class="whochip"><span class="av" style="color:#f472b6;background:#f472b633">VM</span><b>Vidal Martínez</b></div>
<div class="paste">${br(t.in)}</div>
<p class="caps sec">${t.review}</p>
<div class="card parsed">${t.parsed.map(([a, b]) => `<div class="ex"><span>✓ ${a}</span><span>${b}</span></div>`).join('')}<p class="mut pblock">${t.block}</p></div>
<div class="share cont">${t.cont}</div>`,
});

const CSS = `
.dimmed{opacity:.35}
.sheet.tall{top:70px;padding-bottom:16px}
.pex{display:flex;gap:12px;align-items:center;background:#242424;border-radius:12px;padding:12px 14px;margin-bottom:12px}.pex b{display:block}
.trend{width:28px;height:28px;border-radius:8px;background:#aae2161a;display:grid;place-items:center;color:#aae216}.trend svg{width:17px}
.tiles{display:flex;gap:6px}.tiles span{flex:1;background:#242424;border-radius:12px;padding:10px 2px 8px;display:grid;justify-items:center;gap:4px;font:700 12px/1 Inter;color:#9a9a9a}
.tiles svg{width:22px;height:22px;color:#aae216}.tiles .on{background:#aae216;color:#000}.tiles .on svg{color:#000}
.say{color:#9a9a9a;font-size:13px;margin:10px 0 12px}.say b{color:#f2f2f2}
.next{background:#242424;border-radius:12px;padding:13px 14px;display:grid;gap:6px}.mutc{color:#9a9a9a}.next .mut b{color:#f2f2f2}
.nbig{color:#aae216;font:800 22px/1 Inter}.nfoot{border-top:1px solid #333;padding-top:8px;color:#9a9a9a;font-size:12px}
.grp{display:grid;gap:3px;border-radius:12px;overflow:hidden}.grow{display:flex;align-items:center;gap:11px;background:#242424;padding:9px 14px}.grow>div{flex:1}.grow b{display:block;font-size:13.5px}.grow .mut{font-size:12px}
.ricon{width:28px;height:28px;border-radius:9px;background:#2e2e2e;display:grid;place-items:center;color:#9a9a9a}.ricon svg{width:15px}.rval{color:#aae216;font:700 13px/1 Inter}
.wa{position:absolute;inset:0;background:#0b141a;display:flex;flex-direction:column}
.wah{display:flex;align-items:center;gap:10px;background:#1f2c34;padding:14px 12px;color:#e9edef}.wah>span:first-child{font-size:28px;line-height:1;color:#aebac1}.wah small{display:block;color:#8696a0;font-size:12px}
.wav{width:36px;height:36px;border-radius:50%;background:#f472b6;color:#000;display:grid;place-items:center;font-weight:800}
.wab{flex:1;padding:14px 10px;display:flex;flex-direction:column;gap:10px;background:#0b141a}
.bub{max-width:86%;padding:8px 10px 18px;border-radius:10px;font:500 13.5px/1.4 Inter;color:#e9edef;position:relative}.bub small{position:absolute;right:8px;bottom:4px;font-size:10.5px;color:#8696a0}
.bub.out{align-self:flex-end;background:#005c4b;border-top-right-radius:2px}.bub.in{align-self:flex-start;background:#1f2c34;border-top-left-radius:2px}
.whochip{display:flex;align-items:center;gap:10px;background:#1f1f1f;border-radius:12px;padding:9px 12px;margin-bottom:10px}
.paste{background:#1a1a1a;border:1.5px solid #2c2c2c;border-radius:12px;padding:12px;font:500 12.5px/1.5 ui-monospace,Consolas,monospace;color:#cfcfcf}
.parsed{display:grid;gap:4px}.parsed .ex:first-child{border-top:0;padding-top:0;margin-top:0}.parsed .ex span:first-child{color:#aae216;font-weight:700}.pblock{margin-top:8px;font-size:12px}
.cont{position:absolute;left:16px;right:16px;bottom:22px}
.atop{display:flex;align-items:center;justify-content:space-between;height:44px;margin:6px 0 10px}
.alogo svg{height:20px;width:41px;fill:#fff;display:block}.alogo .i{fill:#aae216}
.adate{font:700 10px/1 Inter;letter-spacing:1.5px;color:#8f8f8f}
.amenu{display:grid;gap:3px;width:22px}.amenu i{height:3px;background:#aae216;transform:skewX(-20deg);border-radius:1px}
.ch{display:flex;align-items:center;gap:8px;margin-bottom:12px}.ch b{flex:1;font:900 22px/1 Inter;letter-spacing:-.5px}.ch b span{color:#aae216;font-weight:800}
.ib{width:40px;height:40px;border-radius:10px;background:#1f1f1f}
.nb{background:#aae216;color:#000;font:800 14px/1 Inter;padding:13px 14px;border-radius:12px}
.srch{background:#1f1f1f;border-radius:10px;padding:12px;color:#8a8a8a;margin-bottom:8px}
.risk{display:inline-block;background:#3a1717;color:#f87171;font:700 12px/1 Inter;padding:6px 8px;border-radius:7px;margin-bottom:10px}.risk i{font-style:normal;background:#5a2020;border-radius:50%;padding:1px 5px;margin-left:3px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.kpis div{background:#1f1f1f;border-radius:12px;padding:10px 4px;text-align:center;display:grid;gap:4px}
.kpis b{font:800 20px/1 Inter}.kpis span{font:800 9.5px/1 Inter;letter-spacing:1.2px;text-transform:uppercase}.kpis small{font-size:10px;color:#8a8a8a}
.crowc{display:flex;gap:10px;align-items:center;background:#1f1f1f;border-radius:12px;padding:11px 12px;margin-bottom:5px}
.av{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font:800 12px/1 Inter;flex:none}
.cmid{flex:1;min-width:0}.cmid b{font-size:15px}.cmid p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px}.strong{font-weight:700;font-size:12px}
.tag{display:inline-block;margin-top:5px;font:700 11px/1 Inter;padding:4px 7px;border-radius:6px}
.tag.lime{background:#aae21622;color:#aae216}.tag.blue{background:#3b82f622;color:#60a5fa}.tag.red{background:#ef444422;color:#f87171}
.cright{display:grid;justify-items:end;gap:6px;font-size:12px;flex:none}.cright .sq i{width:12px;height:12px;border-radius:3px}.red{color:#f87171;font-weight:600}
.prg{background:#2a2a2a;font:700 12px/1 Inter;padding:9px 10px;border-radius:9px}
.tabbar{position:absolute;left:0;right:0;bottom:0;height:74px;border-top:1px solid #222;background:#0f0f0f;display:flex;padding-top:9px}
.tabbar span{flex:1;display:grid;justify-items:center;align-content:start;gap:4px;font:600 10.5px/1 Inter;color:#8a8a8a}.tabbar svg{width:24px;height:24px;stroke-width:1.8}.tabbar .on{color:#aae216}
.tpl{display:grid;gap:4px;padding:16px}.badge{justify-self:start;font:800 9.5px/1 Inter;letter-spacing:1.2px;text-transform:uppercase;color:#aae216;border:1.5px solid #aae21655;padding:4px 6px;border-radius:5px;margin-bottom:4px}
.chips{display:flex;gap:5px;margin-top:8px;flex-wrap:wrap}.chips span{background:#2a2a2a;border-radius:7px;padding:5px 8px;font:700 11px/1 Inter;color:#ddd}
.use{margin-top:10px;border-top:1px solid #2c2c2c;padding-top:10px;color:#aae216;font:700 13px/1 Inter}
.add{background:#aae216;color:#000;font:800 13px/1 Inter;padding:10px 12px;border-radius:10px}
.sec0{margin:6px 0 8px}.field{background:#1f1f1f;border-radius:10px;padding:13px 12px;font-weight:700;font-size:15px}
.sum{background:#aae2161f;border-radius:12px;padding:13px;margin-top:10px;display:grid;gap:6px}.sum b{font-size:14px}.sum p:last-child{color:#aae216;font-size:12px}
.seg2{display:flex;background:#1f1f1f;border-radius:999px;padding:4px;margin-bottom:6px}.seg2 span{flex:1;text-align:center;padding:10px 0;border-radius:999px;font:700 13px/1 Inter;color:#ddd}.seg2 .on{background:#aae216;color:#000}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.stp{background:#1f1f1f;border-radius:10px;padding:9px;text-align:center;display:grid;gap:7px}.stp small{font-weight:700;font-size:13px}
.stp div{display:flex;align-items:center;justify-content:space-between}.stp b{background:#0f0f0f;border-radius:8px;padding:8px 14px;font-size:16px}.stp em{font-style:normal;font-size:11px;color:#9a9a9a}.pm{color:#aae216;font:600 22px/1 Inter;padding:0 6px}
.opt svg.lime{color:#aae216}
html,body{margin:0;width:600px;height:1300px;overflow:hidden;background:#0f0f0f}
.app{zoom:1.5385;width:390px;height:845px;position:relative;overflow:hidden;background:#0f0f0f;color:#f2f2f2;font:500 14px/1.35 Inter,sans-serif;padding:0 16px;box-sizing:border-box}
p{margin:0}b{font-weight:700}
.lime{color:#aae216}.mut{color:#9a9a9a;font-size:13px}
.caps{font:800 11.5px/1 Inter;letter-spacing:1.6px;text-transform:uppercase;color:#e6e6e6}
.sec{margin:22px 0 10px}
svg{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.hdr{display:flex;align-items:center;justify-content:space-between;padding:16px 0 14px}
.back{width:36px;height:36px;border-radius:10px;background:#1f1f1f;display:grid;place-items:center;color:#aae216}.back svg{width:20px}
.ttl{text-align:center}.ttl small{display:block;font:800 10.5px/1 Inter;letter-spacing:1.6px;text-transform:uppercase;color:#aae216;margin-bottom:5px}.ttl b{font-size:17px}
.dots{width:36px;text-align:right;color:#9a9a9a;letter-spacing:1px}
.seg{display:flex;background:#1f1f1f;border-radius:12px;padding:4px;margin-bottom:16px}
.seg span{flex:1;text-align:center;padding:9px 0;border-radius:9px;font:700 13px/1 Inter;color:#cfcfcf}.seg .on{background:#aae216;color:#000}
.card{background:#1f1f1f;border-radius:14px;padding:14px;margin-bottom:8px}
.code{display:grid;gap:10px;padding:16px}
.crow{display:flex;gap:10px}.cbox{flex:1;height:50px;border-radius:12px;background:#0f0f0f;display:grid;place-items:center;font:800 20px/1 Inter;letter-spacing:3px}
.copy{width:50px;height:50px;border-radius:12px;background:#2a2a2a;display:grid;place-items:center;color:#aae216}.copy svg{width:20px}
.share{height:48px;border-radius:12px;background:#aae216;color:#000;display:flex;align-items:center;justify-content:center;gap:8px;font:700 15px/1 Inter}.share svg{width:17px;stroke-width:2.6}
.big{font-size:17px;display:block;margin-bottom:4px}
.bar{display:flex;gap:4px;margin-top:12px}.bar i{flex:1;height:5px;border-radius:3px;background:#333}.bar i.on{background:#aae216}
.row{display:flex;gap:12px;align-items:center}.row b{display:block;margin-bottom:2px}
.let{width:30px;height:30px;border-radius:8px;background:#2a2a2a;display:grid;place-items:center;font:800 15px/1 Inter;color:#aae216}
.empty{display:grid;gap:4px;padding:22px 16px}.empty .share{margin-top:12px}
.dim{position:absolute;inset:0;background:rgba(0,0,0,.62)}
.sheet{position:absolute;left:0;right:0;bottom:0;background:#181818;border-radius:22px 22px 0 0;padding:10px 16px 26px}
.handle{display:block;width:40px;height:4px;border-radius:2px;background:#444;margin:0 auto 14px}
.sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.sh b{font-size:17px}.sh span{font-weight:700}
.opt{display:flex;align-items:center;gap:10px;background:#242424;border-radius:12px;padding:13px 14px;margin-bottom:6px}.opt>div{flex:1}.opt b{display:block;margin-bottom:2px}
.opt svg{width:18px;color:#777}.n{color:#9a9a9a;font-size:13px}
.pill{background:#aae216;color:#000;font:800 11px/1 Inter;letter-spacing:.6px;text-transform:uppercase;padding:7px 10px;border-radius:8px}
.wk{display:flex;align-items:center;justify-content:space-between}.wk b{display:block;margin-bottom:3px}
.sq{display:flex;gap:5px}.sq i{width:16px;height:16px;border-radius:4px;background:#333}.sq i.on{background:#aae216}
.hh{display:flex;justify-content:space-between;align-items:center;margin:20px 0 10px}
.ses{display:grid;gap:5px}.ses.new{box-shadow:inset 3px 0 0 #aae216}
.sr{display:flex;justify-content:space-between;align-items:baseline;gap:8px}.sr b{font-size:15px;display:flex;align-items:center;gap:7px}
.dot{width:8px;height:8px;border-radius:50%;background:#aae216;display:inline-block}
.ex{display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #2c2c2c;padding-top:7px;margin-top:3px}.ex span:last-child{color:#e6e6e6;font-weight:600}
.ex em{font:800 10px/1 Inter;font-style:normal;color:#aae216;border:1.5px solid #aae216;border-radius:5px;padding:2px 4px;margin-left:4px}
.note{background:#2a2a2a;border-radius:10px;padding:8px 10px;font-size:13px;color:#cfcfcf;font-style:italic;margin-top:4px}`;

const tmp = fs.mkdtempSync(path.join(process.env.TEMP ?? '/tmp', 'mocks-'));
for (const [name, fn] of Object.entries(SCREENS)) {
  for (const lang of ['es', 'en']) {
    const out = `${name}${lang === 'en' ? '-en' : ''}`;
    const page = path.join(tmp, `${out}.html`);
    fs.writeFileSync(page, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap"><style>${CSS}</style></head><body><div class="app">${fn({ ...T[lang], lang })}</div></body></html>`);
    const png = path.join(tmp, `${out}.png`).replaceAll('\\', '/');
    execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=8000',
      '--window-size=600,1300', `--screenshot=${png}`, `file:///${page.replaceAll('\\', '/')}`], { stdio: 'ignore' });
    console.log('ok', png);
  }
}
