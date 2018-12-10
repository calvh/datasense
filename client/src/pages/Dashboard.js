import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "../components/Navigation/Navigation";
import DatasetList from "../components/DatasetList/DatasetList";
import Header from "../components/Header/Header";
import API from "../utils/API";
import SampleDatasets from "../utils/SampleDatasets";
import {
  DatasetRow,
  DeleteDatasetBtn,
  ViewDatasetBtn,
  UpdateDatasetBtn,
} from "../components/DatasetRow";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    isLoggedIn: false,
    datasets: [],
  };

  componentDidMount() {
    const accessString = localStorage.getItem("JWT");
    if (!accessString) {
      this.props.history.push("/login");
    } else {
      this.setState({
        isLoggedIn: true,
      });
      this.loadDatasets();
    }
  }

  loadDatasets = () => {
    const accessString = localStorage.getItem("JWT");
    API.getAllDatasets(accessString)
      .then(response => {
        console.log(response.data);
        this.setState({
          datasets: response.data,
        });
      })
      .catch(err => console.log(err));
  };

  createDataset = data => {
    const accessString = localStorage.getItem("JWT");
    // TODO replace testDataset with actual data

    API.createDataset(accessString, SampleDatasets.getRandomDataset())
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  loadSampleDatasets = () => {
    const accessString = localStorage.getItem("JWT");
    Promise.all(
      SampleDatasets.getAllSampleDatasets().map(sampleDataset =>
        API.createDataset(accessString, sampleDataset)
      )
    )
      .then(() => this.loadDatasets())
      .catch(err => console.log(err));
  };

  updateDataset = (event, datasetId) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    // TODO replace testDataset with actual data
    API.updateDataset(
      accessString,
      datasetId,
      SampleDatasets.getRandomDataset()
    )
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  deleteDataset = (event, datasetId) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    API.deleteDataset(accessString, datasetId)
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  render() {
    // TODO replace Datasets with actual data from this.state.datasets
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            {/* // TODO pass names, dataset IDs (as keys) of this.state.datasets to the Datasets component */}
            <DatasetList>
              <button className="btn btn-sm" onClick={this.loadSampleDatasets}>
                Load sample datasets
              </button>
              <button className="btn btn-sm" onClick={this.createDataset}>
                Create Sample Dataset
              </button>
              {this.state.datasets.map(dataset => {
                return (
                  <DatasetRow
                    datasetName={dataset.name}
                    key={`display-${dataset._id}`}
                  >
                    <ViewDatasetBtn
                      key={`view-${dataset._id}`}
                      datasetId={dataset._id}
                      onClick={e =>
                        this.props.history.push(
                          `/dashboard/view/${dataset._id}`
                        )
                      }
                    />

                    <UpdateDatasetBtn
                      onClick={e => this.updateDataset(e, dataset._id)}
                      datasetId={dataset._id}
                      key={`update-${dataset._id}`}
                    />

                    <DeleteDatasetBtn
                      onClick={e => this.deleteDataset(e, dataset._id)}
                      key={`delete-${dataset._id}`}
                    />
                  </DatasetRow>
                );
              })}
            </DatasetList>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
