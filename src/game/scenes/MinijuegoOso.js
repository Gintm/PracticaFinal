import { Scene } from 'phaser';
import { platform } from 'os';
var cursors;
var player;
var platformsf;
var platformss;
var platformst;
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

    //platforms.create(400, 150, 'platform').setScale(0.4).refreshBody();
    //platforms.create(600, 350, 'platform').setScale(0.4).refreshBody();
    //platforms.create(50, 550, 'platform').setScale(0.4).refreshBody();
    //platforms.create(400, 550, 'platform').setScale(0.4).refreshBody();

    platformsf = this.physics.add.group({immovable: true});
    platformss = this.physics.add.group({immovable: true});
    platformst = this.physics.add.group({immovable: true});

    for (var f = 0; f < 3; f++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      
      platformsf.create(x, 150, 'platform').setScale(0.4);
    }
    for (var s = 0; s < 3; s++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      
      platformss.create(x, 350, 'platform').setScale(0.4);
    }
    for (var t = 0; t < 3; t++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      
      platformst.create(x, 550, 'platform').setScale(0.4);
    }

    
    player = this.physics.add.image(400, 600, 'oso');
    player.setScale(0.03);
    player.setCollideWorldBounds(true);
    player.setGravityY(300);
    
    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platformsf);
    this.physics.add.collider(player, platformss);
    this.physics.add.collider(player, platformst);

    

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
    
    platformsf.setVelocityX(100, 0);
    platformss.setVelocityX(-100, 0);
    platformst.setVelocityX(100, 0);
  }
}
