/* ===================== */
/* WISHLIST SYSTEM */
/* ===================== */

let wishlist = [];

/* TOGGLE */

document
.querySelectorAll(".wishlist-btn")
.forEach(btn=>{

btn.addEventListener(
"click",
function(e){

e.stopPropagation();

const card =
this.closest(".product-card");

const image =
card.querySelector("img").src;

const name =
card.dataset.name;

/* ACTIVE */

this.classList.toggle(
"active"
);

/* ADD */

if(
this.classList.contains(
"active"
)
){

this.innerText = "♥";

/* SAVE */

wishlist.push({
name,
image
});

}

/* REMOVE */

else{

this.innerText = "♡";

wishlist =
wishlist.filter(item=>
item.name !== name
);

}

/* UPDATE */

renderWishlist();

}
);

});

/* RENDER */

function renderWishlist(){

const container =
document.getElementById(
"wishlistItems"
);

container.innerHTML = "";

/* COUNT */

document.getElementById(
"wishlistCount"
).innerText =
wishlist.length;

/* LOOP */

wishlist.forEach(item=>{

container.innerHTML += `

<div class="wishlist-item">
<div class="wishlist-heart">
♥
</div>

<img src="${item.image}">

<h4>
${item.name}
</h4>

</div>

`;

});

}

/* OPEN */

function openWishlist(){

document
.getElementById(
"wishlistModal"
)
.classList
.add("active");

}

/* CLOSE */

function closeWishlist(){

document
.getElementById(
"wishlistModal"
)
.classList
.remove("active");

}

/* ===================== */
/* SEARCH PRODUCT */
/* ===================== */

function searchProduct(value){

const search =
value.toLowerCase();

document
.querySelectorAll(".product-card")
.forEach(card=>{

const name =
card.dataset.name
.toLowerCase();

/* SHOW / HIDE */

if(name.includes(search)){

card.style.display =
"block";

}

else{

card.style.display =
"none";

}

});

}

/* ===================== */
/* WISHLIST */
/* ===================== */

document
.querySelectorAll(".wishlist-btn")
.forEach(btn=>{

btn.addEventListener(
"click",
function(e){

e.stopPropagation();

this.classList.toggle(
"active"
);

/* ICON */

if(
this.classList.contains(
"active"
)
){

this.innerText = "♥";

}

else{

this.innerText = "♡";

}

}
);

});

/* ===================== */
/* STOCK SYSTEM */
/* ===================== */

let stocks = {

"Black Hoodie": 10,
"Cargo Pants": 7,
"Sneakers White": 5

};

function changeTop(img){

document.getElementById("topLayer").src = img;

}

function changePants(img){

document.getElementById("pantsLayer").src = img;

}

function changeShoes(img){

document.getElementById("shoesLayer").src = img;

}

/* CATEGORY */

function showCategory(category,element){

// hide all

document
.querySelectorAll(".category")
.forEach(el=>{

el.style.display="none";

});

// show selected

document
.getElementById(category)
.style.display="grid";

// remove active tab

document
.querySelectorAll(".tab")
.forEach(tab=>{

tab.classList.remove("active");

});

// add active tab

element.classList.add("active");

}

/* ZOOM ROTATE */

let scale = 1;
let rotate = 0;

function updateTransform(){

document
.getElementById("viewerModel")
.style.transform =

`scale(${scale}) rotate(${rotate}deg)`;

}

/* ZOOM IN */

function zoomIn(){

scale += 0.1;

updateTransform();

}

/* ZOOM OUT */

function zoomOut(){

scale -= 0.1;

updateTransform();

}

/* ROTATE LEFT */

function rotateLeft(){

rotate -= 10;

updateTransform();

}

/* ROTATE RIGHT */

function rotateRight(){

rotate += 10;

updateTransform();

}

/* RESET */

function resetView(){

scale = 1;
rotate = 0;

updateTransform();

}

/* SAVE OUTFIT */

function saveOutfit(){

const model = document
.querySelector(".viewer");

html2canvas(model,{
backgroundColor:null
}).then(canvas=>{

const link =
document.createElement("a");

link.download =
"voguefit-outfit.png";

link.href =
canvas.toDataURL();

link.click();

});

}

/* ===================== */
/* CART SYSTEM */
/* ===================== */

let total = 0;

/* ADD TO CART */

function addToCart(
name,
price,
image
){

const cart =
document.getElementById(
"cartItems"
);

/* CHECK EXISTING */

const existingItem =
Array.from(
document.querySelectorAll(".cart-item")
).find(item =>

item.dataset.name ===
name + "-" + selectedSize + "-" + selectedColor

);

/* IF EXIST */

if(existingItem){

const qtyText =
existingItem.querySelector(".qty");

let qty =
parseInt(qtyText.innerText);

qty++;

qtyText.innerText = qty;

/* TOTAL */

total += price;

updateTotal();
saveCart();

return;

}

/* CREATE ITEM */

const item =
document.createElement("div");

item.className =
"cart-item";

/* DATA */

item.dataset.name =
name + "-" +
selectedSize + "-" +
selectedColor;

item.innerHTML = `

<img src="${image}">

<div class="cart-info">

<h4>
${name}
</h4>

<p>
Size: ${selectedSize}
</p>
<p>
Color: ${selectedColor}
</p>

<p>
IDR ${price.toLocaleString()}
</p>

<div class="qty-controls">

<button onclick="
changeQty(
this,
-${price}
)">
−
</button>

<span class="qty">
1
</span>

<button onclick="
changeQty(
this,
${price}
)">
+
</button>

</div>

<button
class="remove-btn"
onclick="
removeItem(
this,
${price}
)">
Remove
</button>

</div>

`;

/* APPEND */

cart.appendChild(item);

/* TOTAL */

total += price;

updateTotal();
saveCart();

}

/* UPDATE TOTAL */

function updateTotal(){

/* SHIPPING */

const shipping = 20000;

/* SUBTOTAL */

document.getElementById(
"subtotalPrice"
).innerText =

`IDR ${total.toLocaleString()}`;

/* TOTAL */

const finalTotal =
total + shipping;

document.getElementById(
"totalPrice"
).innerText =

`IDR ${finalTotal.toLocaleString()}`;

}

/* CHANGE QTY */

function changeQty(
button,
priceChange
){

const controls =
button.parentElement;

const qtyText =
controls.querySelector(".qty");

let qty =
parseInt(qtyText.innerText);

/* MINUS */

if(priceChange < 0){

if(qty > 1){

qty--;

total += priceChange;

}

}

/* PLUS */

else{

qty++;

total += priceChange;

}

/* UPDATE */

qtyText.innerText = qty;

updateTotal();
saveCart();

}

/* REMOVE */

function removeItem(
button,
price
){

const item =
button.closest(".cart-item");

/* GET QTY */

const qty =
parseInt(

item.querySelector(".qty")
.innerText

);

/* REMOVE TOTAL */

total -= price * qty;

updateTotal();
saveCart();

/* DELETE */

item.remove();

}

/* RESET OUTFIT */

function resetOutfit(){

document.getElementById(
"topLayer"
).src = "";

document.getElementById(
"pantsLayer"
).src = "";

document.getElementById(
"shoesLayer"
).src = "";

resetView();

}

/* ===================== */
/* PINCH ZOOM MOBILE */
/* ===================== */

const viewer =
document.getElementById(
"viewerModel"
);

let startDistance = 0;

/* DISTANCE */

function getDistance(
touches
){

const dx =
touches[0].clientX -
touches[1].clientX;

const dy =
touches[0].clientY -
touches[1].clientY;

return Math.sqrt(
dx * dx + dy * dy
);

}

/* TOUCH START */

viewer.addEventListener(
"touchstart",
e=>{

if(e.touches.length === 2){

startDistance =
getDistance(
e.touches
);

}

});

/* TOUCH MOVE */

viewer.addEventListener(
"touchmove",
e=>{

if(e.touches.length === 2){

e.preventDefault();

const newDistance =
getDistance(
e.touches
);

/* ZOOM */

if(newDistance > startDistance){

scale += 0.02;

}

else{

scale -= 0.02;

}

/* LIMIT */

if(scale < 0.5){

scale = 0.5;

}

if(scale > 2.5){

scale = 2.5;

}

updateTransform();

startDistance =
newDistance;

}

},{ passive:false });

/* ===================== */
/* FLOATING MENU */
/* ===================== */

function toggleMenu(){

document
.getElementById(
"fabMenu"
)
.classList
.toggle("active");

}

/* ===================== */
/* PRODUCT MODAL */
/* ===================== */

let selectedProduct = null;
let selectedSize = "S";
let selectedColor = "Black";
let selectedFitImage = "";

/* OPEN MODAL */

function openModal(
name,
price,
thumbnail,
fitImage,
type
){

selectedFitImage = fitImage;

selectedProduct = {
name,
price,
thumbnail,
fitImage,
type
};

/* SHOW */

document
.getElementById(
"productModal"
)
.classList
.add("active");

/* DATA */

document
.getElementById(
"modalTitle"
).innerText = name;

document
.getElementById(
"modalPrice"
).innerText =

`IDR ${price.toLocaleString()}`;

document
.getElementById(
"modalImage"
).src = thumbnail;

const wishBtn =
document.querySelector(
".wishlist-modal-btn"
);

const exists =
wishlist.find(item=>
item.name === name
);

if(exists){

wishBtn.classList.add(
"active"
);

wishBtn.innerText =
"♥ WISHLISTED";

}

else{

wishBtn.classList.remove(
"active"
);

wishBtn.innerText =
"♡ ADD TO WISHLIST";

}

document.getElementById(
"modalStock"
).innerText =

`Stock: ${stocks[name]}`;

}

/* CLOSE */

function closeModal(){

document
.getElementById(
"productModal"
)
.classList
.remove("active");

}

/* ADD FROM MODAL */

function addModalToCart(){

if(!selectedProduct) return;

/* STOCK CHECK */

if(
stocks[selectedProduct.name] <= 0
){

alert("Stock habis");

return;

}

/* REDUCE STOCK */

stocks[selectedProduct.name]--;

/* UPDATE STOCK UI */

document.getElementById(
"modalStock"
).innerText =

`Stock: ${stocks[selectedProduct.name]}`;

/* CART */

addToCart(
selectedProduct.name,
selectedProduct.price,
selectedProduct.thumbnail
);

/* FITTING */

if(selectedProduct.type === "top"){

changeTop(selectedFitImage);

}

if(selectedProduct.type === "pants"){

changePants(selectedFitImage);

}

if(selectedProduct.type === "shoes"){

changeShoes(selectedFitImage);

}

/* CLOSE */

closeModal();

}

/* SELECT SIZE */

function selectSize(
element,
size
){

selectedSize = size;

/* REMOVE ACTIVE */

document
.querySelectorAll(".size-btn")
.forEach(btn=>{

btn.classList.remove("active");

});

/* ACTIVE */

element.classList.add("active");

}

/* SELECT COLOR */

function selectColor(
element,
color,
fitImage
){

selectedColor = color;

selectedFitImage = fitImage;

/* ACTIVE */

document
.querySelectorAll(".color-btn")
.forEach(btn=>{

btn.classList.remove("active");

});

element.classList.add("active");

/* LIVE FITTING */

if(selectedProduct.type === "top"){

changeTop(fitImage);

}

if(selectedProduct.type === "pants"){

changePants(fitImage);

}

if(selectedProduct.type === "shoes"){

changeShoes(fitImage);

}

}

/* ===================== */
/* SAVE CART */
/* ===================== */

function saveCart(){

localStorage.setItem(
"voguefit-cart",

document.getElementById(
"cartItems"
).innerHTML

);

/* SAVE TOTAL */

localStorage.setItem(
"voguefit-total",
total
);

}

/* ===================== */
/* LOAD CART */
/* ===================== */

function loadCart(){

const savedCart =
localStorage.getItem(
"voguefit-cart"
);

const savedTotal =
localStorage.getItem(
"voguefit-total"
);

/* LOAD HTML */

if(savedCart){

document.getElementById(
"cartItems"
).innerHTML = savedCart;

}

/* LOAD TOTAL */

if(savedTotal){

total =
parseInt(savedTotal);

updateTotal();
saveCart();

}

}

/* AUTO LOAD */

loadCart();

/* ===================== */
/* CHECKOUT */
/* ===================== */

function openCheckout(){

/* EMPTY CART */

if(total <= 0){

alert(
"Cart is empty!"
);

return;

}

/* OPEN MODAL */

document
.getElementById(
"checkoutModal"
)
.classList
.add("active");

/* COPY TOTAL */

document.getElementById(
"checkoutSubtotal"
).innerText =

document.getElementById(
"subtotalPrice"
).innerText;

document.getElementById(
"checkoutTotal"
).innerText =

document.getElementById(
"totalPrice"
).innerText;

}

/* CLOSE */

function closeCheckout(){

document
.getElementById(
"checkoutModal"
)
.classList
.remove("active");

}

/* PLACE ORDER */

function placeOrder(){

alert(
"Order placed successfully!"
);

/* RESET CART */

document.getElementById(
"cartItems"
).innerHTML = "";

total = 0;

updateTotal();

saveCart();

/* CLOSE */

closeCheckout();

}

function toggleWishlist(){

const btn =
document.querySelector(
".wishlist-modal-btn"
);

const exists =
wishlist.find(item=>
item.name === selectedProduct.name
);

/* REMOVE */

if(exists){

wishlist =
wishlist.filter(item=>
item.name !== selectedProduct.name
);

btn.classList.remove(
"active"
);

btn.innerText =
"♡ ADD TO WISHLIST";

}

/* ADD */

else{

wishlist.push({

name:
selectedProduct.name,

image:
selectedProduct.thumbnail

});

btn.classList.add(
"active"
);

btn.innerText =
"♥ WISHLISTED";

}

/* UPDATE */

renderWishlist();

}
