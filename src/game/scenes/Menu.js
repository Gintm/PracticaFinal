import { Scene } from 'phaser';


export default class Menu extends Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  create () {
    console.log("Starting Menu ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);

    //Poner una variable booleana que cuando ya hayas pulsado el boton se ponga a true y no te permita pulsar mas, ademas cambiar la imagen a colo gris(?)
    var clickedOso = false;
    var clickedDelfin = false;
    var clickedMonos = false;

    if (!clickedOso){
      //Boton oso
      const btnOso = this.add.text(100, 100, 'Minijuego Oso', { fill: '#0f0' });
      btnOso.setInteractive();
      btnOso.on('pointerup', () => this.scene.start('MinijuegoOso'));
      btnOso.on('pointerdown', clickedOso = true );
      //----
    }
    
    //Boton delfin
    const btnDlf = this.add.text(300, 100, 'Minijuego Delfin', { fill: '#0f0' });
    btnDlf.setInteractive();
    btnDlf.on('pointerup', () => this.scene.start('MinijuegoDelfin'));
    //----
    //Boton monos
    const btnMono = this.add.text(500, 100, 'Minijuego Monos', { fill: '#0f0' });
    btnMono.setInteractive();
    btnMono.on('pointerup', () => this.scene.start('MinijuegoMonos'));
    //----

  }

  update () {
  }

}
