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

/* CART */

let total = 0;

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

item.innerHTML = `

<img src="${image}">

<div>

<h4>${name}</h4>

<p>
IDR ${price.toLocaleString()}
</p>

</div>

`;

/* ADD */

cart.appendChild(item);

/* TOTAL */

total += price;

document.getElementById(
"totalPrice"
).innerText =

`IDR ${total.toLocaleString()}`;

}