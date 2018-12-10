import React from "react";
import "./DatasetRow.css";
//import { Container, Row, Col } from 'reactstrap'

const DatasetRow = ({ datasetName, children }) => {
  return (
    <div>
      {/* Aditi: Add routing to add new datasets when u hit class UploadData from Header.js  */}
      <article className="AddNewDataset">
        {/* Replace element in ProjectName  with the ProjectName from Upload.js*/}
        <h3 className="ProjectName">{datasetName}</h3>
        <span>{children}</span>
      </article>
    </div>
  );
};

export default DatasetRow;
