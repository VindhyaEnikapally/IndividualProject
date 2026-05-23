# Online Code Judge

An Online Code Judge platform built using the MERN Stack that allows users to write, run, and evaluate code in multiple programming languages.
The project supports JavaScript, Python, C++, and Java with real-time execution and basic performance analysis.


# Features

* User Registration & Login
* JWT Authentication
* Monaco Code Editor
* Run Code Instantly
* Evaluate Code Performance
* Supports Multiple Languages

  * JavaScript
  * Python
  * C++
  * Java
* Displays:

  * Output
  * Execution Time
  * Memory Usage
  * Time Complexity
  * Final Score
  * Rating
* Responsive UI
* Dark Theme Interface

# Technologies Used

## Frontend

* React.js
* Axios
* Monaco Editor
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Code Execution API

* Judge0 API

# Folder Structure

```txt
Online-Code-Judge/
│
├── backend/
│   ├── analyzers/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── components/
│   ├── styles/
│   ├── App.js
│   └── index.js
│
└── README.md

# Evaluation Parameters

The platform evaluates code using:

* Execution Time
* Memory Usage
* Time Complexity
* Optimization Score
* Final Rating

# Time Complexity Detection

The analyzer can identify:

| Pattern                   | Complexity |
| ------------------------- | ---------- |
| Single Loop               | O(n)       |
| Nested Loops              | O(n²)      |
| Triple Loops              | O(n³)      |
| Recursion                 | O(n)       |
| Fibonacci Style Recursion | O(2ⁿ)      |
| Divide & Conquer          | O(n log n) |

# Future Improvements

* Hidden Test Cases
* Custom Problems
* Leaderboard
* AI-based Code Suggestions
* Better Complexity Detection
* Compiler-Level Optimization Analysis
* Code Submission History
