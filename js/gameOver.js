import {Cover} from "./cover.js"
let highscore = localStorage.getItem('tilehacker');
export class GameOver extends Phaser.Scene{
  constructor(){
    super('GameOver');
  }
  create(){
    this.add.dynamicBitmapText(20, 100, 'hyper', 'Tap to restart', 100).setTint('0x52BFFF');
    let text = this.add.dynamicBitmapText(20, 200, 'hyper', 'GAME OVER', 250).setTint('0xff2299');
    let highscoreText = this.add.dynamicBitmapText(20, 500, 'hyper', 'highscore: ' + highscore, 100).setTint('0x995DE8');
    text.setDisplayCallback(new Cover().textCallback);

    this.input.on('pointerup', () => {
      this.scene.sleep()
      this.scene.launch('Cover')
    })
  }
}