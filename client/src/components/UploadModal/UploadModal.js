import React, { Component } from "react";
import './UploadModal.css'
import ReactDropzone from 'react-dropzone'

/*Removed for heroku deployment: */
/*import request from 'superagent' */

class UploadModal extends Component {
  state = {
    projectName: '',
    disabled: true,
    uploadMessage: "Drop CSV File Here",
    files: []
  }

  nameEntered = (event) => {
    this.setState({projectName: event.target.value});
    
    this.setState(function(state) {
      return {
        disabled: (state.projectName.length > 0) ? false: true,
      };
    });
      
  }

  onDrop = files => {
    this.setState({files});

    const updateMessage = (msg) => {
      this.setState({uploadMessage: msg})
    }
    console.log(files);
    updateMessage(files[0].name);

    this.setState(function(state) {
      return {
        disabled: (state.files.length > 0) ? true: false,
      };
    });
  
  }
  

  uploadData = event => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
    }

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsBinaryString(this.state.files[0]);



  }

  render() {
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
                <input type="text" className="form-control" id="projectName" placeholder="Enter project name" value={this.state.projectName} onChange={this.nameEntered}/>
              </div>

              <ReactDropzone accept="text/csv" onDrop={this.onDrop.bind(this)}  disabled={this.state.disabled}
            >{this.state.uploadMessage}</ReactDropzone>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onclick={this.uploadData}>
              Upload Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default UploadModal;