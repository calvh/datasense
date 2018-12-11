import React from 'react'
import './DatasetRow.css'
import ViewDatasetBtn from './ViewDatasetBtn'
import UpdateDatasetBtn from './UpdateDatasetBtn'
import DeleteDatasetBtn from './DeleteDatasetBtn'
import moment from 'moment'
//import { Container, Row, Col } from 'reactstrap'

const DatasetRow = props => {
  return (
    // <div>
    //   {/* Aditi: Add routing to add new datasets when u hit class UploadData from Header.js  */}
    //   <article className="AddNewDataset">
    //     {/* Replace element in ProjectName  with the ProjectName from Upload.js*/}
    //     <h3 className="ProjectName">{datasetName}</h3>
    //     <span>{children}</span>
    //   </article>
    // </div>

    <div className="col-md-4 col-sm-4 col-xs-12 mt-3">
      <div className="x_panel tile fixed_height_320">
        <div className="x_title">
          <h2 className="ProjectName">{props.datasetName}</h2>
          <ul className="nav navbar-right panel_toolbox">
            <li>
              <span>
                <DeleteDatasetBtn onClick={props.onClickDelete} />
                <UpdateDatasetBtn onClick={props.onClickUpdate} />
              </span>
            </li>
          </ul>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <div className="side-1">
            <span className="count_top">
              <i className="fab fa-connectdevelop" /> Number of Data Points:
            </span>
            <div className="count">25</div>
          </div>
          <div className="side-2">
            <span className="count_top">
              <i class="fas fa-clock" /> Created On:
            </span>
            <div className="count">{moment(props.datasetCreatedAt).format('MM/DD/YY')}</div>
          </div>
          <ViewDatasetBtn onClick={props.onClickView} />
          <div className="w_right w_20" />
          <div className="clearfix" />
        </div>
      </div>
    </div>
  )
}

export default DatasetRow
