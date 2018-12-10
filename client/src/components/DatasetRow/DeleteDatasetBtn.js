import React from "react";

const DeleteDatasetBtn = ({ onClick }) => {
  return (
    <React.Fragment>
      <button className="LinkUps" onClick={onClick}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteDatasetBtn;
