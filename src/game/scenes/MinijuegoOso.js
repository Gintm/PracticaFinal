import { Scene } from 'phaser';
import { platform } from 'os';
var cursors;
var player;
var ositos;
var platformsf;
var platformss;
var platformst;
var cd;
var vXft;
var vXs
var vY;
var ositos;
var text;
var score;
var randX;
var randY;



export default class MinijuegoOso extends Scene {
  constructor () {
    super({ key: 'MinijuegoOso' });
  }

  create () {
    console.log("Starting MinijuegoOso ...");
    let i = this.add.image(400, 300, 'fondo_oso').setScale(0.6); //fondo
    console.log(i);
    // Inicializacion variables
    cd = 0;
    score = 0;
    vXft = 100;
    vXs = -100;
    vY = 30;

    // Puntuación
    text = this.add.text(32,32, 'Score: 0');

    // Creacion plataformas
    platformsf = this.physics.add.group({immovable: true});
    platformss = this.physics.add.group({immovable: true});
    platformst = this.physics.add.group({immovable: true});

    // Movimiento plataformas
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
    
    // Creacion jugador
    player = this.physics.add.image(400, 0, 'oso');
    player.setScale(0.03);
    player.setCollideWorldBounds(true);
    player.setGravityY(300);
    
    // Movimiento
    cursors = this.input.keyboard.createCursorKeys();

    // Colisiones
    this.physics.add.collider(player, platformsf);
    this.physics.add.collider(player, platformss);
    this.physics.add.collider(player, platformst);

    // Creacion ositos para sumar puntos
    randX = Phaser.Math.RND.between(50, 750);
    randY = Phaser.Math.RND.between(50, 550);

    ositos = this.physics.add.image(randX, randY, 'osito');
    ositos.setScale(0.05); 

    this.physics.add.overlap(player, ositos, collect, null, this);

    // Suma de puntos al coger ositos
    function collect(player, ositos)
    {
      ositos.disableBody(true, true);
      
      score += 1000000;
    
      setTimeout(function(){
        var pos_y = Phaser.Math.RND.between(50,550);
        var pos_x = Phaser.Math.RND.between(50, 750);
        ositos.enableBody(true, pos_x, pos_y, true, true);
      }, 5000);
    }
  }

  update (time, delta) {
    // Actualizar score
    text.setText('Score: ' + score/100000);
    cd += 1;
    score += 1000;
    //score = Math.round(time / 1000);

    // Cursores
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

    if (cursors.up.isDown && (player.body.touching.down /*|| player.body.onFloor()*/))
    {
      player.setVelocityY(-380);
    }

    if (player.body.onFloor())
    {
      this.scene.switch('Menu');
    }

    // Velocidad plataformas
    platformsf.setVelocityX(vXft, 0);
    platformss.setVelocityX(vXs, 0);
    platformst.setVelocityX(vXft, 0);
    platformsf.setVelocityY(vY, 0);
    platformss.setVelocityY(vY, 0);
    platformst.setVelocityY(vY, 0);

    // Aumentar velocidad plataformas
    if (cd % 300 == 0)
    {
      vXft = vXft * 1.2;
      vXs = vXs * 1.2;
      vY = vY * 1.2;
    }

    // Aparición y desaparición ositos
    if (cd % 200 == 0)
    {
      ositos.disableBody(true, true);

      setTimeout(function(){
        var pos_y = Phaser.Math.RND.between(50,550);
        var pos_x = Phaser.Math.RND.between(50, 750);
        ositos.enableBody(true, pos_x, pos_y, true, true);
      }, 10000);
    }
    
    // Plataformas aparecer en el lado contrario al salir de la pantalla
    this.physics.world.wrap(platformsf, 0);
    this.physics.world.wrap(platformss, 0);
    this.physics.world.wrap(platformst, 0);
  }
}
