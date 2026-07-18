/* =========================================================
   LOGIKA APLIKASI UZZIK.ID
   File ini memakai variabel "products", "faqs", dan "ADMIN_WA"
   yang didefinisikan di data/products.js, data/faqs.js, data/config.js
========================================================= */

/* ---------------- STATE ---------------- */
let activeCat = "Semua";
let searchTerm = "";
let cart = []; // {id, qty}
let currentProduct = null;
let currentQty = 1;
let currentImgIndex = 0;

const rupiah = n => "Rp " + n.toLocaleString("id-ID");

/* ---------------- RENDER CATALOG ---------------- */
function renderProducts(){
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const filtered = products.filter(p=>{
    const matchCat = activeCat === "Semua" || p.cat === activeCat;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  grid.innerHTML = "";
  if(filtered.length === 0){
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    filtered.forEach(p=>{
      const card = document.createElement('div');
      card.className = "card";
      card.innerHTML = `
        <div class="card-plate">${p.code}</div>
        <div class="card-stock ${p.stock === 'ready' ? 'stock-ready' : 'stock-limited'}">${p.stock === 'ready' ? 'Ready Stock' : 'Terbatas'}</div>
        <div class="card-img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="card-body">
          <span class="card-cat">${catLabel(p.cat)}</span>
          <div class="card-title">${p.name}</div>
          <div class="card-specs">${Object.entries(p.specs).slice(0,2).map(([k,v])=>`<span>${k}: ${v}</span>`).join('')}</div>
          <div class="card-foot">
            <div class="card-price">${rupiah(p.price)}<small>per item</small></div>
            <div class="card-actions">
              <button class="icon-btn" title="Tambah ke Keranjang" onclick="quickAdd(${p.id})">🛒</button>
              <button class="btn-detail" onclick="openDetail(${p.id})">Detail</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }
}

function catLabel(cat){
  const map = {Sport:"Mobil Sport", Sedan:"Sedan Mewah", SUV:"SUV / Offroad", Livery:"Livery & Skin", Koin:"Koin & Saldo", Akun:"Akun Custom"};
  return map[cat] || cat;
}

/* ---------------- DETAIL MODAL ---------------- */
function openDetail(id){
  currentProduct = products.find(p=>p.id === id);
  currentQty = 1;
  currentImgIndex = 0;
  document.getElementById('modalPlate').textContent = currentProduct.code;
  document.getElementById('modalTitle').textContent = currentProduct.name;
  document.getElementById('modalCat').textContent = catLabel(currentProduct.cat);
  document.getElementById('modalPrice').textContent = rupiah(currentProduct.price);
  document.getElementById('qtyVal').textContent = currentQty;
  document.getElementById('modalSpecs').innerHTML = Object.entries(currentProduct.specs)
    .map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('');
  const imgs = [currentProduct.img, currentProduct.img2];
  document.getElementById('modalMainImg').src = imgs[0];
  document.getElementById('modalThumbs').innerHTML = imgs.map((src,i)=>
    `<img src="${src}" class="${i===0?'active':''}" onclick="switchImg(${i})">`).join('');
  openOverlay('detailOverlay');
}

function switchImg(i){
  currentImgIndex = i;
  const imgs = [currentProduct.img, currentProduct.img2];
  document.getElementById('modalMainImg').src = imgs[i];
  document.querySelectorAll('.modal-thumbs img').forEach((el,idx)=>el.classList.toggle('active', idx===i));
}

function changeQty(delta){
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qtyVal').textContent = currentQty;
}

/* ---------------- CART ---------------- */
function quickAdd(id){
  addToCart(id, 1);
  showToast("Ditambahkan ke keranjang");
}

function addToCartFromModal(){
  addToCart(currentProduct.id, currentQty);
  showToast("Ditambahkan ke keranjang");
  closeOverlay('detailOverlay');
}

function addToCart(id, qty){
  const existing = cart.find(c=>c.id === id);
  if(existing){ existing.qty += qty; } else { cart.push({id, qty}); }
  updateCartCount();
}

function updateCartCount(){
  document.getElementById('cartCount').textContent = cart.reduce((s,c)=>s+c.qty,0);
}

function openCart(){
  renderCart();
  openOverlay('cartOverlay');
}

function renderCart(){
  const linesEl = document.getElementById('cartLines');
  const summaryEl = document.getElementById('cartSummary');
  if(cart.length === 0){
    linesEl.innerHTML = `<div class="cart-empty-row">Keranjang masih kosong.<br>Yuk pilih item di katalog dulu.</div>`;
    summaryEl.innerHTML = "";
    return;
  }
  linesEl.innerHTML = cart.map(c=>{
    const p = products.find(x=>x.id===c.id);
    return `<div class="cart-line">
      <img src="${p.img}" alt="${p.name}">
      <div class="ci-info"><b>${p.name}</b><span>${c.qty} x ${rupiah(p.price)}</span></div>
      <button class="ci-remove" onclick="removeFromCart(${c.id})">✕</button>
    </div>`;
  }).join('');
  const total = cart.reduce((s,c)=>{ const p = products.find(x=>x.id===c.id); return s + p.price*c.qty; },0);
  summaryEl.innerHTML = `<div class="line"><span>Total Item</span><span>${cart.reduce((s,c)=>s+c.qty,0)}</span></div>
    <div class="line total"><span>Total Harga</span><span>${rupiah(total)}</span></div>`;
}

function removeFromCart(id){
  cart = cart.filter(c=>c.id !== id);
  updateCartCount();
  renderCart();
}

/* ---------------- ORDER ---------------- */
function orderNowFromModal(){
  addToCart(currentProduct.id, currentQty);
  closeOverlay('detailOverlay');
  openOrderForm();
}

function openOrderForm(){
  if(cart.length === 0){
    showToast("Keranjang masih kosong");
    return;
  }
  closeOverlay('cartOverlay');
  const summaryEl = document.getElementById('orderSummary');
  const total = cart.reduce((s,c)=>{ const p = products.find(x=>x.id===c.id); return s + p.price*c.qty; },0);
  summaryEl.innerHTML = cart.map(c=>{
    const p = products.find(x=>x.id===c.id);
    return `<div class="line"><span>${p.name} x${c.qty}</span><span>${rupiah(p.price*c.qty)}</span></div>`;
  }).join('') + `<div class="line total"><span>Total</span><span>${rupiah(total)}</span></div>`;
  openOverlay('orderOverlay');
}

function submitOrder(){
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const server = document.getElementById('fServer').value.trim();
  const note = document.getElementById('fNote').value.trim();

  if(!name || !phone || !server){
    showToast("Lengkapi nama, WhatsApp, dan ID server dulu ya");
    return;
  }

  const total = cart.reduce((s,c)=>{ const p = products.find(x=>x.id===c.id); return s + p.price*c.qty; },0);
  const itemLines = cart.map(c=>{
    const p = products.find(x=>x.id===c.id);
    return `- ${p.name} (${p.code}) x${c.qty} = ${rupiah(p.price*c.qty)}`;
  }).join('\n');

  const message =
`Halo Uzzik.ID, saya ingin order:

${itemLines}

Total: ${rupiah(total)}

Nama: ${name}
WhatsApp: ${phone}
ID/Server: ${server}
Catatan: ${note || '-'}`;

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeOverlay('orderOverlay');
  showToast("Membuka WhatsApp...");
}

/* ---------------- FAQ ---------------- */
function renderFaq(){
  const el = document.getElementById('faqList');
  el.innerHTML = faqs.map((f,i)=>`
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFaq(${i})"><span>${f.q}</span><span class="plus">+</span></div>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');
}
function toggleFaq(i){
  document.getElementById(`faq-${i}`).classList.toggle('open');
}

/* ---------------- UTIL ---------------- */
function openOverlay(id){ document.getElementById(id).classList.add('show'); }
function closeOverlay(id){ document.getElementById(id).classList.remove('show'); }
function toggleMenu(){ document.getElementById('navLinks').classList.toggle('open'); }

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ---------------- EVENT BINDINGS ---------------- */
function bindEvents(){
  document.getElementById('chipRow').addEventListener('click', e=>{
    const chip = e.target.closest('.chip');
    if(!chip) return;
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    renderProducts();
  });

  document.getElementById('searchInput').addEventListener('input', e=>{
    searchTerm = e.target.value;
    renderProducts();
  });

  document.querySelectorAll('.nav-links a').forEach(a=>
    a.addEventListener('click', ()=>document.getElementById('navLinks').classList.remove('open')));

  document.querySelectorAll('.overlay').forEach(ov=>{
    ov.addEventListener('click', e=>{ if(e.target === ov) ov.classList.remove('show'); });
  });
}

/* ---------------- INIT ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  renderProducts();
  renderFaq();
});
