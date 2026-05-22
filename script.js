/* SCENE */
const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x111111);

/* CAMERA */
const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 1, 3);

/* RENDERER */
const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("viewer")
.appendChild(renderer.domElement);

/* LIGHT */
const light =
new THREE.HemisphereLight(
0xffffff,
0x444444,
5
);

scene.add(light);

/* TEST OBJECT */
const geometry =
new THREE.BoxGeometry();

const material =
new THREE.MeshStandardMaterial({
color:"white"
});

const cube =
new THREE.Mesh(
geometry,
material
);

scene.add(cube);

/* CONTROLS */
const controls =
new THREE.OrbitControls(
camera,
renderer.domElement
);

/* MODEL */
const loader =
new THREE.GLTFLoader();

loader.load(

'./models/body.glb',

function(gltf){

  console.log("MODEL LOADED");

  scene.remove(cube);

  const model =
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

  scene.add(model);

},

undefined,

function(error){

  console.error(
    "MODEL ERROR:",
    error
  );

}

);

/* ANIMATE */
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