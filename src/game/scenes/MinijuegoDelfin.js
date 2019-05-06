import { Scene } from 'phaser';
import { Bullet } from "BalaDelfin.js";

var cursors;
var player;
var lata;
var bullets;
var tortugas;
var scoreText;
var score = 0;
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
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '24px', fill: '#000' });

    cursors = this.input.keyboard.createCursorKeys();

    //AÑADIR JUGADOR
    player = this.physics.add.image(400, 500, 'delfin');
    player.setScale(0.06);
    player.setCollideWorldBounds(true);
    player.setInteractive({
      pixelPerfect: true
  });

    //AÑADIR BALAS
   /* var Bullet = new Phaser.Class({

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
    });*/

    bullets = this.add.group({
      classType: Bullet,
      maxSize: 7,
      runChildUpdate: true
    });

    //AÑADIR TORTUGAS
    var max = 10;
    var min = 5;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    
    tortugas = this.physics.add.group();

    /*tortugas.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });*/
    
    var y = Phaser.Math.RND.between(0, 600);
    tortugas.create(0, y, 'turtle').setScale(0.03);
    //tortugas.setInteractive(this.input.makePixelPerfect());

    this.physics.add.overlap(player, tortugas, collect, null, this);

    function collect (player, tortugas)
    {
        tortugas.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          tortugas.enableBody(true, 0, pos_y, true, true);
        }, rand * 1000);
        console.log(rand * 1000);
    }

    //AÑADIR BASURA
    lata = this.physics.add.image(400, 500, 'lata');

    //BOTON PARA VOLVER AL MENU

    var platformsf = this.physics.add.group({immovable: true});
    var x = Phaser.Math.RND.between(0, 800);
    platformsf.create(x, 150, 'platform').setScale(0.4);

    this.physics.add.collider(player, platformsf);

    const volver = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    volver.setInteractive();
    volver.on('pointerup', () => this.scene.start('Menu'));

  }
  
  update (time, delta) {
    
    score += 1;

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