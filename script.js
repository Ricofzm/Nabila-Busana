loader.load(

'./models/body.glb',

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

  scene.add(model);

  console.log("MODEL MASUK");

},

undefined,

function(error){

  console.error(error);

}

);