import { stickman } from "./stickman";
function findBoneByName(rootBone,boneName) {
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
class Man{
    model;
    scene;
    head;
    partData;

    init(gltf,canvas){
        this.model=gltf;
        this.scene=gltf.scene;
        const initialScaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
        this.scene.scale.set(initialScaleFactor, initialScaleFactor, initialScaleFactor);
        this.partData={};
    }
    mapBone(){
        const armature=this.scene.children.find(obj=>obj.name=="Armature");
        const bone=armature.children.find(obj=>obj.type=="Bone");
        this.head=findBoneByName(bone,"mixamorig1Head");
    }
    updatePartData(){
        this.partData=stickman.partData;
    }
    updateMan(){
        for (const part in this.partData) {
            const { x, y } = this.partData[part];
            if(part=="nose"){
                //this.head.rotation.set(this.head.rotation._x-x,this.head.rotation._y-y,this.head.rotation._y);
            }
        }
    }
    rotateHead(){
        this.head.rotation.set(this.head.rotation._x+1,
            this.head.rotation._y +1,
            this.head.rotation._z +1)    
        
    }
    update(){
        //check if man is created
        if(this.model){
            this.updatePartData();
            this.updateMan();
            //this.rotateHead();
        }
    }
}
export const man=new Man();
