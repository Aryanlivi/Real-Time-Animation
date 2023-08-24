import * as PIXI  from 'pixi.js';
import 'regenerator-runtime/runtime';
import{webcamVideo,camContainer} from './video'
import { pixiApp } from './2dview';

const stickmanContainer=new PIXI.Container()
stickmanContainer.position.set(0,0);
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
        //camContainer.addChild(this.obj);
        this.obj.position.set(0,0)
        //stickmanContainer.width=pixiApp.renderer.width*0.2;
       // stickmanContainer.height=pixiApp.renderer.height*0.2;
        //stickmanContainer.addChild(this.obj)
        camContainer.addChild(this.obj)
        pixiApp.stage.addChild(stickmanContainer)
    }
    handlePose(){  
        
        const poseNet = ml5.poseNet(webcamVideo, ()=>{  console.log('Model Loaded!!');});
        poseNet.on("pose",(poseData)=>{ 
            let pose;
            let maxScore = -Infinity; 
            let selectedPose = null;
            poseData.forEach(ele => {
                if (ele.pose.score > maxScore) {
                    maxScore = ele.pose.score;
                    selectedPose = ele.pose;
                }
            });

            if (selectedPose) {
                pose = selectedPose;
            }
            if(pose){
                this.mapChanges(pose.keypoints);
                this.createMan()
                
            }});
    }
}
export const stickman=new StickMan();
