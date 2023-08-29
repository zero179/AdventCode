// Import the 'fs' module to work with the file system
const fs = require('fs');

// Read the heightmap data from the file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    // If an error occurs while reading the file, log the error message and return
    console.error('Error reading the file:', err);
    return;
  }

  // Convert the heightmap data to a 2D array of numbers
  const heightmap = data.trim().split('\n').map(row => row.split('').map(Number));

  // Function to check if a cell is a low point
  function isLowPoint(row, col) {
    const currentHeight = heightmap[row][col];

    // Define the neighboring cells' offsets
    const neighbors = [
      { dx: -1, dy: 0 }, // Left
      { dx: 1, dy: 0 },  // Right
      { dx: 0, dy: -1 }, // Up
      { dx: 0, dy: 1 }   // Down
    ];

    // Iterate through the neighboring cells
    for (const neighbor of neighbors) {
      const newRow = row + neighbor.dy;
      const newCol = col + neighbor.dx;

      // Check if the neighboring cell is within bounds and lower or equal in height
      if (
        newRow >= 0 && newRow < heightmap.length &&
        newCol >= 0 && newCol < heightmap[0].length &&
        heightmap[newRow][newCol] <= currentHeight
      ) {
        return false; // Current cell is not a low point
      }
    }

    return true; // Current cell is a low point
  }

  // Calculate the sum of risk levels of all low points
  let sumOfRiskLevels = 0;

  // Iterate through each cell in the heightmap
  for (let row = 0; row < heightmap.length; row++) {
    for (let col = 0; col < heightmap[0].length; col++) {
      if (isLowPoint(row, col)) {
        // Calculate risk level for the low point cell and add to the sum
        const riskLevel = heightmap[row][col] + 1;
        sumOfRiskLevels += riskLevel;
      }
    }
  }

  // Output the final sum of risk levels
  console.log('Sum of Risk Levels:', sumOfRiskLevels);
});
