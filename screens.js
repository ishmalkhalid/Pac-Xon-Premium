// Function to load up the MENU Screen
function StartScreen(){
  image(main_image, 0, 0);
  // Pauses the gif on the MENU Screen after 3 seconds
  if (frameCount % 180 == 0){
    main_image.pause();
  }
}
// Function to check for specific clicks on the MENU Screen
function StartScreenClick(){
  // Checks if the rectanglular area around the 'New Game' button is clicked
    if(mouseX>285 && mouseX <475 && mouseY>230&& mouseY<275){
      // Sets the variables for the Levels screen to appear
      load_level = true;
      // Ensures that the positions for the clicks on the MENU page are not being checked
      checkMenuclick == false;
      // Plays the click sound
      clickedsound.play();
    }
    // Checks if the rectanglular area around the 'How To Play' button is clicked
    if(mouseX>285 && mouseX <475 && mouseY>285&& mouseY<330){
      // Sets the variables for the How To Play screen to appear
      loadhowtoplay = true;
      // Ensures that the positions for the clicks on the MENU page are not being checked
      checkMenuclick == false;
      // Plays the click sound
      clickedsound.play();
    }
    // Checks if the rectanglular area around the 'More Games' button is clicked
    if(mouseX>285 && mouseX <475 && mouseY>340&& mouseY<385){
      // Loads the more-games.html page in a new window
      window.open("more-games.html");
      // Plays the click sound
      clickedsound.play();
    }
}
// Function to load the How To Play screen image
function HowToPlayScreen(){
  image(howtoplay, 0, 0);
}
// Function to check if specific areas on the How to play screen have been clicked
function HowToPlayClick(){
    // Checks if the rectanglular area around the 'Return to Menu button is clicked
    if(mouseX>270 && mouseX <460 && mouseY>408&& mouseY<453){
      // Sets the variables to stop showing the how to play screen
      loadhowtoplay = false;
      // Does not check for click on the areas for the buttons on the how to play screen
      checkhowtoplay = false;
      // Plays the sound
      clickedsound.play();
    }
}

// Shows the appropriateimage according to the number of levels that are completed by a user.
function LevelScreen(){
  // Loads up the level one image if the user is on the first level
  if (mylevel == 1){
    image(level1, 0 ,0);
  }
  else if (mylevel == 2){
    image(level2, 0 ,0);
  }
  else if (mylevel == 3){
    image(level3, 0 ,0);
  }
  else if (mylevel == 4){
    image(level4, 0 ,0);
  }
  else if (mylevel == 5){
    image(level5, 0 ,0);
  }
  else if (mylevel == 6){
    image(level6, 0 ,0);
  }
  // Loads the overlayed image for the 'Return to Menu' option
  image(returnto, 0, 0);
}
// Function to check for any clicks on the Level Screen
function LevelScreenClick(){
    // Checks if the box around 'Return to Menu' is clicked
    if(mouseX>267 && mouseX <457 && mouseY>311&& mouseY<356){
      // Sets up the counters for any other clicks to happen to be false
      // Also sets the counters for the Level Screen to not be displayed anymore
      load_level = false;
      checkforselectlevel == false;
      clickedsound.play();
      checkhowtoplay = false;
      loadhowtoplay = false;
    }
    // The condition checks the number of levels 'unlocked' by the user and so allows for the appropriate number of them to be clicked by the user.
    if(mylevel >0){
      // Checks if the box around a specific level is clicked
      if(mouseX>118 && mouseX <193 && mouseY>215&& mouseY<293){
        // Plays the click sound
        clickedsound.play();
        // Initates the game by changing the state of the game
        gamestart = true;
        // Does not let the level screen to load again
        load_level =  false;
        // Does not allow for any click to work
        checkforselectlevel = false;
        // Sets the level to be displayed to be 1
        levels = 1;
        // Calls the function to load the appropriate enemies for that level
        levelOne();
      }
    }
    if(mylevel >1){
      if(mouseX>205 && mouseX <283 && mouseY>215&& mouseY<293){
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        checkforselectlevel = false;
        levels = 2;
        levelTwo();
      }
    }
    if (mylevel >2){
      if(mouseX>290 && mouseX <368 && mouseY>215&& mouseY<293){
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        checkforselectlevel = false;
        levels = 3;
        levelThree();
      }
    }
    if (mylevel >3){
      if(mouseX>375 && mouseX <453 && mouseY>215&& mouseY<293){
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        checkforselectlevel = false;
        levels = 4;
        levelFour();
      }
    }
    if(mylevel >4){
      if(mouseX>460 && mouseX <538 && mouseY>215&& mouseY<293){
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        checkforselectlevel = false;
        levels = 5;
        levelFive();
      }
    }
    if(mylevel >5){
      if(mouseX>545 && mouseX <623 && mouseY>215&& mouseY<293){
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        checkforselectlevel = false;
        levels = 6;
        levelSix();
      }
    }
}
