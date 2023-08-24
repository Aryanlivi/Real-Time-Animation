import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import sceneURl from "./public/assets/man.gltf"
import {man} from "./Human"
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xffffff)
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const canvas=document.createElement("canvas")
canvas.width=1400;
canvas.height=1200;
export const renderer=new THREE.WebGLRenderer({ canvas:canvas });
const gltfLoader=new GLTFLoader()
gltfLoader.load(sceneURl, (gltf) => {
    man.init(gltf,canvas)
    man.mapBone();
    scene.add(man.scene);
    // Initial call to set initial sizes
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
}, undefined, (error) => {
    console.error("Error:", error);
});

let light=new THREE.HemisphereLight(0xffffff,0x000000,20)
scene.add(light)
camera.position.set(0,5,10);

function onWindowResize() {
    const scaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
    man.scene.scale.set(scaleFactor*4, scaleFactor*4, scaleFactor*4);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}


function animate(){
    requestAnimationFrame(animate);
    man.update()
    renderer.render(scene,camera);
}
animate()