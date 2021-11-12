// A recursive function with inspiration from https://learnersbucket.com/examples/algorithms/flood-fill-algorithm-in-javascript/
// The following function fills an enclosed region, basically some values bordered on all four sides by certain other value,
// with the new values that are provided.
// It basically replicates how the paint bucket system works in photoshop.
// The function is supposed to be given coordinates of a point in the region.
function fill_array(level, r, c, newColor, current){
  // Checks if the values are out of bound
    if(r < 0){
        return;
    }
    // Checks if the values are out of bound
    if(c < 0){
        return;
    }
    // Checks if the values are out of bound
    if(r > level.length){
        return;
    }
    // Checks if the values are out of bound
    if(c > level[r].length){
        return;
    }
    // Checks if there is any enemy inside of the region, if so
    // it increases the area count by a large amount in order to flag interval
    // The value of 2 is placed wherever the enemies are present as this function executes.
    if(level[r][c] === 2){
        count = 10000;
        return;
    }
    // A different value is encountered
    if(level[r][c] !== current){
        return;
    }
    // Changes the value at the array index
     level[r][c] = newColor;
     // Count to keep track of the 'area' of an enclosed region.
     count = count + 1;
     // the function recursivly calls itself t ensure all the neigbors are filled.
     fill_array(level, r - 1, c, newColor, current);
     fill_array(level, r + 1, c, newColor, current);
     fill_array(level, r, c - 1, newColor, current);
     fill_array(level, r, c + 1, newColor, current);
     // Returns the 2D Array
     return level
};
// Function to check all the coordinate pairs that have smaller area
function smallerPair(values){
    // initialize two lists
    areas = [];
    pairs = [];
    let enemfound = false;
    // Loops over all the coordinates
    for (let i = 0; i< values.length; i ++){
      // Calls the fill array function ONLY TO COUNT the area of the region in which the point lies.
      fill_array(level,values[i][0], values[i][1], 3, 0);
      // Stores the count into a local variable
      c1 = count;
      // Calls the fill array function to reset the modified values back to normal in the level array
      fill_array(level, values[i][0], values[i][1], 0, 3);
      // updates the global variable count
      count = 0;
      // Checks if the enemy is present
      if(c1<1000){
        areas.push(c1);
        pairs.push(values[i]);
        // Marks the enemy to not be found
        enemfound = true;
      }
    }
    // If the previous condition was not passed, it means the enemy was present in this block.
    if(enemfound == false){
      // The index with the maximum value, an outlier wtih a value of 10000 is removed from the list
      maxA = max(areas)
      maxIndex = areas.indexOf(maxA);
      pairs.splice(maxIndex,1);
    }
    // returns the pairs by excluding the biggest of the regions
    return pairs;
};
// Inspired from the Leet Code Problem Solution: https://dev.to/seanpgallivan/solution-max-area-of-island-4njk
// It returns one coordinate in each enclosed region
function maxAreaOfIsland(grid) {
  // Sets the maximum area to be very high since we need to take the minimum
    let maxArea = 10000
    // Directions over which to check next
    let compass = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    // Checks the previous row and previous columns
    let prow;
    let pcol;
    // An array to store all the coordinate values
    let smallVals = [];
    // Runs for the entire grid and calls the flood function if each value meets a certain criteria.
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                flood([[i, j]])
            }
        }
    }
    // Another flood function built differently for checking the enclosed box
    return maxArea, smallVals
    function flood(stack) {
      // initializes the area
        let currentArea = 0
        while (stack.length) {
            let [row, col] = stack.pop()
            if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 1) {
                continue
            }
            // increases the area
            currentArea++
            grid[row][col] = 1
            prow = row;
            pcol = col;
            for (const direction of compass) {
                stack.push([row + direction[0], col + direction[1]])
            }
        }
        // Pushes the row and column onto the list
        smallVals.push([prow,pcol]);
        // Gets the minium of all areas.
        maxArea = Math.min(maxArea, currentArea)
    }
};
// Function to make a deep copy of a 2D Array
function makeDeepCopy(g) {
  // initializes a new list
  var gridCopy = [];
  // Runs for all the lists within the big list
  for (var x = 0; x < g.length; x++) {
    // initializes an intermediary/ temporary row
    var newRow = [];
    // Runs a loop for the length of each list within the bigger list
    for (var y = 0; y < g[x].length; y++) {
      // adds the values to the temporary row
      newRow.push(g[x][y])
    }
    // Pushes the copied row into the new bigger row
    gridCopy.push(newRow);
  }
  // returns a newly created 2D Array/ List with the old list.
  return gridCopy;
};
