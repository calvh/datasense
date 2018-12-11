import React from "react";
import "./Header.css";
import UploadModal from "./../UploadModal/UploadModal";

export default props => {
  return (
    // <div className="row heading">
    //   <button className="relative col-md-2">Upload Data</button>
    //   <h1 className="col-md-6 text-title relative"> DataSense </h1>
    //   <button className="relative col-md-2">Export Data</button>
    // </div>
    <section className="row header-top-row">
      {/* <div className="col-xl-3 col-lg-3 mb-3 mb-xl-0 header-top-row">
        <div
          className="bg-white shadow  p-4 h-100 d-flex align-items-center justify-content-between upload-button"
          data-toggle="modal"
          data-target="#uploadModal"
        >
          <div className="flex-grow-1 d-flex align-items-center">
            <div className="icon text-white bg-violet">
              <i className="fas fa-plus-circle" />
            </div>
            <div className="text">
              <h2 className="mb-0 UploadData">Upload Data</h2>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="col-lg-4 col-sm-4 col-xs-12">
        <div className="white-box">
          <h3 className="box-title">Upload New Dataset</h3>
          <ul className="list-inline two-part">
            <li>
              <i className="icon-folder-alt text-danger" />
            </li>
            <li className="text-right">
              <span className="">311</span>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="col-sm-12">
        <div className="white-box">
          <div className="row row-in">
            <div className="col-lg-4 col-sm-4 row-in-br">
              <ul className="col-in col-in-title">
                {/* <li>
                  <span className="circle circle-md bg-danger">
                    <i className="fas fa-upload" />
                  </span>
                </li>
                <li className="col-middle">
                  <h4>Upload New Dataset</h4>
                </li> */}
              </ul>
              <a href="#" className="btn1-upload" data-toggle="modal" data-target="#exampleModalCenter">
                <span className="btn1-upload-content">Upload New Dataset</span>
                <span className="icon">
                  <i className="fas fa-upload" />
                </span>
              </a>
            </div>
            <div className="col-lg-4 col-sm-4 row-in-br  b-r-none">
              <ul className="col-in col-in-title">
                <li className="col-middle">
                  <h2 className="dashboard-title">Dashboard</h2>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-4 row-in-br">
              <ul className="col-in">
                <li>
                  <span className="circle circle-md bg-success">
                    <i className="fas fa-chart-line" />
                  </span>
                </li>
                <li className="col-last">
                  <h3 className="counter text-right m-t-15">3</h3>
                </li>
                <li className="col-middle">
                  <h4>Total Datasets</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <UploadModal
        createDataset={props.createDataset}
        updateDataset={props.updateDataset}
        loadDatasets={props.loadDatasets}
      />
    </section>
  );
};
