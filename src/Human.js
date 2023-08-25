import { stickman } from "./stickman";

class Man{
    model;
    scene;
    BONE_STRUCTURE;
    armature;
    rootBone;
    head;
    rightArm;
    leftArm;
    partData;
    init(gltf,canvas){
        this.model=gltf;
        this.scene=gltf.scene;
        this.BONE_STRUCTURE="mixamorig1";
        this.armature=this.scene.children.find(obj=>obj.name=="Armature");
        this.rootBone=this.armature.children.find(obj=>obj.type=="Bone");
        const initialScaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
        this.scene.scale.set(initialScaleFactor, initialScaleFactor, initialScaleFactor);
        this.partData={};
    }
    listBonesByName(){
        const stack=[this.rootBone];
        while(stack.length>0){
            const currentBone=stack.pop();
            const name=currentBone.name;
            const nameWithoutPrefix = name.replace(this.BONE_STRUCTURE, "");
            console.log(nameWithoutPrefix)
            if(currentBone.children){
                stack.push(...currentBone.children)
            }
        }
    }
    findBoneByName(boneName) {
        boneName=this.BONE_STRUCTURE+boneName;
        const stack = [this.rootBone];
        while (stack.length > 0) {
            const currentBone = stack.pop();
            if (currentBone.name === boneName) {
                return currentBone;
            }
            if (currentBone.children) {
                stack.push(...currentBone.children);
            }
        }
        console.log("Bone Not Found!!!")
        return null;
    }
    mapBone(){
        this.head=this.findBoneByName("Head");
        this.rightArm=this.findBoneByName("RightArm");  
        this.leftArm=this.findBoneByName("LeftArm");  
        this.listBonesByName();
    }
    updatePartData(){
        this.partData=stickman.partData;
    }
    updateMan(){
        for (const part in this.partData) {
            const { x, y } = this.partData[part];
            if(part=="leftWrist"){
                //drawdot(this.rightArm.position.x,this.rightArm.position.y)
                this.leftArm.position.set(x/25,y/25,this.leftArm.position.z)
            }
            // if(part=="nose"){
            //     this.head.rotation.set(this.head.rotation._x-x,this.head.rotation._y-y,this.head.rotation._y);
            // }
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
