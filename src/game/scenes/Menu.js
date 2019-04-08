import { Scene } from 'phaser';


export default class Menu extends Scene {
  constructor () {
    super({ key: 'Menu' });
  }

  create () {
    console.log("Starting Menu ...");
    let i = this.add.image(400, 300, 'sky'); //fondo
    console.log(i);
    
    /*this.createButton("cosa",400,300,300,100,function(){
      this.scene.start('MinijuegoOso');
    })*/

  }

  update () {
  }

 /* createButton(string,x,y,w,h,callback){
    var button1 = add.button(x,y,'button',callback,this,2,1,0);

    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;

    var txt = add.text(button1.x,button1.y,string,{font:"14px Arial",fill:"#fff",align:"center"});

    txt.anchor.setTo(0.5,0.5);

  }*/
}
