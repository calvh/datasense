import React from 'react'
import './UploadModal.css'
import ReactFileReader from 'react-file-reader'

export default props => {
  return (
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Upload New Dataset
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="projectName">Project Name</label>
                <input type="text" class="form-control" id="projectName" placeholder="Enter project name" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              Generate Graph
            </button>
          </div>
        </div>
      </div>
    </div>

    // <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
    //     <button className='btn'>Upload</button>
    // </ReactFileReader>

    // handleFiles = files => {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //     // Use reader.result
    //     alert(reader.result)
    //     }
    //   reader.readAsText(files[0]);
    // }

    // Project Named
    // Upload csv file
    // button > Generate Graph < /button>
  )
}
