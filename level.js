// set all the blue moving tiles when the player loses a life to black tiles when the game restarts
function resetDrawing() {
  for (let i=0; i < height/20; i++){
    for (let j=0; j < width/20; j++){
      if (level[i][j] == -1){
        level[i][j] = 0;
      }
    }
  }
}
// The following for loops populate the 2D list, level, dynamically and leaves it blank
function initializeLevel() {
  let rows = []
  for (let i = 0; i < height/20; i++){
    rows = []
    for (let j =0; j < width/20; j++){
      rows.push(0);
    }
    level.push(rows)
  }
}

// The following block populates the fixed borders of the board
function resetLevel() {
  for (let i=0; i < height/20; i++){
    for (let j=0; j < width/20; j++){
      level[i][j] = 0;
      if (i == 0 || i == height/20-1 || j == 0 || j == width/20-1 ){
        level[i][j] = 1;
      }
    }
  }
}

// function to draw the tiles
function drawLevel() {
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == 1){
        image(tile,c*20,r*20,20,20);
      }
      if(level[r][c] == -1){
        image(movingTile,c*20,r*20,20,20);
      }
    }
  }
}

// returns the id of the tile in the array
function getTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  return level[y][x];
}
function getCoord(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  return x,y;
}

// modifies the tile to a blue moving tile
function modifyTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  level[y][x] = -1;
}
// deletes a tile
function deleteTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  level[y][x] = 0;
}
// deletes multiple tiles when a bomb goes off
function deleteTiles(x,y){
  deleteTile(x,y);
  deleteTile(x-20,y);
  deleteTile(x+20,y);
  deleteTile(x,y-20);
  deleteTile(x,y+20);
  deleteTile(x+20,y+20);
  deleteTile(x-20,y+20);
  deleteTile(x,y+40);

}
// when the player reaches the border, tranform moving tiles to solid wall tiles
function solidTiles(){
  let maxRow = 0, maxCol=0;
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == -1){
        // When a tile is changed from -1 to 1, it means the player created a line so the moving variable of the player is set to stopped
        player.moving = 'stopped'
        maxRow = max(maxRow, r);
        maxCol = max(maxCol, c);
        level[r][c] = 1;
      }
    }
  }
}
