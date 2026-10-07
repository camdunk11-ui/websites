// ---------- Data ----------
const icons = {
  gun: '<path d="M4 14h9l3-3h4v4h-3l-2 2H9l-1 4H5l1-4H4z"/><path d="M8 11V7h5v4"/>',
  machine: '<rect x="7" y="3" width="10" height="13" rx="3"/><path d="M12 16v5M10 21h4M7 8h10"/>',
  aftercare: '<path d="M9 3h6v3H9z"/><path d="M8 6h8l1 3v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z"/><path d="M12 12v4M10 14h4"/>',
  supplies: '<path d="M5 19 15 9l2 2L7 21H5z"/><path d="m15 9 3-6 3 3-6 3"/>',
  kit: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"/>',
  sticker: '<path d="M20 12V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7z"/><path d="M12 20a8 8 0 0 0 8-8h-6a2 2 0 0 0-2 2z"/>',
  shirt: '<path d="m8 3-5 3 2 4 2-1v12h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
  longsleeve: '<path d="m8 3-5 3v13h3V10h1v11h10V10h1v9h3V6l-5-3a4 4 0 0 1-8 0z"/>',
  shorts: '<path d="M5 4h14l1 15h-6l-2-8-2 8H4z"/>',
  hoodie: '<path d="M8 4a4 4 0 0 1 8 0l5 3-2 5-2-1v10H7V11l-2 1-2-5z"/><path d="M9 4c0 3 1.5 5 3 5s3-2 3-5M11 9v4M13 9v4"/>',
  jacket: '<path d="m8 3-5 3v15h7V8l2 2 2-2v13h7V6l-5-3-4 4z"/>',
  bandana: '<path d="M3 6h18L12 20z"/><path d="M8 10h.01M12 10h.01M16 10h.01M10 14h.01M14 14h.01"/>',
  hat: '<path d="M4 15a8 8 0 0 1 16 0z"/><path d="M2 15h20v2H2z"/>',
  charm: '<circle cx="12" cy="15" r="5"/><path d="M12 10V4M10 4h4"/><path d="M12 13l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z"/>',
  socks: '<path d="M9 3h6v9l3 4a3 3 0 0 1-4.5 4L8 15a3 3 0 0 1-1-2V3z"/><path d="M9 7h6"/>',
};

const products = [
  { price: 189, b2g2: false, cat: 'tattoo', icon: 'gun', tag: 'Machines', name: 'Old Style Tattoo Gun', desc: 'Classic coil machine with that traditional buzz — built for bold lines. Polished steel frame, dual wrapped coils and a knurled grip.', rating: 5, count: 38, img: 'assets/old-style-gun.png' },
  { price: 249, b2g2: false, cat: 'tattoo', icon: 'machine', tag: 'Machines', name: 'Electric Tattoo Gun', desc: 'Smooth, quiet wireless pen machine for lining, shading and color. Digital voltage display and swappable cartridge needles.', rating: 5, count: 52, img: 'assets/electric-gun.png' },
  { price: 18, b2g2: true, cat: 'tattoo', icon: 'aftercare', tag: 'Aftercare', name: 'Healing & Protection Aftercare', desc: 'Soothing balm that protects fresh ink and helps it heal bright. 5 fl oz / 150 mL jar with the Lou\'s Hue seal.', rating: 5, count: 91, img: 'assets/aftercare.png' },
  { price: 35, b2g2: true, cat: 'tattoo', icon: 'supplies', tag: 'Supplies', name: 'Tattoo Supplies', desc: 'Cartridge needles, black ink bottles, caps and black nitrile gloves for a clean setup.', rating: 4, count: 44, thumb: 'assets/supplies.png' },
  { price: 129, b2g2: true, cat: 'tattoo', icon: 'kit', tag: 'Kits', name: 'Starter Tattoo Kit', desc: 'Black-and-gold hard case with a pen machine, cartridge and practice skin for new artists.', rating: 5, count: 27, thumb: 'assets/starter-kit.png' },
  { price: 8, b2g2: false, cat: 'extras', icon: 'sticker', tag: 'Extras', name: 'Sticker Pack', desc: "American traditional flash stickers by Lou: dobermans, daggers, roses, a swallow and the paintbrush. Slap 'em anywhere.", rating: 5, count: 63, thumb: 'assets/stickers.png' },
  { price: 30, b2g2: true, cat: 'apparel', icon: 'shirt', tag: 'Apparel', name: 'Signature Tee', desc: 'Heavyweight black tee with the doberman-and-triangle crest across the chest.', rating: 5, count: 74, thumb: 'assets/tee.png' },
  { price: 38, b2g2: true, cat: 'apparel', icon: 'longsleeve', tag: 'Apparel', name: 'Long Sleeve Shirt', desc: 'Black long sleeve with the paintbrush-and-ribbon art running down the sleeve.', rating: 5, count: 31, thumb: 'assets/longsleeve.png' },
  { price: 32, b2g2: true, cat: 'apparel', icon: 'shorts', tag: 'Apparel', name: 'Shorts', desc: 'Relaxed-fit fleece shorts with white drawstrings and a small gold star.', rating: 4, count: 22, thumb: 'assets/shorts.png' },
  { price: 60, b2g2: true, cat: 'apparel', icon: 'hoodie', tag: 'Apparel', name: 'Hoodie', desc: 'Heavy fleece hoodie with a big doberman-and-triangle back print and gold sparkle stars.', rating: 5, count: 86, thumb: 'assets/hoodie.png' },
  { price: 95, b2g2: true, cat: 'apparel', icon: 'jacket', tag: 'Apparel', name: 'Jacket', desc: 'Black-and-cream varsity jacket with an embroidered doberman crest patch.', rating: 5, count: 19, thumb: 'assets/jacket.png' },
  { price: 14, b2g2: true, cat: 'apparel', icon: 'bandana', tag: 'Apparel', name: 'Bandana', desc: 'Black bandana with a cream paisley border and scattered flash stars and roses.', rating: 5, count: 40, thumb: 'assets/bandana.png' },
  { price: 28, b2g2: true, cat: 'apparel', icon: 'hat', tag: 'Apparel', name: 'Hat', desc: 'Structured black cap with an embroidered champagne-gold star.', rating: 4, count: 35, thumb: 'assets/hat.png' },
  { price: 12, b2g2: false, cat: 'extras', icon: 'charm', tag: 'Extras', name: 'Charms', desc: 'Gold charms inspired by tattoo flash: doberman, paintbrush, dagger and roses.', rating: 5, count: 29, thumb: 'assets/charms.png' },
  { price: 12, b2g2: true, cat: 'apparel', icon: 'socks', tag: 'Apparel', name: 'Socks', desc: 'Black crew socks with woven gold stars and dagger flash.', rating: 5, count: 48, thumb: 'assets/socks.png' },
];

const reviews = [
  { text: 'The aftercare healed my sleeve so fast and the colors stayed bright. Never going back to anything else.', name: 'Marcus R.', item: 'Healing & Protection Aftercare' },
  { text: 'Got the starter kit to practice on fake skin — everything I needed was in one box. Great quality for the price.', name: 'Jasmine T.', item: 'Starter Tattoo Kit' },
  { text: 'The hoodie is heavy and super comfortable. The back print gets compliments every time I wear it.', name: 'Diego M.', item: 'Hoodie' },
  { text: 'That old style gun hits different. Clean lines and that classic sound — love it.', name: 'Andre L.', item: 'Old Style Tattoo Gun' },
  { text: 'Used the buy 2 get 2 deal on tees and socks. Fits perfect and the designs are fire.', name: 'Kayla S.', item: 'Signature Tee & Socks' },
  { text: 'My friends and I came in as a trio, got the discount, and Lou designed something unique for each of us.', name: 'Brian, Leo & Ana', item: 'Trio Tattoo Deal' },
];

// ---------- Helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
const money = n => '$' + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');

// ---------- Render products ----------
const grid = $('#productGrid');
grid.innerHTML = products.map((p, i) => `
  <article class="card reveal${p.img ? ' card-feature' : ''}" data-cat="${p.cat}" style="--d:${(i % 4) * 0.08}s">
    ${p.img ? `<div class="card-media"><img src="${p.img}" alt="${p.name}" /></div>` : ''}
    <div class="card-body">
      <span class="card-tag">${p.tag}</span>
      ${p.img ? '' : `<div class="card-thumb">${p.thumb ? `<img src="${p.thumb}" alt="${p.name}" />` : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[p.icon]}</svg>`}</div>`}
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="card-foot"><span class="stars" aria-label="${p.rating} out of 5 stars">${stars(p.rating)}<small>(${p.count})</small></span>${p.b2g2 ? '<span class="deal-chip" title="Counts toward Buy 2, Get 2 Free">B2G2</span>' : ''}</div>
      <div class="card-buy"><span class="price">${money(p.price)}</span><button type="button" class="add-btn" data-add="${i}">Add to cart</button></div>
    </div>
  </article>`).join('');

grid.insertAdjacentHTML('beforeend', `
  <a href="#contact" class="custom-tile reveal">
    <span class="eyebrow">Custom Work</span>
    <h3>Want a tattoo designed just for you?</h3>
    <p>Every piece is drawn by Lou from scratch. Reach out to book a consultation.</p>
    <span class="custom-arrow" aria-hidden="true">→</span>
  </a>`);

// card spotlight follows mouse
$$('.card').forEach(card => card.addEventListener('pointermove', e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`);
  card.style.setProperty('--my', `${e.clientY - r.top}px`);
}));

// filters
$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
  const f = chip.dataset.filter;
  $$('.card').forEach(card => {
    const show = f === 'all' || card.dataset.cat === f;
    card.classList.toggle('hide', !show);
    card.classList.remove('pop');
    if (show) { void card.offsetWidth; card.classList.add('pop', 'in'); }
  });
}));

// ---------- Reviews slider ----------
const track = $('#reviewTrack');
const dots = $('#reviewDots');
track.innerHTML = reviews.map(r => `
  <figure class="review">
    <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>“${r.text}”</blockquote>
    <cite>${r.name}<span>${r.item}</span></cite>
  </figure>`).join('');
dots.innerHTML = reviews.map((_, i) => `<button aria-label="Show review ${i + 1}"></button>`).join('');
let slide = 0, timer;
const go = i => {
  slide = (i + reviews.length) % reviews.length;
  track.style.transform = `translateX(-${slide * 100}%)`;
  $$('button', dots).forEach((d, j) => d.classList.toggle('active', j === slide));
};
const auto = () => { clearInterval(timer); timer = setInterval(() => go(slide + 1), 5500); };
$$('button', dots).forEach((d, i) => d.addEventListener('click', () => { go(i); auto(); }));
let startX = null;
track.addEventListener('pointerdown', e => { startX = e.clientX; });
track.addEventListener('pointerup', e => {
  if (startX === null) return;
  const dx = e.clientX - startX; startX = null;
  if (Math.abs(dx) > 40) { go(slide + (dx < 0 ? 1 : -1)); auto(); }
});
go(0); auto();

// ---------- Reveal on scroll + counters ----------
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in');
  $$('[data-count]', en.target).forEach(countUp);
  io.unobserve(en.target);
}), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(el => io.observe(el));

function countUp(el) {
  const end = +el.dataset.count, suffix = el.dataset.suffix || '', dur = 1600, t0 = performance.now();
  const step = t => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---------- Nav ----------
const nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
const progress = $('.scroll-progress');
const onScroll = () => {
  nav.classList.toggle('scrolled', scrollY > 30);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
$$('a', links).forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));
// active link highlight
const sectionIO = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) $$('a', links).forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => sectionIO.observe(s));

// ---------- Cursor glow + hero tilt ----------
const glow = $('.cursor-glow');
const tilt = $('#tilt');
if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
  addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    tilt.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });
} else glow.style.display = 'none';

// ---------- Gold spark particles ----------
const canvas = $('#sparks');
const ctx = canvas.getContext('2d');
let W, H, parts = [];
const size = () => {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = canvas.offsetWidth; H = canvas.offsetHeight;
  canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  parts = Array.from({ length: Math.min(70, Math.floor(W / 18)) }, () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3,
    vy: -(Math.random() * 0.35 + 0.08), vx: (Math.random() - 0.5) * 0.15, a: Math.random() * 0.6 + 0.2, t: Math.random() * 6.28,
  }));
};
const draw = () => {
  ctx.clearRect(0, 0, W, H);
  for (const p of parts) {
    p.x += p.vx; p.y += p.vy; p.t += 0.03;
    if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
    ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
    ctx.fillStyle = '#e8d6b2';
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  }
  requestAnimationFrame(draw);
};
size(); addEventListener('resize', size);
if (!reduceMotion) draw();

// ---------- Sign-up form (15% off proof) ----------
const form = $('#signupForm'), msg = $('#formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#fName').value.trim(), email = $('#fEmail').value.trim();
  if (!name) { msg.textContent = 'Please enter your name.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Please enter a valid email.'; return; }
  const code = 'HUE15-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  $('#proofName').textContent = `Welcome to the Hue, ${name.split(' ')[0]}!`;
  $('#proofCode').textContent = code;
  try { localStorage.setItem('louhue-code', code); } catch (e) {}
  if (window.applySignupCode) window.applySignupCode(code);
  form.hidden = true; $('#proof').hidden = false;
});


// ---------- Cart, deals & checkout ----------
const TATTOO = {
  small: { label: 'Small tattoo (palm-size)', price: 80 },
  medium: { label: 'Medium tattoo (hand-size)', price: 150 },
  large: { label: 'Large tattoo (half-sleeve session)', price: 300 },
};
const cart = [];               // { key, name, price, qty, b2g2, img, tattoo?: { size, people } }
let signupCode = '';
try { signupCode = localStorage.getItem('louhue-code') || ''; } catch (e) {}
const validCode = c => /^HUE15-[A-Z0-9]{5}$/.test((c || '').trim().toUpperCase());

const cartEl = $('#cart'), overlay = $('#cartOverlay'), countEl = $('#cartCount');
const openCart = () => { overlay.hidden = false; requestAnimationFrame(() => document.body.classList.add('cart-open')); cartEl.setAttribute('aria-hidden', 'false'); $('#cartClose').focus(); };
const closeCart = () => { document.body.classList.remove('cart-open'); cartEl.setAttribute('aria-hidden', 'true'); setTimeout(() => { overlay.hidden = true; }, 450); };
$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('cart-open')) closeCart(); });

let toastTimer;
const toast = text => {
  const t = $('#toast'); t.textContent = text; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
};

function addItem(item) {
  const found = cart.find(c => c.key === item.key);
  if (found) found.qty += item.qty; else cart.push(item);
  renderCart();
  countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
  toast(`Added ${item.name}`);
}

// Shop "Add to cart" buttons
grid.addEventListener('click', e => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  const p = products[+btn.dataset.add];
  addItem({ key: p.name, name: p.name, price: p.price, qty: 1, b2g2: p.b2g2, img: p.img || p.thumb });
  btn.textContent = 'Added ✓'; btn.classList.add('done');
  setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('done'); }, 1400);
});

// Tattoo booking
const bookForm = $('#bookForm');
const bookChoice = () => ({ size: bookForm.size.value, people: +bookForm.people.value });
const tattooDiscount = people => (people === 3 ? { pct: 25, label: 'Trio deal' } : validCode(signupCode) ? { pct: 15, label: 'Sign-up deal' } : null);
function updateBookPrice() {
  const { size, people } = bookChoice();
  const base = TATTOO[size].price * people, d = tattooDiscount(people);
  $('#bookPrice').textContent = money(d ? base * (1 - d.pct / 100) : base);
  $('#bookSave').textContent = d ? `${d.label}: save ${money(base * d.pct / 100)}` : people === 2 ? 'Add a third person for 25% off' : '';
}
bookForm.addEventListener('change', updateBookPrice);
bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const { size, people } = bookChoice();
  const name = TATTOO[size].label + (people > 1 ? ` × ${people} people` : '');
  addItem({ key: `tattoo-${size}-${people}`, name, price: TATTOO[size].price * people, qty: 1, b2g2: false, tattoo: { size, people } });
  openCart();
});

// Deal math
function totals() {
  let subtotal = 0, b2g2Save = 0, tattooSave = 0;
  const units = [];
  const tattooLabels = new Set();
  for (const c of cart) {
    subtotal += c.price * c.qty;
    if (c.b2g2) for (let k = 0; k < c.qty; k++) units.push(c.price);
    if (c.tattoo) {
      const d = tattooDiscount(c.tattoo.people);
      if (d) { tattooSave += c.price * c.qty * d.pct / 100; tattooLabels.add(`${d.label} (${d.pct}%)`); }
    }
  }
  // Buy 2, Get 2: priciest items are paid, every 3rd and 4th item in each group of 4 is free
  units.sort((a, b) => b - a);
  units.forEach((p, i) => { if (i % 4 >= 2) b2g2Save += p; });
  const nextFree = units.length && units.length < 3 ? 3 - units.length : 0;
  return { subtotal, b2g2Save, tattooSave, tattooLabels: [...tattooLabels], units: units.length, nextFree, total: subtotal - b2g2Save - tattooSave };
}

function renderCart() {
  const n = cart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = n;
  countEl.classList.toggle('has', n > 0);
  const items = $('#cartItems');
  if (!cart.length) {
    items.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="#products" class="btn btn-sm btn-ghost" id="emptyShop">Browse the shop</a></div>';
    $('#emptyShop').addEventListener('click', closeCart);
  } else {
    items.innerHTML = cart.map((c, i) => `
      <div class="cart-line">
        <div class="line-img">${c.img ? `<img src="${c.img}" alt="" />` : '<span aria-hidden="true">✦</span>'}</div>
        <div class="line-info">
          <b>${c.name}</b>
          <span>${money(c.price)}${c.b2g2 ? ' · <em>B2G2</em>' : ''}${c.tattoo && tattooDiscount(c.tattoo.people) ? ` · <em>${tattooDiscount(c.tattoo.people).pct}% off</em>` : ''}</span>
        </div>
        <div class="qty">
          <button type="button" data-q="${i}" data-d="-1" aria-label="Remove one ${c.name}">−</button>
          <span>${c.qty}</span>
          <button type="button" data-q="${i}" data-d="1" aria-label="Add one ${c.name}">+</button>
        </div>
      </div>`).join('');
  }
  const t = totals();
  $('#cartHint').innerHTML = t.nextFree
    ? `Add <b>${t.nextFree}</b> more clothing or supply item${t.nextFree > 1 ? 's' : ''} and ${t.nextFree > 1 ? 'your 3rd one is' : 'it\'s'} free. <b>Buy 2, Get 2 Free.</b>`
    : t.b2g2Save ? `<b>Buy 2, Get 2 Free</b> applied: ${t.units % 4 === 3 ? 'add 1 more item and it\'s free too.' : 'the lowest-priced items are free.'}` : '';
  $('#cartHint').hidden = !$('#cartHint').innerHTML;
  $('#cartTotals').innerHTML = `
    <div><dt>Subtotal</dt><dd>${money(t.subtotal)}</dd></div>
    ${t.b2g2Save ? `<div class="save"><dt>Buy 2, Get 2 Free</dt><dd>−${money(t.b2g2Save)}</dd></div>` : ''}
    ${t.tattooSave ? `<div class="save"><dt>${t.tattooLabels.join(' + ')}</dt><dd>−${money(t.tattooSave)}</dd></div>` : ''}
    <div class="grand"><dt>Total</dt><dd>${money(t.total)}</dd></div>`;
  $('#checkoutBtn').disabled = !cart.length;
}

$('#cartItems').addEventListener('click', e => {
  const b = e.target.closest('[data-q]');
  if (!b) return;
  const c = cart[+b.dataset.q];
  c.qty += +b.dataset.d;
  if (c.qty <= 0) cart.splice(+b.dataset.q, 1);
  renderCart();
});

// Sign-up code
const codeInput = $('#codeInput'), codeMsg = $('#codeMsg');
window.applySignupCode = code => {
  signupCode = code; codeInput.value = code;
  codeMsg.textContent = 'Code applied: 15% off tattoos.'; codeMsg.className = 'code-msg ok';
  updateBookPrice(); renderCart();
};
$('#codeApply').addEventListener('click', () => {
  const c = codeInput.value.trim().toUpperCase();
  if (validCode(c)) { window.applySignupCode(c); try { localStorage.setItem('louhue-code', c); } catch (e) {} }
  else { codeMsg.textContent = 'That code doesn\'t look right. Sign up below to get one (it looks like HUE15-AB12C).'; codeMsg.className = 'code-msg bad'; }
});
if (validCode(signupCode)) { codeInput.value = signupCode; codeMsg.textContent = 'Code applied: 15% off tattoos.'; codeMsg.className = 'code-msg ok'; }

// Checkout (demo)
$('#checkoutForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#coName').value.trim(), email = $('#coEmail').value.trim(), m = $('#coMsg');
  if (!cart.length) { m.textContent = 'Your cart is empty.'; return; }
  if (!name) { m.textContent = 'Please enter your name.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { m.textContent = 'Please enter a valid email.'; return; }
  m.textContent = '';
  const t = totals();
  $('#doneText').textContent = `Thanks, ${name.split(' ')[0]}! Your order total was ${money(t.total)}${t.b2g2Save + t.tattooSave ? ` and you saved ${money(t.b2g2Save + t.tattooSave)}` : ''}. Show this order number at the shop.`;
  $('#orderNum').textContent = 'LH-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  cart.length = 0; renderCart();
  $('#cartBody').hidden = true; $('#cartDone').hidden = false;
});
$('#doneBtn').addEventListener('click', () => { $('#cartDone').hidden = true; $('#cartBody').hidden = false; closeCart(); });

updateBookPrice();
renderCart();

// ---------- Loader ----------
$('#year').textContent = new Date().getFullYear();
document.body.classList.add('loading');
addEventListener('load', () => setTimeout(() => {
  $('#loader').classList.add('done');
  document.body.classList.remove('loading');
  document.body.classList.add('ready');
}, reduceMotion ? 0 : 700));
