import React from "react";
import "./Header.css";
import UploadModal from "./../UploadModal/UploadModal";

export default props => {
  return (
    <section className="row header-top-row">
      <div className="col-sm-12">
        <div className="white-box">
          <div className="row row-in">
            <div className="col-lg-4 col-sm-4 row-in-br">
              <ul className="col-in col-in-title" />
              <a href="#" className="btn1-upload" data-toggle="modal" data-target="#uploadModal">
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
              {props.totalDatasets > 0 ? (
                <ul className="col-in">
                  <li>
                    <span className="circle circle-md bg-success">
                      <i className="fas fa-chart-line" />
                    </span>
                  </li>
                  <li className="col-last">
                    <h3 className="counter text-right m-t-15">{props.totalDatasets}</h3>
                  </li>
                  <li className="col-middle">
                    <h4>Total Datasets</h4>
                  </li>
                </ul>
              ) : (
                <a className="btn2-upload" onClick={props.loadSampleDatasets}>
                  <span className="btn2-upload-content">Load Sample Datasets</span>
                  <span className="icon">
                    <i class="fas fa-spinner" />
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <UploadModal createDataset={props.createDataset} updateDataset={props.updateDataset} loadDatasets={props.loadDatasets} />
    </section>
  );
};
