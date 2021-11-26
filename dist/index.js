import * as THREE from './js/build/three.module.js';
import {GLTFLoader} from './js/examples/jsm/loaders/GLTFLoader.js'
import { VRButton } from './js/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.xr.enabled = true;
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', onWindowResize);

document.body.appendChild(VRButton.createButton(renderer));

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const loader = new GLTFLoader();

loader.load( './models/scene.gltf', 
 ( gltf ) => {

  scene.add( gltf.scene );
},
// called while loading is progressing
( xhr ) => {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
( error ) => {

  console.log( 'An error happened' );

});

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  renderer.setAnimationLoop( render );
}

function render() {
  renderer.render(scene, camera);
}
animate();