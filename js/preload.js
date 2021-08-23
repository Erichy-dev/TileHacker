export class Preloader extends Phaser.Scene{
  constructor(){
    super()
  }
  preload (){
    this.load.setPath('assets/audio/');
    this.load.audio('right', 'right.mp3');
    this.load.audio('select', 'select.mp3');
    this.load.audio('wrong', 'wrong.mp3', 'wrong.ogg');

    this.load.setPath('assets/font/')
    this.load.bitmapFont('score', 'gothic.png', 'gothic.xml');
    this.load.bitmapFont('ice', 'iceicebaby.png', 'iceicebaby.xml');
    this.load.bitmapFont('hyper', 'hyperdrive.png', 'hyperdrive.xml');

    this.load.setPath('assets/sprite/')
    this.load.image('button');
    this.load.image('start');
    this.load.spritesheet('tiles', 'tile.png', {frameWidth: 80}, {frameHeight: 80});

  }
  create(){
    this.scene.start('Cover');
  }
}