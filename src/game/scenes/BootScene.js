import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import oso from '@/game/assets/oso.png';
import platform from '@/game/assets/platform.jpg';
import delfin from '@/game/assets/delfin.png';
import projectiles from '@/game/assets/projectiles.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('oso', oso)
        this.load.image('platform', platform)
        this.load.image('delfin', delfin)
        this.load.spritesheet('dude', projectiles, { frameWidth: 16, frameHeight: 16 });
        //this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() { 
        this.scene.start('Menu')
    }
}
