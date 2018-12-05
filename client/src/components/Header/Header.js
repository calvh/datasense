import React from 'react'
import './Header.css'
import UploadModal from './../UploadModal/UploadModal'

export default props => {
  return (
    // <div className="row heading">
    //   <button className="relative col-md-2">Upload Data</button>
    //   <h1 className="col-md-6 text-title relative"> DataSense </h1>
    //   <button className="relative col-md-2">Export Data</button>
    // </div>
    <section className="row">
      <div className="col-xl-3 col-lg-3 mb-3 mb-xl-0 header-top-row">
        <div className="bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between upload-button">
          <div className="flex-grow-1 d-flex align-items-center">
            <div className="icon text-white bg-violet">
              <i className="fas fa-plus-circle" />
            </div>
            <div className="text">
              <h2 className="mb-0 UploadData" data-toggle="modal" data-target="#exampleModalCenter">
                Upload Data
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-2 col-lg-2 mb-3 mb-xl-0 header-top-row" />

      <div className="col-xl-4 col-lg-4 mb-3 mb-xl-0 header-top-row">
        <div className="p-4 h-100 d-flex align-items-center justify-content-between">
          <div className="flex-grow-1 d-flex align-items-center">
            <div className="text">
              <h1 className="mb-0">DataSense</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-3 mb-3 mb-xl-0 header-top-row">
        <div className="bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between export-button">
          <div className="flex-grow-1 d-flex align-items-center">
            <div className="text">
              <h2 className="mb-0">Export Data</h2>
            </div>
          </div>
          <div className="icon text-white bg-violet">
            <i className="fas fa-minus-circle" />
          </div>
        </div>
      </div>
      <UploadModal />
    </section>
  )
}
