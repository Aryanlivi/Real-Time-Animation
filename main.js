import {renderer} from './Human'
import { activateCam } from './video';
import * as PIXI  from 'pixi.js';
export const pixiApp=new PIXI.Application({
    width:window.innerWidth/2,
    height:window.innerHeight,
    backgroundColor:0xffffff})

//document.body.appendChild(pixiApp.view);
document.body.appendChild(renderer.domElement);
activateCam(pixiApp)
