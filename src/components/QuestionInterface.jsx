import React from 'react';
import styled from 'styled-components';
import MonacoEditor from '@monaco-editor/react';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
`;

const QuestionPanel = styled.div`
  padding: 20px;
  border-right: 1px solid #333;
`;

const CodePanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const OutputPanel = styled.div`
  background-color: #1a1a1a;
  padding: 15px;
  margin-top: auto;
  height: 200px;
`;

const QuestionInterface = () => {
  const defaultCode = `def solve():
    # Write your code here
    pass
`;

  return (
    <Container>
      <QuestionPanel>
        <h2>Question #1</h2>
        <div className="question-content">
          <h3>Problem Description</h3>
          <p>Given the values of a,b and x in the equation ax + b = y. Find the value of y.</p>
          
          <h3>Input Description</h3>
          <p>A single line contains 3 space separated integers.</p>
          
          <h3>Sample Input</h3>
          <pre>3 5 2</pre>
          
          <h3>Sample Output</h3>
          <pre>11</pre>
        </div>
      </QuestionPanel>
      
      <CodePanel>
        <MonacoEditor
          height="60vh"
          defaultLanguage="python"
          theme="vs-dark"
          value={defaultCode}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
        
        <OutputPanel>
          <h3>Output</h3>
          <pre>>>> Submit Your Code to validate</pre>
        </OutputPanel>
      </CodePanel>
    </Container>
  );
};

export default QuestionInterface;