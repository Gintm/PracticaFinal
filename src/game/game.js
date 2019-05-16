import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import Menu from './scenes/Menu'
import MinijuegoDelfin from './scenes/MinijuegoDelfin'
import MinijuegoOso from './scenes/MinijuegoOso'
import MinijuegoMonos from './scenes/MinijuegoMonos'
import MinijuegoFinal from './scenes/MinijuegoFinal'
import Start from './scenes/Start'

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: {y: 300},
                debug: false,
                setBounds: true
            }
        },
        scene: [BootScene, Menu, MinijuegoOso, MinijuegoDelfin, MinijuegoMonos, MinijuegoFinal, Start]
    })
}

export default launch
export {launch}
