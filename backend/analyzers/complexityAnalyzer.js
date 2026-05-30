
function getFunctionBody(code, functionName, language) {

  const lines = code.split("\n");

  let startIdx = -1;

  // FIND FUNCTION START

  for(let i = 0; i < lines.length; i++){

    const line = lines[i];

    // PYTHON

    if(language === "python"){

      if(line.includes("def " + functionName)){

        startIdx = i;
        break;
      }
    }

    // JAVASCRIPT

    else if(language === "javascript"){

      if(

        line.includes("function " + functionName) ||

        line.includes(functionName + " =") ||

        line.includes(functionName + "=")

      ){

        startIdx = i;
        break;
      }
    }

    // C++ / JAVA

    else{

      if(

        line.includes(functionName) &&

        line.includes("(")

      ){

        if(

          !line.includes(";") &&

          !line.includes("main")

        ){

          startIdx = i;
          break;
        }
      }
    }
  }

  if(startIdx === -1){

    return code;
  }

  // PYTHON BODY

  if(language === "python"){

    const defLine = lines[startIdx];

    const indentMatch =
      defLine.match(/^\s*/);

    const defIndent =
      indentMatch
      ? indentMatch[0].length
      : 0;

    let bodyLines = [defLine];

    for(let i = startIdx + 1; i < lines.length; i++){

      const line = lines[i];

      if(line.trim() === ""){

        bodyLines.push(line);
        continue;
      }

      const lineIndent =
        (line.match(/^\s*/) || [""])[0].length;

      if(lineIndent <= defIndent){

        break;
      }

      bodyLines.push(line);
    }

    return bodyLines.join("\n");
  }

  // JS / C++ / JAVA BODY

  else{

    let bodyLines = [];

    let braceCount = 0;

    let started = false;

    for(let i = startIdx; i < lines.length; i++){

      const line = lines[i];

      bodyLines.push(line);

      for(let char of line){

        if(char === "{"){

          braceCount++;
          started = true;
        }

        else if(char === "}"){

          braceCount--;
        }
      }

      if(started && braceCount === 0){

        break;
      }
    }

    return bodyLines.join("\n");
  }
}

function analyzeComplexity(code, language) {

  let timeComplexity = "O(1)";

  // =========================
  // REMOVE COMMENTS
  // =========================

  let cleanCode = code;

  if(language === "python"){

    cleanCode =
      code
      .split("\n")
      .map(line => line.split("#")[0])
      .join("\n");
  }

  else{

    let noMulti =
      code.replace(
        /\/\*[\s\S]*?\*\//g,
        ""
      );

    cleanCode =
      noMulti
      .split("\n")
      .map(line => line.split("//")[0])
      .join("\n");
  }

  const lowerCode =
    cleanCode.toLowerCase();

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

  // PRIME CHECK

  if(

    lowerCode.includes("i * i <=") ||

    lowerCode.includes("math.sqrt")

  ){

    return {

      timeComplexity: "O(√n)"
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

  // JAVASCRIPT

  const jsFunc =
    cleanCode.match(
      /function\s+([a-zA-Z0-9_]+)\s*\(/
    );

  // ARROW FUNCTION

  const jsArrowFunc =
    cleanCode.match(

      /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/

    );

  // PYTHON

  const pyFunc =
    cleanCode.match(
      /def\s+([a-zA-Z0-9_]+)\s*\(/
    );

  // C++ / JAVA

  const cppJavaFunc =
    [

      ...cleanCode.matchAll(

        /(?:[a-zA-Z0-9_<>]+\s+)+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g

      )

    ];

  if(jsFunc){

    functionName = jsFunc[1];
  }

  else if(jsArrowFunc){

    functionName = jsArrowFunc[1];
  }

  else if(pyFunc){

    functionName = pyFunc[1];
  }

  else if(cppJavaFunc.length > 0){

    const nonMain =
      cppJavaFunc.find(
        m => m[1] !== "main"
      );

    if(nonMain){

      functionName = nonMain[1];
    }

    else{

      functionName =
        cppJavaFunc[0][1];
    }
  }

  // =========================
  // EXTRACT FUNCTION BODY
  // =========================

  let bodyCode = cleanCode;

  if(functionName){

    bodyCode =
      getFunctionBody(
        cleanCode,
        functionName,
        language
      );
  }

// =========================
// RECURSION DETECTION
// =========================

const lines = bodyCode.split("\n");

let recursiveCalls = 0;

if(functionName){

  for(let line of lines){

    const cleanLine = line.trim();

    // Ignore declaration line

    if(
      cleanLine.includes("function " + functionName) ||
      cleanLine.includes("def " + functionName)
    ){
      continue;
    }

    // Count ALL recursive calls

    const matches =
      cleanLine.match(
        new RegExp(functionName + "\\s*\\(", "g")
      ) || [];

    recursiveCalls += matches.length;
  }
}

// =========================
// PERMUTATION / BACKTRACKING
// =========================

if(

  recursiveCalls >= 1 &&

  totalLoops >= 1 && 

  (

    lowerCode.includes("perm") ||

    lowerCode.includes("generate") ||

    lowerCode.includes("backtrack") ||

    lowerCode.includes("swap") ||

    lowerCode.includes("dfs") ||

    lowerCode.includes("queen") ||

    lowerCode.includes("solve") ||

    lowerCode.includes("combine") ||

    lowerCode.includes(".slice(") ||

    lowerCode.includes("[arr[l], arr[i]]")

  )

){

  return {

    timeComplexity: "O(n!)"
  };
}

// =========================
// FIBONACCI
// =========================

if(recursiveCalls >= 2){

  return {
    timeComplexity: "O(2ⁿ)"
  };
}

// =========================
// FACTORIAL
// =========================

if(recursiveCalls === 1){

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