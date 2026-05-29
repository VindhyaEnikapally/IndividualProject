/*
const analyzeComplexity = (code) => {

  let nestedLoops = 0;

  let timeComplexity = "O(1)";

  let recursionDetected = false;

  // DETECT LOOPS

  const forLoops =
    (code.match(/for\s*\(/g) || []).length;

  const whileLoops =
    (code.match(/while\s*\(/g) || []).length;

  const totalLoops =
    forLoops + whileLoops;

  // NESTED LOOPS

  if(totalLoops >= 2){

    nestedLoops = totalLoops - 1;

    timeComplexity = "O(n²)";
  }

  else if(totalLoops === 1){

    timeComplexity = "O(n)";
  }

  // DETECT RECURSION

  const functionMatches = [
    ...code.matchAll(/function\s+(\w+)\s*\(/g)
  ];

  for(let match of functionMatches){

    const functionName = match[1];

    // remove declaration part

    const remainingCode =
      code.substring(match.index + match[0].length);

    // recursive call check

    if(
      remainingCode.includes(
        `${functionName}(`
      )
    ){

      recursionDetected = true;

      timeComplexity = "O(n)";

      break;
    }
  }

  return {

    timeComplexity,

    nestedLoops,

    recursionDetected
  };
};

module.exports = analyzeComplexity;



const analyzeComplexity = (code) => {

  console.log("ANALYZER RUNNING");

  return {

    timeComplexity: "O(n)",

    nestedLoops: 0,

    recursionDetected: true
  };
};

module.exports = analyzeComplexity;
*/


function getFunctionBody(code, functionName, language) {
  const lines = code.split("\n");
  let startIdx = -1;
  
  // Find where the function starts
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (language === "python") {
      if (line.includes("def " + functionName)) {
        startIdx = i;
        break;
      }
    } else if (language === "javascript") {
      if (line.includes("function " + functionName) || line.includes(functionName + " =") || line.includes(functionName + "=")) {
        startIdx = i;
        break;
      }
    } else {
      // C++ / Java
      if (line.includes(functionName) && line.includes("(")) {
        // Ensure it's not a semicolon (declaration only) or main
        if (!line.includes(";") && !line.includes("main")) {
          startIdx = i;
          break;
        }
      }
    }
  }

  if (startIdx === -1) return code; // fallback to entire code

  if (language === "python") {
    // Get indentation of the def line
    const defLine = lines[startIdx];
    const indentMatch = defLine.match(/^\s*/);
    const defIndent = indentMatch ? indentMatch[0].length : 0;
    
    let bodyLines = [defLine];
    for (let i = startIdx + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") {
        bodyLines.push(line);
        continue;
      }
      const lineIndent = (line.match(/^\s*/) || [""])[0].length;
      if (lineIndent <= defIndent) {
        break; // end of function body
      }
      bodyLines.push(line);
    }
    return bodyLines.join("\n");
  } else {
    // Brackets matching for JS / C++ / Java
    let bodyLines = [];
    let braceCount = 0;
    let started = false;
    
    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i];
      bodyLines.push(line);
      
      for (let char of line) {
        if (char === "{") {
          braceCount++;
          started = true;
        } else if (char === "}") {
          braceCount--;
        }
      }
      
      if (started && braceCount === 0) {
        break; // found matching closing brace
      }
    }
    return bodyLines.join("\n");
  }
}

function analyzeComplexity(code, language) {

  let timeComplexity = "O(1)";

  // 1. Strip comments
  let cleanCode = code;
  if (language === "python") {
    cleanCode = code.split("\n").map(line => line.split("#")[0]).join("\n");
  } else {
    let noMulti = code.replace(/\/\*[\s\S]*?\*\//g, "");
    cleanCode = noMulti.split("\n").map(line => line.split("//")[0]).join("\n");
  }

  const lowerCode = cleanCode.toLowerCase();

  // =========================
  // SPECIAL ALGORITHMS
  // =========================

  // MERGE SORT

  if(
    lowerCode.includes("merge(") ||
    lowerCode.includes("mergesort")
  ){

    return {
      timeComplexity: "O(n log n)"
    };
  }

  // QUICK SORT

  if(
    lowerCode.includes("quick(") ||
    lowerCode.includes("quicksort")
  ){

    return {
      timeComplexity: "O(n log n)"
    };
  }

  // DIJKSTRA

  if(
    lowerCode.includes("dijkstra") ||
    lowerCode.includes("priorityqueue") ||
    lowerCode.includes("priority_queue")
  ){

    return {
      timeComplexity: "O(n log n)"
    };
  }

  // BINARY SEARCH

  if(
    (
      lowerCode.includes("mid") &&
      lowerCode.includes("left") &&
      lowerCode.includes("right")
    ) ||
    lowerCode.includes("binarysearch")
  ){

    return {
      timeComplexity: "O(log n)"
    };
  }

  // BFS / DFS

  if(
    (
      lowerCode.includes("queue") ||
      lowerCode.includes("stack")
    ) &&
    lowerCode.includes("visited")
  ){

    return {
      timeComplexity: "O(V + E)"
    };
  }

  // MATRIX MULTIPLICATION

  if(
    lowerCode.includes("matrix")
  ){

    return {
      timeComplexity: "O(n³)"
    };
  }

  // =========================
  // ARRAY METHODS
  // =========================

  if(
    lowerCode.includes(".map(") ||
    lowerCode.includes(".filter(") ||
    lowerCode.includes(".reduce(") ||
    lowerCode.includes(".reverse(")
  ){

    return {
      timeComplexity: "O(n)"
    };
  }

  // =========================
  // LOOP COUNT
  // =========================

  const forLoops =
    (cleanCode.match(/for\s*\(/g) || []).length;

  const whileLoops =
    (cleanCode.match(/while\s*\(/g) || []).length;

  const pythonLoops =
    (cleanCode.match(/for\s+.*:/g) || []).length;

  const totalLoops =
    forLoops +
    whileLoops +
    pythonLoops;

  // =========================
  // FUNCTION NAME DETECTION
  // =========================

  let functionName = "";

  const jsFunc = cleanCode.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
  const jsArrowFunc = cleanCode.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/);
  const pyFunc = cleanCode.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
  const cppJavaFunc = [...cleanCode.matchAll(/(?:[a-zA-Z0-9_<>]+\s+)+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g)];

  if (jsFunc) {
    functionName = jsFunc[1];
  } else if (jsArrowFunc) {
    functionName = jsArrowFunc[1];
  } else if (pyFunc) {
    functionName = pyFunc[1];
  } else if (cppJavaFunc.length > 0) {
    const nonMain = cppJavaFunc.find(m => m[1] !== "main");
    if (nonMain) {
      functionName = nonMain[1];
    } else {
      functionName = cppJavaFunc[0][1];
    }
  }

  // =========================
  // EXTRACT FUNCTION BODY
  // =========================
  let bodyCode = cleanCode;
  if (functionName) {
    bodyCode = getFunctionBody(cleanCode, functionName, language);
  }

  // =========================
  // RECURSION DETECTION
  // =========================
  
  let declarationLineIndex = -1;
  const lines = bodyCode.split("\n");
  if (functionName) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(functionName) && (line.includes("function") || line.includes("def") || line.includes("=>") || line.includes("("))) {
        if (language === "python" && line.includes("def")) {
          declarationLineIndex = i;
          break;
        } else if (language === "javascript" && (line.includes("function") || line.includes("=>"))) {
          declarationLineIndex = i;
          break;
        } else if ((language === "cpp" || language === "java") && line.includes("{")) {
          declarationLineIndex = i;
          break;
        }
      }
    }
  }

  let recursionLines = 0;
  if (functionName) {
    for (let i = 0; i < lines.length; i++) {
      if (i === declarationLineIndex) continue;
      const cleanLine = lines[i].trim();
      if (cleanLine.includes(functionName + "(")) {
        recursionLines++;
      }
    }
  }

  // =========================
  // RECURSIVE COMPLEXITIES
  // =========================

  // Fibonacci type

  if(recursionLines >= 2){

    return {
      timeComplexity: "O(2ⁿ)"
    };
  }

  // Factorial type

  if(recursionLines === 1){

    const recursiveLine = lines.find((line, idx) => {
      if (idx === declarationLineIndex) return false;
      return line.includes(functionName + "(");
    });

    if(recursiveLine){
      const matches =
        recursiveLine.match(
          new RegExp(functionName + "\\s*\\(", "g")
        ) || [];

      // Two recursive calls in SAME line

      if(matches.length >= 2){

        return {
          timeComplexity: "O(2ⁿ)"
        };
      }
    }

    return {
      timeComplexity: "O(n)"
    };
  }

  // =========================
  // NORMAL LOOPS
  // =========================

  if(totalLoops === 1){

    timeComplexity = "O(n)";
  }

  else if(totalLoops === 2){

    timeComplexity = "O(n²)";
  }

  else if(totalLoops >= 3){

    timeComplexity = "O(n³)";
  }

  return {

    timeComplexity
  };
}

module.exports = analyzeComplexity;