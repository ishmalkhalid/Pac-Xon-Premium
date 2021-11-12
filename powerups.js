// class to declare powerups
class Powerup {
	constructor(){
		// choose a graphic at random
		this.graphic = random([bolt, slow, ice, bomb]);
		// if it is a bomb
		if (this.graphic == bomb) {
			// get coordinates to place a bimb as it can only appear where there are solid tiles
			let coord = placeBomb();
			// if no coordinates are found to place a bomb
			if (coord == false){
				// choose one of the other 3 powerups
				this.graphic = random([bolt, slow, ice]);
				// find their coordinates 
				this.x = int(random(2*tileSize, width-2*tileSize));
   				this.y = int(random(2*tileSize, height-2*tileSize));
			}
			// if bomb coordinates are foumd
			else {
				// set bomb coordinates
				this.x = coord[0];
				this.y = coord[1];
				// set the framecount at which the bomb appeared
				this.pframe = frameCount;
			}
		}
		// if graphic is not bomb, set coordinates for the rest of the powerups
		else {
			this.x = int(random(2*tileSize, width-2*tileSize));
   			this.y = int(random(2*tileSize, height-2*tileSize));
		}
		// display the powerups, set their framecount, and their noise offset for perlin noise
		this.disp = true;
		this.p2frame = frameCount;
		this.xNoiseOffset = random(0,1000);
	}
	// display the powerups if their display property is true
	display(){
		if (this.disp == true) {
			// increase their size randomly with perlin noise
			let size = map(noise(this.xNoiseOffset), 0, 1, 0.75, 1.5);
			this.xNoiseOffset += 0.01;
			image(this.graphic, this.x, this.y, 25*size,25*size);
		}
  	}
  	// interactions of powerups with player and enemy
  	effect() {
  		// if graphic is snail or ice
  		if (this.graphic == slow || this.graphic == ice) {
  			// if graphic comes in contact with player
	  		if (dist(this.x, this.y, player.x, player.y) < 20) {
	  			// record frame count
	  			this.pframe = frameCount;
	  			// change speed of all enemies
	  			for (let i = 0; i < enemy.length; i++) {
	  				// if snail. slow them down
  					if (this.graphic == slow) {
  						enemy[i].speedX = enemy[i].speedX/2;
  						enemy[i].speedY = enemy[i].speedY/2;
  						enemy[i].speed = 0.001;
  					}
  					// if ice speed them up
  					else if (this.graphic == ice){
  						enemy[i].speedX = 0;
  						enemy[i].speedY = 0;
  						enemy[i].speed = 0;
  					}
	  			}
	  			// stop displaying them
	  			this.disp = false;
	  			this.x=-100;
	  			this.y=-100;
	  			// play collection sound
	  			collectionsound.play();
	  		}
	  		// if 5 sec have passed since powerup came in contact with player
  			if (frameCount - this.pframe >= 300){
  				// return enemies' speeds to normal
  				for (let i = 0; i < enemy.length; i++) {
	  				enemy[i].speedX = enemy[i].pspeedX;
	  				enemy[i].speedY = enemy[i].pspeedY;
	  				enemy[i].speed = enemy[i].pspeed;
	  			}
	  			// remove powerup from array
	  			powerups.splice(0, 1);
	  			// this.pframe = 0;
  			} 
  			// if powerup has been displayed for 6 seconds
  			if (this.disp == true && frameCount - this.p2frame >= 360){
	  			// remove powerup from array
	  			powerups.splice(0, 1);
	  			// this.pframe = 0;
  			} 
  		}
  		// if graphic is a bolt
  		if (this.graphic == bolt) {
  			// if it comes in contact with player
	  		if (dist(this.x, this.y, player.x, player.y) < 20) {
	  			// increase player's speed, set frmae count and stop displaying powerup
	  			this.pframe = frameCount;
	  			player.speed = 6;
	  			this.disp = false;
	  			this.x=-100;
	  			this.y=-100;
	  			// play sound
	  			collectionsound.play();

  			}

  			// power up comes in contact with any of the enemies
  			for (let i = 0; i < enemy.length; i++) {
				if (dist(this.x, this.y, enemy[i].x, enemy[i].y) < 20) {
					console.log("enemy touched bolt")
					// stop displaying bolt and set frame count
		  			this.pframe = frameCount;
		  			this.disp = false;
		  			this.x=-100;
		  			this.y=-100;
		  			collectionsound.play();
		  			// increase speed of all teh enemies
		  			for (let i = 0; i < enemy.length; i++) {
		  				console.log("speed increase")
						enemy[i].speedX = 4;
						enemy[i].speedY = 4;
						enemy[i].speed = 0.009;
					}
					break;
				}
  			}
  			// if bolt effect has lasted for 5 sec
			if (frameCount - this.pframe >= 300){
				// reset player's speed to normal
				player.speed = player.pspeed;
				// reset all enemies' speed to normal
				 for (let i = 0; i < enemy.length; i++) {
					enemy[i].speedX = enemy[i].pspeedX;
					enemy[i].speedY = enemy[i].pspeedY;
					enemy[i].speed = enemy[i].pspeed;
				}
				// remove powerup from array
				powerups.splice(0, 1);
				// this.pframe = 0;
			}
			 // if bolt has not been collected
			if (this.disp == true && frameCount - this.p2frame >= 360){
	  			// remove powerup from array
	  			powerups.splice(0, 1);
	  			// this.pframe = 0;
	  		}

  		}
  		// if graphic is bomb
  		else if (this.graphic == bomb) {
  			// if bomb comes in contat with player
  			if (dist(this.x, this.y, player.x, player.y) < 20) {
  				// remove bomb from array and play sound
  				powerups.splice(0, 1);
  				collectionsound.play();
  			}
  			// if bomb has not been collected delete tiles
			else if (frameCount - this.pframe >= 180){
				deleteTiles(this.x, this.y);
				powerups.splice(0, 1);
				// this.pframe = 0;
			}
  		}
  	}
}

// function to find suitable coordinates to place bomb
function placeBomb() {
	// select a random solid tile for the bomb except for teh borders
  let x = random(4*tileSize, width-5*tileSize);
  let y = random(4*tileSize, height-5*tileSize);
  let count = 0;
// while random position is not on a solid tile, keep find a new position 5 more times
  while (getTile(x, y) == 0 && count < 5) {
    x = int(random(4*tileSize, width-5*tileSize));
    y = int(random(4*tileSize, height-5*tileSize));
    count += 1;
  }
  // if new position is found
  if (count < 5) {
  	// return its coordinates
    return [x, y];
  }
  // if not
  else {
  	// return false
    return false;
  }
}
