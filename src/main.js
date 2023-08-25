import { pixiApp } from './2dview';
import { activateCam } from './video';
import {renderer} from './3dview'
document.body.appendChild(pixiApp.view);
document.body.appendChild(renderer.domElement);
activateCam(pixiApp)
