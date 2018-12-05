import React from 'react'
import './UploadModal.css'
import ReactFileReader from 'react-file-reader'
import ReactDropzone from 'react-dropzone'
/*Removed for heroku deployment: */
/*import request from 'superagent' */

export default props => {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Upload New Dataset
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label for="projectName">Project Name</label>
                <input type="text" className="form-control" id="projectName" placeholder="Enter project name" />
              </div>

              <ReactDropzone onDrop={this.onDrop}>Drop your .CSV file here!!</ReactDropzone>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Generate Graph
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
