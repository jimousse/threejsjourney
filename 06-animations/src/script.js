import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * animation tick with vanillat javascript
 * to have the same rotation speed regardless of
 * the computer framerate
 */
// // time
// let time = Date.now();
// const tick = () => {
//   // time
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;

//   // update object, so it has the same rotation speed for each computer
//   mesh.rotation.y += 0.001 * deltaTime;
//   mesh.rotation.x += 0.001 * deltaTime;

//   // render scene
//   renderer.render(scene, camera);

//   // call next tick
//   requestAnimationFrame(tick);
// };

// gsap.to(mesh.position, { x: 2, duration: 2, delay: 1 });

/**
 * same thing using Three.js clock
 */
// clock
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = (elapsedTime * Math.PI) / 2;
  mesh.rotation.x = (elapsedTime * Math.PI) / 2;
  mesh.position.x = Math.sin(elapsedTime);
  mesh.position.y = Math.cos(elapsedTime);

  // render scene
  renderer.render(scene, camera);

  // call next tick
  requestAnimationFrame(tick);
};

tick();
