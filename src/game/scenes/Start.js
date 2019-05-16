import { Scene } from 'phaser';

var cursors;


export default class Start extends Scene {
  constructor () {
    super({ key: 'Start' });
}

    create()
    {
        console.log("Estas en start");
        cursors = this.input.keyboard.createCursorKeys();

        var txt = this.make.text({
            x: 0,
            y: 0,
            text: 'PRESS SPACE TO START',
            style: {
                fontSize: '42px',
                fontFamily: 'MV Boli',
                color: '#bbbbbb',
            },
            add: true
        });

        txt.setPosition(400 - (txt.displayWidth / 2), 300 - (txt.displayHeight / 2));

        txt.setInteractive().on('pointerover', function() {
            txt.setFill('#ffffff'); 
        });

    }

    update ()
    {
        if (cursors.space.isDown)
        {
            this.scene.start('Menu');
        }
    }
}