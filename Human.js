import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import sceneURl from "./public/assets/man.gltf"
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xffffff)
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const canvas=document.createElement("canvas")
canvas.width=1400;
canvas.height=1200;
export const renderer=new THREE.WebGLRenderer({ canvas:canvas });
function findBoneByName(rootBone, boneName) {
    const stack = [rootBone];
    
    while (stack.length > 0) {
        const currentBone = stack.pop();
        if (currentBone.name === boneName) {
            return currentBone;
        }

        if (currentBone.children) {
            stack.push(...currentBone.children);
        }
    }

    return null;
}
const gltfLoader=new GLTFLoader()
class Man{
    model;
    scene;
    head;
    rotateHead(){
        this.head.rotation.set(this.head.rotation._x+1,
            this.head.rotation._y +1,
            this.head.rotation._z +1)        
        
    }
}
const man=new Man();
gltfLoader.load(sceneURl, (gltf) => {
    man.model=gltf;
    man.scene=gltf.scene;
    const initialScaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
    gltf.scene.scale.set(initialScaleFactor, initialScaleFactor, initialScaleFactor);
    const armature=gltf.scene.children.find(obj=>obj.name=="Armature");
    const bone=armature.children.find(obj=>obj.type=="Bone");
    man.head=findBoneByName(bone,"mixamorig1Head");
    //console.log(head.rotation._x)
    //const headY=head.rotation._y;
    //const headZ=head.rotation._z;
    scene.add(gltf.scene);
    function onWindowResize() {
        const scaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
        gltf.scene.scale.set(scaleFactor*4, scaleFactor*4, scaleFactor*4);
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.width, canvas.height);
    }
    
      // Initial call to set initial sizes
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
}, undefined, (error) => {
    console.error("Error:", error);
});

let light=new THREE.HemisphereLight(0xffffff,0x000000,20)
scene.add(light)
camera.position.set(0,5,10);


function animate(){
    requestAnimationFrame(animate);
    if(man.model){
        man.rotateHead();
    }
    renderer.render(scene,camera);
}
animate()