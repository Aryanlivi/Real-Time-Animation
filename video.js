import * as PIXI  from 'pixi.js';
import { stickman } from './stickman';
export const webcamVideo = document.createElement("video");
webcamVideo.width=640;
webcamVideo.height=480;
export const camApp=new PIXI.Application({width:webcamVideo.width,height:webcamVideo.height});


navigator.mediaDevices.getUserMedia({ video:{width:webcamVideo.width,height:webcamVideo.height}})
    .then((stream) => {
        webcamVideo.srcObject = stream;
        webcamVideo.onloadedmetadata = () => {
            webcamVideo.play()
            const texture = PIXI.Texture.from(webcamVideo);
            const sprite = new PIXI.Sprite(texture);
            stickman.handlePose()
            camApp.stage.addChild(sprite);
            // Update the texture with the video frame
            camApp.ticker.add(() => {
                texture.update();
            });
        };
        
    })
    .catch((error) => {
        console.error("Error accessing webcam:", error);
    });