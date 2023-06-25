// This is the modified code with shopping cart functionality

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart list

  // Get cart data from session storage or initialize an empty array
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Render each item in the cart
  cartData.forEach((cartItem) => {
    const { id, name, price, quantity } = cartItem;
    const li = document.createElement("li");
    li.innerHTML = `${name} - $${price} - Quantity: ${quantity} <button class="remove-from-cart-btn" data-id="${id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  // Get cart data from session storage or initialize an empty array
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingItem = cartData.find((item) => item.id === productId);

  if (existingItem) {
    // If the product is already in the cart, increase the quantity
    existingItem.quantity++;
  } else {
    // If the product is not in the cart, add it with quantity 1
    const product = products.find((product) => product.id === productId);

    if (product) {
      const { id, name, price } = product;
      cartData.push({ id, name, price, quantity: 1 });
    }
  }

  // Store the updated cart data in session storage
  sessionStorage.setItem("cart", JSON.stringify(cartData));

  // Render the updated cart
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  // Get cart data from session storage or initialize an empty array
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Find the index of the item in the cart
  const itemIndex = cartData.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    // If the item exists in the cart, remove it
    cartData.splice(itemIndex, 1);

    // Store the updated cart data in session storage
    sessionStorage.setItem("cart", JSON.stringify(cartData));

    // Render the updated cart
    renderCart();
  }
}

// Clear cart
function clearCart() {
  // Clear the cart data in session storage
  sessionStorage.removeItem("cart");

  // Render an empty cart
  renderCart();
}

// Event listeners

// Add event listener to the product list container
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Add event listener to the cart list container
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Add event listener to the clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
