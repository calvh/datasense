import React from "react";
import "./prism.css";

const Codeblock = props => {
  let code = props.code;
  if (typeof code === "object") {
    code = JSON.stringify(props.code, null, 2);
  }

  return (
    <pre>
      <code className={`lang-${props.language}`}>{"`" + code + "`"}</code>
    </pre>
  );
};

export default Codeblock;
