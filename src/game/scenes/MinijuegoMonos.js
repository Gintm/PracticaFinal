import { Scene } from 'phaser';
import { Cocos } from '@/game/scenes/CocoMonos.js';

var cursors;
var monod;
var monoi;
var enemigo;
var cocos;
var platanos;
var totalPlatanos = 0;
var numEnemigos = 2;
var vidasd;
var vidasi;
var velocidadEnemigo = 100;
var incremento = 0;
var totald;
var totali;
var enemigoAbajo = false;
var corazones;
var scoreText;
var score = 0;
var lastFired = 0;
var cocod = 0;
var cocoi = 0;
var plati = false;
var platd = false;

export default class MinijuegoMonos extends Scene {
  constructor () {
    super({ key: 'MinijuegoMonos' });
  }

  create () {
    //Preparar escena
    console.log("Starting MinijuegoMonos ...");
    let i = this.add.image(400, 300, 'fondo_monos').setScale(0.555); //fondo
    console.log(i);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '24px', fill: '#000' });
    cursors = this.input.keyboard.createCursorKeys();

    //Añadir jugador
    monod = this.physics.add.image(700, 500, 'mono1');
    monod.setScale(0.25);
    monoi = this.physics.add.image(100, 500, 'mono2');
    monoi.setScale(0.25);
    
    //Preparar las vidas de los monos
    vidasd = 2;
    vidasi = 2;
    var corinc = 32;
    corazones = this.physics.add.group();

    for(var a=0;a<vidasd;a++)
    {
      corazones.create(corinc, 575, 'corazon').setScale(0.05);
      corinc+=32;
    }
    for(var z=0;z<vidasi;z++)
    {
      corazones.create(525+corinc, 575, 'corazon').setScale(0.05);
      corinc+=32;
    }
    totald = 2;
    totali = 2;
    
    //Añadir cocos
    cocos = this.add.group({
      classType: Cocos,
      maxSize: 2,
      runChildUpdate: true
    });
   
    //Añadir platanos
    var max = 10;
    var min = 5;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    var pos_x = Phaser.Math.RND.between(0, 1);
    if (pos_x == 0){
      var pos = 225
      plati = true;
    } else {
      var pos = 525
      platd = true;
    }
    platanos = this.physics.add.group({
      key: 'platanos',
      repeat: 0,
      setXY: {x:pos, y:0}
    });
    platanos.children.iterate(function(child){
      child.setScale(0.05)
    });

    
    //Añadir Leñadores
    enemigo = this.physics.add.group();
    for(var b=0;b<numEnemigos;b++)
    {
      var pos_x = Phaser.Math.RND.between(0, 1);
      if (pos_x == 0 && plati!=true){
        var pos = 225
      } else {
        var pos = 525
      }
      enemigo.create(pos, 0, 'lenyador').setScale(0.05);
    }

    //Enemigo ha pasado
    
    //Disparo daño
    this.physics.add.collider(cocos,enemigo,hit,null,this);
    function hit (cocos, enemigo)
    {
      enemigo.disableBody(true, true);
        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 1);
          if (pos_x == 0 && plati!=true){
            var pos = 225
          } else {
            var pos = 525
          }
          enemigo.enableBody(true, pos, 0, true, true);
        }, 2000);
    }

    this.physics.add.overlap(cocos, platanos, collect, null, this);
    function collect (cocos, platanos)
    {
        platanos.disableBody(true, true);
        totalPlatanos += 10;
        plati = false;
        platd = false;
        setTimeout(function(){ 
          platanos.enableBody(true, 0, pos_y, true, true);
          var pos_x = Phaser.Math.RND.between(0, 1);
          if (pos_x == 0){
            var pos = 225
            plati = true;
          } else {
            var pos = 525
            platd = true;
          }
          platanos.enableBody(true,pos,0,true,true);
        }, rand * 1000);
    }

  }
  update (time, delta) {
    //Disparo monos
    //cuando coco desaparezca popner nuevamente cocoi a cero
    var that = this;
    var segundos = Math.round(time / 1000);
    score = segundos + totalPlatanos;
    scoreText.setText('Score: ' + score);
    incremento += 1;

    if(cursors.left.isDown && cocoi == 0)
    {
      var coco = cocos.get();
      cocoi = 1;
      if(coco)
      {
        coco.fire(225,500);
        lastFired = time + 50;
      }
    }
    else if(cursors.right.isDown && cocod == 0)
    {
      var coco = cocos.get();
      cocod = 1;
      if(coco)
      {
        coco.fire(525,500);
        lastFired = time + 50;
      }
    }
    //Movimiento enemigos
    enemigo.setVelocityY(velocidadEnemigo);
    var ene=enemigo.getChildren();
    var cnt=0;
    var eneLong = enemigo.getLength();
    while(cnt < eneLong && !enemigoAbajo)
    {
      var lenyador = ene[cnt];

      if(lenyador.y > 600)
        {
          lenyador.disableBody(true, true);
          enemigoAbajo = true;

          if(enemigoAbajo)
          {
            if(lenyador.x==225){
              vidasd -= 1;
            }else{
              vidasi -= 1;
            }
          }
          

          setTimeout(function(){ 
            var pos_x = Phaser.Math.RND.between(0, 1);
            if (pos_x == 0 && plati!=true){
              var pos = 225
            } else {
              var pos = 525
            }
            lenyador.enableBody(true, pos, 0, true, true);
          }, 2000);
        }
        cnt++;
    }
    //movimiento platanos
    platanos.setVelocityY(velocidadEnemigo);
    var gPlat = platanos.getChildren();
    for(var n=0;n<gPlat.length;n++){
      var platano = gPlat[n];
      if(platano.y > 600)
      {
        platano.disableBody(true, true);
        setTimeout(function(){ 
          var pos_x = Phaser.Math.RND.between(0, 1);
          if (pos_x == 0){
            var pos = 225
            plati = true;
          } else {
            var pos = 525
            platd = true;
          }
          platanos.enableBody(true,pos,0,true,true);
        }, rand * 1000 / 2);
      }
    }

    //aumento de dificultad
    if(incremento % 3000 == 0)
    {
      velocidadEnemigo =  velocidadEnemigo * 1.05;
    }

    //disminucions de vidas
    var gcor = corazones.getChildren();
    if(vidasd<totald){
      var aux = gcor[totald - 1];
      aux.disableBody(true, true);
      totald -= 1;
    }
    if(vidasi<totali){
      var aux = gcor[totali - 1];
      aux.disableBody(true, true);
      totali -= 1;
    }

    //morir
    if(vidasd == 0 || vidasi == 0){
      this.scene.switch('Menu');
    }

  }
}