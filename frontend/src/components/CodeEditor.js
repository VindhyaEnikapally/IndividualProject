/*
import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../styles/editor.css";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`console.log("Hello World");`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  
  // RUN CODE
  const runCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const response = await axios.post("http://localhost:5000/api/code/run",
        {
          language,
          code,
          input
        }
      );
      setOutput(response.data.stdout || "No Output");
      if(response.data.stderr){
        setError(response.data.stderr);
      }
      if(response.data.compile_output){
        setError(response.data.compile_output);
      }
    } catch(err){
      console.log(err);
      setError("Execution Failed");
    }
  };

  // EVALUATE CODE
  const evaluateCode = async () => {
    setError("");
    setOutput("Evaluating...");
    try {
      const response = await axios.post("http://localhost:5000/api/code/evaluate",
        {
          language,
          code,
          input
        }
      );
      setOutput(`OUTPUT:${response.data.stdout || "No Output"}
-----------------------------------
Execution Time:
${response.data.executionTime}s
Memory Usage:
${response.data.memory} KB
-----------------------------------
Time Complexity:
${response.data.timeComplexity}
Nested Loops:
${response.data.nestedLoops}
Recursion Detected:
${response.data.recursionDetected}
Memoization Used:
${response.data.memoizationUsed}
Optimization:
${response.data.optimization}
-----------------------------------
Final Score:
${response.data.score}%
Rating:
${response.data.rating}`
      );
    } catch(err){
      console.log(err);
      setError("Evaluation Failed");
    }
  };
  return (
    <div className="main-container">
      <div className="top-bar">
        <h2>Online Code Judge</h2>
        <div className="left-controls">
          <select
            value={language}
            onChange={(e) =>
            setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <button
            className="run-btn"
            onClick={runCode}> Run
          </button>
          <button
            className="evaluate-btn"
            onClick={evaluateCode}>
            Evaluate
          </button>
        </div>
      </div>
      <div className="main-body">
        <div className="editor-container">
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
            setCode(value)}
          />
        </div>
        <div className="output-container">
          <h3>Output & Analysis</h3>
          <pre>
            {output || "No Output"}
          </pre>
        </div>        
        <div className="side-panel">
        <div className="input-box">
        <h3>Input</h3>
        <textarea
            placeholder="Enter Input"
            value={input}
              onChange={(e) =>
              setInput(e.target.value)}
            />
          </div>
          <div className="error-box">
            <h3>Errors</h3>
            <pre>
                {error || "No Errors"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
*/

import React, { useState } from "react";

import axios from "axios";

import Editor from "@monaco-editor/react";

import "../styles/editor.css";

const CodeEditor = () => {

  const [language, setLanguage] =
  useState("javascript");

  const [code, setCode] =
  useState(`console.log("Hello World");`);

  const [input, setInput] =
  useState("");

  const [output, setOutput] =
  useState("");

  const [error, setError] =
  useState("");

  // RUN CODE

  const runCode = async () => {

    setError("");

    setOutput("Running...");

    try {

      const response = await axios.post(

        "http://localhost:5000/api/code/run",

        {
          language,
          code,
          input
        }
      );

      // STANDARDIZED OUTPUT

      const finalOutput =

        response.data.stdout ||
        response.data.output ||
        response.data.run?.stdout ||
        "No Output";

      setOutput(finalOutput);

      // STANDARDIZED ERROR

      const finalError =

        response.data.stderr ||
        response.data.compile_output ||
        response.data.run?.stderr ||
        "";

      setError(finalError);

    } catch(err){

      console.log(err);

      setError("Execution Failed");

      setOutput("");
    }
  };

  // EVALUATE CODE

  const evaluateCode = async () => {

    setError("");

    setOutput("Evaluating...");

    try {

      const response = await axios.post(

        "http://localhost:5000/api/code/evaluate",

        {
          language,
          code,
          input
        }
      );

      const finalOutput =

        response.data.stdout ||
        response.data.output ||
        response.data.run?.stdout ||
        "No Output";

      setOutput(

`OUTPUT:
${finalOutput}

-----------------------------------

Execution Time:
${response.data.executionTime || 0}s

Memory Usage:
${response.data.memory || 0} KB

-----------------------------------

Time Complexity:
${response.data.timeComplexity || "Unknown"}


-----------------------------------

Final Score:
${response.data.score || 0}%

Rating:
${response.data.rating || "Average"}`
      );

      // SHOW ERRORS ALSO

      const finalError =

        response.data.stderr ||
        response.data.compile_output ||
        response.data.run?.stderr ||
        "";

      setError(finalError);

    } catch(err){

      console.log(err);

      setError("Evaluation Failed");

      setOutput("");
    }
  };

  return (

    <div className="main-container">

      {/* TOP BAR */}

      <div className="top-bar">

        <h2>Online Code Judge</h2>

        <div className="left-controls">

          <select
            value={language}
            onChange={(e) =>
            setLanguage(e.target.value)}
          >

            <option value="javascript">
              JavaScript
            </option>

            <option value="cpp">
              C++
            </option>

            <option value="python">
              Python
            </option>

            <option value="java">
              Java
            </option>

          </select>

          <button
            className="run-btn"
            onClick={runCode}
          >
            Run
          </button>

          <button
            className="evaluate-btn"
            onClick={evaluateCode}
          >
            Evaluate
          </button>

        </div>

      </div>

      {/* MAIN BODY */}

      <div className="main-body">

        {/* CODE EDITOR */}

        <div className="editor-container">

          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
            setCode(value)}
          />

        </div>

        {/* OUTPUT */}

        <div className="output-container">

          <h3>Output & Analysis</h3>

          <pre>
            {output || "No Output"}
          </pre>

        </div>

        {/* SIDE PANEL */}

        <div className="side-panel">

          {/* INPUT */}

          <div className="input-box">

            <h3>Input</h3>

            <textarea
              placeholder="Enter Input"
              value={input}
              onChange={(e) =>
              setInput(e.target.value)}
            />

          </div>

          {/* ERRORS */}

          <div className="error-box">

            <h3>Errors</h3>

            <pre>
              {error || "No Errors"}
            </pre>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CodeEditor;