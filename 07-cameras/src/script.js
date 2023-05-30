import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as dat from 'dat.gui';
import gsap from 'gsap';

/**
 * Debug
 */

const gui = new dat.GUI();
gui.hide();
const parameters = {
  color: 0xff0000,
  spin() {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + 10,
      duration: 1,
    });
  },
};

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;

window.addEventListener('resize', (event) => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  const aspectRatio = sizes.width / sizes.height;

  // update camera
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  // when switching window from one screen to another
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// window.addEventListener('dblclick', (event) => {
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitfullscreenElement;
//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestfullscreen) {
//       canvas.webkitRequestfullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitfullscreen) {
//       document.webkitExitfullscreen();
//     }
//   }
// });

// cursor
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
// });

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute('position', positionsAttribute);

// Object
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
});
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  // geometry,
  material
);
scene.add(mesh);

//debug
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01);
gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'z', -3, 3, 0.01);

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, 'spin');

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  // update camera
  // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3;
  // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
