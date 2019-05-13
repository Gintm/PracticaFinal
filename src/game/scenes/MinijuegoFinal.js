import { Scene } from 'phaser';
import { Bullet } from '@/game/scenes/BalaDelfin.js';
import { Hielo } from '@/game/scenes/BalaOso.js';
import { Coco } from '@/game/scenes/BalaMono.js';
var oso;
var delfin;
var mono;
var cursors;
var bullets_delfin;
var bullets_oso;
var bullets_mono;
var estat;
var cd;
var enemigo;
var clickedEnemy = false;
var speed;



export default class MinijuegoFinal extends Scene {
  constructor () {
    super({ key: 'MinijuegoFinal' });
  }

  create () {
    console.log("Starting MinijuegoFinal ...");
    let i = this.add.image(400, 300, 'fondo_fabrica').setScale(0.4); //fondo
    console.log(i);

    estat = "oso";
    cd = 0;
    speed = Phaser.Math.RND.between(50, 250)

    cursors = this.input.keyboard.createCursorKeys();

    oso = this.physics.add.image(80, 600, 'oso');
    oso.setScale(0.065);
    oso.setCollideWorldBounds(true);

    delfin = this.physics.add.image(380 , 600, 'delfin');
    delfin.setScale(0.08);
    delfin.setCollideWorldBounds(true);

    mono = this.physics.add.image(680, 600, 'mono1');
    mono.setScale(0.3);
    mono.setCollideWorldBounds(true);

    bullets_delfin = this.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true
    });

    bullets_oso = this.physics.add.group({
      classType: Hielo,
      maxSize: 10,
      runChildUpdate: true
    });

    bullets_mono = this.physics.add.group({
      classType: Coco,
      maxSize: 10,
      runChildUpdate: true
    });


    enemigo = this.physics.add.image(200, 250, 'enemigo');
    enemigo.setScale(0.07);
    enemigo.setCollideWorldBounds(true);
    enemigo.setInteractive();
    enemigo.on('pointerdown', () => clickedEnemy = true);

  }

  update (time, delta) {

    if (estat == "delfin" && time > cd && clickedEnemy == true)
    {
        var bullet = bullets_delfin.get();

        if(bullet)
        { 
          bullet.fire(delfin.x, delfin.y);
        }
        cd = time + 1000;
        estat = "mono";
        clickedEnemy = false;
        
    }
    else if (estat == "oso" && time > cd && clickedEnemy == true)
    {
        var bullet = bullets_oso.get();

        if(bullet)
        {
          bullet.fire(oso.x, oso.y);
        }
        cd = time + 1000;
        estat = "delfin";
        clickedEnemy = false;
    }
    else if (estat == 'mono' && time > cd && clickedEnemy == true)
    {
      var bullet = bullets_mono.get();

      if(bullet)
      {
        bullet.fire(mono.x, mono.y);
      }
      cd = time + 1000;
      estat = "oso";
      clickedEnemy = false;
    }
  }
}