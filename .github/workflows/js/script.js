// Dish & Drink Data
const dishes = [
  { name: "Egusi Soup", price: 300, img: "images/Egusi.jpg" },
  { name: "Jollof Rice", price: 250, img: "images/jollof.jpg" },
  { name: "Cassava and Beans", price: 275, img: "images/Gassava and BEANS.jpg" },
  { name: "Pizza", price: 500, img: "images/Pizza.jpg" },
  { name: "Domoda", price: 350, img: "images/domoda.jpg" },
  { name: "Benachin", price: 400, img: "images/benachin.jpg" },
  { name: "Grilled Tilapia", price: 600, img: "images/Grilled Talapia.jpg" },
  { name: "Chicken Yassa", price: 450, img: "images/Chicken Yassa.jpg" }
];

const drinks = [
  { name: "Wonjo", price: 100, img: "images/wonjo juice.jpg" },
  { name: "Boabab Drink", price: 150, img: "images/Boabab Juice.jpg" },
  { name: "Ginger", price: 75, img: "images/Ginger.jpg" },
];

// Render Menu
function renderMenu(items, containerId) {
  const menuContainer = document.getElementById(containerId);

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "bg-black rounded-xl shadow-lg hover:shadow-purple-700 transition p-4";
    div.innerHTML = `
      <img src="${item.img}" class="rounded-lg mb-3 w-full h-64 object-cover" alt="${item.name}">
      <h4 class="font-semibold text-lg text-purple-400">${item.name}</h4>
      <p class="font-bold mt-2 text-purple-500">GMD ${item.price}</p>
      <button class="mt-3 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
        onclick='addToCart(${JSON.stringify(item)})'>
        Add to Cart
      </button>
    `;
    menuContainer.appendChild(div);
  });
}

renderMenu(dishes, "dishMenu");
renderMenu(drinks, "drinkMenu");

// Cart Logic
let cart = [];

const cartSidebar = document.getElementById("cartSidebar");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

cartButton.addEventListener("click", () =>
  cartSidebar.classList.toggle("translate-x-full")
);

closeCart.addEventListener("click", () =>
  cartSidebar.classList.add("translate-x-full")
);

function addToCart(item) {
  const existing = cart.find((c) => c.name === item.name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(i) {
  if (cart[i].quantity > 1) cart[i].quantity--;
  else cart.splice(i, 1);

  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b border-gray-700 pb-2";

    div.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-gray-400">${item.quantity} x GMD ${item.price}</p>
      </div>

      <div class="flex items-center space-x-2">
        <button onclick="removeFromCart(${i})" class="text-red-400 hover:text-red-600 text-lg">−</button>
        <button onclick='addToCart(${JSON.stringify(item)})' class="text-green-400 hover:text-green-600 text-lg">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = total;
}
