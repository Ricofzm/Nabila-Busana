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

/* ITEM */

const item =
document.createElement("div");

item.className =
"cart-item";

/* DEFAULT QTY */

let qty = 1;

/* HTML */

item.innerHTML = `

<img src="${image}">

<div class="cart-info">

<h4>${name}</h4>

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

}

/* UPDATE TOTAL */

function updateTotal(){

document.getElementById(
"totalPrice"
).innerText =

`IDR ${total.toLocaleString()}`;

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

/* DELETE */

item.remove();

}

/* RESET OUTFIT */

function resetOutfit(){

/* DEFAULT ITEM */

document.getElementById(
"topLayer"
).src =

"assets/mennequin.PNG";

document.getElementById(
"pantsLayer"
).src =

"assets/mennequin.PNG";

document.getElementById(
"shoesLayer"
).src =

"assets/mennequin.PNG";

/* RESET VIEW */

scale = 1;
rotate = 0;

updateTransform();

}