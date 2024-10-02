function changeImage(thumbnail) {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = thumbnail.src;
  document.querySelectorAll('.thumbnail-img').forEach(img => {
      img.classList.remove('active');
  });
  thumbnail.classList.add('active');
}
let cart = [];
function addToCart() {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  const name="Fall limited Edition Sneakers"
  const price = 125.00;  
  const imgSrc = document.getElementById('mainImage').src;
  const price1=125.00;
  if (quantity > 0) {
    const item = {
      image: imgSrc,
      name:name,
      quantity: quantity,
      price: price * quantity,
      price1:price1
    };
    const existingItemIndex = cart.findIndex(cartItem => cartItem.image === imgSrc);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].price += price * quantity;
    } else {
      cart.push(item);
      alert("item added sucessfully")
    }

    renderCart();
  } else {
    alert('Please select a quantity greater than 0.');
  }
}

// Function to render cart items
function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  let totalQuantity = 0;
  cart.forEach((item, index) => {
    totalQuantity += item.quantity;
    const cartItemHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <img src="${item.image}" style="width: 50px; height: 50px;">
        <div>
          <p>${item.name}</p>
          <p>${item.price1} x ${item.quantity}<b>
           $${item.price.toFixed(2)} </b></p>
        </div>
        <button class="btn btn-sm" onclick="removeFromCart(${index})"><img src='images/icon-delete.svg'></button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
  });
  const cartIcon = document.getElementById('cartIcon');
  let cartIconHTML = `
    <img src="images/icon-cart.svg" alt="cart-icon" style="width: 30px; height: 30px; cursor: pointer;">
  `;
  
  if (totalQuantity > 0) {
    cartIconHTML += `
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        ${totalQuantity}
        <span class="visually-hidden">items in cart</span>
      </span>
    `;
  }

  cartIcon.innerHTML = cartIconHTML;
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}
document.getElementById('clearCart').addEventListener('click', () => {
  cart = [];
  renderCart();
  document.getElementById('cartDropdown').style.display = 'none';
});

document.getElementById('cartIcon').addEventListener('click', () => {
  const cartDropdown = document.getElementById('cartDropdown');
  cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('addToCartBtn').addEventListener('click', addToCart);
document.getElementById('increaseQty').addEventListener('click', () => {
  const quantityInput = document.getElementById('quantityInput');
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

document.getElementById('decreaseQty').addEventListener('click', () => {
  const quantityInput = document.getElementById('quantityInput');
  if (quantityInput.value > 0) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});
let currentImageIndex = 0; 
const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

// Function to change the zoomed image from the thumbnail
function changeZoomImage(imgElement) {
  const zoomedImg = document.getElementById("zoomedImg");
  currentImageIndex = Array.from(document.querySelectorAll('.thumbnail-img')).indexOf(imgElement);
  zoomedImg.src = imgElement.src;
}

// Function to change image index
function changeImageIndex(direction) {
  currentImageIndex += direction;

  // Wrap around the image index
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1; // Go to last image
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0; // Go to first image
  }

  document.getElementById("zoomedImg").src = images[currentImageIndex];
}

function openZoomModal() {
  const modal = document.getElementById("zoomModal");
  const mainImage = document.getElementById("mainImage");
  const zoomedImg = document.getElementById("zoomedImg");

  zoomedImg.src = mainImage.src;
  modal.style.display = "flex";

  document.body.classList.add('blur-background');
}
function closeZoomModal() {
  const modal = document.getElementById("zoomModal");
  modal.style.display = "none";
  document.body.classList.remove('blur-background');
}

function profile() {
  return `
  <div  style="width: 40px; height: 40px; cursor: pointer; padding-top:60px; margin-right:50px; padding-left:0px">
      <h1>Avatar</h1>
      <p>avatar@gmail.com</p>
      <button class="btn btn-danger">Logout</button>
  </div>
  `;
}

function showProfile() {
  // Get the container where you want to insert the profile
  const container = document.getElementById('profile-container');
  
  // Set the innerHTML of the container to the profile function's return value
  container.innerHTML = profile();
}

