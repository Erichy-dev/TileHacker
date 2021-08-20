import { Play } from './play.js';

class SceneA extends Phaser.Scene {
  constructor(){
    super();
  }
  preload (){
    this.load.spritesheet('tiles', 'tile.png', {frameWidth: 80}, {frameHeight: 80});
  }
  create(){
    this.container = this.add.container (100, 100);

    new Play(this).playTime();

    Phaser.Actions.GridAlign(this.container.getAll(),{
      width: 5,
      height: 4,
      cellWidth: 70,
      cellHeight: 70,
      position: 6,
    });

  }
}
window.onload = function (){
  const config = {
    scene: [ SceneA ]
  }
  const game = new Phaser.Game(config);
}