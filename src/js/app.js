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
light.position.set(0, 0, -1);
scene.add(light);

//hold data about the shapes being added:
const shapes = [];

//add in an animation loop:
const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  //move the shapes towards the camera on each frame
  camera.position.setZ(camera.position.z + 1);

  //rotate the shapes each frame:
  shapes.forEach(shape => {
    shape.rotateX(0.01);
  });
};

animate();

//change color hue:
let hue = 0;

//create a function that makes a shape
const createShape = (x, y) => {
  //array of shapes:
  const geometries = [
    new THREE.ConeGeometry(10, 20, 30),
    new THREE.BoxGeometry(15, 15, 15),
    new THREE.TorusGeometry(5, 3, 16, 100),
    new THREE.SphereGeometry(10, 32, 32)
  ];

  //pick a shape randomly:
  const randomNumber = Math.floor(Math.random() * geometries.length);
  const geometry = geometries[randomNumber];

  //pick a color: (hue updates)
  const emissiveColor = new THREE.Color(`hsl(${hue}, 100%, 50%)`);

  //material that the shapes are 'filled' with:
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: emissiveColor
  });

  //shape position:
  const shape = new THREE.Mesh(geometry, material);

  //positions the shapes based on where the camera is:
  shape.position.set(
    window.innerHeight / 2 - x,
    window.innerWidth / 2 - y,
    camera.position.z + 500
  );
  shape.rotateX(0.5);
  shape.rotateZ(0.5);

  //add shape to the scene and to the list/array of shapes:
  shapes.push(shape);
  scene.add(shape);

  //update the hue:
  hue = hue + 1;
};

//EVENT LISTENERS:
let isMouseDown = false;

document.addEventListener('mousemove', event => {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY);
  }
});

document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('touchmove', event => {
  if (isMouseDown) {
    createShape(event.pageX, event.pageY);
  }
});

document.addEventListener('touchstart', () => {
  isMouseDown = true;
});

document.addEventListener('touchend', () => {
  isMouseDown = false;
});

//update camera on window resize:
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
