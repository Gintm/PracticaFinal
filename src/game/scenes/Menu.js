import { Scene } from 'phaser';

    var clickedOso = false;
    var clickedDelfin = false;
    var clickedMonos = false;


export default class Menu extends Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  create () {
    console.log("Starting Menu ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);

    //Añadir imagenes y filtro gris
    //Boton oso
    if (clickedOso == false){
      const btnOso = this.add.text(100, 100, 'Minijuego Oso', { fill: '#0f0' });
      btnOso.setInteractive();
      btnOso.on('pointerup', () => this.scene.start('MinijuegoOso'));
      btnOso.on('pointerdown', () => clickedOso = true);
    }
    else
    {
      const btnOso = this.add.text(100, 100, 'Minijuego Oso', { fill: '#fff' });
    }
    //----
    
    //Boton delfin
    if (clickedDelfin == false){
      const btnDlf = this.add.text(300, 100, 'Minijuego Delfin', { fill: '#0f0' });
      btnDlf.setInteractive();
      btnDlf.on('pointerup', () => this.scene.start('MinijuegoDelfin'));
      btnDlf.on('pointerdown', () => clickedDelfin = true);
    }
    else{
      const btnDlf = this.add.text(300, 100, 'Minijuego Delfin', { fill: '#fff' });
    }
    //----

    //Boton monos
    if(clickedMonos == false){
      const btnMono = this.add.text(500, 100, 'Minijuego Monos', { fill: '#0f0' });
      btnMono.setInteractive();
      btnMono.on('pointerup', () => this.scene.start('MinijuegoMonos'));
      btnMono.on('pointerdown', () => clickedMonos = true);
    }
    else
    {
      const btnMono = this.add.text(500, 100, 'Minijuego Monos', { fill: '#fff' });
    }
    //----

    if(clickedDelfin == true && clickedMonos == true && clickedOso == true)
    {
      this.scene.start('MinijuegoFinal');
    }

  }

  update () {
  }

}
