import { Scene } from 'phaser';
import { platform } from 'os';
var cursors;
var player;
var platforms;
var cd;


export default class MinijuegoOso extends Scene {
  constructor () {
    super({ key: 'MinijuegoOso' });
  }

  create () {
    console.log("Starting MinijuegoOso ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    
    cd = 200;

    //platforms = this.physics.add.staticGroup();

    //const platforms = this.add.image(400, 200, 'platform');
    //platforms.setScale(0.6);

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 150, 'platform').setScale(0.4).refreshBody();
    platforms.create(600, 350, 'platform').setScale(0.4).refreshBody();
    platforms.create(50, 550, 'platform').setScale(0.4).refreshBody();
    

    player = this.physics.add.image(400, 600, 'oso');
    player.setScale(0.03);
    player.setCollideWorldBounds(true);
    //player.setBounce(0.2);
    player.setGravityY(300);
    //bomb.setVelocity(200, 20);
    
    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);

    const btnOso = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    btnOso.setInteractive();
    btnOso.on('pointerup', () => this.scene.start('Menu'));

  }

  update () {
    cd += 1;
    if (cursors.left.isDown)
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

    if (cursors.up.isDown && (player.body.touching.down || player.body.onFloor()))
    {
      player.setVelocityY(-380);
    }
    
    
  }
}
