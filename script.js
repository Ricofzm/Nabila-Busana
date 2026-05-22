let scene =
new THREE.Scene();

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

let controls =
new THREE.OrbitControls(
camera,
renderer.domElement
);

let light =
new THREE.HemisphereLight(
0xffffff,
0x444444,
2
);

scene.add(light);

let bodyMesh;

let loader =
new THREE.GLTFLoader();

loader.load(
'models/body.glb',

function(gltf){

  bodyMesh =
  gltf.scene;

  scene.add(bodyMesh);

}

);

function changeShirt(color){

  if(!bodyMesh) return;

  bodyMesh.traverse((child)=>{

    if(child.isMesh){

      if(color == "black"){

        child.material.color.set("#000000");

      }

      if(color == "white"){

        child.material.color.set("#ffffff");

      }

    }

  });

}

function animate(){

  requestAnimationFrame(animate);

  renderer.render(scene,camera);

}

animate();