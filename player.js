//class to draw player
class Player {
  constructor(){
    // set player's position, lives, speed, graphic
    this.x = 0;
    this.y = 0;
    this.startMovingRight = false;
    this.startMovingDown = false;
    this.pKeyPress = 'None';
    this.moving = 'not moving';
    this.lives = 3;
    this.speed = 3;
    this.pspeed = this.speed;
    this.graphic = rightPacXon;
  }
  // display player
  display(){
    image(this.graphic, this.x, this.y, 20,20)
  }

  // move player
  move(){
    // set up middle of player positions
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // if a key is pressed
    if (keyIsPressed==true){
      // when the first key of teh game is pressed, set previous key code
      if (this.pKeyPress == 'None'){
        this.pKeyPress = keyCode;
      }
      // if not first key press
      else {
        // set player to moving state
        this.moving = 'moving';
        // if the previous key press is not equal to the current keycode
        if (this.pKeyPress != this.currKeyCode){
          // prev key code = current
          this.pKeyPress = this.currKeyCode;
          // round the player's movement so it moves box to box only
          // round x position
          let roundx = this.x%20
          if (roundx !=0){
            if (roundx >= 10){
              this.x = this.x + (20 - roundx);
            }
            else if(roundx < 10){
              this.x = this.x - roundx;
            }
          }
          // round y position
          let roundy = this.y%20
          if (roundy !=0){
            if (roundy >= 10){
              this.y = this.y + (20 - roundy);
            }
            else if(roundy < 10){
              this.y = this.y - roundy;
            }
          }
        }
        // get the id of the tile where the middle if the player lies
        let pos = getTile(this.middleX, this.middleY);

        // if it is a solid tile
        if(pos == 1){
          // if keycode is right key (D)
          if (keyCode ==68) {
            // set update keycode and change paxon graphic
            this.currKeyCode = 68;
            this.graphic = rightPacXon;
          }
          // if keycode is left key (A)
          if (keyCode ==65) {
            // set update keycode and change paxon graphic
            this.currKeyCode = 65;
            this.graphic = leftPacXon;
          }
          // if keycode is up key (W)
          if (keyCode ==87) {
            // / set update keycode and change paxon graphic
            this.currKeyCode = 87;
            this.graphic = upPacXon;
          }
          // if keycode is down key (S)
          if (keyCode ==83) {
            // / set update keycode and change paxon graphic
            this.currKeyCode = 83;
            this.graphic = downPacXon;
          }
        }
        // If the playeer is moving and creating blocks in the empty space, basically 'drawing the line'
        else{
          // If the player is going left, it cannot move left
          if (keyCode ==68 && this.currKeyCode!=65) {
            this.currKeyCode = 68;
            this.graphic = rightPacXon;
          }
          // If the player is going right, it cannot move right
          if (keyCode ==65 && this.currKeyCode!=68) {
            this.currKeyCode = 65;
            this.graphic = leftPacXon;
          }
          // If the player is going down, it cannot move down
          if (keyCode ==87 && this.currKeyCode!=83) {
            this.currKeyCode = 87;
            this.graphic = upPacXon;
          }
          // If the player is going up, it cannot move up
          if (keyCode ==83 && this.currKeyCode!=87) {
            this.currKeyCode = 83;
            this.graphic = downPacXon;
          }
        }
      }

    }
    // if current key code is 68 and x is less than the width, move right
    if (this.currKeyCode == 68 && this.x < width){
      this.x  += this.speed;
    }
    // if current key code is 65 and x is greater than 0, move left
    if (this.currKeyCode == 65 && this.x > 0){
      this.x  -= this.speed;
    }
    // if current key code is 87 and y is greater than 0, move up
    if (this.currKeyCode == 87 && this.y > 0){
      this.y  -= this.speed;
    }
    // if current key code is 83 and y is less than height, move down
    if (this.currKeyCode == 83 && this.y < height){
      this.y += this.speed;
    }

    // get id middle of tile
    let id = getTile(this.middleX, this.middleY);
    // declare next tile
    let nt;

    // Checks if the player is withing the empty space or is not in the border region
    if((this.middleX>20 && this.middleY>20 && this.middleX<width-20 && this.middleY<height-20)){
      // A few pixels to the right, left, up, and down are detected from the player
      this.sensorLeft = this.x-10;
      this.sensorRight = this.x+tileSize+10;
      this.sensorTop = this.y-10;
      this.sensorBottom = this.y+tileSize+5;

      // If the player is moving right, the next tile to the right of it is checked
      if(this.currKeyCode==68){
        nt = getTile(this.sensorRight,this.middleY);
      }
      // If the player is moving left, the next tile to the left of it is checked
      else if(this.currKeyCode==65){
        nt = getTile(this.sensorLeft,this.middleY);
      }
      // If the player is moving up, the next tile above of it is checked
      else if(this.currKeyCode==87){
        nt = getTile(this.middleX,this.sensorTop);
      }
      // If the player is moving down, the next tile below of it is checked
      else if(this.currKeyCode==83){
        nt = getTile(this.middleX,this.sensorBottom);
      }
    }
    // If the player comes into contact with the line that it is drawing itself
    if(nt == -1){
      // The position is reset
      player.x = 0;
      player.y = 0;
      // The graphic is reset
      player.graphic = rightPacXon;
      // The speed is reset
      player.currKeyCode = 0;
      // A life is lost
      player.lives -= 1;
      // Collision sound is played
      collisionsound.play();
      // The canvas is reset to borders only
      resetDrawing();
    }
    // If there is no tile at it's middle position
    else if (id == 0){
      // A blue tile for drawing the line is drawn
      modifyTile(this.middleX, this.middleY)
    }
    // If a  solid tile is encounter
    else if (id == 1) {
      solidTiles();
      // Checks if a line is created and gets completed.
      // It does this by checking if the player just got stopped
      if (this.moving == 'stopped'){
        // Then it changes the state of moving to be 'not moving' which means it hasnt started creating any lines
        this.moving = 'not moving';
        // Makes a deep copy of the level array
        var xyz = makeDeepCopy(level);
        // Gets all the positions of the enemies and then sets the
        // corresponding id in the Level array to be 2 to ensure that
         // the enemies are not being taken into account
        for (let i = 0; i < enemy.length; i++){
          // Makes sure that the yellow enemy is not taken into account
          if(enemy[i].type != "follow"){
            ghostx = int(enemy[i].middleX/tileSize);
            ghosty = int(enemy[i].middleY/tileSize)
            level[ghosty][ghostx] = 2;
          }
        }
        // Gets one coordinate from all the enclosed regions
        mArea, sVals = maxAreaOfIsland(xyz);
        // Gets a list of all the smaller regions' coordinates/ the ones to be removed
        let vals = smallerPair(sVals);

        // Resets the position where the enemies' corresponding positions were set to 2
        for (let i = 0; i < enemy.length; i++){
          if(enemy[i].type != "follow"){
            ghostx = int(enemy[i].middleX/tileSize);
            ghosty = int(enemy[i].middleY/tileSize)
            level[ghosty][ghostx] = 0;
          }
        }

        // Fills the level array, basically floods the enclosed region that meets the criteria
        for (let i = 0; i < vals.length; i++){
          fill_array(level, vals[i][0], vals[i][1], 1, 0);
        }
      }
    }
    // Contrains the x and y positions of the enemy to remain within the canvas width and onto the border tiles.
    this.x = constrain(this.x, 0, width-20);
    this.y = constrain(this.y, 0, height-20);
    }
  }
