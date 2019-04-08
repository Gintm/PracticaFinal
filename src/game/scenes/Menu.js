import { Scene } from 'phaser';


export default class Menu extends Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  create () {
    console.log("Starting Menu ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);

    //Boton oso
    const btnOso = this.add.text(100, 100, 'Minijuego Oso', { fill: '#0f0' });
    btnOso.setInteractive();
    btnOso.on('pointerover', () => this.scene.start('MinijuegoOso'));
    //----
    //Boton delfin
    const btnDlf = this.add.text(300, 100, 'Minijuego Delfin', { fill: '#0f0' });
    btnDlf.setInteractive();
    btnDlf.on('pointerover', () => this.scene.start('MinijuegoDelfin'));
    //----
    //Boton monos
    const btnMono = this.add.text(500, 100, 'Minijuego Monos', { fill: '#0f0' });
    btnMono.setInteractive();
    btnMono.on('pointerover', () => this.scene.start('MinijuegoMonos'));
    //----

  }

  update () {
  }

}
