import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/Menu'


function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        scene: [BootScene, Menu, MinijuegoOso, MinijuegoDelfin, MinijuegoMonos, MinijuegoFinal]
    })
}

export default launch
export {launch}
