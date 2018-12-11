import React from 'react'
import './DatasetList.css'
import { Container, Row, Col } from 'reactstrap'

const DatasetList = ({ children }) => {
  return (
    // <Col>
    //   <div className="card">
    //     <div className="card-header">
    //       <h2 className="h6 text-uppercase mb-0">List of your Datasets</h2>
    //     </div>
    //     <div className="card-body">{children}</div>
    //   </div>
    // </Col>
    <React.Fragment>{children}</React.Fragment>
  )
}

export default DatasetList
