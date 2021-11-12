// The Ghosts class
class Ghost {
  // constructor to declare ghost x,y,graphic,speed
  constructor(){
    this.x = random(80, width-100);
    this.y = random(80, height-80);
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.speed = 0.005;
    this.graphic = blueGhost;
    // previous speed so enemies can return to their original speed after being affected by powerups
    this.pspeedX = this.speedX;
    this.pspeedY = this.speedY;
    this.pspeed = this.speed;
  }

  // displays the enemy
  display(){
    image(this.graphic, this.x, this.y, 20,20);
  }

  // detects players collisions with walls, player and powerups
  collision () {
    // set up sensor positions
    this.sensorLeft = this.x-3;
    this.sensorRight = this.x+tileSize+3;
    this.sensorTop = this.y-3;
    this.sensorBottom = this.y+tileSize+3;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // check the id of tiles in the 2d array at the sensor positions
    let id = getTile(this.middleX,this.middleY);
    let lid = getTile(this.sensorLeft,this.middleY);
    let rid = getTile(this.sensorRight,this.middleY);
    let uid = getTile(this.middleX, this.sensorTop);
    let bid = getTile(this.middleX, this.sensorBottom);

    // if enemies touch the walls (blue tiles), they bounce off
    // top sensor 
    if (uid == 1) {
      if(this.type != "follow"){
        this.y += 3;
      }
      this.speedY *= -1;
      this.pspeedY *= -1;
    }
    // bottom sensor
    if (bid == 1) {
      if(this.type != "follow"){
        this.y -= 3;
      }
      this.speedY *= -1;
      this.pspeedY *= -1;
    }
    // left sensor
    if (lid == 1) {
      if(this.type != "follow"){
        this.x += 3;
      }
      this.speedX *= -1;
      this.pspeedX *= -1;
    }
    // right sensor
    if (rid == 1) {
      if(this.type != "follow"){
        this.x -= 3;
      }
      this.speedX *= -1;
      this.pspeedX *= -1;
    }
    // detects collision with the player
    this.playerCollision(rid, lid, uid, bid);
    // detects collision with the snail and ice powerups
    this.powerupCollision();

    // add special wall eating effect of wall collision 
    // if enemy type is blue or red
    if (this.type == "eat" || this.type == "duplicate"){
      this.eat(rid, lid, uid, bid)
    }

  }
  // wall eating effect function for blue and red enemies
  eat(rid, lid, uid, bid) {
    // if right tile is a wall but not a border, delete tile
    if (rid == 1 && this.x < width-tileSize-30){
      deleteTile(this.sensorRight, this.middleY);
    }
    // if left tile is a wall but not a border, delete tile
    else if (lid == 1 && this.x > 30){
      deleteTile(this.sensorLeft, this.middleY);
    }
    // if top tile is a wall but not a border, delete tile
    else if (uid == 1 && this.y > 30){
      deleteTile(this.middleX, this.sensorTop);
    }
    // if bottom tile is a wall but not a border, delete tile
    else if (bid == 1 && this.y < height-tileSize-30){
      deleteTile(this.middleX, this.sensorBottom);
    }
  }
  // if enemy is blue, duplicate enemy when player comes in its radius
  duplicate() {
    // if player is within the radius of the enemy
    if (player.x >= this.x-40 && player.x <= this.x+60 && player.y >= this.y-40 && player.y <= this.y+60) {
      // this if condition is to ensure enemy only duplicates once even if the player stays in the radius
      if (this.dup == true){
        enemy.push(new BlueGhost());
        this.dup = false;
      }
    }
    // if player is out of the radius, and comes within it again, enemy can duplicate again
    else {
      this.dup = true
    }
  }
  // move the enemy by determining all collisions
  move() {
    this.collision();
    // pink enemy or red enemy bounces off walls
    if (this.type == "bounce" || this.type == "eat"){
      this.x += this.speedX;
      this.y += this.speedY;
    }
    // yellow enemy follows player
    else if (this.type == "follow"){
      let distX = player.x - this.x;
      let distY = player.y - this.y;

      this.x += this.speed * distX;
      this.y += this.speed * distY;
    }
    // blue enemy has a ring around it and it bounces
    else if (this.type == "duplicate"){
      noFill();
      stroke(0,255,255);
      ellipse(this.x + 10,this.y + 10, 100);
      this.duplicate();
      this.x += this.speedX;
      this.y += this.speedY;

    }
  }
  // if enemy collides with player
  playerCollision(rid, lid, uid, bid) {
    // if enemy comes in contact with "moving blue" tiles or the player itself
    if(lid == -1 || rid == -1 || uid == -1 || bid == -1 || dist(this.x, this.y, player.x, player.y) < 20){
      // play sound
      collisionsound.play();
      // reset player position, graphic, speed, lives
      player.x = 0;
      player.y = 0;
      player.graphic = rightPacXon;
      player.currKeyCode = 0;
      player.lives -= 1;
      // if it bounces off the left moving blue tiles and right tile is not equal to wall jump off 10 pixels to the right
      if (lid == -1 && rid != 1){
        this.x += 10;
      }
      // if it bounces off the right moving blue tiles and left tile is not equal to wall jump off 10 pixels to the left
      else if (rid == -1 && lid != 1){
        this.x -= 10;
      }
      // if it bounces off the top moving blue tiles and bottom tile is not equal to wall jump off 10 pixels to the bottom
      else if (uid == -1 && bid != 1){
        this.y += 10;
      }
      // if it bounces off the bottom moving blue tiles and top tile is not equal to wall jump off 10 pixels to the top
      else if (bid == -1 && uid != 1){
        this.y -= 10;
      }

      // if comes in contact with player, bounce in opposit direction if possible
      if (dist(this.x, this.y, player.x, player.y) < 20) {
        if (rid != 1 || rid != -1){
          this.x += 10;
        }
        else if (lid != 1 || lid != -1){
          this.x -= 10;
        }
        else if (uid != 1 || uid != -1){
          this.y -= 10;
        }
        else if (bid != 1 || bid != -1){
          this.y += 10;
        }

      }
      // if the lives of player are less than or equal to zero
      if (player.lives <= 0){
        // display lives in html 
        let window_score = document.getElementById('current_lives')
        window_score.innerHTML = player.lives;
        // display lives in html 
        let window_timer = document.getElementById('current_timer');
        window_timer.innerHTML = timer + 's';
        // display game over screen
        endscreen = true;
        // reset player lives
        player.lives = 3;
        // reset player speed
        player.speed = player.pspeed;
        // reset timer
        timer = 100;
        // reset powerups
        powerups = [];
        // remove the blue moving tiles
        resetLevel();
        // reset enemy array
        allLevels();
        // play sound
        gameoversound.play();
      }
      // else if player lives are not yet zero but collision with enemy occurs then just remove the blue moving tiles
      else {
          resetDrawing();
      }
    }
  }

  // detect enemy collsions with powerups
  powerupCollision() {
    // if powerup array is not empty
    // and the powerup is snail or ice
    if (powerups.length != 0 && (powerups[0].graphic == slow || powerups[0].graphic == ice)) {
      // if powerup collision with enemy
      if (dist(this.x, this.y, powerups[0].x, powerups[0].y) < 20) {
        // console.log("enemy touched ice/slow")
        // set previous frame
        this.pframe = frameCount;
        // if the power up is snail, decrease player's speed
        if (powerups[0].graphic == slow) {
          player.speed = 1;
        }
        // if power up is ice, freeze player
        else if (powerups[0].graphic == ice){
          player.speed = 0;
        }
        // stop displaying powerup and change its location to outside canvas
        powerups[0].disp = false;
        powerups[0].x=-100;
        powerups[0].y=-100;
        // play sound
        collectionsound.play();
      }
      // if current frame count - frame count when powerup was picked is 180 (3 sec)
      if (frameCount - this.pframe == 180){
        // return palyer's speed to normal and remove powerup from array
        console.log("return to normal")
        player.speed = player.pspeed;
        powerups.splice(0, 1);
        // this.pframe = 0;
      }

    }
  }
}

// pink ghost class, inherits ghost class
class PinkGhost extends Ghost{
  constructor(){
    super();
    this.speedX = random(1.5, 3);
    this.speedY = random(1.5, 3);
    this.graphic = pinkGhost;
    this.type = "bounce";
  }
}
// blue ghost class, inherits ghost class
class BlueGhost extends Ghost{
  constructor(){
    super();
    this.graphic = blueGhost;
    this.speedX = random(1.5, 3);
    this.speedY = random(1.5, 3);
    this.type = "duplicate";
  }


}
// red ghost class, inherits ghost class
class RedGhost extends Ghost{
  constructor(){
    super();
    this.graphic = redGhost;
    this.type = "eat";
  }
}
// yellow ghost class, inherits ghost class
class YellowGhost extends Ghost{
  constructor(){
    super();
    this.graphic = yellowGhost;
    this.type = "follow";
  }
}
