export class Cover extends Phaser.Scene{
  constructor(){
    super('Cover');
  }
  create(){
    let button1 = this.make.image({
      x:400,
      y:450,
      key:'button',
    }).setInteractive();

    let startButt = this.make.image({
      x:1000,
      y:450,
      key:'start',
    }).setInteractive();

    let text = this.add.dynamicBitmapText(300, 430, 'ice', 'MUSIC', 50).setTint('0xff2299');
    let startText = this.add.dynamicBitmapText(940, 430, 'ice', 'PLAY', 50).setTint('0xff2299');
    
    this.tweens.add({
      targets: [text, startText],
      alpha: {from: 0.5, to: 1},
      ease: 'Linear',
      duration: 2000,
      repeat: -1,
      yoyo: true 
    });

    let musicOff = false;
    button1.on('pointerup', () =>{
      if(!musicOff){
        text.setText('musicoff');
        this.sound.setMute(true);
        musicOff = true;
      }else {
        this.sound.setMute(false);
        musicOff = false;
        text.setText('MUSIC');
      }
    });

    startButt.on('pointerup', () => {
      this.scene.sleep();
      this.scene.launch('SceneA');
    })
    
    let gameTitle = this.add.dynamicBitmapText(200, 200, 'ice', 'TILE HACKER', 150).setTint('0xff2299');
    gameTitle.setDisplayCallback(this.textCallback);

  }
  textCallback (data) {
    let rainbow = [0xFF5757, 0xE8A241, 0x97FF7F, 0x52BFFF, 0x995DE8];
    data.color = rainbow[Phaser.Math.Between(0, 5)];

    data.x = Phaser.Math.Between(data.x -2, data.x + 2);
    data.y = Phaser.Math.Between(data.y - 2, data.y + 2);
    return data;
  }

}