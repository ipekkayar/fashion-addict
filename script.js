function loadCart() {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
      cart = [];
    }
    if ((!cart || cart.length === 0) && window.name) {
      try { cart = JSON.parse(window.name) || []; } catch {}
    }
    return cart;
  }
  
  function saveCart(cart) {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch {}
    try { window.name = JSON.stringify(cart); } catch {}
  }
  
  function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;
    const cart = loadCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
  }
  
  window.addToCart = function(id, name, price, imgPath) {
    const cart = loadCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1, image: imgPath });
    }
    saveCart(cart);
    updateCartCount();
    alert(`${name} sepete eklendi!`);
  };
  
  window.removeFromCart = function(id) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);

    updateCartCount();
    if (window.location.pathname.endsWith('cart.html') || window.location.pathname.endsWith('/')) {
      location.reload();
    }
  };
  
  window.updateQty = function(id, delta) {
    let cart = loadCart();
    cart = cart.map(item => {
      if (item.id === id) {
        item.qty = Math.max(1, item.qty + delta);
      }
      return item;
    });
    saveCart(cart);
    updateCartCount();
    if (window.location.pathname.endsWith('cart.html')) {
      location.reload();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
 
    const popup = document.getElementById('popup');
    if (popup) setTimeout(() => popup.style.display = 'flex', 1000);
    window.closePopup = () => { if (popup) popup.style.display = 'none'; };
  
    updateCartCount();
  
    const navMap = {
      kadinButton: 'kadin.html',
      erkekButton: 'erkek.html',
      cocukButton: 'cocuk.html'
    };
    Object.entries(navMap).forEach(([btnId, url]) => {
      const btn = document.getElementById(btnId);
      if (btn) btn.addEventListener('click', () => { window.location.href = url; });
    });
  });
  


