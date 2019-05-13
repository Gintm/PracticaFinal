import { Scene } from 'phaser';
import { Bullet } from '@/game/scenes/BalaDelfin.js';
import { Hielo } from '@/game/scenes/BalaOso.js';
var oso;
var delfin;
var mono;
var cursors;
var bullets_delfin;
var bullets_oso;
var estat;
var cd;



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

    cursors = this.input.keyboard.createCursorKeys();

    oso = this.physics.add.image(80, 600, 'oso');
    oso.setScale(0.065);
    oso.setCollideWorldBounds(true);

    delfin = this.physics.add.image(380 , 600, 'delfin');
    delfin.setScale(0.08);
    delfin.setCollideWorldBounds(true);

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

    mono = this.physics.add.image(680, 600, 'mono1');
    mono.setScale(0.3);
    mono.setCollideWorldBounds(true);

  }

  update (time, delta) {

    if (cursors.space.isDown && estat == "delfin" && time > cd)
    {
        var bullet = bullets_delfin.get();

        if(bullet)
        { 
          bullet.fire(delfin.x, delfin.y);
        }
        cd = time + 1000;
        estat = "oso";
        
    }
    else if (cursors.space.isDown && estat == "oso" && time > cd)
    {
        var bullet = bullets_oso.get();

        if(bullet)
        {
          bullet.fire(oso.x, oso.y);
        }
        cd = time + 1000;
        estat = "delfin";
    }
  }
}