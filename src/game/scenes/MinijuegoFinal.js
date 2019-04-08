import { Scene } from 'phaser';


export default class MinijuegoFinal extends Scene {
  constructor () {
    super({ key: 'MinijuegoFinal' });
  }

  create () {
    console.log("Starting MinijuegoFinal ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    


//    const bomb = this.physics.add.image(400, 200, 'bomb');
//    bomb.setCollideWorldBounds(true);
//    bomb.body.onWorldBounds = true; // enable worldbounds collision event
//    bomb.setBounce(1);
//    bomb.setVelocity(200, 20);

  }

  update () {
  }
}