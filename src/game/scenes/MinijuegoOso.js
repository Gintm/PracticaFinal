import { Scene } from 'phaser';


export default class MinijuegoOso extends Scene {
  constructor () {
    super({ key: 'MinijuegoOso' });
  }

  create () {
    console.log("Starting MinijuegoOso ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    

    const bomb = this.physics.add.image(400, 200, 'oso');
    bomb.setScale(0.05);
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    //bomb.setVelocity(200, 20);

    const btnOso = this.add.text(100, 100, 'Volver', { fill: '#0f0' });
    btnOso.setInteractive();
    btnOso.on('pointerup', () => this.scene.start('Menu'));

  }

  update () {
  }
}
