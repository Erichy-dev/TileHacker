export class Play{
  constructor (scene){
    this.scene = scene;
  }
  playTime(){
    let checked = false, newTile, previousTile;
    for (let i = 0,j = 0; i < 20; i++, j++) {
      let tile = this.scene.make.image({
        key: 'tiles', 
        frame: 10,
        add: true,
        scale: {
          x: 0.8,
          y: 0.8
        },
      }).setInteractive();
      this.scene.container.add(tile);

      if(j > 9)j = 0;

      tile.on('pointerup', () => {
        if(checked){
          checked = false;
          if(newTile.frame.name === j){ 
            newTile.destroy(); 
            tile.destroy()
          } else {
            previousTile.setVisible(true);
            this.scene.container.replace(newTile, previousTile);
            newTile.destroy();
          }
        } else {
          checked = true;
          newTile = this.scene.make.image({
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
          this.scene.container.replace(tile, newTile);
          previousTile = tile;
          tile.setVisible(false);
        }
      })
    }

  }
  
}