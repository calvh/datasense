import React from 'react'
import './Datasets.css'
import DisplayData from './../DisplayData/DisplayData'
import { Container, Row, Col } from 'reactstrap'

export default props => {
  return (
    <Col>
      <div className="card">
        <div className="card-header">
          <h2 className="h6 text-uppercase mb-0">List of your Datasets</h2>
        </div>
        <div className="card-body">
          <DisplayData />
          <div className="chart-holder" />
        </div>
      </div>
    </Col>
  )
}
