import React from 'react'

const DeleteDatasetBtn = ({ onClick }) => {
  return (
    // <React.Fragment>
    //   <button className="LinkUps" onClick={onClick}>
    //     Delete
    //   </button>
    // </React.Fragment>

    <React.Fragment>
      <a className="close-link LinkUps" onClick={onClick} title="Delete Dataset">
        <i class="fas fa-trash-alt" />
      </a>
    </React.Fragment>
  )
}

export default DeleteDatasetBtn
