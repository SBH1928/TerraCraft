document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
      {
        id: 1,
        name: "Organic Tomatoes",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMHRvbWF0b2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Farm-fresh organic tomatoes",
        category: "Vegetables",
      },
      {
        id: 2,
        name: "Organic Apples",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Sweet and crispy organic apples",
        category: "Fruits",
      },
      {
        id: 3,
        name: "Organic Quinoa",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Premium organic quinoa",
        category: "Grains",
      },
      {
        id: 4,
        name: "Organic Honey",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "Raw unfiltered organic honey",
        category: "Other",
      },
      {
        id: 5,
        name: "Organic Spinach",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        description: "Fresh organic spinach",
        category: "Vegetables",
      },
      {
        id: 6,
        name: "Organic Blueberries",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "Sweet organic blueberries",
        category: "Fruits",
      },
      {
        id: 7,
        name: "Organic Seeds Pack",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1618812191096-c6e83aee5c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VlZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        description: "Non-GMO certified seeds",
        category: "Gardening",
      },
      {
        id: 8,
        name: "Natural Pesticide",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1628944682084-831f35256aea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVzdGljaWRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        description: "Chemical-free pest control",
        category: "Gardening",
      },
      {
        id: 9,
        name: "Composting Kit",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1581911823256-694b27332788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        description: "Start composting at home",
        category: "Gardening",
      },
    ];
  
    // Cart state
    let cart = [];
  
    // DOM elements
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItemsCount = document.getElementById('cart-items-count');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
  
    // Initialize the store
    function initStore() {
      loadCart();
      renderProducts();
      renderCart();
      updateCartUI();
    }
  
    // Load cart from localStorage
    function loadCart() {
      const savedCart = localStorage.getItem('organicCart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    }
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('organicCart', JSON.stringify(cart));
    }
  
    // Render all products
    function renderProducts() {
      productsContainer.innerHTML = '';
  
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
  
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
  
        productsContainer.appendChild(productCard);
      });
  
      // Add event listeners to "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCartHandler);
      });
    }
  
    // Add to cart event handler
    function addToCartHandler(event) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
  
      if (product) {
        addToCart(product);
        renderCart();
        updateCartUI();
      }
    }
  
    // Add product to cart
    function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
  
      saveCart();
    }
  
    // Remove item from cart
    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      saveCart();
      renderCart();
      updateCartUI();
    }
  
    // Render cart items
    function renderCart() {
      cartItemsContainer.innerHTML = '';
  
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
  
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
  
        cartItemsContainer.appendChild(cartItem);
      });
  
      // Add event listeners to "Remove" buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
          const productId = parseInt(event.target.getAttribute('data-id'));
          removeFromCart(productId);
        });
      });
    }
  
    // Update cart UI (count, total, visibility)
    function updateCartUI() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartItemsCount.textContent = totalItems;
  
      const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartTotal.textContent = totalPrice.toFixed(2);
  
      // Show/hide empty cart message and cart summary
      if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
      } else {
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        cartSummary.style.display = 'block';
      }
    }
  
    // Initialize the store
    initStore();
  });
  