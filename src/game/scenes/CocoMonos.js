var Cocos = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Cocos (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'coco');
    },

    fire: function (x, y)
    {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    },
    update: function (time, delta)
    {
        this.y -= 0.05 * delta;

        if (this.y < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        } 
    }
});

export {Cocos};