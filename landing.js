// Landings de Budi: tiendas según el sistema, QR, barra fija y pestañas de «Cómo funciona».
// Todo el texto ya está en el HTML (lo genera tools/landing.mjs); aquí solo se ajustan enlaces.
// Enlaces antiguos a la versión PRO de la landing única (/#pro)
if (location.hash === '#pro') location.replace(document.documentElement.lang === 'en' ? '/en/coaches/' : '/entrenadores/');
const $ = (id) => document.getElementById(id);
const en = document.documentElement.lang === 'en';
const T = (es, e) => (en ? e : es);

// Android sigue en beta cerrada: sus enlaces van a /beta/. Al salir a producción en
// Google Play, BETA = false.
const BETA = true;
const PLAY = BETA ? '/beta/' : 'https://play.google.com/store/apps/details?id=com.formastudio.formafit';
const APP_STORE = 'https://apps.apple.com/app/id6797842181';
const ua = navigator.userAgent;
const os = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios'
  : /Android/.test(ua) ? 'android' : null;
if (os) document.body.dataset.os = os;
const mine = os === 'ios' ? APP_STORE : PLAY;
document.querySelectorAll('[data-store="ios"]').forEach((a) => { a.href = APP_STORE; });
document.querySelectorAll('[data-store="play"]').forEach((a) => { a.href = PLAY; });
document.querySelectorAll('.go').forEach((go) => {
  go.href = mine;
  go.querySelector('use').setAttribute('href', os === 'ios' ? '#ap' : '#gp');
  if (BETA && os === 'android') go.querySelector('span').textContent = T('Probar la beta', 'Try the beta');
});
document.querySelectorAll('.other').forEach((o) => {
  o.innerHTML = os === 'ios'
    ? T('¿Tienes Android? ', 'On Android? ') + `<a href="${PLAY}">Google Play</a>`
    : T('¿Tienes iPhone? ', 'On iPhone? ') + `<a href="${APP_STORE}">App Store</a>`;
});
$('stickyGo').href = mine;

// QR (escritorio): lleva a esta misma página; en el móvil, el botón ya lleva a su tienda
addEventListener('DOMContentLoaded', () => {
  const qr = $('qr');
  if (!window.QRCode || !qr) return;
  new QRCode(qr, { text: location.origin + location.pathname, width: 184, height: 184, colorDark: '#000', colorLight: '#aae216', correctLevel: QRCode.CorrectLevel.H });
  qr.insertAdjacentHTML('beforeend', '<span class="center"><img src="/img/ff.png" alt=""></span>');
});

// Barra fija: solo cuando no se ve otro botón de descarga
const bar = $('sticky'), seen = new Map();
const io = new IntersectionObserver((es) => {
  es.forEach((e) => seen.set(e.target, e.isIntersecting));
  bar.classList.toggle('on', ![...seen.values()].some(Boolean));
});
['hero', 'final'].forEach((id) => io.observe($(id)));

// Pestañas de «Cómo funciona» (solo en la landing de quien entrena)
const tabs = document.querySelectorAll('.pick');
tabs.forEach((b) => b.addEventListener('click', () => {
  tabs.forEach((t) => {
    const on = t === b;
    t.setAttribute('aria-selected', String(on));
    $(t.getAttribute('aria-controls')).hidden = !on;
  });
}));
