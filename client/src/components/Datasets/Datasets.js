import React from "react";
import './Datasets.css'
import { Container, Row, Col } from 'reactstrap'
//import DisplayData from './../DisplayData/DisplayData'
//import API from "../../utils/API";


const Datasets = ({children}) => {
    return (
      <Col>
        <div className="card">
          <div className="card-header">
            <h2 className="h6 text-uppercase mb-0">List of your Datasets</h2>
          </div>
          <div className="card-body">
            {children}
            
            <div className="chart-holder" />
          </div>
        </div>
      </Col>
    )
}

export default Datasets;



