/* ============================================================
   DATA
   ============================================================ */
const menuItems = [
  { id:1, name:'Noir Espresso', tag:'espresso', emoji:'☕', img:'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',  price:4.5,  desc:'Double ristretto pulled at 9 bar. Dark roast, obsidian finish, zero compromise.' },
  { id:2, name:'Cortado Void', tag:'espresso', emoji:'🥛', img:'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',   price:5.5,  desc:'Espresso kissed with equal parts silky steamed milk. Brutally balanced.' },
  { id:3, name:'Flat White X', tag:'espresso', emoji:'🌊', img:'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=800',   price:6.0,  desc:'Third-wave micro-foam over our signature dark blend. Velvety texture.' },
  { id:4, name:'Cold Abyss',   tag:'cold',     emoji:'🧊', img:'https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=800', price:7.0,  desc:'18-hour cold steeped single origin. Chocolate and stone fruit. No ice needed.' },
  { id:5, name:'Nitro Black',  tag:'cold',     emoji:'⚫', img:'https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=800', price:7.5,  desc:'Nitrogen-charged cold brew on tap. Silky head, smooth body. Pure night.' },
  { id:6, name:'Kyoto Drip',   tag:'cold',     emoji:'💧', img:'https://images.pexels.com/photos/4829083/pexels-photo-4829083.jpeg?auto=compress&cs=tinysrgb&w=800', price:8.5,  desc:'8-hour slow ice drip. Clarity in every drop. Japanese precision.' },
  { id:7, name:'Dark Tiramisu',tag:'dessert',  emoji:'🍮', img:'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800', price:9.0,  desc:'Espresso-soaked savoiardi, mascarpone cream, bitter cacao dust.' },
  { id:8, name:'Affogato Zero',tag:'dessert',  emoji:'🍨', img:'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=800', price:8.0,  desc:'Salted caramel gelato drowned in hot espresso. Life-altering.' },
  { id:9, name:'Mochi Latte',  tag:'dessert',  emoji:'🍡', img:'https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=800', price:10.0, desc:'Matcha mochi meets our single origin oat latte. East meets West.' },
];

const testimonials = [
  { text: 'Walking into Obsidian feels like stepping into another dimension. The cortado alone justifies a round-trip flight.', name: 'H. Nakamura', title: 'Architect, Tokyo', initial: 'H' },
  { text: 'I\'ve visited speciality cafés on six continents. Nothing compares to the ritual, the darkness, the precision here.', name: 'Sofia Laurent', title: 'Food Writer, Paris', initial: 'S' },
  { text: 'The cold abyss changed my understanding of what coffee can be. I think about it constantly.', name: 'James Oduya', title: 'Barista Champion', initial: 'J' },
  { text: 'Every micro-detail is considered. The cup weight, the water temperature, the ambient silence. Obsessive genius.', name: 'Priya Mehta', title: 'Product Director', initial: 'P' },
  { text: 'Obsidian isn\'t a café. It\'s a philosophy. The espresso is transcendental.', name: 'Luka Bauer', title: 'Sensory Consultant', initial: 'L' },
];

const tickerItems = ['Single Origin Sourcing', 'Micro-Batch Roasting', 'Third Wave Craft', 'Zero Compromise', 'Dark Roast Excellence', 'Tokyo · New York · London'];

/* ============================================================
   TICKER
   ============================================================ */
(function buildTicker() {
  const el = document.getElementById('ticker-inner');
  const all = [...tickerItems, ...tickerItems].map(t =>
    `<span class="ticker-item"><span class="ticker-dot"></span>${t}</span>`
  ).join('');
  el.innerHTML = all + all; // doubled for seamless loop
})();

/* ============================================================
   MENU RENDERING
   ============================================================ */
let cartItems = [];

function renderMenu(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.tag === filter);
  grid.innerHTML = items.map(item => `
    <div class="menu-card" data-id="${item.id}"
         onmousemove="tilt3D(event,this)"
         onmouseleave="resetTilt(this)">
      <div class="card-img">
        <img src="${item.img}" alt="" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:0; transition: transform 0.6s ease;" loading="lazy" />
        <div class="card-glow" style="z-index:1;"></div>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.tag}</span>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <div class="card-price">$${item.price.toFixed(2)}</div>
          <button class="btn-add" onclick="addToCart(${item.id}, event)" id="btn-${item.id}">+</button>
        </div>
      </div>
    </div>
  `).join('');
  // Re-observe new cards
  grid.querySelectorAll('.menu-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderMenu(this.dataset.filter);
  });
});

renderMenu();

/* ============================================================
   3D TILT
   ============================================================ */
function tilt3D(e, el) {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
  const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -16;
  el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
}
function resetTilt(el) {
  el.style.transform = '';
}

/* ============================================================
   CART
   ============================================================ */
function addToCart(id, e) {
  // Ripple effect
  const btn = e.currentTarget;
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const size = Math.max(btn.offsetWidth, btn.offsetHeight) * 2;
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.offsetX - size/2}px;top:${e.offsetY - size/2}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  const item = menuItems.find(i => i.id === id);
  const existing = cartItems.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else { cartItems.push({ ...item, qty: 1 }); }

  btn.classList.add('added');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1500);

  updateCartUI();
}

function updateCartUI() {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cart-count');
  countEl.textContent = count;
  countEl.style.display = count ? 'flex' : 'none';
  document.getElementById('cart-total').textContent = '$' + total.toFixed(2);

  const itemsEl = document.getElementById('cart-items');
  if (!cartItems.length) {
    itemsEl.innerHTML = `<div style="text-align:center;padding:60px 0;color:var(--text-dim);font-family:var(--font-mono);font-size:11px;letter-spacing:0.2em;">YOUR CUP IS EMPTY</div>`;
    return;
  }
  itemsEl.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const idx = cartItems.findIndex(i => i.id === id);
  if (idx === -1) return;
  cartItems[idx].qty += delta;
  if (cartItems[idx].qty <= 0) cartItems.splice(idx, 1);
  updateCartUI();
}

function openCart()  {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function checkout() {
  if (!cartItems.length) return;
  document.getElementById('cart-items').innerHTML = `
    <div style="text-align:center;padding:60px 20px;color:var(--text-dim);">
      <div style="font-size:48px;margin-bottom:16px">☕</div>
      <div style="font-family:var(--font-display);font-size:28px;color:var(--cream);margin-bottom:12px">ORDER PLACED</div>
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.2em;">YOUR RITUAL BEGINS IN 4 MINUTES</div>
    </div>`;
  cartItems = [];
  updateCartUI();
  setTimeout(closeCart, 2200);
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const track = document.getElementById('testimonials-track');
track.innerHTML = testimonials.map(t => `
  <div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <p class="testimonial-text">"${t.text}"</p>
    <div class="testimonial-author">
      <div class="author-avatar">${t.initial}</div>
      <div>
        <div class="author-name">${t.name}</div>
        <div class="author-title">${t.title}</div>
      </div>
    </div>
  </div>
`).join('');

/* ============================================================
   PARTICLES
   ============================================================ */
(function buildParticles() {
  const container = document.getElementById('exp-particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      bottom:${Math.random()*40}px;
      --dur:${3+Math.random()*4}s;
      --delay:${Math.random()*5}s;
    `;
    container.appendChild(p);
  }
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  cursorDot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animCursor);
})();

/* ============================================================
   THREE.JS — PARTICLE FIELD + ROTATING TORUS
   ============================================================ */
(function initThree() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Ambient + point lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  const pointLight1 = new THREE.PointLight(0xff7a1a, 2.5, 12);
  pointLight1.position.set(3, 2, 3);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0xc9a84c, 1.5, 10);
  pointLight2.position.set(-3, -2, 2);
  scene.add(pointLight2);

  // Torus knot (stylised coffee ring)
  const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.28, 180, 24, 2, 3);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x1a0800,
    metalness: 0.9,
    roughness: 0.15,
    emissive: 0xff5500,
    emissiveIntensity: 0.08,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(2.8, 0, -1);
  scene.add(torus);

  // Particle sphere
  const count = 1800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2*Math.random()-1);
    const r     = 2.5 + Math.random() * 2;
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xc9a84c, size: 0.018, transparent: true, opacity: 0.7
  });
  scene.add(new THREE.Points(pGeo, pMat));

  // Inner ring
  const ringGeo = new THREE.TorusGeometry(1.8, 0.004, 4, 160);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(2.8, 0, -1);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  // Mouse interaction
  let targetRotX = 0, targetRotY = 0;
  document.addEventListener('mousemove', e => {
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.6;
    targetRotY = (e.clientX / window.innerWidth  - 0.5) * 0.6;
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;
    torus.rotation.x += (targetRotX - torus.rotation.x) * 0.03;
    torus.rotation.y += (targetRotY + t - torus.rotation.y) * 0.03;
    ring.rotation.z += 0.003;
    pointLight1.position.x = Math.sin(t * 0.7) * 4;
    pointLight1.position.y = Math.cos(t * 0.5) * 3;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* ============================================================
   GSAP ANIMATIONS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.timeline({ delay: 2.5 })
  .to('.hero-badge', { opacity:1, y:0, duration:0.8, ease:'power3.out' })
  .to('.hero-title',  { opacity:1, y:0, duration:1.0, ease:'power3.out' }, '-=0.4')
  .to('.hero-sub',    { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.5')
  .to('.hero-cta',    { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.4')
  .to('.hero-scroll', { opacity:1, duration:0.6 }, '-=0.2')
  .to('.hero-stat-bar',{ opacity:1, duration:0.6 }, '-=0.5');

// Scroll reveals
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity:0, y:50 },
    { opacity:1, y:0, duration:0.9, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 85%', toggleActions:'play none none none' }
    }
  );
});
gsap.utils.toArray('.reveal-left').forEach(el => {
  gsap.fromTo(el,
    { opacity:0, x:-60 },
    { opacity:1, x:0, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 80%' }
    }
  );
});
gsap.utils.toArray('.reveal-right').forEach(el => {
  gsap.fromTo(el,
    { opacity:0, x:60 },
    { opacity:1, x:0, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 80%' }
    }
  );
});

// Timeline items
gsap.utils.toArray('.timeline-item').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity:0, y:30 },
    { opacity:1, y:0, duration:0.7, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 85%' },
      delay: i * 0.12
    }
  );
});

// Counter animation
ScrollTrigger.create({
  trigger: '#experience',
  start: 'top 70%',
  onEnter: () => {
    gsap.to({ v: 0 }, {
      v: 2847391,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate() {
        document.getElementById('exp-counter').textContent =
          Math.floor(this.targets()[0].v).toLocaleString();
      }
    });
  },
  once: true
});

// Nav scroll effect
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: self => {
    document.getElementById('main-nav').classList.toggle('scrolled', self.progress > 0);
  }
});

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    gsap.to('#loader', {
      opacity: 0, duration: 0.8, ease: 'power2.out',
      onComplete: () => { document.getElementById('loader').style.display = 'none'; }
    });
  }, 2400);
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function toggleTheme() {
  document.body.classList.toggle('light');
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function toggleMobileMenu() {
  // simple show/hide nav links
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'fixed';
  links.style.top = '70px'; links.style.left = '0'; links.style.right = '0';
  links.style.background = 'rgba(5,5,7,0.98)';
  links.style.padding = '32px 24px';
  links.style.backdropFilter = 'blur(20px)';
  links.style.borderBottom = '1px solid var(--border)';
  links.style.gap = '24px';
  links.style.zIndex = '999';
}

/* ============================================================
   PARALLAX on hero scroll
   ============================================================ */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const canvas = document.getElementById('three-canvas');
  if (canvas) canvas.style.transform = `translateY(${y * 0.35}px)`;
  document.querySelector('.hero-content').style.transform = `translateY(${y * 0.18}px)`;
});