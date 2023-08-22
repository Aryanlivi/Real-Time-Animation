import * as PIXI  from 'pixi.js';
import 'regenerator-runtime/runtime';
import{webcamVideo,camApp} from './video'
export const stickmanApp=new PIXI.Application({backgroundColor:0xffffff})
class StickMan{
    app;
    obj=new PIXI.Graphics();
    container;
    head;
    body;
    rightArm;
    legs;
    partData={};
    mapChanges(data){
        for (const entry of data) {
        const { part, position } = entry;
        this.partData[part] = {
            x: position.x,
            y: position.y
        };
        }
    }
    connectBodyParts(part1,part2){
        const { x: x1, y: y1 } = this.partData[part1];
        const { x: x2, y: y2 } = this.partData[part2];
        this.obj.lineStyle(4, 0xFF0000);
        this.obj.moveTo(x1, y1);
        this.obj.lineTo(x2, y2);
    }

    createMan(){
        this.obj.clear();
        for (const part in this.partData) {
            const { x, y } = this.partData[part];
            this.obj.beginFill(0x00FF00)
            this.obj.drawCircle(x, y, 5);
        }
        this.connectBodyParts('leftShoulder', 'rightShoulder');
        this.connectBodyParts('leftShoulder', 'leftElbow');
        this.connectBodyParts('rightShoulder', 'rightElbow');
        this.connectBodyParts('leftElbow', 'leftWrist');
        this.connectBodyParts('rightElbow', 'rightWrist');
        this.connectBodyParts('leftShoulder', 'leftHip');
        this.connectBodyParts('rightShoulder', 'rightHip');
        this.connectBodyParts('leftHip', 'rightHip');
        this.connectBodyParts('leftHip', 'leftKnee');
        this.connectBodyParts('rightHip', 'rightKnee');
        this.connectBodyParts('leftKnee', 'leftAnkle');
        this.connectBodyParts('rightKnee', 'rightAnkle');
        //camApp.stage.addChild(this.obj);
        stickmanApp.stage.addChild(this.obj)
    }
    handlePose(){    
        const poseNet = ml5.poseNet(webcamVideo, ()=>{  console.log('Model Loaded!!');});
        poseNet.on("pose",(poseData)=>{ 
            let pose;
            if(poseData.length>0){
                pose=poseData[0].pose;
            }
            if(pose){
                this.mapChanges(pose.keypoints);
                this.createMan()
            }});
    }
}
export const stickman=new StickMan();
