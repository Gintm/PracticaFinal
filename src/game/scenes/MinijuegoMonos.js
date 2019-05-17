import { Scene } from 'phaser';
import { Cocos } from '@/game/scenes/CocoMonos.js';

var cursors;
var monod;
var monoi;
var enemigo;
var cocos;
var platanos;
var totalPlatanos = 0;
var numEnemigos = 3;
var vidasd;
var vidasi;
var velocidadEnemigo = 100;
var incremento = 0;
var totald = 2;
var totali = 2;
var enemigoAbajo = false;
var corad;
var corai;
var scoreText;
var score = 0;
var lastFired = 0;
var rand;
var bg_music;
var pop;

export default class MinijuegoMonos extends Scene {
  constructor () {
    super({ key: 'MinijuegoMonos' });
  }

  create () {
    //Preparar escena
    console.log("Starting MinijuegoMonos ..."); //Inicializar el juego "Cargando"
    let i = this.add.image(400, 300, 'fondo_monos').setScale(0.555); //Fondo
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '24px', fill: '#000' }); //Formato del Score
    cursors = this.input.keyboard.createCursorKeys(); //Inicializacion del input
    var rand = Math.floor(Math.random() * (max - min + 1) + min); //Variable con valor aleatorio
    var that = this;

    this.sound.add('pop');
    bg_music = this.sound.add('monkeysMusic');
    bg_music.play();

    //Añadir onos
    //Mono derecha
    monod = this.physics.add.image(700, 500, 'mono1');
    monod.setScale(0.25);
    //Mono izquierda
    monoi = this.physics.add.image(100, 500, 'mono2');
    monoi.setScale(0.25);
    
    //Preparar las vidas de los monos
    vidasd = 2;
    vidasi = 2;
    var corinc = 32;
    //Grupos que dibujan los corazones
    corad= this.physics.add.group();
    corai= this.physics.add.group();
    //Creacion de los corazones
    for(var a=0;a<vidasd;a++)
    {
      corad.create(corinc, 575, 'corazon').setScale(0.05);
      corinc+=32;
    }
    for(var z=0;z<vidasi;z++)
    {
      corai.create(525+corinc, 575, 'corazon').setScale(0.05);
      corinc+=32;
    }
    
    //Añadir cocos
    cocos = this.physics.add.group({
      classType: Cocos,
      maxSize: 10,
      runChildUpdate: true
    });
   
    //Añadir platanos
    var max = 10;
    var min = 5;
    //Variable aleatoria para decidir si el platano saldra por el carril derecho o el izquierdo
    var rn = Phaser.Math.RND.between(0, 1);
    if (rn == 0){
      var pos = 225
    } else {
      var pos = 525
    }
    //Creacion del grupo
    platanos = this.physics.add.group({
      key: 'platanos',
      repeat: 0,
      setXY: {x:pos, y:0}
    });
    platanos.children.iterate(function(child){
      child.setScale(0.05)
    });

    //Añadir Leñadores
    //Creacion del grupo
    enemigo = this.physics.add.group();
    for(var b=0;b<numEnemigos;b++)
    {
      //Variable aleatoria para decidir si el enemigo saldra por el carril derecho o el izquierdo
      var rn = Phaser.Math.RND.between(0, 1);
      if (rn == 0){
        var pos = 225
      } else {
        var pos = 525
      }
      //Varibable para que al inicializar el juego salgan los leñadores en una Y diferente (para que tarden ams en aparecer en el mapa)
      var n = 200*b
      //crear el enemigo
      enemigo.create(pos, -n, 'lenyador').setScale(0.05);
    }
    
    //Disparo daño

    this.physics.add.collider(cocos,enemigo,golpe,null,this);
    function golpe (cocos, enemigo)
    {
      enemigo.disableBody(true, true);
      cocos.destroy();
      pop = true;
        setTimeout(function(){ 
          //Variable aleatoria para decidir si el enemigo saldra por el carril derecho o el izquierdo
          var rn = Phaser.Math.RND.between(0, 1);
          if (rn == 0){
            var pos = 225
          } else {
            var pos = 525
          }
          enemigo.enableBody(true, pos, 0, true, true);
        }, 2000);
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

    this.physics.add.collider(cocos, platanos, conlecta, null, this);
    function conlecta (cocos, platanos)
    {
        platanos.disableBody(true, true);
        cocos.destroy();
        //Suma a la puntuacion
        totalPlatanos += 10;
        setTimeout(function(){ 
          //Variable aleatoria para decidir si el enemigo saldra por el carril derecho o el izquierdo
          var pos_x = Phaser.Math.RND.between(0, 1);
          if (pos_x == 0){
            var pos = 225
          } else {
            var pos = 525
          }
          platanos.enableBody(true,pos,0,true,true);
        }, rand * 1000);
    }

  }

  update (time, delta) {
    //Disparo monos
    //variable de puntuacion
    score = score + 1000;
    //actualizar el score por pantalla
    scoreText.setText('Score: ' + Math.round(score / 100000));
    //incremento de dificultad del juego
    incremento += 1;
    //controlador de inputs para disparar los cocos
    if(cursors.left.isDown && time > lastFired)
    { 
      var coco = cocos.get();
      if(coco)
      {
        coco.fire(225,500);
        lastFired = time + 1200;
      }
    }
    else if(cursors.right.isDown && time > lastFired)
    {
      var coco = cocos.get();
      if(coco)
      {
        coco.fire(525,500);
        lastFired = time + 1500;
      }
    }

    //Movimiento enemigos
    //preestablecer la velocidad del enemigo
    enemigo.setVelocityY(velocidadEnemigo);
    //crear un enemigo
    var ene=enemigo.getChildren();
    var cnt=0;
    //guardar el largo del grupo enemigo
    var eneLong = enemigo.getLength();
    while(cnt < eneLong && !enemigoAbajo)
    {
      //comrpobar acciones del enemigo
      var lenyador = ene[cnt];
      if(lenyador.y > 600)
        {
          //si ha llegado a la parte inferior del mapa
          lenyador.disableBody(true, true);
          enemigoAbajo = true;
          if(enemigoAbajo)
          {
            if(lenyador.x==225){
              //si ha sido po la derecha se restara una vida al mono de la derecha
              vidasd -= 1;
            }
            if (lenyador.x==525){
              //si ha sido por la izquierda se restara una vida al mono de la izquierda
              vidasi -= 1;
            }
          }
          setTimeout(function(){ 
            //Variable aleatoria para decidir si el enemigo saldra por el carril derecho o el izquierdo
            var rn = Phaser.Math.RND.between(0, 1);
            if (rn == 0){
              var pos = 225
            } else {
              var pos = 525
            }
            lenyador.enableBody(true, pos, 0, true, true);
            enemigoAbajo = false;
          }, 2000);
        }
        cnt++;
    }

    //movimiento platanos
    //preestablecer la velocidad de los platanos
    platanos.setVelocityY(velocidadEnemigo);
    var gPlat = platanos.getChildren();
    for(var n=0;n<gPlat.length;n++){
      var platano = gPlat[n];
      if(platano.y > 600)
      {
        //comprobar si los platanos han salido de pantalla
        platano.disableBody(true, true);
        setTimeout(function(){ 
          //Variable aleatoria para decidir si el enemigo saldra por el carril derecho o el izquierdo
          var rn = Phaser.Math.RND.between(0, 1);
          if (rn == 0){
            var pos = 225
          } else{
            var pos = 525
          }
          platano.enableBody(true,pos,0,true,true);
        }, rand * 10000);
      }
    }

    //aumento de dificultad
    if(incremento % 3000 == 0)
    {
      //incremento de velocidad de los enemigos, los polatanos
      velocidadEnemigo =  velocidadEnemigo * 1.05;
      //creacion de un enemigo adicional en cada carril
      enemigo.create(225,0,'lenyador').setScale(0.05);
      enemigo.create(525,0,'lenyador').setScale(0.05);
    }

    //disminucions de vidas
    var gcori = corai.getChildren();
    var gcord = corad.getChildren();
    //disminucion de vidas de la derecha
    if(vidasd<totald){
      var aux = gcord[totald - 1];
      aux.disableBody(true, true);
      totald -= 1;
    }
    //disminucion de vidas de la izquierda
    if(vidasi<totali){
      var aux = gcori[totali - 1];
      aux.disableBody(true, true);
      totali -= 1;
    }

    //perder minijuego
    if(vidasd == 0 || vidasi == 0){
      //si uno de los dos monos tiene 0 vidas, el juego acaba
      bg_music.stop();
      this.scene.switch('Menu');
    }

  }
}