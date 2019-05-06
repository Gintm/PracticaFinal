import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import oso from '@/game/assets/oso.png';
import platform from '@/game/assets/platform.jpg';
import delfin from '@/game/assets/delfin.png';
import projectile from '@/game/assets/disparo.png';
import turtle from '@/game/assets/tortuga.png';
import fondo_oso from '@/game/assets/fondo_oso.png';
import mono2 from '@/game/assets/2.png';
import coco from '@/game/assets/coco.png';
import fondo_delfin from '@/game/assets/fondo_delfin.png';
import fondo_monos from '@/game/assets/fondo_monos.png';
import mono1 from '@/game/assets/mono.png';
import platanos from '@/game/assets/platanos7.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('bomb', bomb);
        this.load.image('oso', oso);
        this.load.image('platform', platform);
        this.load.image('delfin', delfin);
        this.load.image('projectile', projectile);
        this.load.image('turtle', turtle);
        this.load.image('fondo_oso', fondo_oso)
        this.load.image('mono2', mono2);
        this.load.image('coco', coco);
        this.load.image('fondo_delfin', fondo_delfin);
        this.load.image('fondo_monos', fondo_monos);
        this.load.image('mono1', mono1);
        this.load.image('platanos', platanos);
        //this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() { 
        this.scene.start('Menu')
    }
}
