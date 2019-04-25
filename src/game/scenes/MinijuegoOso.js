import { Scene } from 'phaser';
import { platform } from 'os';
var cursors;
var player;


export default class MinijuegoOso extends Scene {
  constructor () {
    super({ key: 'MinijuegoOso' });
  }

  create () {
    console.log("Starting MinijuegoOso ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    
    const plataform = this.add.image(200, 300, 'platform');
    plataform.setScale(0.6);

    player = this.physics.add.image(400, 600, 'oso');
    player.setScale(0.03);
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    //bomb.setVelocity(200, 20);
    
    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platform);

    const btnOso = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    btnOso.setInteractive();
    btnOso.on('pointerup', () => this.scene.start('Menu'));

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
    else
    {
      player.setVelocityX(0);
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.setVelocityY(-330);
    }
  }
}
