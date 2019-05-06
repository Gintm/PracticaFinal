import { Scene } from 'phaser';


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




  update () {
  }
}