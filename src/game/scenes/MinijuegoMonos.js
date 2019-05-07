import { Scene } from 'phaser';

var cursors;
var mono1;
var mono2;
var lenyador;
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

    //Añadir jugador
    mono1 = this.physics.add.image(400, 500, 'mono1');
    mono1.setScale(0.06);
    mono2 = this.physics.add.image(400, 500, 'mono2');
    mono2.setScale(0.06);
<<<<<<< Updated upstream
  }



=======

    //Añadir cocos
    cocos = this.add.group({
      classType: Cocos,
      maxSize: 2,
      runChildUpdate: true
    });

    //Añadir platanos
    var max = 20;
    var min = 10;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    platanos = this.physics.add.group();
    var y = Phaser.Math.RND.between(0, 600);
    platanos.create(0, y, 'platanos').setScale(0.03);
    this.physics.add.overlap(player, tortugas, collect, null, this);

    
    
  }
>>>>>>> Stashed changes
  update () {
  }
}