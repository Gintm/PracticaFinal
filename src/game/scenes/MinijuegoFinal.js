import { Scene } from 'phaser';
import { Bullet } from '@/game/scenes/BalaDelfin.js';
import { Hielo } from '@/game/scenes/BalaOso.js';
import { Coco } from '@/game/scenes/BalaMono.js';
import { Poti } from '@/game/scenes/BalaEnemigos.js';

var oso;
var delfin;
var mono;
var cursors;
var bullets_delfin;
var bullets_oso;
var bullets_mono;
var bullets_enemigos;
var estat;
var cd;
var enemigo;
var inc;
var speed = 300;
var randX;
var vida_fabrica;
var bg_music;
var vidasMono = 3;
var vidasDelfin = 3;
var vidasOso = 3;
var corazones_oso;
var corazones_monos;
var corazones_delfin;
var total_corazones_oso;
var total_corazones_monos;
var total_corazones_delfin;
var pop;
var text;



export default class MinijuegoFinal extends Scene {
  constructor () {
    super({ key: 'MinijuegoFinal' });
  }

  create () {
    console.log("Starting MinijuegoFinal ...");
    let i = this.add.image(400, 300, 'fondo_fabrica').setScale(0.57); //fondo
    console.log(i);

    var that = this;

    text = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

    this.sound.add('pop');
    bg_music = this.sound.add('finalMusic');
    bg_music.play();

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

    bullets_enemigos = this.physics.add.group({
      classType: Poti,
      maxSize: 10,
      runChildUpdate: true,
      immovable: true
    });

    var corazones_padding_oso = 0;
    var corazones_padding_delfin = 0;
    var corazones_padding_monos = 0;
    
    corazones_oso = this.physics.add.group();
    corazones_delfin = this.physics.add.group();
    corazones_monos = this.physics.add.group();

    for(var j = 0; j < vidasOso; j++)
    {
        corazones_oso.create(oso.x + corazones_padding_oso, 575, 'corazon').setScale(0.05);
        corazones_padding_oso += 32;
    }
    
    for(var j = 0; j < vidasDelfin; j++)
    {
        corazones_delfin.create(delfin.x + corazones_padding_delfin, 575, 'corazon').setScale(0.05);
        corazones_padding_delfin += 32;
    }    
    
    for(var j = 0; j < vidasMono; j++)
    {
        corazones_monos.create(mono.x + corazones_padding_monos, 575, 'corazon').setScale(0.05);
        corazones_padding_monos += 32;
    }

    total_corazones_oso = corazones_oso.getLength();
    total_corazones_monos = corazones_monos.getLength();
    total_corazones_delfin = corazones_delfin.getLength();


    enemigo = this.physics.add.group({immovable: true});
    
    for(var l = 0; l <= 3; l++)
    {
      var x = Phaser.Math.RND.between(0, 800);
      enemigo.create(x, 250, 'enemigo').setScale(0.07);
      var bullet = bullets_enemigos.get();
      if(bullet)
      {
        var enemigo_long = enemigo.getLength();
        var rand = Phaser.Math.RND.between(0, enemigo_long - 1)
        bullet.fire(enemigo.getChildren()[rand].x, enemigo.getChildren()[rand].y);
      }
     
    }

    this.physics.add.collider(enemigo, bullets_oso, hit_oso, null, this);
    this.physics.add.collider(enemigo, bullets_delfin, hit_delfin, null, this);
    this.physics.add.collider(enemigo, bullets_mono, hit_mono, null, this);
    this.physics.add.collider(oso, bullets_enemigos, get_hit_oso, null, this);
    this.physics.add.collider(mono, bullets_enemigos, get_hit_mono, null, this);
    this.physics.add.collider(delfin, bullets_enemigos, get_hit_delfin, null, this);

    function hit_oso (enemigo, bullets_oso)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        bullets_oso.destroy();
        pop = true;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }
    function hit_delfin (enemigo, bullets_delfin)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        bullets_delfin.destroy();
        pop = true;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }
    function hit_mono (enemigo, bullets_mono)
    {
        enemigo.disableBody(true, true);
        vida_fabrica -= 20;
        bullets_mono.destroy();
        pop = true;
        
        setTimeout(function(){ 
          enemigo.enableBody(true, randX, 250, true, true);
        }, 1000);
    }

    function get_hit_oso (oso, bullets_enemigos)
    {
      bullets_enemigos.destroy();
      vidasOso -= 1;
      pop = true;
    }

    function get_hit_mono (oso, bullets_enemigos)
    {
      bullets_enemigos.destroy();
      vidasMono -= 1;
      pop = true;
    }

    function get_hit_delfin (oso, bullets_enemigos)
    {
      bullets_enemigos.destroy();
      vidasDelfin -= 1;
      pop = true;
    }

    this.time.addEvent({
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
  }

  

  update (time, delta) {

    inc += 1;

    text.setText('Vida fabrica: ' + vida_fabrica);


    if (/*estat == "delfin" &&*/ time > cd && cursors.up.isDown && vidasDelfin > 0)
    {
        var bullet = bullets_delfin.get();

        if(bullet)
        { 
          bullet.fire(delfin.x, delfin.y);
        }
        cd = time + 300;
        //estat = "mono";
        
    }
    else if (/*estat == "oso" &&*/ time > cd && cursors.left.isDown && vidasOso > 0)
    {
        var bullet = bullets_oso.get();

        if(bullet)
        {
          bullet.fire(oso.x, oso.y);
        }
        cd = time + 300;
        //estat = "delfin";
    }
    else if (/*estat == 'mono' &&*/ time > cd && cursors.right.isDown && vidasMono > 0)
    {
      var bullet = bullets_mono.get();

      if(bullet)
      {
        bullet.fire(mono.x, mono.y);
      }
      cd = time + 300;
      //estat = "oso";
    }

    

    if(inc % 1000 == 0)
    {
      randX = Phaser.Math.RND.between(50, 750);
      enemigo.create(randX, 250, 'enemigo').setScale(0.07);
      var bullet = bullets_enemigos.get();
      if(bullet)
      {
        var enemigo_long = enemigo.getLength();
        var rand = Phaser.Math.RND.between(0, enemigo_long - 1)
        bullet.fire(enemigo.getChildren()[rand].x, enemigo.getChildren()[rand].y);
      }
    }
    
    if(inc % 300 == 0)
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

    var conjunto_corazones_oso = corazones_oso.getChildren();
    
    if(vidasOso < total_corazones_oso)
    {
        var corazon_aux = conjunto_corazones_oso[total_corazones_oso - 1];
        corazon_aux.disableBody(true, true);
        total_corazones_oso -= 1;
    }
    
    var conjunto_corazones_monos = corazones_monos.getChildren();
    
    if(vidasMono < total_corazones_monos)
    {
        var corazon_aux = conjunto_corazones_monos[total_corazones_monos - 1];
        corazon_aux.disableBody(true, true);
        total_corazones_monos -= 1;
    }

    var conjunto_corazones_delfin = corazones_delfin.getChildren();
    
    if(vidasDelfin < total_corazones_delfin)
    {
        var corazon_aux = conjunto_corazones_delfin[total_corazones_delfin - 1];
        corazon_aux.disableBody(true, true);
        total_corazones_delfin -= 1;
    }

    if(vidasOso == 0)
    {
      oso.disableBody(true, true);
    }
    if(vidasMono == 0)
    {
      mono.disableBody(true, true);
    }
    if(vidasDelfin == 0)
    {
      delfin.disableBody(true, true);
    }

    if(vida_fabrica <= 0 || (vidasDelfin == 0 && vidasMono == 0 && vidasOso == 0))
    {
      bg_music.stop();
      this.scene.switch('Menu');
    }
  }

  
}