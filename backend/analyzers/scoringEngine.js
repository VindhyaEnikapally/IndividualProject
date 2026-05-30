/*
const generateScore = (
  complexityData,
  memoData,
  optimizationData,
  executionTime,
  memory) => {
  let score = 80;
  // TIME COMPLEXITY
  if(complexityData.timeComplexity === "O(1)"){
    score += 10;
  }
  if(complexityData.timeComplexity === "O(n)"){
    score += 5;
  }
  if(complexityData.timeComplexity === "O(n²)"){
    score -= 25;
  }
  // NESTED LOOPS
  if(complexityData.nestedLoops > 0){
    score -= 20;
  }
  // RECURSION
  if(complexityData.recursionDetected){
    score += 5;
  }
  // MEMOIZATION
  if(memoData.memoizationUsed){
    score += 10;
  }
  // MEMORY USAGE
  if(memory > 10000){
    score -= 10;
  }
  // EXECUTION TIME
  if(executionTime > 1){
    score -= 10;
  }
  // OPTIMIZATION QUALITY
  if(optimizationData.optimization === "Poor"){
    score -= 15;
  }
  if(optimizationData.optimization === "Average"){
    score -= 5;
  }
  if(optimizationData.optimization === "Good"){
    score += 5;
  }
  // LIMIT SCORE
  if(score > 95){
    score = 95;
  }
  if(score < 20){
    score = 20;
  }
  // RATING
  let rating = "";
  if(score >= 90){
    rating = "Highly Efficient";
  }
  else if(score >= 75){
    rating = "Very Good";
  }
  else if(score >= 60){
    rating = "Good";
  }
  else if(score >= 40){
    rating = "Average";
  }
  else{
    rating = "Needs Optimization";
  }
  return {
    score,
    rating
  };
};
module.exports = generateScore;
*/

const generateScore = (

  complexityData,

  executionTime,

  memory

) => {

  const complexity = complexityData.timeComplexity || "O(1)";

  let score = 100;

  // Time Complexity specific base scores
  if (complexity === "O(1)") {
    score = 98;
  } else if (complexity === "O(log n)") {
    score = 93;
  } else if (complexity === "O(√n)") {
    score = 90;
  } else if (complexity === "O(n)") {
    score = 86;
  } else if (complexity === "O(n log n)") {
    score = 82;
  } else if (complexity === "O(n²)") {
    score = 68;
  } else if (complexity === "O(n³)") {
    score = 52;
  } else if (complexity === "O(2ⁿ)") {
    score = 42;
  } else if (complexity === "O(n!)") {
    score = 30;
  } else {
    score = 85;
  }

  // Dynamic deduction based on execution time
  const timeDeduction = Math.min(10, Math.floor((executionTime || 0) * 50));
  score -= timeDeduction;

  // Dynamic deduction based on memory usage (in KB)
  const memoryDeduction = Math.min(15, Math.floor((memory || 0) * 0.0005));
  score -= memoryDeduction;

  // Limit bounds
  if(score > 100){
    score = 100;
  }
  if(score < 10){
    score = 10;
  }

  // RATING

  let rating = "";

  if(score >= 90){

    rating = "Highly Efficient";
  }

  else if(score >= 75){

    rating = "Very Good";
  }

  else if(score >= 60){

    rating = "Good";
  }

  else if(score >= 40){

    rating = "Average";
  }

  else{

    rating = "Needs Optimization";
  }

  return {

    score,

    rating
  };
};

module.exports = generateScore;