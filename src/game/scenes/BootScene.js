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
import lata from '@/game/assets/lata.png';
import corazon from '@/game/assets/heart.png';
import osito from '@/game/assets/osito.png';
import fondo_fabrica from '@/game/assets/fondo4.png';
import hielito from '@/game/assets/Hielo.png';
import botella from '@/game/assets/Botella.png';
import bolsa from '@/game/assets/Bolsa.png';
import lenyador from '@/game/assets/leñador.png';
import enemigo from '@/game/assets/enemigo.png';
import menu from '@/game/assets/menu.png';
import dolphin from '@/game/assets/dolphin.png';
import bear from '@/game/assets/bear.png';
import monkeys from '@/game/assets/monkeys.png';
import fabric from '@/game/assets/fabric.png';
import pop from '@/game/assets/pop.mp3';
import music from '@/game/assets/music.mp3';
import osoMusic from '@/game/assets/osoMusic.mp3';


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
        this.load.image('lata', lata);
        this.load.image('corazon', corazon);
        this.load.image('osito', osito);
        this.load.image('fondo_fabrica', fondo_fabrica);
        this.load.image('hielito', hielito);
        this.load.image('botella', botella);
        this.load.image('bolsa', bolsa);
        this.load.image('lenyador', lenyador);
        this.load.image('enemigo', enemigo);
        this.load.image('menu', menu);
        this.load.spritesheet('dolphin', dolphin, { frameWidth: 433, frameHeight: 86 } );
        this.load.spritesheet('fabric', fabric, { frameWidth: 433, frameHeight: 86 } );
        this.load.spritesheet('monkeys', monkeys, { frameWidth: 433, frameHeight: 86 } );
        this.load.spritesheet('bear', bear, { frameWidth: 433, frameHeight: 86 } );
        this.load.audio('pop', pop)
        this.load.audio('music', music);
        this.load.audio('osoMusic', osoMusic);
    }

    create() { 
        this.scene.start('Start');
    }
}
