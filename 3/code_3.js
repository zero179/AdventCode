const fs = require('fs');

// Function to calculate the power consumption
function calculatePowerConsumption(diagnosticReport) {
  // Split the input into an array of binary numbers
  const binaryNumbers = diagnosticReport.trim().split("\n");
  const numBits = binaryNumbers[0].length; // Get the number of bits in each binary number

  // Initialize arrays to store the count of 0s and 1s for each bit position
  const zeroCounts = Array(numBits).fill(0);
  const oneCounts = Array(numBits).fill(0);

  // Count the occurrences of 0s and 1s at each bit position for all numbers
  for (const binaryNumber of binaryNumbers) {
    for (let i = 0; i < numBits; i++) {
      if (binaryNumber[i] === "0") {
        zeroCounts[i]++;
      } else {
        oneCounts[i]++;
      }
    }
  }

  // Calculate the gamma rate (most common bit at each position)
  const gammaRate = zeroCounts.map((zeroCount, i) =>
    zeroCount >= oneCounts[i] ? "0" : "1"
  ).join("");

  // Calculate the epsilon rate (least common bit at each position)
  const epsilonRate = zeroCounts.map((zeroCount, i) =>
    zeroCount <= oneCounts[i] ? "0" : "1"
  ).join("");

  // Convert binary rates to decimal and calculate power consumption
  const gammaDecimal = parseInt(gammaRate, 2);
  const epsilonDecimal = parseInt(epsilonRate, 2);
  const powerConsumption = gammaDecimal * epsilonDecimal;

  return powerConsumption;
}

// Read the diagnostic report data from the file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Calculate and display the power consumption
  const powerConsumption = calculatePowerConsumption(data);
  console.log('Power Consumption:', powerConsumption);
});