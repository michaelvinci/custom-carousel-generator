import React from 'react';

const CodeBlock = (props) => (
  <>
    <h3 className="source-code__heading">{props.heading}</h3>
    <pre className="source-code__block">
      <code>
        {props.code}
      </code>
    </pre>
  </>
);

export default CodeBlock;
