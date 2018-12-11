import React, { Component } from "react";
import "./UploadModal.css";
import Dropzone from "react-dropzone";
import Papa from "papaparse";

class UploadModal extends Component {
  state = {
    datasetName: "",
    xLabel: "",
    yLabel: "",
    fileHeaders: true,
    disabled: true,
    uploadMessage: "file here, or click to select a file",
    file: {},
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    this.setState(state => {
      const datasetNameEntered = state.datasetName.length > 0;
      return datasetNameEntered ? { disabled: false } : { disabled: true };
    });
  };

  onDrop = files => {
    if (files.length === 1)
      this.setState({
        file: files[0],
        uploadMessage:
          "another file here or click to select and replace the current file",
      });
  };

  onCancel = () => {
    this.setState({
      file: {},
      uploadMessage: "file here, or click to select a file",
    });
  };

  uploadData = event => {
    event.preventDefault();
    Papa.parse(this.state.file, {
      dynamic: true,
      skipEmptyLines: true,
      complete: parseResults => {
        const newDataset = {
          name: this.state.datasetName,
          // source
          // notes
        };

        if (this.state.fileHeaders) {
          newDataset.headers = parseResults.data[0];
          newDataset.dataPoints = parseResults.data.slice(1);
        } else {
          newDataset.headers = [
            this.state.xLabel ? this.state.xLabel : "X",
            this.state.yLabel ? this.state.yLabel : "Y",
          ];
          newDataset.dataPoints = parseResults.data;
        }
        this.props.createDataset(newDataset);
      },
    });
  };

  render() {
    const baseStyle = {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: "#666",
      borderStyle: "dashed",
      borderRadius: 5,
    };
    const activeStyle = {
      borderStyle: "solid",
      borderColor: "#6c6",
      backgroundColor: "#eee",
    };
    const rejectStyle = {
      borderStyle: "solid",
      borderColor: "#c66",
      backgroundColor: "#eee",
    };

    return (
      <div
        className="modal fade"
        id="uploadModal"
        tabIndex="-1"
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
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Dataset Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="datasetName"
                    placeholder="Enter a name for this dataset"
                    value={this.state.datasetName}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <label className="mr-2">My data file contains headers</label>
                  <input
                    name="fileHeaders"
                    type="checkbox"
                    checked={this.state.fileHeaders}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  {this.state.fileHeaders ? (
                    <br />
                  ) : (
                    <React.Fragment>
                      <h4>Please enter data headers</h4>
                      <label>X-Label</label>
                      <input
                        type="text"
                        className="form-control"
                        name="xLabel"
                        placeholder="default: X"
                        value={this.state.xLabel}
                        onChange={this.handleInputChange}
                      />
                      <br />
                      <label>Y-Label</label>
                      <input
                        type="text"
                        className="form-control"
                        name="yLabel"
                        placeholder="default: Y"
                        value={this.state.yLabel}
                        onChange={this.handleInputChange}
                      />
                    </React.Fragment>
                  )}

                  <br />
                </div>
                {this.state.disabled ? (
                  <div />
                ) : (
                  <section>
                    <Dropzone
                      multiple={false}
                      onDrop={this.onDrop}
                      onFileDialogCancel={this.onCancel}
                      disabled={this.state.disabled}
                      style={{ border: "1px line black" }}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragAccept,
                        isDragReject,
                      }) => {
                        let styles = { ...baseStyle };
                        styles = isDragActive
                          ? { ...styles, ...activeStyle }
                          : styles;
                        styles = isDragReject
                          ? { ...styles, ...rejectStyle }
                          : styles;

                        return (
                          <div {...getRootProps()} style={styles}>
                            <input {...getInputProps()} />
                            <div>
                              {isDragReject ? (
                                <div>Only single files accepted...</div>
                              ) : (
                                `${isDragAccept ? "Drop " : "Drag "}` +
                                this.state.uploadMessage
                              )}
                            </div>
                          </div>
                        );
                      }}
                    </Dropzone>
                    <aside>
                      <h4>Files</h4>
                      {this.state.file.name ? (
                        <ul>
                          <li key={this.state.file.name}>
                            {this.state.file.name} - {this.state.file.size}{" "}
                            bytes{" "}
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={this.onCancel}
                            >
                              X
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <p>No file uploaded!</p>
                      )}
                    </aside>
                  </section>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.uploadData}
                data-dismiss="modal"
                data-target="#uploadModal"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadModal;
