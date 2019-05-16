import { Scene } from 'phaser';

var clickedOso = false;
var clickedDelfin = false;
var clickedMonos = false;
var btnOso;
var btnDlf;
var btnMono;
var btnFab;

export default class Menu extends Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  create () {
    console.log("Starting Menu ...");
    let i = this.add.image(400, 300, 'menu'); //fondo
    console.log(i);

    //Añadir imagenes botones
    btnOso = this.add.sprite(400, 300, 'bear', 0).setScale(0.75);
    btnDlf = this.add.sprite(400, 375, 'dolphin', 0).setScale(0.75);
    btnMono = this.add.sprite(400, 450, 'monkeys', 0).setScale(0.75);
    btnOso.setInteractive();
    btnDlf.setInteractive();
    btnMono.setInteractive();

    //Boton oso
    if (clickedOso == false){
      

      btnOso.on('pointerover', () => btnOso.setFrame(1));
      btnOso.on('pointerout', () => btnOso.setFrame(0));
      btnOso.on('pointerup', () => this.scene.start('MinijuegoOso'));
      btnOso.on('pointerdown', () => clickedOso = true);
    }
    else
    {
      btnOso.setFrame(1);
    }
    //----
    
    //Boton delfin
    if (clickedDelfin == false){

      btnDlf.on('pointerover', () => btnDlf.setFrame(1));
      btnDlf.on('pointerout', () => btnDlf.setFrame(0));
      btnDlf.on('pointerup', () => this.scene.start('MinijuegoDelfin'));
      btnDlf.on('pointerdown', () => clickedDelfin = true);
    }
    else{
      btnDlf.setFrame(1);
    }
    //----

    //Boton monos
    if(clickedMonos == false){

      btnMono.on('pointerover', () => btnMono.setFrame(1));
      btnMono.on('pointerout', () => btnMono.setFrame(0));
      btnMono.on('pointerup', () => this.scene.start('MinijuegoMonos'));
      btnMono.on('pointerdown', () => clickedMonos = true);
    }
    else
    {
      btnMono.setFrame(1);
    }
    //----

    if(clickedDelfin == true && clickedMonos == true && clickedOso == true)
    {
<<<<<<< HEAD
      btnFab = this.add.sprite(400, 525, 'fabric', 0).setScale(0.75);
      btnFab.setInteractive();
      btnFab.on('pointerover', () => btnFab.setFrame(1));
      btnFab.on('pointerout', () => btnFab.setFrame(0));
      btnFab.on('pointerup', () =>  this.scene.switch('MinijuegoFinal'));
=======
      this.scene.start('MinijuegoFinal');
      clickedDelfin = false;
      clickedMonos = false;
      clickedOso = false;
>>>>>>> master
    }
  }

  update () {
  }

}
