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
var inc;
var speed = 300;
var randX;
var vida_fabrica;




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
    inc = 0;
    vida_fabrica = 5000;

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
      runChildUpdate: true,
      immovable: true
    });

    bullets_oso = this.physics.add.group({
      classType: Hielo,
      maxSize: 10,
      runChildUpdate: true,
      immovable: true
    });

    bullets_mono = this.physics.add.group({
      classType: Coco,
      maxSize: 10,
      runChildUpdate: true,
      immovable: true
    });    

    enemigo = this.physics.add.group({immovable: true});
    
    for(var l = 0; l <= 5; l++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      enemigo.create(x, 250, 'enemigo').setScale(0.07);
    }

<<<<<<< HEAD
  
    enemigo = this.physics.add.image(oso.x, 250, 'enemigo');
    enemigo.setScale(0.05);
    enemigo.setCollideWorldBounds(true);
    enemigo.setInteractive();
    enemigo.on('pointerdown', () => clickedEnemy = true);
=======
    this.physics.add.collider(enemigo, bullets_oso, get_hit_oso, null, this);
    this.physics.add.collider(enemigo, bullets_delfin, get_hit_delfin, null, this);
    this.physics.add.collider(enemigo, bullets_mono, get_hit_mono, null, this);

    function get_hit_oso (enemigo, bullets_oso)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }
    function get_hit_delfin (enemigo, bullets_delfin)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }
    function get_hit_mono (enemigo, bullets_mono)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }
>>>>>>> master

  }

  update (time, delta) {

    inc += 1;


    if (/*estat == "delfin" &&*/ time > cd && cursors.up.isDown)
    {
        var bullet = bullets_delfin.get();

        if(bullet)
        { 
          bullet.fire(delfin.x, delfin.y);
        }
        cd = time + 300;
        //estat = "mono";
        
    }
    else if (/*estat == "oso" &&*/ time > cd && cursors.left.isDown)
    {
        var bullet = bullets_oso.get();

        if(bullet)
        {
          bullet.fire(oso.x, oso.y);
        }
        cd = time + 300;
        //estat = "delfin";
    }
    else if (/*estat == 'mono' &&*/ time > cd && cursors.right.isDown)
    {
      var bullet = bullets_mono.get();

      if(bullet)
      {
        bullet.fire(mono.x, mono.y);
      }
      cd = time + 300;
      //estat = "oso";
    }

    if(inc % 200 == 0)
    {
      randX = Phaser.Math.RND.between(50, 750);
      enemigo.create(randX, 250, 'enemigo').setScale(0.07);
    }
    if(inc%300==0)
    {
      if(speed <= 600)
      {
        speed = speed * 1.2;
      }
    }

    enemigo.setVelocityX(speed, 0);

    this.physics.world.wrap(enemigo, 0);

    /*if(bullets_delfin.Y <= 100)
    {
      bullets_delfin.disableBody(true, true);
    }
    if(bullets_oso.Y <= 100)
    {
      bullets_oso.disableBody(true, true);
    }
    if(bullets_mono.Y <= 100)
    {
      bullets_mono.disableBody(true, true);
    }*/

    if(vida_fabrica <= 0)
    {
      this.scene.switch('Menu');
    }
  }

  
}