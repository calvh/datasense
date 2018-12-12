import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "../components/Navigation/Navigation";
import DatasetList from "../components/DatasetList/DatasetList";
import Header from "../components/Header/Header";
import API from "../utils/API";
import DatasetRow from "../components/DatasetRow";
import SampleDatasets from "../utils/SampleDatasets";

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

  // ---------------------------  CRUD METHODS  ---------------------------

  createDataset = newDataset => {
    const accessString = localStorage.getItem("JWT");

    API.createDataset(accessString, newDataset)
      .then(response => {
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  loadDatasets = () => {
    const accessString = localStorage.getItem("JWT");
    API.getAllDatasets(accessString)
      .then(response => {
        this.setState({
          datasets: response.data,
        });
      })
      .catch(err => console.log(err));
  };

  updateDataset = (event, datasetId, updatedDataset) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    // TODO replace with actual data
    var updatedDataset = SampleDatasets.getRandomDataset();

    API.updateDataset(accessString, datasetId, updatedDataset)
      .then(response => {
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  deleteDataset = (event, datasetId) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    API.deleteDataset(accessString, datasetId)
      .then(response => {
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  // ----------------------  SAMPLE DATASET METHODS  ----------------------

  createSampleDataset = () => {
    this.createDataset(SampleDatasets.getRandomDataset());
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

  render() {
    return (
      <div>
        <Navigation
          isLoggedIn={this.state.isLoggedIn}
          path={this.props.location.pathname}
        />
        <Container fluid>
          <Header
            createDataset={this.createDataset}
            updateDataset={this.updateDataset}
            loadDatasets={this.loadDatasets}
            totalDatasets={this.state.datasets.length}
          />
          <Row>
            <Col md="12">
              <button className="btn btn-sm" onClick={this.loadSampleDatasets}>
                Load sample datasets
              </button>
              <button className="btn btn-sm" onClick={this.createSampleDataset}>
                Create Sample Dataset
              </button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <h2 className="header-line">
                <span>Your Datasets</span>
              </h2>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <DatasetList>
              {this.state.datasets.map(dataset => {
                return (
                  <DatasetRow
                    datasetName={dataset.name}
                    datasetNumPoints={dataset.dataPoints.length}
                    datasetCreatedAt={dataset.createdAt}
                    datasetUpdatedAt={dataset.UpdatedAt}
                    key={`display-${dataset._id}`}
                    onClickDelete={e => this.deleteDataset(e, dataset._id)}
                    onClickUpdate={e => this.updateDataset(e, dataset._id)}
                    onClickView={e =>
                      this.props.history.push(`/dashboard/view/${dataset._id}`)
                    }
                  />
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
