// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, rightPacXon, leftPacXon, upPacXon, downPacXon;
// Variables to store the ghosts/enemies
let redGhost, blueGhost, yellowGhost, pinkGhost;
// Variables to store the powerups
let bomb, ice, bolt, slow;
// Array to store all the powerups
let powerups = [];
// Store the tilesize for use throughout
let tileSize;
// Keeping a track of the area of an enclosed regions
let count = 0;
// Storing the count for a certain region
let c1 = 0;
// Storing the maxArea
let mArea;
// Variables to store the areas, and the coordinates for filling the enclosed regions.
let sVals = [];
let pVals = [];
let areas = [];
let tc;
// Sertting the timer for the game and initializing it to 100
let timer = 100;
// declaring and initializing the levels to be kept track of
let levels = 1;
// For storing all the enemies in the list
let enemy = [];
// Keeping track of the x and y positions of the ghost
let ghostx, ghosty;
// Checking if level should be up or not and initializing to false;
let level_up = false;
// State variables to keep track of the screens
let gamestart;
let checkMenuclick;
let load_level;
let loadhowtoplay;
let checkhowtoplay;
let gamebegin;
let checkforselectlevel;
let checkforStart;
let checkfornextLevel;
let levelupscreen;
let endscreen;
let checkforretry;
let gamecomplete;
let checkforfinish;
let mylevel;
// Variables to store all the images
let level1;
let level2;
let level3;
let level4;
let level5;
let level6;
let main_image;
let howtoplay;
let clicktostart;
let levelup;
let endimg;
let finish;
let returnto;
// Variables to store all the sounds
let gameoversound, movingsound, clickedsound, collectionsound, collisionsound, levelupsound, movement, bg;
// Declaring and initializingthe counter and max counter to calculate the percentage and keep track for the preloader
let counter = 1;;
let maxCounter = 34;

// Pre Loading all the assets
// The updateCounter parameter is passed in each loadXYZ() function to call the updateCounter function for progressing the pre-loader
function preload() {
  // Loading the tiles to be drawn
  tile = loadImage('assets/Tiles/tile.png', updateCounter);
  movingTile = loadImage('assets/Tiles/movingTile.png', updateCounter);
  // Loading all Pac-Xon direction gifs
  rightPacXon = loadImage('assets/Paxon/right_paXon.gif', updateCounter);
  leftPacXon = loadImage('assets/Paxon/left_paXon.gif', updateCounter);
  upPacXon = loadImage('assets/Paxon/up_paXon.gif', updateCounter);
  downPacXon = loadImage('assets/Paxon/down_paXon.gif', updateCounter);
  // Loading all the Ghosts/ Enemies
  redGhost = loadImage('assets/Enemies/red-ghost.png', updateCounter);
  blueGhost = loadImage('assets/Enemies/blue-ghost.png', updateCounter);
  yellowGhost = loadImage('assets/Enemies/yellow-ghost.png', updateCounter);
  pinkGhost = loadImage('assets/Enemies/pink-ghost.png', updateCounter);
  // Loading all the screens
  main_image = loadImage('assets/Screens/home.gif', updateCounter);
  level1 = loadImage('assets/Screens/level1.png', updateCounter);
  level2 = loadImage('assets/Screens/level2.png', updateCounter);
  level3 = loadImage('assets/Screens/level3.png', updateCounter);
  level4 = loadImage('assets/Screens/level4.png', updateCounter);
  level5 = loadImage('assets/Screens/level5.png', updateCounter);
  level6 = loadImage('assets/Screens/level6.png', updateCounter);
  howtoplay = loadImage('assets/Screens/howtoplay.png', updateCounter);
  clicktostart = loadImage('assets/Screens/clicktostart.png', updateCounter);
  levelup = loadImage('assets/Screens/levelcompleted.png', updateCounter);
  endimg = loadImage('assets/Screens/gameover.png', updateCounter);
  finish = loadImage('assets/Screens/congrats.png', updateCounter);
  returnto = loadImage('assets/Screens/returnmenu.png', updateCounter);
  // Loading all the powerups
  bomb = loadImage('assets/Extras/redbomb.png', updateCounter);
  ice = loadImage('assets/Extras/ice.png', updateCounter);
  bolt = loadImage('assets/Extras/lightning-bolt.png', updateCounter);
  slow = loadImage('assets/Extras/snail.png', updateCounter);
  // Loading all the sounds
  gameoversound = loadSound('assets/Sounds/gameover.mp3', updateCounter);
  movingsound = loadSound('assets/Sounds/movingsound.wav', updateCounter);
  clickedsound = loadSound('assets/Sounds/clicked.wav', updateCounter);
  collectionsound = loadSound('assets/Sounds/collection.wav', updateCounter);
  collisionsound = loadSound('assets/Sounds/collision.wav', updateCounter);
  levelupsound = loadSound('assets/Sounds/levelup.wav', updateCounter);
  bg = loadSound('assets/Sounds/bg.mp3', updateCounter);

}

function setup() {
  // initializing the canvas and storing a reference to it
  var canvasMain = createCanvas(760,500);
    // set the ID on the canvas element
  canvasMain.id("p5_mainCanvas");
  // set the parent of the canvas element to the element in the DOM with
  // an ID of "left"
  canvasMain.parent("#center");

  // initializing all the state variables for the screens
  gamestart = false;
  checkMenuclick = false;
  load_level = false;
  loadhowtoplay = false;
  checkhowtoplay =  false;
  gamebegin = false;
  checkforselectlevel =  false;
  checkforStart = false;
  levelupscreen = false;
  checkfornextLevel = false;
  endscreen = false;
  checkforretry = false;
  gamecomplete = false;
  checkforfinish = false;
  // initializing the value of mylevels for the levels to be accessed.
  mylevel = 1;

  // making use of the local storage API and obtaining the stored value of the levels that were previously ever completed by the user
  let user_levels = window.localStorage.getItem('levelsCompleted');
  // Checking if there was any data stored,
  if (user_levels) {
    // If so, the data from the local storage is used, otherwised the above initalized value is used instead.
    mylevel = int(user_levels)
  }
  // Declaring the tilesize
  tileSize = 20;
  // Populates the 2D Array with 0s
  initializeLevel();

  // Places 1s at the borders of the 2D Array
  resetLevel();
  tc = 0;
  player = new Player();
  // powerup = new Powerup();

  // Evening out the perlin noise
  noiseDetail(24);
  // Looping the background music

  bg.loop();
  // Setting the volume of the background music to a minimal value
  bg.setVolume(0.3);


}

function draw(){
  // When this is false, the MENU or the Level Selection screen appears
  if(gamestart == false){
    // If this if false, the MENU Screen will appear, which it will initially
    if (load_level == false){
      // If the how to play screen is clicked, the menu screen is not shown and instead the how to play screen is shown in the else {
      // When the how to play screen is closed, the menu screen appears again as the variable becomes false
      if (loadhowtoplay == false){
        // Clicks for the menu screen are detected
        checkMenuclick = true;
        // The Start Screen is shown
        StartScreen();
      }
      else{
        // The How To Play Screen is shown
        HowToPlayScreen();
        // Clicks for that screen are detected
        checkhowtoplay = true;
      }
    }
    // The Load Screen will appear instead of the Menu Screen
    else if(load_level == true){
      // When the load screen is loaded, the clicks for the Menu Screen are not detected
      checkMenuclick = false;
      // The Level Screen is showns
      LevelScreen();
      // Clicks for the Level Screen are detected after setting the next variable to true
      checkforselectlevel = true;
    }
  }
  // If the game start is true, the menu or any of the initial screens are not appearing
  else {
    // Fills the background with a black color
    background(0);
    // Draws the level, which in the first instance only draws the borders
    drawLevel();

    // If the game gets completed,
    if(gamecomplete == true){
      // The game complete screen is shown
      image(finish, 0, 0);
      // CLicks for that screen are detected
      checkforfinish = true;
    }
    else{
      // If the game ends
      if(endscreen == true){
        // The game end screen is shown and
        image(endimg, 0, 0);
        // Clicks for that screen are detected
        checkforretry =  true;
      }
      else{
        // If the level gets incremented,
        if(levelupscreen==true){
          // The level up screen is shown
          image(levelup, 0,0);
          // CLicks for that screen are detected
          checkfornextLevel = true;
        }
        else{
          // If the game has not begun yet, the click to start screen appears
          if(gamebegin==false){
            image(clicktostart, 0, 0);
            // Clicks for that screen are detected
            checkforStart = true;
          }
          if(gamebegin == true){
            // Shows the updated Lives on the HTML Page
            let window_score = document.getElementById('current_lives')
            window_score.innerHTML = player.lives;

            //player
            player.display();
            player.move();

            // If there is an existing powerup, it draws it in every frame and ensures the effect() function runs
            if (powerups.length > 0) {
              powerups[0].display();
              powerups[0].effect();
            }

            //Iterates through all the enemies and then displays and moves them
            for (let i = 0; i < enemy.length; i++){
              enemy[i].display();
              enemy[i].move();
            }

            // Shows the updated Progress on the HTML Page
            let window_progress = document.getElementById('current_progress')
            window_progress.innerHTML = completeLevel() + "%";


            // Shows the updated Levels on the HTML Page
            let window_level = document.getElementById('current_level')
            window_level.innerHTML = levels;


            // Makes the powerups appear after a certain time period and ensures only one powerup can appear at a time
            if (frameCount % 600 == 0 && powerups.length == 0) {
              // Adds a powerup to the list for powerups
              powerups.push(new Powerup())
            }

            // Shows the updated Timer on the HTML Page
            let window_timer = document.getElementById('current_timer');
            window_timer.innerHTML = timer + 's';
            // Decreases the timer every second until the timer is 0
            if (frameCount % 60 == 0 && timer > 0) {
              timer --;
            }
            // Calls the next level function to check if the level is complete, and if so, it increases the level
            nextLevel();
            // If the timer or the player lives become 0, the game ends!
            if (timer == 0 || player.lives == 0){
              // The timer and the lives are updated on the HTML Page
              let window_score = document.getElementById('current_lives')
              window_score.innerHTML = player.lives;
              let window_timer = document.getElementById('current_timer');
              window_timer.innerHTML = timer + 's';
              // The game end screen is trigerred
              endscreen = true;
              // The right image for the Pac Xon is loaded
              player.graphic = rightPacXon;
              // The direction and movement of the Pac-Xon is reset
              player.currKeyCode = 0;
              // The pacXon is repositioned at the first index of the array
              player.x = 0;
              player.y = 0;
              // reset player speed
              player.speed = player.pspeed;
              // The levels are reset
              // levels = 1;
              // powerups are emptied
              powerups = [];
              // The level is reset and only the borders are drawn
              resetLevel();
              // The lives of the player are reset
              player.lives = 3;
              // The timer is reset
              timer = 100;
              // The game over sound is played
              gameoversound.play();
              // The all levels function is called to choose the level
              allLevels();
            }

          }
        }
      }

    }
  }
}


function mousePressed(){
  // Checks for clicks on the Various screens
  if(checkMenuclick == true){
    StartScreenClick();
  }
  if(checkhowtoplay == true){
    HowToPlayClick();
  }
  if(checkforselectlevel == true){
    LevelScreenClick();
  }
  if(checkforStart == true){
    gamebegin =  true;
  }
  // Checks for clicks on the level up screens
  if(checkfornextLevel == true){
    // If the next option is clicked, the screen disappears
    if(mouseX>400 && mouseX <495 && mouseY>325&& mouseY<363){
      levelupscreen = false;
      clickedsound.play();
      checkfornextLevel == false;
      checkMenuclick = false;
    }
    // If the menu is clicked, the menu screen appears
    else if(mouseX>250 && mouseX <345 && mouseY>325&& mouseY<363){
      levelupscreen = false;
      gamestart = false;
      load_level = false;
      checkforselectlevel = false;
      checkfornextLevel == false;
      checkMenuclick = false;
      clickedsound.play();
    }
  }
  // Almost the same thing happens for the Game over screen
  if(checkforretry == true){
    // If the retry option is pressed
    if(mouseX>400 && mouseX <495 && mouseY>325&& mouseY<363){
      endscreen = false;
      checkforretry =  false;
      checkMenuclick = false;
      clickedsound.play();
    }
    // Or if the menu option is pressed
    else if(mouseX>250 && mouseX <345 && mouseY>325&& mouseY<363){
      // endscreen = false;
      endscreen = false;
      gamestart = false;
      load_level = false;
      checkforselectlevel = false;
      checkforretry =  false;
      checkMenuclick = false;
      clickedsound.play();
    }
  }
  // Checks for clicks on the 'Return to Menu' button on the screen that shows up when the game is completed
  if(checkforfinish == true){
    // rect(279, 318, 190, 45);
    if(mouseX>279 && mouseX <469 && mouseY>318&& mouseY<363){
      gamestart = false;
      gamecomplete = false;
      load_level = false;
      checkforselectlevel = false;
      clickedsound.play();
    }
  }
}
// Update counter function used within preload
function updateCounter() {
  // increase our counter
  counter++;

  // use the counter to set the style on the '#progress_bar' div
  let progress_bar = document.querySelector('#progress_bar');
  // The percentage is calculated
  progress_bar.style.width = int(counter/maxCounter*100) + "%";
}
