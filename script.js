/* SCENE */
let scene =
new THREE.Scene();

scene.background =
new THREE.Color(0x111111);

/* CAMERA */
let camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,1.5,3);

/* RENDERER */
let renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio * 0.7
);

document
.getElementById("viewer")
.appendChild(renderer.domElement);

/* CONTROLS */
let controls =
new THREE.OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping = true;

/* LIGHT */
let hemiLight =
new THREE.HemisphereLight(
0xffffff,
0x444444,
3
);

scene.add(hemiLight);

let dirLight =
new THREE.DirectionalLight(
0xffffff,
2
);

dirLight.position.set(5,10,5);

scene.add(dirLight);

/* FLOOR */
let floorGeometry =
new THREE.CircleGeometry(5,64);

let floorMaterial =
new THREE.MeshStandardMaterial({
color:"#222"
});

let floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI/2;

floor.position.y =
-1;

scene.add(floor);

/* LOADER */
let loader =
new THREE.GLTFLoader();

/* LOAD MODEL */
loader.load(

'models/body.glb',

function(gltf){

  let model =
  gltf.scene;

  model.scale.set(
    0.01,
    0.01,
    0.01
  );

  model.position.set(
    0,
    -1,
    0
  );

  model.rotation.y =
  Math.PI;

  scene.add(model);

  console.log(
    "MODEL BERHASIL"
  );

},

undefined,

function(error){

  console.error(error);

}

);

/* ANIMATION */
function animate(){

  requestAnimationFrame(
    animate
  );

  controls.update();

  renderer.render(
    scene,
    camera
  );

}

animate();

/* RESPONSIVE */
window.addEventListener(
'resize',

function(){

  camera.aspect =
  window.innerWidth /
  window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});