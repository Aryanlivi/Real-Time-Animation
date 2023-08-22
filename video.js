import * as PIXI  from 'pixi.js';
import { pixiApp } from './main';
import { stickman } from './stickman';
export const webcamVideo = document.createElement("video");
webcamVideo.width=800;
webcamVideo.height=600;
//export const camApp=new PIXI.Application({width:webcamVideo.width,height:webcamVideo.height});

export const camContainer=new PIXI.Container()



export function activateCam(){
    
    //camContainer.position.set(0,pixiApp.renderer.height/2)
    navigator.mediaDevices.getUserMedia({ video:true})
    .then((stream) => {
        webcamVideo.srcObject = stream;
        webcamVideo.onloadedmetadata = () => {
            webcamVideo.play()
            const texture = PIXI.Texture.from(webcamVideo);
            const sprite = new PIXI.Sprite(texture);
            sprite.position.set(0,0)
            stickman.handlePose()
            camContainer.addChild(sprite);
            camContainer.width=600;
            camContainer.height=480;
            camContainer.position.set(0, pixiApp.renderer.height - camContainer.height);
            pixiApp.stage.addChild(camContainer)
            // Update the texture with the video frame
            pixiApp.ticker.add(() => {
                texture.update();
            });
        };
        
    })
    .catch((error) => {
        console.error("Error accessing webcam:", error);
    });
}