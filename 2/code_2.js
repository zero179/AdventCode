const fs = require('fs');

// Function to calculate the final position of the submarine based on the given commands
function calculateSubmarinePosition(commands) {
  let horizontalPosition = 0;
  let depth = 0;

  // Iterate through each command in the array of commands
  for (const command of commands) {
    // Split the command into action and value parts
    const [action, value] = command.split(' ');
    const numericValue = parseInt(value);

    // Update horizontal position and depth based on the action
    if (action === 'forward') {
      horizontalPosition += numericValue;
    } else if (action === 'down') {
      depth += numericValue;
    } else if (action === 'up') {
      depth -= numericValue;
    }
  }

  // Return the final horizontal position and depth
  return { horizontalPosition, depth };
}

// Read the planned course from the file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the data into an array of commands, removing empty lines
  const plannedCourse = data.split('\n').filter(command => command.trim() !== '');

  // Calculate the final position using the calculateSubmarinePosition function
  const { horizontalPosition, depth } = calculateSubmarinePosition(plannedCourse);

  // Calculate the result by multiplying the final horizontal position and depth
  const result = horizontalPosition * depth;

  // Print the final horizontal position, depth, and result
  console.log('Final Horizontal Position:', horizontalPosition);
  console.log('Final Depth:', depth);
  console.log('Result:', result);
});