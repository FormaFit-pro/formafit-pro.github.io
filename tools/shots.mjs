// Retoca las capturas de img/ para la web: quita la barra de estado, cambia el logo
// antiguo por el de Budi (con la fecha centrada, como en la app) y, en la de clientes,
// rellena la actividad. Originales en img/raw/ (no se tocan); salida en img/.
// Uso (desde la raíz del repo): node tools/shots.mjs — necesita Microsoft Edge. Deja PNG en una
// carpeta temporal; pasarlos a JPG (calidad ~86) en img/ con cualquier conversor (se hizo con jimp).
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = path.resolve('.').replaceAll('\\', '/');
const CROP = 52; // alto de la barra de estado que se quita (px de la captura de 600×1300)
const BG = '#0f0f0f';
const LOGO = fs.readFileSync('soporte/index.html', 'utf8').match(/<svg viewBox="0 0 380 185"[\s\S]*?<\/svg>/)[0];

// Cabecera de Inicio (logo + fecha centrada); la fecha de cada captura
const header = (date) => `
  <div class="cover" style="left:20px;top:80px;width:160px;height:38px"></div>
  <div class="cover" style="left:200px;top:80px;width:280px;height:38px"></div>
  <div class="logo">${LOGO}</div>
  <div class="date">${date}</div>`;
const box = (x, y, w, h, html, extra = '') => `<div class="cover" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:#1f1f1f;${extra}">${html}</div>`;
const sq = (c) => `<i style="background:${c ? '#aae216' : '#333'}"></i>`;
const act = (y, done, when) => box(440, y - 16, 132, 58, `<div class="sq">${[0, 1, 2].map((i) => sq(i < done)).join('')}</div><div class="when">${when}</div>`);

const SHOTS = {
  clientes: header('20:04 · sáb 17 oct')
    + box(240, 318, 120, 44, '<div class="kpi">86 %</div>')
    + box(430, 318, 120, 44, '<div class="kpi lime">+12 %</div>')
    + act(628, 3, 'hoy') + act(729, 2, 'ayer') + act(831, 1, 'hace 3 días'),
  entreno: header('20:07 · sáb 17 oct'),
  carga: header('20:01 · sáb 17 oct'),
  programa: header('19:58 · sáb 17 oct'),
  editor: '', progresion: '', registro: '', 'registro-regla': '',
};

fs.mkdirSync('img/raw', { recursive: true });
const tmp = fs.mkdtempSync(path.join(process.env.TEMP ?? '/tmp', 'shots-'));
for (const [name, over] of Object.entries(SHOTS)) {
  const raw = `img/raw/${name}.jpg`;
  if (!fs.existsSync(raw)) fs.copyFileSync(`img/${name}.jpg`, raw);
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800&display=swap">
<style>
html,body{margin:0;width:600px;height:1300px;overflow:hidden;background:${BG};font-family:Inter,sans-serif}
.s{position:absolute;left:0;top:-${CROP}px;width:600px;height:1300px}
.s>img{display:block;width:600px;height:1300px}
.cover{position:absolute;background:${BG}}
.logo{position:absolute;left:26px;top:84px;height:31px}.logo svg{height:31px;width:64px;fill:#fff}.logo .i{fill:#aae216}
.date{position:absolute;left:0;right:0;top:88px;text-align:center;color:#8f8f8f;font:700 15px/22px Inter;letter-spacing:2px}
.kpi{text-align:center;color:#fff;font:800 30px/44px Inter}.kpi.lime{color:#aae216}
.sq{display:flex;justify-content:flex-end;gap:5px;padding:8px 6px 0}.sq i{width:14px;height:14px;border-radius:3px}
.when{white-space:nowrap;text-align:right;padding:9px 6px 0;color:#a0a0a0;font:600 15px/1 Inter}
</style></head><body><div class="s"><img src="file:///${ROOT}/${raw}">${over}</div></body></html>`;
  const page = path.join(tmp, `${name}.html`);
  fs.writeFileSync(page, html);
  const png = path.join(tmp, `${name}.png`).replaceAll('\\', '/');
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--hide-scrollbars',
    '--virtual-time-budget=8000', '--window-size=600,1300', `--screenshot=${png}`, `file:///${page.replaceAll('\\', '/')}`], { stdio: 'ignore' });
  console.log('ok', name, png);
}
console.log('PNG en', tmp);
