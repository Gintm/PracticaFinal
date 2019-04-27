import { Scene } from 'phaser';

var cursors;
var player;
var Bullet = new Phaser.Class({

    //Extends: Phaser.GameObject.Image,

    initalize:

    //CONSTRUCTOR DE LA BALA
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'projectile');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    }
})

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
    player = this.physics.add.image(100, 100, 'delfin');
    player.setScale(0.06);
    player.setCollideWorldBounds(true);

    //BOTON PARA VOLVER AL MENU
    const volver = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    volver.setInteractive();
    volver.on('pointerup', () => this.scene.start('Menu'));
  }
  
  update () {
    
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
  }
}