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

  let score = 100;

  // TIME COMPLEXITY

  if(complexityData.timeComplexity === "O(n)"){

    score -= 10;
  }

  else if(
    complexityData.timeComplexity === "O(n²)"
  ){

    score -= 30;
  }

  else if(
    complexityData.timeComplexity === "O(n³)"
  ){

    score -= 50;
  }

  else if(
    complexityData.timeComplexity === "O(2ⁿ)"
  ){

    score -= 40;
  }

  // MEMORY

  if(memory > 15000){

    score -= 10;
  }

  // EXECUTION TIME

  if(executionTime > 1){

    score -= 10;
  }

  // LIMIT

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