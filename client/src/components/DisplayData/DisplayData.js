import React from "react";
import './DisplayData.css'
//import { Container, Row, Col } from 'reactstrap'
import API from "../../utils/API";

const DisplayData = ({datasetname, children}) => {      

  return (
    <div>
      {/* Aditi: Add routing to add new datasets when u hit class UploadData from Header.js  */}
      <article className="AddNewDataset">
        {/* Replace element in ProjectName  with the Projec-tName from Upload.js*/}
        <h3 className="ProjectName">{datasetname}</h3>
        <span> 
         {children}         
        </span>
      </article>
    </div>
  )
}

export default DisplayData;