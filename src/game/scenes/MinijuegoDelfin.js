import { Scene } from 'phaser';
import { Bullet } from '@/game/scenes/BalaDelfin.js';

var y;
var cursors;
var player;
var basura;
var rand;
var bullets;
var tortugas;
var scoreText;
var score;
var lastFired = 0;
var numbasuras = 1;
var numBotellas = 1;
var numBolsas = 1;
var vidasDelfin;
var basura;
var corazones;
var velocidad_basura = 100;
var incremento_dificultad = 0;
var total_corazones;
var basura_caida = false;
var pop = false;
var sound_pop;
var bg_music;


export default class MinijuegoDelfin extends Scene {
  constructor () {
    super({ key: 'MinijuegoDelfin' });
  }

  create () {
    //PREPARANDO ESCENA
    console.log("Starting MinijuegoDelfin ...");
    let i = this.add.image(400, 300, 'fondo_delfin'); //         
    console.log(i);
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#000' });
    score = 0;                  
    var that = this;
    cursors = this.input.keyboard.createCursorKeys();

    this.sound.add('pop');
    bg_music = this.sound.add('dolphinMusic');
    bg_music.play();

    //AÑADIR JUGADOR
    player = this.physics.add.image(400, 500, 'delfin');
    player.setScale(0.06);
    player.setCollideWorldBounds(true);

    //AÑADIR VIDAS JUGADOR
    vidasDelfin = 3;
    var corazones_padding = 32;
    
    corazones = this.physics.add.group();

    for(var j = 0; j < vidasDelfin; j++)
    {
        corazones.create(corazones_padding, 575, 'corazon').setScale(0.05);
        corazones_padding += 32;
    }

    total_corazones = corazones.getLength();

    //AÑADIR BALAS
    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 9,
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
        score += 1000000;

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          tortugas.enableBody(true, 0, pos_y, true, true);
        }, rand * 1000);
    }

    //AÑADIR BASURA
    basura = this.physics.add.group();

    for(var l = 0; l < numbasuras; l++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      basura.create(x, 0, 'lata').setScale(0.05);
    }

    for(var l = 0; l < numBotellas; l++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      basura.create(x, 0, 'botella').setScale(0.05);
    }

    for(var l = 0; l < numBolsas; l++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      basura.create(x, 0, 'bolsa').setScale(0.05);
    }

    //JUGADOR ES GOLPEADO
    this.physics.add.collider(player, basura, get_hit, null, this);

    function get_hit (player, basura)
    {
        basura.disableBody(true, true);
        vidasDelfin -= 1;
        
        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 800);
          basura.enableBody(true, pos_x, 0, true, true);
        }, 2000);
    }

    //BALA GOLPEA BASURA Y A TORTUGAS
    this.sound_pop = this.time.addEvent({
      duration: 2000,
      repeat: -1,
      delay: -2000,
      callBackScope: this,
      callback: function(){
        if(pop == true)
        {
          that.sound.play('pop');
          pop = false;
        }
      }
    })

    this.physics.add.collider(bullets, basura, hit, null, this);

    function hit (bullets, basura)
    {
      basura.disableBody(true, true);
      pop = true;

        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 800);
          basura.enableBody(true, pos_x, 0, true, true);
        }, 2000);
    }
    
    this.physics.add.overlap(bullets, tortugas, hit_t, null, this);

    function hit_t (bullets, tortugas)
    {
        tortugas.disableBody(true, true);

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          tortugas.enableBody(true, 0, pos_y, true, true);
        }, rand * 1000);
    }

  }
  
  update (time, delta) {

    score = score + 1000;
    scoreText.setText('Score: ' + Math.round(score / 100000));

    incremento_dificultad += 1;

    //MOVIMIENTO PERSONAJE
    if(cursors.left.isDown)
    {
      player.setVelocityX(-450);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(450);
    }
    else if (cursors.up.isDown)
    {
      player.setVelocityY(-450);
    }
    else if(cursors.down.isDown)
    {
      player.setVelocityY(450);
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
    basura.setVelocityY(velocidad_basura, 0);

    var basuras2 = basura.getChildren();
    var i = 0;
    var basuras_long = basura.getLength();

    while(i < basuras_long && !basura_caida)
    {
      var bas = basuras2[i];

      if(bas.y > 600)
        {
          bas.disableBody(true, true);
          basura_caida = true;

          if(basura_caida)
          {
            vidasDelfin -= 1;
          }
          setTimeout(function(){ 
            var pos_x = Phaser.Math.RND.between(0, 800);
            bas.enableBody(true, pos_x, -50, true, true);
            basura_caida = false;
          }, 2000);
        }

        i++;
    }

  
    //AUMENTO CANTIDAD Y VELOCIDAD BASURA
    if(incremento_dificultad % 3000 == 0)
    {
      var x = Phaser.Math.RND.between(0, 800);
      basura.create(x, 0, 'botella').setScale(0.05);
      basura.create(x, 0, 'bolsa').setScale(0.05);
      basura.create(x, 0, 'lata').setScale(0.05);
      velocidad_basura =  velocidad_basura * 1.05;
    }

    //REDUCIR VIDAS
    var conjunto_corazones = corazones.getChildren();
    
    if(vidasDelfin < total_corazones)
    {
        var corazon_aux = conjunto_corazones[total_corazones - 1];
        corazon_aux.disableBody(true, true);
        total_corazones -= 1;
    }

    //PERDER PARTIDA
    if(vidasDelfin == 0)
    {
      bg_music.stop();
       this.scene.switch('Menu');
    }
  }
}