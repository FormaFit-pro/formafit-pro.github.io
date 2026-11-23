// Genera las 4 landings: / y /entrenadores/ (ES), /en/ y /en/coaches/ (EN).
// Uso (desde la raíz del repo): node tools/landing.mjs
// El HTML resultante se sube tal cual a GitHub Pages; no editarlo a mano.
import fs from 'node:fs';

const SITE = 'https://budiapp.app';
const LOGO = fs.readFileSync('soporte/index.html', 'utf8').match(/<svg viewBox="0 0 380 185"[\s\S]*?<\/svg>/)[0];
// ?v= cambia con el archivo: al retocar una captura nadie se queda con la vieja en caché
const ver = (f) => Math.round(fs.statSync(f).mtimeMs).toString(36);
const shot = (src, alt, y) => `<img src="/img/${src}?v=${ver(`img/${src}`)}" alt="${alt}"${y ? ` style="--y:${y}"` : ''} loading="lazy" width="600" height="1300">`;

// ── Textos por idioma ──
const L = {
  es: {
    lang: 'es', other: 'en',
    badges: { play: 'Disponible en Google Play', ios: 'Descárgalo en el App Store' },
    go: 'Descargar gratis', dl: 'Descargar', qr: 'Escanea con el móvil<br>para descargarla', free: 'Gratis · sin anuncios',
    priv: ['/privacidad/', 'Privacidad'], sup: ['/soporte/', 'Soporte'],
    howH: 'Cómo <em>funciona</em>', moreH: 'Y además', faqH: 'Preguntas', step: 'Paso',
    mock: {
      code: `<div class="mock"><h4>Conectar con<br>tu entrenador</h4><small>Escribe el código que te ha pasado.</small><div class="codebox">K7F·29Q</div><div class="pair"><span class="av t">TÚ</span><span class="line"></span><span class="av">AC</span></div><div class="okpill">✓ Conectado con Ana</div></div>`,
    },
  },
  en: {
    lang: 'en', other: 'es',
    badges: { play: 'Get it on Google Play', ios: 'Download on the App Store' },
    go: 'Download free', dl: 'Download', qr: 'Scan with your phone<br>to download', free: 'Free · no ads',
    priv: ['/privacy/', 'Privacy'], sup: ['/support/', 'Support'],
    howH: 'How it <em>works</em>', moreH: 'And also', faqH: 'FAQ', step: 'Step',
    mock: {
      code: `<div class="mock"><h4>Connect with<br>your coach</h4><small>Enter the code they gave you.</small><div class="codebox">K7F·29Q</div><div class="pair"><span class="av t">YOU</span><span class="line"></span><span class="av">AC</span></div><div class="okpill">✓ Connected with Ana</div></div>`,
    },
  },
};

// ── Las 4 páginas ──
const PAGES = [
  { // Quien entrena (ES)
    lang: 'es', path: '/', pair: '/en/', aud: ['/entrenadores/', '¿Eres entrenador/a? →'],
    title: 'Budi: app para registrar tus entrenos y rutinas de gym',
    desc: 'Crea o elige tu rutina, registra series y pesos en segundos y mide tu progreso. Gratis y sin anuncios. Para iPhone y Android.',
    h1: 'Entrena. Registra.<br><em>Progresa.</em>', kw: 'La app para registrar tus entrenos',
    lead: 'Budi es una app pensada para la <strong class="hl">gente que entrena</strong>. Crea o elige un programa, registra tus entrenos y mide tu progreso.',
    note: 'Gratis · sin anuncios', heroImg: shot('registro-regla.jpg', 'Registro de series en Budi'),
    howP: '¿Cómo entrenas?',
    paths: [
      { id: 'solo', label: 'Por mi cuenta', steps: [
        { t: 'Crea tu programa', p: 'Crea, modifica y adapta tu programa de entrenamiento para cualquier disciplina.', li: ['Añade sesiones y ejercicios totalmente personalizables', 'Divide el programa en etapas para que progrese contigo'], vis: shot('editor.jpg', 'Editor de programa') },
        { t: 'Abre la app y entrena', p: 'Directo a lo que importa. La sesión de hoy, lista para empezar.', li: ['Decide el orden de tus sesiones y cómo avanzan', 'Sesiones libres para los días improvisados'], vis: shot('entreno.jpg', 'Pantalla Entreno') },
        { t: 'Apunta sin perder el ritmo', p: 'Introduce tu entrenamiento de forma rápida y ágil.', li: ['Desliza para introducir datos o usa el teclado numérico', 'Añade series y ejercicios si lo necesitas'], vis: shot('registro.jpg', 'Registro de series') },
        { t: 'Mide tu progreso', p: 'Cada ejercicio con su gráfica, tus marcas y lo que has mejorado.', li: ['Peso, reps, volumen y 1RM estimado', 'Carga de entrenamiento semana a semana'], vis: shot('progresion.jpg', 'Gráfica de progreso') },
      ] },
      { id: 'client', label: 'Con entrenador/a', steps: [
        { t: 'Conecta con tu entrenador/a', p: 'Si tienes un entrenador/a, conecta y recibe su programa en tu app.', li: ['Te pasa un código y quedáis conectados', '¿No tiene Budi? Invítale'], mock: 'code' },
        { t: 'Recibe su programa', p: 'Tu entrenador/a crea tu programa y te aparece en la app, listo para entrenar.', li: ['Programa e historial siempre sincronizados'], vis: shot('programa.jpg', 'Programa del entrenador') },
        { t: 'Abre la app y entrena', p: 'Sin adivinar lo que tienes que hacer. La sesión de hoy, lista para empezar.', li: ['Podrás ver las notas de tu entrenador/a y apuntar las tuyas', 'Entrena, registra y listo'], vis: shot('registro.jpg', 'Registro de series') },
        { t: 'Tu progreso', p: 'Tu entrenador/a verá cada sesión al terminarla. Y tú, cada ejercicio con sus gráficas, tus marcas y lo que has mejorado.', li: [], vis: shot('progresion.jpg', 'Gráfica de progreso') },
      ] },
    ],
    feats: [
      { t: 'Programa por etapas', p: 'Divide tu programa en etapas: acumulación, intensificación, descarga…', vis: shot('programa.jpg', 'Programa dividido en etapas', '-30%') },
      { t: 'Tu carga, semana a semana', p: 'Budi mide tu entrenamiento, para que puedas tomar mejores decisiones.', vis: shot('carga.jpg', 'Carga de entrenamiento') },
      { t: 'Si no encuentras tu ejercicio, créalo', p: 'Crea tus propios ejercicios y úsalos como si fuesen de la app.', vis: shot('ejercicio.jpg', 'Editor de ejercicio propio') },
      { t: 'Sin anuncios ni tonterías', p: 'Tu vida, tu ritmo. Sin notificaciones con una carita triste para que vuelvas.', big: ['0', 'anuncios · ahora y siempre'] },
    ],
    // PROVISIONAL: el usuario pasa su versión corta de la carta.
    letter: { k: 'Una nota antes de que la descargues', h: 'Hola, <em>soy Lucas</em>', sign: 'Lucas', ps: [
      'Budi empezó porque yo mismo necesitaba una app para registrar mi entrenamiento sin anuncios, sin medallas y sin que me pidiera nada a cambio.',
      'Después de muchas (muuuchas) versiones, por fin es lo que buscaba: fácil, cómoda y pensada solo para la gente que entrena. Si algo falla o echas algo en falta, escríbeme: detrás hay una persona.',
    ] },
    faq: [
      ['¿Es gratis de verdad?', 'Sí. Crear programas, registrar tus entrenos y ver tu progreso es gratis y sin anuncios. Budi Pro es solo para entrenadores con más de 3 clientes.'],
      ['¿Necesito un entrenador?', 'No. Crea tu propio programa o empieza desde una plantilla. Y si algún día tienes entrenador/a, conectas con su código y recibes su programa.'],
      ['¿Tengo que crear una cuenta?', 'No. Abres la app y entrenas. Solo los entrenadores crean una cuenta para conectar con sus clientes.'],
      ['¿Qué pasa con mis datos?', 'Se quedan en tu móvil. Sin analítica, sin rastreo y sin publicidad. Solo si te conectas con un entrenador/a, ve los entrenos de su programa. <a href="/privacidad/">Más detalles</a>.'],
      ['¿Funciona en iPhone y Android?', 'Sí, en los dos.'],
    ],
    finH: 'Pruébala.<br>Es gratis.', finP: 'Sin anuncios y sin tonterías.',
  },
  { // Entrenadores (ES)
    lang: 'es', path: '/entrenadores/', pair: '/en/coaches/', aud: ['/', 'Para quien entrena →'],
    title: 'Budi para entrenadores: app para entrenador personal',
    desc: 'App para entrenadores personales: crea programas, periodízalos por etapas y gestiona la progresión de cada ejercicio con reglas, todo desde el móvil. Gratis hasta 3 clientes.',
    h1: 'Tú programas,<br><em>ellos entrenan</em>', kw: 'La app para entrenadores personales',
    lead: 'Programa y gestiona a tus clientes <strong class="hl">desde el móvil</strong>. Crea, reutiliza y periodiza sus programas, y deja que las reglas de progresión ajusten cada ejercicio.',
    note: 'Gratis con hasta 3 clientes', heroImg: shot('clientes.jpg', 'Lista de clientes en Budi'),
    prog: {
      h: 'Programa como siempre, <em>desde el móvil</em>', p: 'Todo lo que haces en una hoja de cálculo, en la app.',
      feats: [
        { t: 'Crea', p: 'Crea programas con sus sesiones y ejercicios a tu manera: series, rango de reps, descanso y notas. Añade los ejercicios que no encuentres.', vis: shot('editor.jpg', 'Editor de programa') },
        { t: 'Periodiza', p: 'Divide el programa en etapas: acumulación, intensificación, descarga… Cada una con sus sesiones, ejercicios y duración. El programa avanza solo, o bloquea las etapas hasta revisarlas tú.', vis: shot('programa.jpg', 'Programa dividido en etapas', '-30%') },
        { t: 'Reutiliza', p: 'Guarda programas y sesiones como plantillas para asignarlas a tus clientes en cualquier momento, o copia el programa de otro cliente y ajústalo.', vis: shot('plantillas.jpg', 'Plantillas de programa') },
      ],
      rule: { t: 'Progresión por reglas', p: 'Defines la regla de cada ejercicio una vez y Budi recomienda el peso de la siguiente sesión. Tu cliente lo ve en su entreno: sabe qué peso le toca sin preguntarte.',
        li: ['<b>Qué sube:</b> el peso, las reps o el tiempo, o el peso por esfuerzo con el 1RM estimado', '<b>Cuándo sube:</b> con todas las series o con la mayoría, y con freno si el RPE se pasa', '<b>Qué pasa si falla:</b> mantiene el peso o baja un 10 %, como tú decidas'],
        vis: shot('progresion-hoja.jpg', 'Hoja de progresión de un ejercicio') },
    },
    howH: 'Tus clientes, <em>con o sin app</em>', howP: '¿Cómo entrena tu cliente?',
    paths: [
      { id: 'app', label: 'Con la app', steps: [
        { t: 'Pásale su código', p: 'Le das su código de cliente y lo introduce en Budi, que para él es gratis.', li: ['Lo compartes desde su ficha, con un enlace que abre la app'], vis: shot('conectar.jpg', 'Código de conexión de un cliente') },
        { t: 'Asígnale el programa', p: 'Desde cero, desde una plantilla o copiando el de otro cliente. Le llega a su app, listo para entrenar.', li: ['Cambia lo que quieras cuando quieras y envíaselo'], vis: shot('asignar.jpg', 'Asignar programa a un cliente') },
        { t: 'Te llega cada sesión', p: 'Al terminar cada entreno, ves lo que ha hecho: series, pesos, reps y sus notas.', li: ['Las sesiones nuevas te salen marcadas hasta que las revisas'], vis: shot('actividad.jpg', 'Sesiones del cliente sin revisar') },
      ] },
      { id: 'wa', label: 'Por WhatsApp', steps: [
        { t: 'Envíale la sesión', p: 'Desde Budi mandas la sesión de hoy como texto, con los pesos que tocan, por WhatsApp o donde quieras.', li: [], vis: shot('whatsapp.jpg', 'Sesión enviada y devuelta por WhatsApp') },
        { t: 'Pega su respuesta', p: 'Te la devuelve rellena. Pegas el texto en Budi, la app lo entiende y queda en su historial.', li: ['La progresión sigue funcionando igual que con la app'], vis: shot('pegar.jpg', 'Pegar el entreno que devuelve el cliente') },
      ] },
      { id: 'person', label: 'En persona', steps: [
        { t: 'Apunta tú sus series', p: 'Si entrena contigo, abres su sesión en tu móvil y apuntas cada serie mientras entrena.', li: ['Con el peso que le recomienda su regla de progresión'], vis: shot('registro.jpg', 'Registro de series') },
      ] },
    ],
    all: { h: 'Lo hagan como lo hagan, <em>todo acaba en tu móvil</em>', p: 'Quién entrena, quién se descuelga y qué tienes sin revisar, de un vistazo. Cada cliente con su ficha: programa, historial y progreso.', vis: shot('clientes-estados.jpg', 'Lista de clientes con su estado') },
    whyH: '¿Por qué <span class="lc">budi</span>?',
    whys: [
      ['Todo desde el móvil', 'Programas, clientes y seguimiento en tu bolsillo. Sin web, sin Excel, sin PDF.'],
      ['Gratis para tus clientes', 'Descargan Budi gratis y reciben tu programa al conectarse con su código.'],
      ['Con o sin app', 'Al que no la instala, le llevas igual por WhatsApp. Y al que entrena contigo, le apuntas tú.'],
    ],
    price: {
      h: 'Precio', p: 'Empieza gratis. Pásate a Pro cuando tengas más clientes.',
      free: { h: 'Gratis', price: '0 €', bill: 'Sin límite de tiempo', li: ['3 clientes: 1 con su app y 2 a los que apuntas tú o por WhatsApp', '1 plantilla de programa y 1 de sesión', 'Tu propio entrenamiento, sin límites'] },
      pro: { tag: 'Precio de lanzamiento', h: 'Pro', price: '4,17 €<small>/mes</small>', bill: 'Facturado anualmente: 49,99 €/año', li: ['Clientes ilimitados', 'Todos tus clientes con la app', 'Plantillas ilimitadas'], alt: 'O un pago único de 99,99 € y Pro para siempre.' },
      fine: 'Precio de lanzamiento por tiempo limitado. App Store o Google Play te muestran el precio final en tu moneda.',
    },
    faq: [
      ['¿Mis clientes tienen que pagar?', 'No. Budi es gratis para ellos. Solo tú necesitas Pro, y solo si pasas de 3 clientes.'],
      ['¿Y si un cliente no quiere instalar la app?', 'Le mandas la sesión por WhatsApp desde Budi, te la devuelve rellena y pegas su texto: queda en su historial. O, si entrena contigo, le apuntas tú las series.'],
      ['¿Cómo decide Budi cuánto peso sube?', 'Con la regla de progresión que elijas para cada ejercicio: doble progresión, por esfuerzo con el 1RM estimado, con freno por RPE… Budi recomienda el peso y tú siempre puedes cambiarlo.'],
      ['¿Qué incluye el plan gratis?', '3 clientes (1 conectado con su app y 2 a los que apuntas tú o por WhatsApp), 1 plantilla de programa y 1 de sesión. Y tu propio entrenamiento, sin límites: programas, registro y progreso. Sin límite de tiempo.'],
      ['¿Puedo usarlo en el ordenador?', 'Ahora todo se hace desde el móvil. Estamos trabajando para que también puedas ver a tus clientes en el ordenador.'],
      ['¿Los ejercicios tienen vídeo o imágenes?', 'Todavía no. Estamos trabajando en un visualizador de ejercicios profesional.'],
      ['¿Cómo cancelo Pro?', 'La suscripción anual se gestiona desde App Store o Google Play, y la cancelas allí cuando quieras. El pago único no caduca.'],
    ],
    finH: 'Empieza<br>gratis.', finP: 'Con hasta 3 clientes. Cuando crezcas, Pro.',
  },
  { // Quien entrena (EN)
    lang: 'en', path: '/en/', pair: '/', aud: ['/en/coaches/', 'For coaches →'],
    title: 'Budi: Workout Tracker & Gym Log App',
    desc: 'Build or pick a program, log sets and weights in seconds and track your progress. Free, no ads. For iPhone and Android.',
    h1: 'Train. Log.<br><em>Progress.</em>', kw: 'The app to log your workouts',
    lead: 'Budi is an app built for <strong class="hl">people who train</strong>. Build or pick a program, log your workouts and measure your progress.',
    note: 'Free · no ads', heroImg: shot('registro-regla.jpg', 'Logging sets in Budi'),
    howP: 'How do you train?',
    paths: [
      { id: 'solo', label: 'On my own', steps: [
        { t: 'Build your program', p: 'Create, edit and adapt your training program for any discipline.', li: ['Add fully customizable sessions and exercises', 'Split the program into stages so it progresses with you'], vis: shot('editor.jpg', 'Program editor') },
        { t: 'Open the app and train', p: 'Straight to what matters. Today’s session, ready to start.', li: ['Decide the order of your sessions and how they progress', 'Free sessions for improvised days'], vis: shot('entreno.jpg', 'Workout screen') },
        { t: 'Log without breaking your rhythm', p: 'Enter your workout quickly and smoothly.', li: ['Swipe to enter data or use the number pad', 'Add sets and exercises when you need to'], vis: shot('registro.jpg', 'Logging sets') },
        { t: 'Measure your progress', p: 'Every exercise with its chart, your records and how much you’ve improved.', li: ['Weight, reps, volume and estimated 1RM', 'Training load week by week'], vis: shot('progresion.jpg', 'Progress chart') },
      ] },
      { id: 'client', label: 'With a coach', steps: [
        { t: 'Connect with your coach', p: 'If you have a coach, connect and get their program in your app.', li: ['They give you a code and you’re connected', 'Coach not on Budi? Invite them'], mock: 'code' },
        { t: 'Get their program', p: 'Your coach builds your program and it shows up in the app, ready to train.', li: ['Program and history always in sync'], vis: shot('programa.jpg', 'Program from the coach') },
        { t: 'Open the app and train', p: 'No guessing what to do. Today’s session, ready to start.', li: ['See your coach’s notes and add your own', 'Train, log, done'], vis: shot('registro.jpg', 'Logging sets') },
        { t: 'Your progress', p: 'Your coach sees every session when you finish it. And you get every exercise with its charts, your records and how much you’ve improved.', li: [], vis: shot('progresion.jpg', 'Progress chart') },
      ] },
    ],
    feats: [
      { t: 'Program in stages', p: 'Split your program into stages: accumulation, intensification, deload…', vis: shot('programa.jpg', 'Program split into stages', '-30%') },
      { t: 'Your load, week by week', p: 'Budi measures your training so you can make better decisions.', vis: shot('carga.jpg', 'Training load') },
      { t: 'Can’t find your exercise? Create it', p: 'Create your own exercises and use them just like the app’s own.', vis: shot('ejercicio-en.jpg', 'Custom exercise editor') },
      { t: 'No ads, no nonsense', p: 'Your life, your pace. No sad-face notifications begging you to come back.', big: ['0', 'ads · now and forever'] },
    ],
    // PROVISIONAL: traducir la versión corta que pase el usuario.
    letter: { k: 'A note before you download it', h: 'Hi, <em>I’m Lucas</em>', sign: 'Lucas', ps: [
      'Budi started because I needed an app to log my training with no ads, no medals and nothing asked in return.',
      'After many (maaany) versions, it’s finally what I was looking for: easy, comfortable and made only for people who train. If something breaks or you miss something, write to me: there’s a person behind it.',
    ] },
    faq: [
      ['Is it really free?', 'Yes. Building programs, logging your workouts and tracking your progress is free, with no ads. Budi Pro is only for coaches with more than 3 clients.'],
      ['Do I need a coach?', 'No. Build your own program or start from a template. And if you ever get a coach, connect with their code and get their program.'],
      ['Do I need an account?', 'No. Open the app and train. Only coaches create an account to connect with their clients.'],
      ['What about my data?', 'It stays on your phone. No analytics, no tracking, no ads. Only if you connect with a coach do they see the workouts from their program. <a href="/privacy/">More details</a>.'],
      ['Does it work on iPhone and Android?', 'Yes, both.'],
    ],
    finH: 'Try it.<br>It’s free.', finP: 'No ads and no nonsense.',
  },
  { // Entrenadores (EN)
    lang: 'en', path: '/en/coaches/', pair: '/entrenadores/', aud: ['/en/', 'For athletes →'],
    title: 'Budi for Coaches: Personal Trainer App',
    desc: 'Personal trainer app: build programs, periodize them in stages and manage each exercise’s progression with rules, all from your phone. Free for up to 3 clients.',
    h1: 'You program,<br><em>they train</em>', kw: 'The app for personal trainers',
    lead: 'Program and manage your clients <strong class="hl">from your phone</strong>. Build, reuse and periodize their programs, and let progression rules adjust every exercise.',
    note: 'Free for up to 3 clients', heroImg: shot('clientes.jpg', 'Client list in Budi'),
    prog: {
      h: 'Program like you always have, <em>from your phone</em>', p: 'Everything you do in a spreadsheet, in the app.',
      feats: [
        { t: 'Build', p: 'Build programs with their sessions and exercises your way: sets, rep ranges, rest and notes. Add any exercise you can’t find.', vis: shot('editor.jpg', 'Program editor') },
        { t: 'Periodize', p: 'Split the program into stages: accumulation, intensification, deload… Each with its own sessions, exercises and length. The program moves on by itself, or you lock stages until you’ve reviewed them.', vis: shot('programa.jpg', 'Program split into stages', '-30%') },
        { t: 'Reuse', p: 'Save programs and sessions as templates to assign to your clients anytime, or copy another client’s program and tweak it.', vis: shot('plantillas-en.jpg', 'Program templates') },
      ],
      rule: { t: 'Rule-based progression', p: 'Set each exercise’s rule once and Budi suggests the weight for the next session. Your client sees it in their workout: they know what to lift without asking you.',
        li: ['<b>What goes up:</b> weight, reps or time, or weight by effort from the estimated 1RM', '<b>When it goes up:</b> on every set or on most, with a brake if the RPE runs too high', '<b>What happens on a miss:</b> hold the weight or drop 10 %, your call'],
        vis: shot('progresion-hoja-en.jpg', 'An exercise’s progression sheet') },
    },
    howH: 'Your clients, <em>with or without the app</em>', howP: 'How does your client train?',
    paths: [
      { id: 'app', label: 'With the app', steps: [
        { t: 'Give them their code', p: 'You give them their client code and they enter it in Budi, which is free for them.', li: ['Share it from their profile, with a link that opens the app'], vis: shot('conectar-en.jpg', 'Client connection code') },
        { t: 'Assign the program', p: 'From scratch, from a template or by copying another client’s. It lands in their app, ready to train.', li: ['Change anything, anytime, and send it over'], vis: shot('asignar-en.jpg', 'Assigning a program to a client') },
        { t: 'Every session reaches you', p: 'When they finish a workout, you see what they did: sets, weights, reps and their notes.', li: ['New sessions stay flagged until you review them'], vis: shot('actividad-en.jpg', 'Client sessions to review') },
      ] },
      { id: 'wa', label: 'Via WhatsApp', steps: [
        { t: 'Send them the session', p: 'From Budi you send today’s session as text, with the weights to lift, on WhatsApp or anywhere else.', li: [], vis: shot('whatsapp-en.jpg', 'Session sent and returned on WhatsApp') },
        { t: 'Paste their reply', p: 'They send it back filled in. Paste the text into Budi, the app reads it and it goes into their history.', li: ['Progression keeps working just like with the app'], vis: shot('pegar-en.jpg', 'Pasting the workout the client sent back') },
      ] },
      { id: 'person', label: 'In person', steps: [
        { t: 'Log their sets yourself', p: 'If they train with you, open their session on your phone and log each set as they go.', li: ['With the weight their progression rule suggests'], vis: shot('registro.jpg', 'Logging sets') },
      ] },
    ],
    all: { h: 'However they train, <em>it all ends up on your phone</em>', p: 'Who’s training, who’s slipping and what you haven’t reviewed, at a glance. Each client with their profile: program, history and progress.', vis: shot('clientes-estados-en.jpg', 'Client list with each client’s status') },
    whyH: 'Why <span class="lc">budi</span>?',
    whys: [
      ['All from your phone', 'Programs, clients and tracking in your pocket. No web app, no spreadsheets, no PDFs.'],
      ['Free for your clients', 'They download Budi for free and get your program when they connect with their code.'],
      ['With or without the app', 'Clients who won’t install it, you still coach over WhatsApp. Clients who train with you, you log yourself.'],
    ],
    price: {
      h: 'Pricing', p: 'Start free. Go Pro when you have more clients.',
      free: { h: 'Free', price: '€0', bill: 'No time limit', li: ['3 clients: 1 on their app and 2 you log yourself or via WhatsApp', '1 program template and 1 session template', 'Your own training, no limits'] },
      pro: { tag: 'Launch price', h: 'Pro', price: '€4.17<small>/mo</small>', bill: 'Billed annually: €49.99/year', li: ['Unlimited clients', 'All your clients on the app', 'Unlimited templates'], alt: 'Or a one-time payment of €99.99 for Pro forever.' },
      fine: 'Launch price for a limited time. The App Store or Google Play shows the final price in your currency.',
    },
    faq: [
      ['Do my clients have to pay?', 'No. Budi is free for them. Only you need Pro, and only if you have more than 3 clients.'],
      ['What if a client doesn’t want to install the app?', 'Send them the session on WhatsApp from Budi, they send it back filled in and you paste their text: it goes into their history. Or, if they train with you, log their sets yourself.'],
      ['How does Budi decide how much weight to add?', 'With the progression rule you choose for each exercise: double progression, effort-based from the estimated 1RM, with an RPE brake… Budi suggests the weight and you can always change it.'],
      ['What’s in the free plan?', '3 clients (1 connected through their app and 2 you log yourself or via WhatsApp), 1 program template and 1 session template. Plus your own training, no limits: programs, logging and progress. No time limit.'],
      ['Can I use it on a computer?', 'Right now everything happens on your phone. We’re working on letting you see your clients on a computer too.'],
      ['Do exercises have videos or images?', 'Not yet. We’re working on a professional exercise viewer.'],
      ['How do I cancel Pro?', 'The annual subscription is managed in the App Store or Google Play, and you can cancel it there anytime. The one-time payment never expires.'],
    ],
    finH: 'Start<br>free.', finP: 'With up to 3 clients. When you grow, go Pro.',
  },
];

// ── Plantilla ──
const vis = (x, t) => x.vis ?? t.mock[x.mock];
const stepHtml = (s, i, t, n) => `<li class="step"><div class="mark" aria-hidden="true"><b>${i + 1}</b></div><div class="card"><div class="copy">
      <p class="of">${t.step} ${i + 1}/${n}</p><h3 class="disp">${s.t}</h3><p>${s.p}</p>${s.li.length ? `<ul>${s.li.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}</div>
      <div class="shot"><div class="phone"><div class="scr">${vis(s, t)}</div></div></div></div></li>`;
// Insignias oficiales (img/badges/). ponytail: la de Apple en español no se pudo bajar aquí
// (tools.applemarketingtools.com bloqueado); hasta tenerla, la inglesa en las dos.
const badges = (t) => `<a class="badge" data-store="play" href="https://play.google.com/store/apps/details?id=com.formastudio.formafit"><img src="/img/badges/google-play-${t.lang}.png" alt="${t.badges.play}" height="48"></a>
      <a class="badge" data-store="ios" href="https://apps.apple.com/app/id6797842181"><img src="/img/badges/app-store-en.svg" alt="${t.badges.ios}" height="48"></a>`;

function page(p) {
  const t = L[p.lang];
  const url = SITE + p.path;
  const [es, en] = p.lang === 'es' ? [p.path, p.pair] : [p.pair, p.path];
  const ld = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Budi', url, description: p.desc,
    operatingSystem: 'iOS, Android', applicationCategory: 'HealthApplication', image: `${SITE}/img/ff.png`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } };
  const multi = p.paths.length > 1;
  const how = `${multi ? `<p class="sec-p">${p.howP}</p><div class="picks" role="tablist">${p.paths.map((x, i) => `<button class="pick" type="button" role="tab" id="tab-${x.id}" aria-controls="path-${x.id}" aria-selected="${i === 0}">${x.label}</button>`).join('')}</div>` : ''}
    ${p.paths.map((x, i) => `<ol class="steps" id="path-${x.id}"${multi ? ` role="tabpanel" aria-labelledby="tab-${x.id}"` : ''}${i ? ' hidden' : ''}>
      ${x.steps.map((s, j) => stepHtml(s, j, t, x.steps.length)).join('\n      ')}
    </ol>`).join('\n    ')}`;
  const feats = (p.feats ?? p.prog.feats).map((f) => `<article class="feat"><div class="ftxt"><h3>${f.t}</h3><p>${f.p}</p></div>${f.big
    ? `<div class="fvis solo"><div class="big">${f.big[0]}<small>${f.big[1]}</small></div></div>`
    : `<div class="fvis"><div class="phone"><div class="scr">${vis(f, t)}</div></div></div>`}</article>`).join('\n      ');
  const plan = (x, cls) => `<div class="plan${cls}">${x.tag ? `<span class="launch">${x.tag}</span>` : ''}<h3>${x.h}</h3><p class="price">${x.price}</p><p class="bill">${x.bill}</p><ul>${x.li.map((l) => `<li>${l}</li>`).join('')}</ul>${x.alt ? `<p class="alt">${x.alt}</p>` : ''}</div>`;

  return `<!doctype html>
<html lang="${p.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es" href="${SITE + es}">
<link rel="alternate" hreflang="en" href="${SITE + en}">
<link rel="alternate" hreflang="x-default" href="${SITE + (p.path.includes('coach') || p.path.includes('entrenadores') ? '/entrenadores/' : '/')}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${SITE}/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#aae216">
<meta name="apple-itunes-app" content="app-id=6797842181">
<link rel="icon" href="/favicon.png">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,800&family=Caveat:wght@600&family=Inter:wght@500;600;700;800;900&display=swap">
<link rel="stylesheet" href="/landing.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script defer src="/landing.js"></script>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="gp" viewBox="0 0 24 24"><path fill="#00d7fe" d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Z"/><path fill="#ffce00" d="m18.5 8.6 2.6 1.5c.8.5.8 1.3 0 1.8l-2.6 1.5-3-3 3-1.8Z"/><path fill="#ff3a44" d="m14.6 10.8 2.7 2.7-11.8 6.7 9.1-9.4Z"/><path fill="#00f076" d="M5.5 3.8l11.8 6.7-2.7 2.7-9.1-9.4Z"/></symbol>
  <symbol id="ap" viewBox="0 0 24 24"><path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1ZM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5Z"/></symbol>
</svg>

<div class="wrap">
  <nav class="top">
    <a class="logo" href="${p.lang === 'es' ? '/' : '/en/'}" aria-label="Budi">${LOGO}</a>
    <div class="tools">
      <a class="aud" href="${p.aud[0]}">${p.aud[1]}</a>
      <div class="lang"><a href="${es}" hreflang="es" lang="es"${p.lang === 'es' ? ' aria-current="page"' : ''}>ES</a><a href="${en}" hreflang="en" lang="en"${p.lang === 'en' ? ' aria-current="page"' : ''}>EN</a></div>
    </div>
  </nav>

  <header class="hero" id="hero">
    <div class="txt">
      <h1><span class="disp">${p.h1}</span><span class="kw">${p.kw}</span></h1>
      <p class="lead">${p.lead}</p>
      <div class="badges">
      ${badges(t)}
      </div>
      <div class="qr"><div class="code" id="qr"></div><span>${t.qr}</span></div>
    </div>
    <div class="dl">
      <a class="go" href="#final"><svg aria-hidden="true"><use href="#gp"/></svg><span>${t.go}</span></a>
      <p class="other"></p>
      <div class="both">
      ${badges(t)}
      </div>
      <p class="note">${p.note}</p>
    </div>
    <div class="hero-shot"><div class="phone"><div class="scr">${p.heroImg.replace(' loading="lazy"', ' fetchpriority="high"')}</div></div></div>
  </header>
</div>
${p.prog ? `
<section class="lime" id="programa">
  <div class="wrap">
    <h2 class="disp sec-h">${p.prog.h}</h2>
    <p class="sec-p">${p.prog.p}</p>
    <div class="feats three">
      ${feats}
    </div>
    <article class="rule">
      <div class="ftxt"><h3>${p.prog.rule.t}</h3><p>${p.prog.rule.p}</p><ul>${p.prog.rule.li.map((l) => `<li>${l}</li>`).join('')}</ul></div>
      <div class="rvis"><div class="phone"><div class="scr">${p.prog.rule.vis}</div></div></div>
    </article>
  </div>
</section>
` : ''}
<section class="band" id="how">
  <div class="wrap">
    <h2 class="disp sec-h">${p.howH ?? t.howH}</h2>
    ${how}${p.all ? `
    <article class="all">
      <div class="ftxt"><h3 class="disp">${p.all.h}</h3><p>${p.all.p}</p></div>
      <div class="rvis"><div class="phone"><div class="scr">${p.all.vis}</div></div></div>
    </article>` : ''}
  </div>
</section>
${p.whys ? `
<section class="lime" id="why">
  <div class="wrap">
    <h2 class="disp sec-h">${p.whyH}</h2>
    <div class="whys">
      ${p.whys.map(([h, d]) => `<div class="why"><h3>${h}</h3><p>${d}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>
` : ''}${p.feats ? `
<section class="lime" id="more">
  <div class="wrap">
    <h2 class="disp sec-h">${t.moreH}</h2>
    <div class="feats">
      ${feats}
    </div>
  </div>
</section>` : ''}
${p.price ? `
<section class="band" id="price">
  <div class="wrap">
    <h2 class="disp sec-h">${p.price.h}</h2>
    <p class="sec-p">${p.price.p}</p>
    <div class="plans">
      ${plan(p.price.free, '')}
      ${plan(p.price.pro, ' pro')}
    </div>
    <p class="fine">${p.price.fine}</p>
  </div>
</section>
` : ''}${p.letter ? `
<section class="band" id="carta">
  <div class="wrap">
    <div class="letter">
      <p class="caps">${p.letter.k}</p>
      <h2 class="disp">${p.letter.h}</h2>
      ${p.letter.ps.map((x) => `<p>${x}</p>`).join('\n      ')}
      <span class="sign">${p.letter.sign}</span>
    </div>
  </div>
</section>
` : ''}
<section class="lime" id="faq">
  <div class="wrap">
    <h2 class="disp sec-h">${t.faqH}</h2>
    <div class="faq">
      ${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="final" id="final">
  <div class="wrap">
    <h2 class="disp">${p.finH}</h2>
    <p>${p.finP}</p>
    <div class="badges">
      ${badges(t)}
    </div>
  </div>
</section>
<footer>
  <div class="wrap">
    <a href="${t.priv[0]}">${t.priv[1]}</a>
    <a href="${t.sup[0]}">${t.sup[1]}</a>
    <span>© 2026 Budi</span>
  </div>
</footer>
<div class="sticky" id="sticky"><div class="icon"><img src="/img/ff.png" alt=""></div><b>Budi<span>${p.note}</span></b><a class="cta" id="stickyGo" href="#final">${t.dl}</a></div>
</body>
</html>
`;
}

for (const p of PAGES) {
  const file = `.${p.path}index.html`;
  fs.mkdirSync(`.${p.path}`, { recursive: true });
  fs.writeFileSync(file, page(p));
  console.log('ok', file);
}
