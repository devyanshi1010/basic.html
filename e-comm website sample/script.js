let cart = [];
let currentProductId = null;
let selectedSize = null;
let selectedColorObj = null;

// --- DARK MODE TOGGLE ---
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    const iconPath = isDark 
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    document.getElementById('theme-icon').innerHTML = iconPath;
}

// --- FILTER LOGIC ---
document.querySelectorAll('.filter-checkbox').forEach(box => { 
    box.addEventListener('change', applyFilters); 
});

function clearFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(box => box.checked = false);
    applyFilters();
}

function applyFilters() {
    if (typeof products === 'undefined') return;

    const checkedCats = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
    const checkedSizes = Array.from(document.querySelectorAll('.filter-size:checked')).map(cb => cb.value);

    const filteredProducts = products.filter(product => {
        const matchCat = checkedCats.length === 0 || checkedCats.includes(product.category);
        const matchSize = checkedSizes.length === 0 || (product.sizes && product.sizes.some(size => checkedSizes.includes(size)));
        return matchCat && matchSize;
    });

    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `Showing ${filteredProducts.length} results`;
    renderProductsGrid(filteredProducts);
}

// --- RENDER GRID ---
function renderProductsGrid(items = typeof products !== 'undefined' ? products : []) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (!items || items.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 font-bold text-sm">No products found</div>`;
        return;
    }

    grid.innerHTML = items.map(product => {
        const coverImg = (product.colors && product.colors.length > 0) ? product.colors[0].images[0] : (product.images ? product.images[0] : '');
        return `
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-3 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group" onclick="openPDP('${product.id}')">
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 mb-3">
                <img src="${coverImg}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/400x500?text=Image'">
            </div>
            <div class="px-1">
                <h3 class="font-extrabold text-xs text-slate-900 dark:text-white truncate">${product.title}</h3>
                <div class="flex items-baseline space-x-2 pt-1">
                    <span class="text-sm font-black text-slate-900 dark:text-white">${product.price}</span>
                    <span class="text-[10px] font-black text-emerald-500">${product.discount || ''}</span>
                </div>
            </div>
        </div>`
    }).join('');
}

function handleSearch(q) {
    if (typeof products === 'undefined') return;
    const query = q.toLowerCase().trim();
    if (!query) { applyFilters(); return; }
    const filtered = products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    renderProductsGrid(filtered);
}

function openPDP(id) {
    if (typeof products === 'undefined') return;
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentProductId = id;
    selectedSize = product.sizes ? product.sizes[0] : null;
    
    document.getElementById('pdp-title').textContent = product.title;
    document.getElementById('pdp-desc').textContent = product.subtitle || '';
    document.getElementById('pdp-price').textContent = product.price;
    document.getElementById('pdp-mrp').textContent = product.mrp || '';
    document.getElementById('pdp-discount').textContent = product.discount || '';
    document.getElementById('pdp-long-desc').textContent = product.description || "Premium quality product.";
    
    const chartBody = document.getElementById('size-chart-body');
    if (product.sizeChart && chartBody) {
        chartBody.innerHTML = product.sizeChart.map(row => `<tr><td class="p-3 border-b dark:border-slate-700">${row.size}</td><td class="p-3 border-b dark:border-slate-700">${row.chest}</td><td class="p-3 border-b dark:border-slate-700">${row.length}</td></tr>`).join('');
    }

    const colorSec = document.getElementById('pdp-color-section');
    if (product.colors) {
        selectedColorObj = product.colors[0];
        if (colorSec) colorSec.classList.remove('hidden');
        document.getElementById('pdp-colors-container').innerHTML = product.colors.map((c, i) => `
            <button id="color-btn-${i}" onclick="selectColor(${i})" class="w-8 h-8 rounded-full border-2 ${i===0 ? 'color-active' : 'border-slate-200 dark:border-slate-600'} shadow-sm transition-all" style="background-color: ${c.hex};" title="${c.name}"></button>
        `).join('');
        updatePDPImages(selectedColorObj.images);
    } else {
        selectedColorObj = null;
        if (colorSec) colorSec.classList.add('hidden');
        updatePDPImages(product.images);
    }

    renderSizes(product);
    document.getElementById('pdp-add-btn').onclick = () => addToCart(id, selectedSize);
    navigateTo('pdp');
}

function selectColor(index) {
    const product = products.find(p => p.id === currentProductId);
    selectedColorObj = product.colors[index];
    product.colors.forEach((c, i) => {
        const btn = document.getElementById(`color-btn-${i}`);
        if (btn) {
            if(i === index) { btn.classList.add('color-active'); btn.classList.remove('border-slate-200', 'dark:border-slate-600'); }
            else { btn.classList.remove('color-active'); btn.classList.add('border-slate-200', 'dark:border-slate-600'); }
        }
    });
    updatePDPImages(selectedColorObj.images);
}

function updatePDPImages(imgArray) {
    if (!imgArray || imgArray.length === 0) return;
    document.getElementById('pdp-main-img').src = imgArray[0];
    document.getElementById('pdp-thumbnails').innerHTML = imgArray.map(img => `
        <button onclick="document.getElementById('pdp-main-img').src='${img}'" class="aspect-[3/4] rounded-xl overflow-hidden border-2 border-transparent hover:border-rose-500 bg-slate-100 dark:bg-slate-700">
            <img src="${img}" class="w-full h-full object-cover">
        </button>
    `).join('');
}

function renderSizes(product) {
    if (!product.sizes) return;
    document.getElementById('pdp-sizes-container').innerHTML = product.sizes.map(s => `
        <button onclick="selectedSize='${s}'; renderSizes(products.find(p => p.id === currentProductId))" class="w-12 h-12 rounded-2xl text-xs font-black transition-all ${selectedSize === s ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 scale-105 shadow-md' : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300'}">${s}</button>
    `).join('');
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer.classList.contains('translate-x-full')) {
        overlay.classList.remove('hidden'); setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        drawer.classList.remove('translate-x-full');
    } else {
        overlay.classList.add('opacity-0'); drawer.classList.add('translate-x-full');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function navigateTo(page) {
    ['home-page', 'pdp-page'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(`${page}-page`);
    if (target) target.classList.remove('hidden');
    window.scrollTo({ top: 0 });
}

function addToCart(id, size) {
    const product = products.find(p => p.id === id);
    const colorName = selectedColorObj ? selectedColorObj.name : 'Standard';
    const existing = cart.find(item => item.id === id && item.size === size && item.color === colorName);
    
    if (existing) { existing.qty += 1; } 
    else { 
        const coverImg = selectedColorObj ? selectedColorObj.images[0] : (product.images ? product.images[0] : '');
        cart.push({ ...product, size, color: colorName, coverImg: coverImg, qty: 1 }); 
    }
    
    const toast = document.getElementById('toast');
    if (toast) {
        document.getElementById('toast-msg').textContent = 'Added to Bag 🛍️';
        toast.classList.remove('translate-x-80');
        setTimeout(() => toast.classList.add('translate-x-80'), 2500);
    }
    
    updateCartUI();
}

function buyNowCurrent() { if (currentProductId) { addToCart(currentProductId, selectedSize); toggleCart(); } }

function updateCartUI() {
    const badge = document.getElementById('cart-count-badge');
    if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    const container = document.getElementById('cart-items-container');
    let subtotal = 0;
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-xs font-bold text-slate-400">Bag is empty</div>`;
        document.getElementById('cart-subtotal').textContent = '₹0';
        return;
    }
    container.innerHTML = cart.map((item, idx) => {
        subtotal += item.priceNum * item.qty;
        return `
            <div class="flex items-center space-x-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                <img src="${item.coverImg}" class="w-14 h-16 object-cover rounded-xl">
                <div class="flex-1">
                    <h4 class="font-extrabold text-xs dark:text-white truncate">${item.title}</h4>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">Size: ${item.size} | Color: ${item.color}</p>
                    <p class="text-xs font-black mt-1 dark:text-white">${item.price}</p>
                </div>
                <button onclick="cart.splice(${idx},1); updateCartUI();" class="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 font-bold p-2 rounded-lg">✕</button>
            </div>
        `;
    }).join('');
    document.getElementById('cart-subtotal').textContent = `₹${subtotal}`;
}

function openCheckoutModal() {
    if (cart.length === 0) return;
    toggleCart();
    document.getElementById('checkout-form-view').classList.remove('hidden');
    document.getElementById('checkout-success-view').classList.add('hidden');
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function generateOrderCode() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('display-cust-code').textContent = `DHAKRE-CUST-${randomNum}`;
    document.getElementById('display-merchant-code').textContent = `DHAKRE-MERCH-${randomNum}`;
    document.getElementById('checkout-form-view').classList.add('hidden');
    document.getElementById('checkout-success-view').classList.remove('hidden');
}

function finalizeOrder() {
    cart = []; updateCartUI();
    document.getElementById('checkout-modal').classList.add('hidden');
    navigateTo('home');
}

document.addEventListener('DOMContentLoaded', () => { applyFilters(); });