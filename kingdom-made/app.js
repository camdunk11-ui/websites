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
      name: ['Smart', 'Sunglasses'],
      short: 'Smart Sunglasses',
      price: 299,
      img: 'assets/sunglasses.webp',
      wide: true,
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
      name: ['Pop-Up', 'Card Wallet'],
      short: 'Pop-Up Card Wallet',
      price: 41.99,
      img: 'assets/wallet.webp',
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
      name: ['NFC Cross', 'Necklace'],
      short: 'NFC Cross Necklace',
      price: 14,
      img: 'assets/necklace.webp',
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
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

  const productsEl = $('[data-products]');
  productsEl.innerHTML = PRODUCTS.map((p, idx) => `
    <section class="product" id="${p.id}" aria-labelledby="${p.id}-title">
      <span class="product__bgnum" aria-hidden="true" data-parallax="0.18">0${idx + 1}</span>
      <div class="product__media" data-inview>
        <div class="product__tilt" data-tilt>
          <div class="product__frame ${p.wide ? 'product__frame--wide' : ''}">
            <img class="product__img" src="${p.img}" alt="Kingdom Made ${p.short}" loading="${idx === 0 ? 'eager' : 'lazy'}" data-parallax="0.08">
            <span class="product__tag">${p.tag}</span>
          </div>
        </div>
      </div>
      <div class="product__info" data-inview>
        <p class="product__count"><b>0${idx + 1}</b> / 0${PRODUCTS.length}</p>
        <h2 class="product__name" id="${p.id}-title">
          <span class="line"><span>${p.name[0]}</span></span>
          <span class="line"><span>${p.name[1]}</span></span>
        </h2>
        <p class="product__price"><strong data-price="${p.price}">${money(p.price)}</strong><span>Free shipping</span></p>
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
    PRODUCTS.forEach(p => {
      const r = document.getElementById(p.id).getBoundingClientRect();
      if (r.top < vh * 0.5 && r.bottom > vh * 0.5) current = p.id;
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

    $$('[data-tilt]').forEach(t => {
      const frame = t.querySelector('.product__frame');
      t.addEventListener('pointermove', e => {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        t.style.transform = `perspective(1200px) rotateY(${(x - 0.5) * 6}deg) rotateX(${(0.5 - y) * 6}deg)`;
        frame.style.setProperty('--mx', x * 100 + '%');
        frame.style.setProperty('--my', y * 100 + '%');
      });
      t.addEventListener('pointerleave', () => { t.style.transform = ''; });
    });
  }

  /* ---------- Hero dust particles ---------- */
  const canvas = $('[data-dust]');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, parts = [], running = true, raf;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: Math.random() * 0.25 + 0.05, vy: -(Math.random() * 0.2 + 0.04),
        a: Math.random() * 0.5 + 0.15, ph: Math.random() * Math.PI * 2,
      }));
    };
    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy + Math.sin(t / 1800 + p.ph) * 0.08;
        if (p.x > w + 5) p.x = -5; if (p.y < -5) p.y = h + 5;
        const glow = p.a * (0.6 + 0.4 * Math.sin(t / 900 + p.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 222, 180, ${glow})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
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
  Object.keys(items).forEach(k => { if (!byId[k] || !(items[k] > 0)) delete items[k]; });
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ } };

  const overlay = $('[data-overlay]');
  const listEl = $('[data-cart-items]');
  const countEls = $$('[data-cart-count]');
  const countText = $('[data-cart-count-text]');
  const subtotalEl = $('[data-subtotal]');

  const count = () => Object.values(items).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(items).reduce((s, [id, q]) => s + byId[id].price * q, 0);

  function render() {
    const n = count();
    countEls.forEach(el => { el.textContent = n; });
    countText.textContent = n ? `(${n})` : '';
    subtotalEl.textContent = money(subtotal());
    cart.classList.toggle('is-empty', n === 0);
    listEl.innerHTML = Object.entries(items).map(([id, q], i) => {
      const p = byId[id];
      return `<li class="cart-item" style="--i:${i}" data-id="${id}">
        <img src="${p.img}" alt="">
        <div>
          <h3>${p.short}</h3>
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
  function showToast(p) {
    toast.innerHTML = `<img src="${p.img}" alt=""><span><b>${p.short}</b> added to your cart</span>`;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 2400);
  }

  function add(id, btn) {
    items[id] = (items[id] || 0) + 1;
    save(); render();
    countEls.forEach(el => { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); });
    showToast(byId[id]);
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
    $('[data-summary-items]').innerHTML = Object.entries(items).map(([id, q]) => {
      const p = byId[id];
      return `<li><img src="${p.img}" alt=""><span>${p.short}<small>Qty ${q}</small></span><span>${money(p.price * q)}</span></li>`;
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

  render();
})();
