let scene =
new THREE.Scene();

scene.background =
new THREE.Color(0x111111);

let camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer =
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

camera.position.z = 3;

/* LIGHT */
let light =
new THREE.HemisphereLight(
0xffffff,
0x444444,
5
);

scene.add(light);

/* TEST CUBE */
let geometry =
new THREE.BoxGeometry();

let material =
new THREE.MeshStandardMaterial({
color:"white"
});

let cube =
new THREE.Mesh(
geometry,
material
);

scene.add(cube);

function animate(){

  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene,camera);

}

animate();