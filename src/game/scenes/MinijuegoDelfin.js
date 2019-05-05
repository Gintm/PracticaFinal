import { Scene } from 'phaser';
//import { Bullet } from '@/game/scenes/BalaDelfin.js';

var cursors;
var player;
var bullets;
var tortugas;
var lastFired = 0;

export default class MinijuegoDelfin extends Scene {
  constructor () {
    super({ key: 'MinijuegoDelfin' });
  }

  create () {

    //PREPARANDO ESCENA
    console.log("Starting MinijuegoDelfin ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);

    cursors = this.input.keyboard.createCursorKeys();

    //AÑADIR JUGADOR
    player = this.physics.add.image(400, 500, 'delfin');
    player.setScale(0.06);
    player.setCollideWorldBounds(true);

    //AÑADIR BALAS
    
    var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'projectile');
        this.speed = Phaser.Math.GetSpeed(400, 1);
    },

    fire: function (x, y)
    {
        this.setPosition(x, y - 50);

        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta)
    {
        this.y -= this.speed * delta;

        if (this.y < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        } 
    }
    });

    bullets = this.add.group({
      classType: Bullet,
      maxSize: 15,
      runChildUpdate: true
    });

    //AÑADIR TORTUGAS
    tortugas = this.physics.add.group();
    
    var y = Phaser.Math.RND.between(0, 600);
    tortugas.create(0, y, 'turtle').setScale(0.03);

    //BOTON PARA VOLVER AL MENU
    const volver = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    volver.setInteractive();
    volver.on('pointerup', () => this.scene.start('Menu'));

  }
  
  update (time, delta) {
    
    //MOVIMIENTO PERSONAJE
    if(cursors.left.isDown)
    {
      player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(160);
    }
    else if (cursors.up.isDown)
    {
      player.setVelocityY(-160);
    }
    else if(cursors.down.isDown)
    {
      player.setVelocityY(160);
    }
    else
    {
      player.setVelocityX(0);
      player.setVelocityY(0);
    }

    //INPUT DISPARO
   if (cursors.space.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if(bullet)
        { 
          bullet.fire(player.x, player.y);
          lastFired = time + 50;
        }
        
    }

    //MOVIMIENTO TORTUGAS
    tortugas.setVelocityX(100);
  }
}