import './style.css';

import * as THREE from 'three';

import { throttle } from 'throttle-debounce';

console.log("Initializing scene, camera and renderer");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Background
                                                                                                                          
const bgNormalTexture = new THREE.TextureLoader().load('assets/Texture.jpg');
const geo = new THREE.BoxGeometry(30, 30, 1);
const mat = new THREE.MeshStandardMaterial({
  metalness: .7,
  roughness: .2,
  color: 0x232323,
  normalMap: bgNormalTexture,
  bumpMap: bgNormalTexture,
});
const cube = new THREE.Mesh(geo, mat);

scene.add(cube);

// Lights

                                                                                                       
const pointLight = new THREE.PointLight(0xffffff, 3);
                                                                                                                                                                                                                                                                              
pointLight.position.set(-5, -20, -1);
                                                                                                                                                                                                                                                                                                                                    
const redLight = new THREE.PointLight(0xff0000, 7);
redLight.needsUpdate = true;
redLight.position.set(-20, -30, -5);   
                                                                                                 
const flashingLight = new THREE.PointLight(0xffffff, 100);
flashingLight.visible = false;
flashingLight.needsUpdate = true;
flashingLight.position.set(-10, -10, -10);

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(pointLight, ambientLight, flashingLight, redLight);

// Animation

function elapsedTime(ms) {
  let startTime = new Date();
  if(startTime + ms === new Date()) {
    return true;
  } else {
    elapsedTime(ms);
  }
}

const blinkingRedLight = throttle(1000, function() {
  if(redLight.visible) {
    redLight.visible = false;
  } else {
    redLight.visible = true;
  }
});
                                                                                                                                                                                                                                                                                                                                                 
const flashingLightAnimate = throttle(console.log(Math.floor(Math.random()*1001)), function() {
  if(flashingLight.visible) {
    flashingLight.visible = false;
    console.log("Flashing light off");
  } else {
    throttle(console.log(Math.floor(Math.random() * 1001)), function() {

        flashingLight.visible = true;
        console.log("Flashing light on");
   });
  }
});

function animate() {
  requestAnimationFrame(animate);

  blinkingRedLight();
  flashingLightAnimate();

  renderer.render(scene, camera);
}

if(elapsedTime(100)) {
  animate();
}
