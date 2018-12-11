import React from 'react'
import { Link } from 'react-router-dom'

const ViewDatasetBtn = ({ onClick }) => {
  return (
    // <React.Fragment>
    //   <button className="LinkUps" onClick={onClick}>
    //     View
    //   </button>
    // </React.Fragment>

    // <React.Fragment>
    //   <button className="view-data" onClick={onClick}>
    //     View Dataset
    //   </button>
    // </React.Fragment>

    <React.Fragment>
      <a className="btn1 view-data1" onClick={onClick}>
        <span className="btn1-content">View Dataset</span>
        <span className="icon">
          <i class="fas fa-arrow-circle-right" />
        </span>
      </a>
    </React.Fragment>
  )
}

export default ViewDatasetBtn
