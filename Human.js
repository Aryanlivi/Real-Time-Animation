import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import sceneURl from "./public/assets/man.gltf"
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xffffff)
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const canvas=document.createElement("canvas")
canvas.width=1200;
canvas.height=1200;
export const renderer=new THREE.WebGLRenderer({canvas:canvas});

const gltfLoader=new GLTFLoader()

gltfLoader.load(sceneURl, (gltf) => {
    gltf.scene.scale.set(10,4,1)
    scene.add(gltf.scene);
    const armature=gltf.scene.children.find(obj=>obj.name=="Armature");
    const bone=armature.children.find(obj=>obj.type=="Bone");
    console.log(armature)
    
}, undefined, (error) => {
    console.error("Error:", error);
});

let light=new THREE.HemisphereLight(0xffffff,0x000000,20)
scene.add(light)
camera.position.set(0,0,10);
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

animate()