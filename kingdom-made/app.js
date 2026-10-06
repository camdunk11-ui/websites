/* ==========================================================================
   KINGDOM MADE — interactions, animation, cart & demo checkout
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const money = n => '$' + n.toFixed(2);

  /* ---------- Icons ---------- */
  const ICONS = {
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    audio: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
    ai: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    battery: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M7 10v4M11 10v4M15 10v4"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M12 7v6M9.5 9.5h5"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    fan: '<rect x="4" y="9" width="12" height="11" rx="1.5"/><path d="M7 9V5.5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1h-3"/><path d="M10 9V7.5h7"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    cards: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
    stitch: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 7h2M11 7h2M15 7h2M17 9v2M17 13v2M7 17h2M11 17h2M15 17h2M7 9v2M7 13v2"/>',
    slim: '<path d="M8 3v18M16 3v18M4 12h4M16 12h4M5.5 10L8 12l-2.5 2M18.5 10L16 12l2.5 2"/>',
    cross: '<path d="M12 3v18M7 8h10"/>',
    nfc: '<path d="M6 8.5a5 5 0 0 1 0 7M9.5 6a9 9 0 0 1 0 12M13 3.5a13 13 0 0 1 0 17"/><circle cx="3.5" cy="12" r="1"/>',
    nobattery: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M4 4l16 16"/>',
    engrave: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 7l3 3"/>',
  };
  const icon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;

  /* ---------- Products ---------- */
  const PRODUCTS = [
    {
      id: 'sunglasses',
      ratings: [11760, 1420, 330, 90, 64], // 5★ → 1★ review counts
      name: ['Smart', 'Sunglasses'],
      short: 'Smart Sunglasses',
      price: 299,
      img: 'assets/sunglasses-3d.webp',
      stage: 'wide', depth: 7,
      tag: 'Wearable Tech',
      pitch: 'See the world clearly and capture it hands-free. A camera, speakers and an AI assistant built into a matte black frame you can wear all day.',
      features: [
        ['camera', '<b>Built-in HD camera</b> for hands-free photos and video'],
        ['audio', '<b>Open-ear speakers & mics</b> for calls, music and voice commands'],
        ['ai', '<b>AI voice assistant</b>: questions, directions, notifications'],
        ['sun', '<b>Tinted UV-protection</b> lenses'],
        ['battery', '<b>All-day battery</b> with a charging case'],
        ['phone', '<b>Companion app</b> syncs your media and shows a daily Bible verse'],
        ['drop', '<b>Water-resistant</b> matte black frame, logo on the right temple arm'],
      ],
    },
    {
      id: 'wallet',
      ratings: [8340, 1980, 560, 190, 152], // 5★ → 1★ review counts
      name: ['Pop-Up', 'Card Wallet'],
      short: 'Pop-Up Card Wallet',
      price: 41.99,
      img: 'assets/wallet-3d.webp',
      stage: 'tall', depth: 14,
      tag: 'Everyday Carry',
      pitch: 'Press the side button and your cards fan out, ready to pick. Black leather with the logo debossed on the front, slim enough for any front pocket.',
      features: [
        ['fan', '<b>Push-button pop-up</b>: cards fan out to pick fast'],
        ['shield', '<b>RFID-blocking</b> lining stops card scanners'],
        ['cards', '<b>Holds up to 6 cards</b> plus folded cash'],
        ['stitch', '<b>Black leather</b>, light-gray stitching, debossed logo'],
        ['slim', '<b>Front-pocket slim</b> profile'],
      ],
    },
    {
      id: 'necklace',
      ratings: [13980, 1120, 240, 62, 41], // 5★ → 1★ review counts
      name: ['NFC Cross', 'Necklace'],
      short: 'NFC Cross Necklace',
      price: 14,
      img: 'assets/necklace-3d.webp',
      stage: 'slim', depth: 9,
      tag: 'Tap to Read',
      pitch: 'Wear your faith and share it with a tap. A hidden NFC chip opens the daily verse on any phone, with no battery and no app needed.',
      features: [
        ['cross', '<b>Brushed dark-silver</b> cross on a steel chain'],
        ['nfc', '<b>Hidden NFC chip</b>: tap your phone for a daily Bible verse or the Kingdom Made site'],
        ['nobattery', '<b>No battery, no app</b> needed'],
        ['engrave', '<b>Logo engraved</b> on the front of the cross'],
      ],
    },
  ];
  const APPAREL = [
    {
      id: 'tee-crown',
      ratings: [9310, 1240, 300, 96, 74], // 5★ → 1★ review counts
      short: 'Crown of Thorns Tee',
      price: 39.99,
      img: 'assets/tee-crown.webp',
      tag: 'Front print',
      pitch: 'A distressed crown of thorns around a weathered cross, printed on the chest.',
    },
    {
      id: 'tee-strong',
      ratings: [11420, 980, 210, 58, 37], // 5★ → 1★ review counts
      short: 'Be Strong Tee',
      price: 39.99,
      img: 'assets/tee-strong.webp',
      tag: 'Back print',
      pitch: 'A gothic cross across the back with 2 Chronicles 15:7: "Be strong and do not give up."',
    },
    {
      id: 'tee-signature',
      ratings: [8460, 1690, 520, 170, 140], // 5★ → 1★ review counts
      short: 'Signature Cross Tee',
      price: 44.99,
      img: 'assets/tee-signature.webp',
      tag: 'Signature',
      pitch: 'A split gold-and-white cross with CAMERON DUNKLE printed across the chest.',
    },
  ];
  const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

  const REVIEWS = [
    { name: 'Marcus T.', product: 'Smart Sunglasses', stars: 5, text: 'The camera is crazy clear and I use the verse of the day every morning. Built like a premium pair.' },
    { name: 'Jordan R.', product: 'NFC Cross Necklace', stars: 5, text: 'I tapped it on my friend\'s phone and the verse popped up. Started a real conversation. Fourteen dollars well spent.' },
    { name: 'Elijah M.', product: 'Be Strong Tee', stars: 5, text: 'Heavy cotton, washed black looks perfect. People stop me to read the back.' },
    { name: 'Gabe S.', product: 'Pop-Up Card Wallet', stars: 5, text: 'Press the button and the cards fan out. Slim enough for my front pocket and it feels solid.' },
    { name: 'Isaiah W.', product: 'Crown of Thorns Tee', stars: 4, text: 'Love the faded print. Fits oversized, so size down if you want it closer.' },
    { name: 'Caleb D.', product: 'Smart Sunglasses', stars: 5, text: 'Calls through the speakers are clear and the battery lasts all day. Logo on the arm is clean.' },
    { name: 'Noah P.', product: 'Signature Cross Tee', stars: 5, text: 'The gold cross looks even better in person. My favorite shirt right now.' },
    { name: 'Micah L.', product: 'NFC Cross Necklace', stars: 5, text: 'Brushed finish looks expensive. No battery, no app, it just works.' },
  ];

  const ALL = [...PRODUCTS, ...APPAREL];
  const byId = Object.fromEntries(ALL.map(p => [p.id, p]));
  // Cart keys are "id" or "id~size" for apparel
  const prodOf = key => byId[key.split('~')[0]];
  const sizeOf = key => key.split('~')[1] || '';
  // Rating and review count come from each product's star breakdown
  const statsOf = r => {
    const count = r.reduce((a, b) => a + b, 0);
    const avg = r.reduce((a, n, i) => a + n * (5 - i), 0) / count;
    return { count, avg };
  };
  const fmtInt = n => n.toLocaleString('en-US');
  ALL.forEach(p => Object.assign(p, statsOf(p.ratings)));
  const ratingHTML = (p, cls = '') => `<a href="#reviews" class="rating ${cls}" aria-label="Rated ${p.avg.toFixed(1)} out of 5 from ${fmtInt(p.count)} reviews"><span class="stars" style="--rating:${p.avg.toFixed(2)}" aria-hidden="true"></span><b>${p.avg.toFixed(1)}</b><span>${fmtInt(p.count)} reviews</span></a>`;

  const productsEl = $('[data-products]');
  productsEl.innerHTML = PRODUCTS.map((p, idx) => `
    <section class="product" id="${p.id}" aria-labelledby="${p.id}-title">
      <span class="product__bgnum" aria-hidden="true" data-parallax="0.18">0${idx + 1}</span>
      <div class="product__media" data-inview>
        <div class="stage stage--${p.stage}" data-stage>
          <div class="stage__glow" aria-hidden="true"></div>
          <div class="stage__floor" aria-hidden="true"></div>
          <div class="obj" style="--depth:${p.depth}px">
            <div class="obj__float">
              <div class="obj__rot" data-rot>
                ${Array.from({ length: 6 }, (_, k) => `<img class="obj__depth" src="${p.img}" alt="" aria-hidden="true" style="--k:${k + 1}">`).join('')}
                <img class="obj__img" src="${p.img}" alt="Kingdom Made ${p.short}" draggable="false">
                <span class="obj__shine" aria-hidden="true" style="-webkit-mask-image:url(${p.img});mask-image:url(${p.img})"></span>
              </div>
            </div>
          </div>
          <span class="product__tag">${p.tag}</span>
          <span class="stage__hint" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M4 12h16"/></svg><span data-hint>Move your mouse to rotate</span></span>
        </div>
      </div>
      <div class="product__info" data-inview>
        <p class="product__count"><b>0${idx + 1}</b> / 0${PRODUCTS.length}</p>
        <h2 class="product__name" id="${p.id}-title">
          <span class="line"><span>${p.name[0]}</span></span>
          <span class="line"><span>${p.name[1]}</span></span>
        </h2>
        <p class="product__price"><strong data-price="${p.price}">${money(p.price)}</strong><span>Free shipping</span></p>
        ${ratingHTML(p)}
        <p class="product__pitch">${p.pitch}</p>
        <ul class="features" data-inview>
          ${p.features.map(([k, t], i) => `<li class="feature" style="--i:${i}"><span class="feature__icon">${icon(k)}</span><span>${t}</span></li>`).join('')}
        </ul>
        <div class="product__actions">
          <button class="btn btn--primary magnetic" type="button" data-add="${p.id}">
            <span class="btn__text">Add to cart</span>
            <svg class="btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <span class="note">Demo store · no real orders</span>
        </div>
      </div>
    </section>`).join('');

  $('[data-apparel]').innerHTML = APPAREL.map((p, idx) => `
    <article class="tee" data-reveal style="--d:${idx}">
      <div class="tee__media" data-tee>
        <img src="${p.img}" alt="Kingdom Made ${p.short}" loading="lazy">
        <span class="product__tag">${p.tag}</span>
      </div>
      <div class="tee__body">
        <div class="tee__top">
          <h3>${p.short}</h3>
          <strong>${money(p.price)}</strong>
        </div>
        ${ratingHTML(p, 'rating--sm')}
        <p>${p.pitch}</p>
        <fieldset class="sizes">
          <legend>Size</legend>
          ${SIZES.map(sz => `<label><input type="radio" id="${p.id}-${sz}" name="size-${p.id}" value="${sz}"${sz === 'M' ? ' checked' : ''}><span>${sz}</span></label>`).join('')}
        </fieldset>
        <button class="btn btn--ghost btn--block magnetic" type="button" data-add="${p.id}" data-sized>
          <span class="btn__text">Add to cart</span>
          <svg class="btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </article>`).join('');

  const reviewCard = (r, hidden) => `
    <figure class="review"${hidden ? ' aria-hidden="true"' : ''}>
      <div class="stars" style="--rating:${r.stars}" role="img" aria-label="${r.stars} out of 5 stars"></div>
      <blockquote>${r.text}</blockquote>
      <figcaption><span class="review__avatar" aria-hidden="true">${r.name[0]}</span><span><b>${r.name}</b>${r.product}</span></figcaption>
    </figure>`;
  // Second copy makes the marquee loop seamlessly; screen readers skip it
  $('[data-reviews]').innerHTML = REVIEWS.map(r => reviewCard(r)).join('') + REVIEWS.map(r => reviewCard(r, true)).join('');

  const totals = ALL.reduce((t, p) => t.map((n, i) => n + p.ratings[i]), [0, 0, 0, 0, 0]);
  const overall = statsOf(totals);
  const bigEl = $('[data-overall-avg]');
  bigEl.dataset.count = overall.avg.toFixed(1);
  bigEl.textContent = overall.avg.toFixed(1);
  const totalEl = $('[data-overall-count]');
  totalEl.dataset.count = overall.count;
  totalEl.textContent = fmtInt(overall.count);
  const overallStars = $('[data-overall-stars]');
  overallStars.style.setProperty('--rating', overall.avg.toFixed(2));
  overallStars.setAttribute('aria-label', `Rated ${overall.avg.toFixed(1)} out of 5`);
  $('[data-bars]').innerHTML = totals.map((n, i) => {
    const pct = n / overall.count * 100;
    return `<li><span>${5 - i} ★</span><i style="--w:${pct.toFixed(1)}%"></i><b>${pct < 1 ? '&lt;1' : Math.round(pct)}%</b></li>`;
  }).join('');
  $('[data-per-product]').innerHTML = ALL.map(p => `<li><span>${p.short}</span>${ratingHTML(p, 'rating--sm')}</li>`).join('');

  $('[data-year]').textContent = new Date().getFullYear();

  /* ---------- Split text into characters ---------- */
  let charIndex = 0;
  $$('[data-split]').forEach(line => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach(ch => {
            const s = document.createElement('span');
            s.className = 'char';
            s.setAttribute('aria-hidden', 'true');
            s.style.setProperty('--i', charIndex++);
            s.textContent = ch === ' ' ? ' ' : ch;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(line);
  });

  /* Words for the "why" scroll-lit paragraph */
  const whyText = $('[data-words]');
  const KEY_WORDS = ['Faith', 'Strength', 'Tech', 'Him'];
  whyText.innerHTML = whyText.textContent.trim().split(/\s+/)
    .map(w => `<span class="word${KEY_WORDS.some(k => w.startsWith(k)) ? ' is-key' : ''}">${w}</span>`)
    .join(' ');
  const words = $$('.word', whyText);

  /* ---------- Page load ---------- */
  const heroImg = $('[data-hero-img]');
  const finishLoad = () => {
    if (document.body.classList.contains('is-loaded')) return;
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    setTimeout(() => document.body.classList.add('is-glow'), reduceMotion ? 0 : 2200);
    if (heroImg && !reduceMotion) setTimeout(() => heroImg.classList.add('is-drift'), 2600);
  };
  const minDelay = reduceMotion ? 0 : 1300;
  const t0 = performance.now();
  const onReady = () => setTimeout(finishLoad, Math.max(0, minDelay - (performance.now() - t0)));
  if (document.readyState === 'complete') onReady();
  else window.addEventListener('load', onReady, { once: true });
  setTimeout(finishLoad, 3500); // never block on a slow remote image

  /* ---------- In-view reveals ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      const price = e.target.querySelector?.('[data-price]');
      if (price) countUp(price);
      e.target.querySelectorAll?.('[data-count]').forEach(countNum);
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  $$('[data-inview], [data-reveal]').forEach(el => io.observe(el));

  function countUp(el) {
    const target = parseFloat(el.dataset.price);
    if (reduceMotion) { el.textContent = money(target); return; }
    const dur = 1100, start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = money(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function countNum(el) {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const fmt = v => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (el.dataset.suffix || '');
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const dur = 1600, start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = fmt(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Scroll-driven: parallax, header, progress, why-words ---------- */
  const header = $('.header');
  const cart = $('[data-cart]');
  const progress = $('.progress span');
  const heroMedia = $('.hero__media');
  const heroContent = $('.hero__content');
  const parallaxEls = $$('[data-parallax]');
  const visible = new Set();
  const pio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)), { rootMargin: '20% 0px' });
  parallaxEls.forEach(el => pio.observe(el));

  const navLinks = $$('.nav__link');
  let lastY = window.scrollY, ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    header.classList.toggle('is-solid', y > vh * 0.6);
    const cartOpen = cart.classList.contains('is-open');
    header.classList.toggle('is-hidden', !cartOpen && y > lastY && y > vh);
    lastY = y;

    // Active nav link
    let current = '';
    [...PRODUCTS.map(p => p.id), 'apparel', 'reviews', 'contact'].forEach(id => {
      const r = document.getElementById(id).getBoundingClientRect();
      if (r.top < vh * 0.5 && r.bottom > vh * 0.5) current = id;
    });
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));

    if (!reduceMotion) {
      if (y < vh * 1.2) {
        heroMedia.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
        heroContent.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        heroContent.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)));
      }
      visible.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = '0 ' + (-offset).toFixed(1) + 'px';
      });

      // Light up the "why" words as the paragraph moves through the viewport
      const r = whyText.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(onScroll));
  onScroll();

  /* ---------- Hover: magnetic buttons + image tilt/spotlight ---------- */
  if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', e => {
      const m = e.target.closest?.('.magnetic');
      if (!m) return;
      const r = m.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      m.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      const inner = m.querySelector('.btn__text');
      if (inner) inner.style.transform = `translate(${x * 5}px, ${y * 4}px)`;
    });
    document.addEventListener('pointerout', e => {
      const m = e.target.closest?.('.magnetic');
      if (!m || m.contains(e.relatedTarget)) return;
      m.style.transform = '';
      const inner = m.querySelector('.btn__text');
      if (inner) inner.style.transform = '';
    });
  }

  /* ---------- Apparel card tilt ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-tee]').forEach(m => {
      m.addEventListener('pointermove', e => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        m.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
        m.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
        m.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(1) + '%');
        m.style.setProperty('--my', ((y + 0.5) * 100).toFixed(1) + '%');
      });
      m.addEventListener('pointerleave', () => {
        m.style.setProperty('--ry', '0deg');
        m.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---------- 3D product stages ---------- */
  const stages = $$('[data-stage]').map(el => ({
    el,
    section: el.closest('.product'),
    rot: $('[data-rot]', el),
    x: 0, y: 0, tx: 0, ty: 0, hover: false, visible: false,
  }));
  if (!finePointer) $$('[data-hint]').forEach(h => { h.textContent = 'Drag to rotate'; });

  if (!reduceMotion) {
    const clamp = v => Math.max(-1, Math.min(1, v));
    stages.forEach(s => {
      // Desktop: the whole product section steers the object
      s.section.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = s.el.getBoundingClientRect();
        s.tx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 0.6));
        s.ty = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 0.6));
        s.hover = true;
      });
      s.section.addEventListener('pointerleave', () => { s.hover = false; });

      // Touch: horizontal drag spins it, vertical drag still scrolls the page
      let startX = 0, startTx = 0, dragging = false;
      s.el.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse') return;
        dragging = true; startX = e.clientX; startTx = s.tx; s.hover = true;
      });
      s.el.addEventListener('pointermove', e => {
        if (!dragging) return;
        s.tx = clamp(startTx + (e.clientX - startX) / (s.el.clientWidth * 0.45));
      });
      const end = () => { if (dragging) { dragging = false; setTimeout(() => { s.hover = false; }, 900); } };
      s.el.addEventListener('pointerup', end);
      s.el.addEventListener('pointercancel', end);
    });

    const vis = new IntersectionObserver(es => es.forEach(e => {
      const s = stages.find(st => st.el === e.target);
      if (s) s.visible = e.isIntersecting;
    }), { rootMargin: '10% 0px' });
    stages.forEach(s => vis.observe(s.el));

    const loop = t => {
      for (const s of stages) {
        if (!s.visible) continue;
        // Idle: slow sway so the object never looks frozen
        const gx = s.hover ? s.tx : Math.sin(t / 1600) * 0.45;
        const gy = s.hover ? s.ty : Math.sin(t / 2300) * 0.15;
        s.x += (gx - s.x) * 0.075;
        s.y += (gy - s.y) * 0.075;
        s.el.style.setProperty('--ry', (s.x * 32).toFixed(2) + 'deg');
        s.el.style.setProperty('--rx', (-s.y * 12).toFixed(2) + 'deg');
        s.el.style.setProperty('--sx', (50 - s.x * 60).toFixed(1) + '%');
        s.el.style.setProperty('--px', s.x.toFixed(3));
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Hero dust particles ---------- */
  const canvas = $('[data-dust]');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, parts = [], running = true, raf;
    // One pre-rendered warm glow, scaled per particle (cheaper than shadowBlur)
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const sg = sprite.getContext('2d');
    const grad = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 238, 205, 1)');
    grad.addColorStop(0.25, 'rgba(245, 214, 160, 0.75)');
    grad.addColorStop(1, 'rgba(201, 164, 106, 0)');
    sg.fillStyle = grad;
    sg.fillRect(0, 0, 64, 64);

    // Three depths: far specks, mid dust, a few big soft ones up close
    const LAYERS = [
      { share: 0.55, size: [1.5, 3.5], speed: 0.35, alpha: [0.35, 0.8] },
      { share: 0.37, size: [3.5, 7], speed: 0.7, alpha: [0.3, 0.7] },
      { share: 0.08, size: [12, 26], speed: 1.25, alpha: [0.08, 0.2] },
    ];
    const rand = (a, b) => a + Math.random() * (b - a);
    const spawn = (L, anywhere) => ({
      L,
      x: anywhere ? Math.random() * w : -30,
      y: Math.random() * h,
      s: rand(...L.size),
      vx: rand(0.12, 0.4) * L.speed,
      vy: -rand(0.05, 0.3) * L.speed,
      a: rand(...L.alpha),
      ph: Math.random() * Math.PI * 2,
      tw: rand(700, 1500),
    });
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = Math.round(Math.max(90, Math.min(260, (w * h) / 5000)));
      parts = LAYERS.flatMap(L => Array.from({ length: Math.round(total * L.share) }, () => spawn(L, true)));
    };
    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy + Math.sin(t / 1800 + p.ph) * 0.12 * p.L.speed;
        if (p.x > w + 30) Object.assign(p, spawn(p.L, false));
        else if (p.y < -30) Object.assign(p, spawn(p.L, true), { y: h + 20 });
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(t / p.tw + p.ph));
        ctx.drawImage(sprite, p.x - p.s, p.y - p.s, p.s * 2, p.s * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (running) raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    const toggle = on => {
      if (on && !running) { running = true; raf = requestAnimationFrame(draw); }
      else if (!on) { running = false; cancelAnimationFrame(raf); }
    };
    new IntersectionObserver(([e]) => toggle(e.isIntersecting && !document.hidden)).observe(canvas);
    document.addEventListener('visibilitychange', () => toggle(!document.hidden && window.scrollY < window.innerHeight));
  }

  /* ==========================================================================
     Cart
     ========================================================================== */
  const STORE_KEY = 'km-cart';
  let items = {};
  try { items = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { items = {}; }
  Object.keys(items).forEach(k => { if (!prodOf(k) || !(items[k] > 0)) delete items[k]; });
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ } };

  const overlay = $('[data-overlay]');
  const listEl = $('[data-cart-items]');
  const countEls = $$('[data-cart-count]');
  const countText = $('[data-cart-count-text]');
  const subtotalEl = $('[data-subtotal]');

  const count = () => Object.values(items).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(items).reduce((s, [key, q]) => s + prodOf(key).price * q, 0);

  function render() {
    const n = count();
    countEls.forEach(el => { el.textContent = n; });
    countText.textContent = n ? `(${n})` : '';
    subtotalEl.textContent = money(subtotal());
    cart.classList.toggle('is-empty', n === 0);
    listEl.innerHTML = Object.entries(items).map(([id, q], i) => {
      const p = prodOf(id);
      const size = sizeOf(id);
      return `<li class="cart-item" style="--i:${i}" data-id="${id}">
        <img src="${p.img}" alt="">
        <div>
          <h3>${p.short}</h3>
          ${size ? `<div class="cart-item__size">Size ${size}</div>` : ''}
          <div class="cart-item__price">${money(p.price * q)}</div>
          <div class="qty">
            <button type="button" aria-label="Decrease quantity" data-dec="${id}">−</button>
            <span aria-live="polite">${q}</span>
            <button type="button" aria-label="Increase quantity" data-inc="${id}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" type="button" data-remove="${id}">Remove</button>
      </li>`;
    }).join('');
  }

  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    cart.classList.add('is-open'); overlay.classList.add('is-open');
    cart.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    header.classList.remove('is-hidden');
    render();
    setTimeout(() => $('[data-close-cart]', cart).focus(), 50);
  }
  function closeCart() {
    cart.classList.remove('is-open'); overlay.classList.remove('is-open');
    cart.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    lastFocus?.focus?.({ preventScroll: true });
  }

  const toast = $('[data-toast]');
  let toastTimer;
  function showToast(p, size) {
    toast.innerHTML = `<img src="${p.img}" alt=""><span><b>${p.short}</b>${size ? ` (${size})` : ''} added to your cart</span>`;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 2400);
  }

  function add(id, btn) {
    let key = id;
    if (btn?.hasAttribute('data-sized')) {
      const picked = btn.closest('.tee').querySelector('input[type=radio]:checked');
      key = id + '~' + (picked ? picked.value : 'M');
    }
    items[key] = (items[key] || 0) + 1;
    save(); render();
    countEls.forEach(el => { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); });
    showToast(prodOf(key), sizeOf(key));
    if (btn) {
      const label = btn.querySelector('.btn__text');
      btn.classList.add('is-added');
      label.textContent = 'Added ✓';
      clearTimeout(btn._t);
      btn._t = setTimeout(() => { btn.classList.remove('is-added'); label.textContent = 'Add to cart'; }, 1600);
    }
  }

  function setQty(id, q) {
    if (q <= 0) {
      const li = listEl.querySelector(`[data-id="${id}"]`);
      delete items[id]; save();
      if (li && !reduceMotion) { li.classList.add('is-removing'); setTimeout(render, 420); }
      else render();
      countEls.forEach(el => { el.textContent = count(); });
      return;
    }
    items[id] = q; save(); render();
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('button, a');
    if (!t) return;
    if (t.matches('[data-add]')) add(t.dataset.add, t);
    else if (t.matches('[data-open-cart]')) openCart();
    else if (t.matches('[data-close-cart]')) {
      closeCart();
      if (t.dataset.goto) document.querySelector(t.dataset.goto)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    else if (t.matches('[data-inc]')) setQty(t.dataset.inc, items[t.dataset.inc] + 1);
    else if (t.matches('[data-dec]')) setQty(t.dataset.dec, items[t.dataset.dec] - 1);
    else if (t.matches('[data-remove]')) setQty(t.dataset.remove, 0);
    else if (t.matches('[data-checkout]')) openCheckout();
    else if (t.matches('[data-close-checkout]')) closeCheckout();
  });
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) closeCheckout();
    else if (cart.classList.contains('is-open')) closeCart();
  });

  /* ==========================================================================
     Demo checkout
     ========================================================================== */
  const modal = $('[data-checkout-modal]');
  const form = $('[data-checkout-form]');
  const steps = $$('[data-step]', modal);
  const showStep = name => steps.forEach(s => s.classList.toggle('is-active', s.dataset.step === name));

  function openCheckout() {
    if (!count()) return;
    const total = money(subtotal());
    $('[data-summary-items]').innerHTML = Object.entries(items).map(([key, q]) => {
      const p = prodOf(key);
      const size = sizeOf(key);
      return `<li><img src="${p.img}" alt=""><span>${p.short}<small>${size ? `Size ${size} · ` : ''}Qty ${q}</small></span><span>${money(p.price * q)}</span></li>`;
    }).join('');
    $('[data-summary-subtotal]').textContent = total;
    $('[data-summary-total]').textContent = total;
    $('[data-checkout-total]').textContent = total;
    showStep('form');
    cart.classList.remove('is-open'); overlay.classList.remove('is-open');
    cart.setAttribute('aria-hidden', 'true');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    setTimeout(() => form.elements.name.focus(), 80);
  }
  function closeCheckout() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    [...form.elements].filter(el => el.required).forEach(el => {
      const valid = el.value.trim() && (el.type !== 'email' || /\S+@\S+\.\S+/.test(el.value));
      el.closest('.field').classList.toggle('is-error', !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;

    const first = form.elements.name.value.trim().split(/\s+/)[0];
    showStep('processing');
    setTimeout(() => {
      $('[data-success-name]').textContent = first ? `, ${first}` : '';
      $('[data-order-no]').textContent = '#KM-' + Math.floor(100000 + Math.random() * 900000);
      showStep('success');
      items = {}; save(); render();
      form.reset();
    }, reduceMotion ? 300 : 1800);
  });
  form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('is-error'));


  /* ==========================================================================
     Contact (demo)
     ========================================================================== */
  const contactForm = $('[data-contact-form]');
  const contactStep = name => $$('[data-contact-step]', contactForm).forEach(el => el.classList.toggle('is-active', el.dataset.contactStep === name));
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    [...contactForm.elements].filter(el => el.required).forEach(el => {
      const valid = el.value.trim() && (el.type !== 'email' || /\S+@\S+\.\S+/.test(el.value));
      el.closest('.field').classList.toggle('is-error', !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;
    const first = contactForm.elements.name.value.trim().split(/\s+/)[0];
    $('[data-contact-name]').textContent = first ? `, ${first}` : '';
    $('[data-contact-email]').textContent = contactForm.elements.email.value.trim();
    contactStep('done');
    contactForm.reset();
  });
  contactForm.addEventListener('input', e => e.target.closest('.field')?.classList.remove('is-error'));
  $('[data-contact-reset]').addEventListener('click', () => contactStep('form'));

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const done = () => {
      b.classList.add('is-copied'); b.textContent = 'Copied';
      setTimeout(() => { b.classList.remove('is-copied'); b.textContent = 'Copy'; }, 1600);
    };
    const fallback = () => {
      const r = document.createRange(); r.selectNodeContents(b.previousElementSibling.querySelector('b'));
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    };
    try { navigator.clipboard.writeText(b.dataset.copy).then(done, fallback); } catch { fallback(); }
  });

  render();
})();
