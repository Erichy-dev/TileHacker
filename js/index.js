import { Play } from './play.js';
import { Cover } from './cover.js';
import { GameOver } from './gameOver.js';
import { Preloader } from './preload.js';

let timer = 60, timerText, tiktok = 0, elapsedTime, j = 1000, sceneTime, highscoreText;
var score = 0;
let localStorageName = "tilehacker";
let highscore = localStorage.getItem(localStorageName) === null? 0: localStorage.getItem(localStorageName);

class SceneA extends Phaser.Scene {
  constructor(){
    super({
      key: 'SceneA',
    });
  }
  create(){
    this.container = this.add.container (300, 250);

    new Play(this, score, highscore, localStorageName).playTime();

    highscoreText = this.add.bitmapText(400, 50,'score', "HighScore: " + highscore).setTint(0xE8A241);

    timerText = this.add.bitmapText(900, 50,'score', timer).setTint(0x52BFFF);
  }
  update(time, delta){
    tiktok += 1;
    if(tiktok === 1){elapsedTime = time;}
    sceneTime = time - elapsedTime;
    if(sceneTime > j) {
      timer -= 1;
      timerText.setText(timer);
      j += 1000;
    }

    if(timer === 0 || score === 100){
      sceneTime = undefined;
      score = 0;
      timer = 60;
      tiktok = 0;
      elapsedTime = undefined;
      j = 1000;
      this.scene.start('GameOver');
    }
  }

}
window.onload = function (){
  const config = {
    type: Phaser.Auto,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autocenter: Phaser.Scale.CENTER_BOTH,
      parent: 'phaserGame',
    },
    scene: [ Preloader, Cover, SceneA, GameOver ]
  }
  const game = new Phaser.Game(config);
}

export { SceneA };