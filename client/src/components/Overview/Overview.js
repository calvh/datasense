import React from 'react'
import './Overview.css'
import Datasets from './../Datasets/Datasets'

export default props => {
  return (
    <section>
      <div className="card">
        <div className="card-header">
          <h2 className="h6 text-uppercase mb-0">Overview</h2>
        </div>
        <div className="card-body">
          <p className="text-gray">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="chart-holder" />
        </div>
      </div>
    </section>
  )
}
