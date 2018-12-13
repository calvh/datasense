import React from "react";
import "./Slider.css";
import Typed from "react-typed";

export default props => {
  return (
    <React.Fragment>
      <div className="bg" />
      <div className="caption">
        <h1 className="title-home">INTRODUCING DATASENSE</h1>
        <br />
        <h1 className="animated-title">
          GENERATE
          <span className="animated-title2">
            <Typed
              strings={[" CHARTS", " DATASETS", " MODELS", " EQUATIONS"]}
              typeSpeed={50}
              backSpeed={50}
              startDelay={500}
              backDelay={2000}
              loop
            />
          </span>
        </h1>
        <h4 className="subtitle-home">A single place to find meaningful insights from your data.</h4>
      </div>
    </React.Fragment>
  );
};