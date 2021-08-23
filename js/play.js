export class Play{
  constructor (scene, score, highscore, localStorageName){
    this.scene = scene;
    this.score = score;
    this.highscore = highscore;
    this.localStorageName = localStorageName;
  }
  playTime(){
    this.checked = false;
    this.newTile;
    let previousTile;
    let scoreText = this.scene.add.bitmapText(50, 50,'score', "Score: " + this.score).setTint(0xFF5757);

    for (let i = 0,j = 0; i < 20; i++, j++) {
      let tile = this.scene.make.image({
        key: 'tiles', 
        frame: 10,
        add: true,
      }).setInteractive();
      this.scene.container.add(tile);

      if(j > 9)j = 0;

      tile.on('pointerup', () => {
        if(this.checked){
          this.checked = false;
          if(this.newTile.frame.name === j){
            this.scene.sound.play('right');
            scoreText.setText("Score: " + (this.score+=10));

            this.highscore = Math.max(this.score, this.highscore);
            console.log(this.highscore, 'score: ', this.score);
            localStorage.setItem(this.localStorageName, this.highscore);

            this.previousNewTile = this.newTile;
            this.revealTile(tile, j);

            this.scene.time.addEvent({
              delay: 100,
              callback: () => {
                tile.destroy(); 
                this.newTile.destroy();
                this.previousNewTile.destroy()
              },
              callbackScope: this,
              loop: false,
            });
            
          } else {
            this.scene.sound.play('wrong');
            previousTile.setVisible(true);
            this.scene.container.replace(this.newTile, previousTile);
            this.newTile.destroy();
          }
        } else {
          this.scene.sound.play('select');
          this.checked = true;
          (j + Phaser.Math.Between(0, 1)) > 8?j = j: j += Phaser.Math.Between(0, 1);
          this.revealTile(tile, j);
          previousTile = tile;
        }
      })
    }

    Phaser.Actions.GridAlign(this.scene.container.getAll(),{
      width: 5,
      height: 4,
      cellWidth: 100,
      cellHeight: 100,
      position: 6,
    });


  }

  revealTile (tile, j){
    this.newTile = this.scene.make.image({
      key: 'tiles',
      frame: j,
      add: false,
      scale: {
        x: 0.8,
        y: 0.8
      },
      x: tile.x,
      y: tile.y,
    });
    this.scene.container.replace(tile, this.newTile);
    tile.setVisible(false);
  }

}