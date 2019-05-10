import { Scene } from 'phaser';

var cursors;
var monod;
var monoi;
var enemigo;
var cocos;
var platanos;
var scoreText;
var score = 0;
var lastFired = 0;

export default class MinijuegoMonos extends Scene {
  constructor () {
    super({ key: 'MinijuegoMonos' });
  }

  create () {
    //Preparar escena
    console.log("Starting MinijuegoMonos ...");
    let i = this.add.image(400, 300, 'fondo_monos').setScale(0.6); //fondo
    console.log(i);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '24px', fill: '#000' });

    cursors = this.input.keyboard.createCursorKeys();
    cursors = this.input.keyboard.addKey('W');
    cursors = this.input.keyboard.addKey('E');

    //Añadir jugador
    mono1 = this.physics.add.image(400, 500, 'mono1');
    mono1.setScale(0.06);
    mono2 = this.physics.add.image(400, 500, 'mono2');
    mono2.setScale(0.06);
  

        setTimeout(function(){ 
          var pos_y = Phaser.Math.RND.between(0, 600);
          platanos.enableBody(true, 0, pos_y, true, true);
        }, rand * 1000);
    

    //Añadir Leñador
    enemigo = this.physics.add.image(400,500,'lenyador')
    
  }
  update (time, delta) {
    //Disparo mono izquierda
    if(cursors.left.isDown)
    {
      
    }
    else if(cursors.right.isDown)
    {

    }
    else if(cursors.W.isDown)
    {

    }
    else if(cursors.E.isDown)
    {

    }
    //Disparo mono derecha
  }
}