import React from 'react'

const UpdateDatasetBtn = ({ onClick }) => {
  return (
    // <React.Fragment>
    //   <button className="LinkUps" onClick={onClick}>
    //     Update
    //   </button>
    // </React.Fragment>

    <React.Fragment>
      <a className="close-link LinkUps" onClick={onClick} title="Edit Dataset">
        <i class="fas fa-pencil-alt" />
      </a>
    </React.Fragment>
  )
}

export default UpdateDatasetBtn
