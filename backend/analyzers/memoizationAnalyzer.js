/*
const analyzeMemoization = (code) => {

  let memoizationUsed = false;

  // COMMON DP / MEMO PATTERNS

  if(
    code.includes("dp") ||
    code.includes("memo") ||
    code.includes("Map(") ||
    code.includes("{}") ||
    code.includes("cache")
  ){
    memoizationUsed = true;
  }

  return {

    memoizationUsed
  };
};

module.exports = analyzeMemoization;



const analyzeMemoization = (

  code,

  language

) => {

  let memoizationUsed = false;

  // JAVASCRIPT

  if(language === "javascript"){

    if(
      code.includes("memo") ||

      code.includes("Map") ||

      code.includes("cache")
    ){

      memoizationUsed = true;
    }
  }

  // PYTHON

  if(language === "python"){

    if(
      code.includes("memo") ||

      code.includes("lru_cache") ||

      code.includes("dict")
    ){

      memoizationUsed = true;
    }
  }

  // C++

  if(language === "cpp"){

    if(
      code.includes("unordered_map") ||

      code.includes("map") ||

      code.includes("dp")
    ){

      memoizationUsed = true;
    }
  }

  // JAVA

  if(language === "java"){

    if(
      code.includes("HashMap") ||

      code.includes("dp")
    ){

      memoizationUsed = true;
    }
  }

  return {

    memoizationUsed
  };
};

module.exports =
analyzeMemoization;

*/