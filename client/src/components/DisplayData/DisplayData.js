import React from 'react'
import './DisplayData.css'
import { Container, Row, Col } from 'reactstrap'

export default props => {
  return (
    <div>
      {/* Aditi: Add routing to add new datasets when u hit class UploadData from Header.js  */}
      <article className="AddNewDataset">
        {/* Replace element in ProjectName  with the Projec-tName from Upload.js*/}
        <h3 className="ProjectName">Data 1</h3>
        <span>
          <a href="#" className="LinkUps">
            Delete
          </a>
          <a href="#" className="LinkUps">
            Export
          </a>
          <a href="#" className="LinkUps">
            Update
          </a>
          <a href="Displaydata/" className="LinkUps">
            View
          </a>
        </span>
      </article>
    </div>
  )
}
