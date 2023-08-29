const fs = require('fs');

// Read the sonar sweep report from the file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Store the content of the file in the 'reportData' variable
  const reportData = data;

  // Convert the report data to an array of depth measurements
  const measurements = reportData.trim().split('\n').map(Number);

  // Initialize a variable to count the number of measurements that are larger than the previous measurement
  let count = 0;

  // Initialize a variable to keep track of the previous measurement
  let prevMeasurement = measurements[0];

  // Iterate through the array of measurements starting from the second element
  for (let i = 1; i < measurements.length; i++) {
    // Check if the current measurement is larger than the previous measurement
    if (measurements[i] > prevMeasurement) {
      // Increment the count if the condition is met
      count++;
    }

    // Update the previous measurement for the next iteration
    prevMeasurement = measurements[i];
  }

  // Print the final count of measurements that are larger than the previous measurement
  console.log('Number of measurements larger than the previous:', count);
});