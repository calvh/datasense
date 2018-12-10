import React from "react";
import { Link } from "react-router-dom";

const ViewDatasetBtn = ({ onClick }) => {
  return (
    <React.Fragment>
      <button className="LinkUps" onClick={onClick}>
        View
      </button>
    </React.Fragment>
  );
};

export default ViewDatasetBtn;
