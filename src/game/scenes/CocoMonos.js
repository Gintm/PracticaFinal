var Cocos = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Cocos (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'coco');
    },

    fire: function (x, y)
    {
        //Aqui tengo que pasarle la posicion que quiero poner el coco
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    },
});

export {Cocos};