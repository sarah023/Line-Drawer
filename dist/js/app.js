//set up renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x333333, 1);

//find the element to add the renderer to:
const section = document.querySelector('section');

section.appendChild(renderer.domElement);


//create a scene
const scene = new THREE.Scene();

//create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.z = -50;
camera.lookAt(scene.position);

//add lighting:
const light = new THREE.DirectionalLight(0xffffff, 1);
//change the position of the light source
light.position.set(0, 0, -1)
scene.add(light);

//hold data about the shapes being added:
const shapes = []


//add in an animation loop:
const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)

  //rotate the shapes each frame:
  shapes.forEach(shape => {
    shape.rotateX(0.01)
    // shape.rotateZ(0.01)
  })
}

animate()


//create a function that makes a shape
const createShape = () => {
  const geometry = new THREE.ConeGeometry(10, 20, 32);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000
  });

  const shape = new THREE.Mesh(geometry, material);

  shape.position.set((window.innerHeight / 2) - x, (window.innerWidth / 2) - y, 400)
  shape.rotateX(0.5)
  shape.rotateZ(0.5)

  //add shape to the scene and to the list/array of shapes:
  shapes.push(shape)
  scene.add(shape)
}

document.addEventListener('click', (event) => {
  createShape(event.pageX, event.pageY)
})



