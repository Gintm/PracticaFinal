import { Scene } from 'phaser';
import { Bullet } from '@/game/scenes/BalaDelfin.js';

var y;
var cursors;
var player;
var latas;
var rand;
var bullets;
var tortugas;
var scoreText;
var score = 0;
var lastFired = 0;
var totalTurtles = 0;
var numLatas = 2;
var vidasDelfin;
var lata;
var velocidad_latas;
var basura_destruida = 0;
var incremento_dificultad = 0;

export default class MinijuegoDelfin extends Scene {
  constructor () {
    super({ key: 'MinijuegoDelfin' });
  }

  create () {

    //PREPARANDO ESCENA
    console.log("Starting MinijuegoDelfin ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#000' });

    cursors = this.input.keyboard.createCursorKeys();

    //AÑADIR JUGADOR
    player = this.physics.add.image(400, 500, 'delfin');
    player.setScale(0.06);
    player.setCollideWorldBounds(true);

    vidasDelfin = 3;

    //AÑADIR BALAS
    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 7,
      runChildUpdate: true
    });



    //AÑADIR TORTUGAS
    var max = 10;
    var min = 5;
    rand = Math.floor(Math.random() * (max - min + 1) + min);
    y = Phaser.Math.RND.between(0, 600);
    
    tortugas = this.physics.add.group({
      key: 'turtle',
      repeat: 0,
      setXY: { x: 0, y: y }
    });

    tortugas.children.iterate(function (child) {
      child.setScale(0.03);
    });

    this.physics.add.overlap(player, tortugas, collect, null, this);

    function collect (player, tortugas)
    {
        tortugas.disableBody(true, true);
        totalTurtles += 10;

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          tortugas.enableBody(true, 0, pos_y, true, true);
        }, rand * 1000);
    }

    //AÑADIR BASURA
    latas = this.physics.add.group();

    for(var l = 0; l < numLatas; l++)
    {
          var x = Phaser.Math.RND.between(0, 800);
          lata = latas.create(x, 0, 'lata').setScale(0.05);
    }

    velocidad_latas = 100;

    //JUGADOR ES GOLPEADO
    this.physics.add.collider(player, latas, get_hit, null, this);

    function get_hit (player, lata)
    {
        lata.disableBody(true, true);
        vidasDelfin -= 1;
        
        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 800);
          lata.enableBody(true, pos_x, 0, true, true);
        }, 2000);
    }

    //BALA GOLPEA BASURA
    this.physics.add.collider(bullets, latas, hit, null, this);

    function hit (bullets, lata)
    {
        lata.disableBody(true, true);
        basura_destruida += 1;

        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 800);
          lata.enableBody(true, pos_x, 0, true, true);
        }, 2000);
    }

    //BOTON PARA VOLVER AL MENU

    var platformsf = this.physics.add.group({immovable: true});
    var x = Phaser.Math.RND.between(0, 800);
    platformsf.create(x, 150, 'platform').setScale(0.4);

    this.physics.add.collider(player, platformsf);
    this.physics.add.collider(bullets, platformsf);

    const volver = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    volver.setInteractive();
    volver.on('pointerup', () => this.scene.start('Menu'));

  }
  
  update (time, delta) {
    
    var that = this;
    var segundos = Math.round(time / 1000);
    score = segundos + totalTurtles + basura_destruida;
    scoreText.setText('Score: ' + score);

    //MOVIMIENTO PERSONAJE
    if(cursors.left.isDown)
    {
      player.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(300);
    }
    else if (cursors.up.isDown)
    {
      player.setVelocityY(-300);
    }
    else if(cursors.down.isDown)
    {
      player.setVelocityY(300);
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

    var tortugas_grupo = tortugas.getChildren();
    for(var i = 0; i < tortugas_grupo.length; i++)
    {
      var tortuga = tortugas_grupo[i];
      if(tortuga.x > 800)
      {
        tortuga.disableBody(true, true);

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          tortuga.enableBody(true, -40, pos_y, true, true);
        }, rand * 1000 / 2);
      }
    }

    //MOVIMIENTO BASURA
    latas.setVelocityY(velocidad_latas);

    let latas2 = latas.getChildren();
    for (let i=0; i< latas2.length; i++)
    {
        let lat = latas2[i];
        if(lat.y > 600)
        {
          lat.disableBody(true, true);
        
          setTimeout(function(){ 
            var pos_x = Phaser.Math.RND.between(0, 800);
            lat.enableBody(true, pos_x, -50, true, true);
          }, 2000);
        }
    }

    //AUMENTO CANTIDAD
    if(score % 50 == 0)
    {
      velocidad_latas =  velocidad_latas * 1.05;
    }

    //PERDER PARTIDA
    if(vidasDelfin == 0)
    {
      this.physics.pause();
      this.scene.start('Menu');
    }
  }
}