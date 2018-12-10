import React from "react";

const UpdateDatasetBtn = ({ onClick }) => {
  return (
    <React.Fragment>
      <button className="LinkUps" onClick={onClick}>
        Update
      </button>
    </React.Fragment>
  );
};

export default UpdateDatasetBtn;
