import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "../components/Navigation/Navigation";
import DatasetList from "../components/DatasetList/DatasetList";
import Header from "../components/Header/Header";
import API from "../utils/API";
import DatasetRow from "../components/DatasetRow";
import Loader from "../components/Loader";
import SampleDatasets from "../utils/SampleDatasets";

class Dashboard extends Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
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
      this.fetchDatasets();
    }
  }

  // ---------------------------  CRUD METHODS  ---------------------------

  createDataset = newDataset => {
    const accessString = localStorage.getItem("JWT");
    this.setState({ isLoading: true });
    API.createDataset(accessString, newDataset)
      .then(response => {
        this.fetchDatasets();
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  fetchDatasets = () => {
    const accessString = localStorage.getItem("JWT");
    this.setState({ isLoading: true });
    API.getAllDatasets(accessString)
      .then(response => {
        this.setState({
          datasets: response.data,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  updateDataset = (event, datasetId, updatedDataset) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    // TODO replace with actual data
    var updatedDataset = SampleDatasets.getRandomDataset();
    this.setState({ isLoading: true });
    API.updateDataset(accessString, datasetId, updatedDataset)
      .then(response => {
        this.fetchDatasets();
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  deleteDataset = (event, datasetId) => {
    event.preventDefault();
    const accessString = localStorage.getItem("JWT");

    API.deleteDataset(accessString, datasetId)
      .then(response => {
        this.fetchDatasets();
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  // ----------------------  SAMPLE DATASET METHODS  ----------------------

  createSampleDataset = () => {
    this.createDataset(SampleDatasets.getRandomDataset());
  };

  loadSampleDatasets = () => {
    const accessString = localStorage.getItem("JWT");
    this.setState({ isLoading: true });
    Promise.all(
      SampleDatasets.getAllSampleDatasets().map(sampleDataset =>
        API.createDataset(accessString, sampleDataset)
      )
    )
      .then(() => this.fetchDatasets())
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
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
            totalDatasets={this.state.datasets.length}
            createDataset={this.createDataset}
            updateDataset={this.updateDataset}
            fetchDatasets={this.fetchDatasets}
            loadSampleDatasets={this.loadSampleDatasets}
          />
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
              {this.state.isLoading ? (
                <Col md="12">
                  <div className="d-flex justify-content-center mt-5">
                    <Loader />
                  </div>
                </Col>
              ) : this.state.datasets.length < 1 ? (
                <div className="d-flex justify-content-center w-100 mt-5">
                  <h4>
                    No datasets yet! Upload one from your computer or load some
                    sample datasets!
                  </h4>
                </div>
              ) : (
                this.state.datasets.map(dataset => {
                  return (
                    <DatasetRow
                      key={`display-${dataset._id}`}
                      onClickDelete={e => this.deleteDataset(e, dataset._id)}
                      onClickUpdate={e => this.updateDataset(e, dataset._id)}
                      onClickView={e =>
                        this.props.history.push(
                          `/dashboard/view/${dataset._id}`
                        )
                      }
                      datasetName={dataset.name}
                      datasetNumPoints={dataset.dataPoints.length}
                      datasetCreatedAt={dataset.createdAt}
                      datasetUpdatedAt={dataset.UpdatedAt}
                    />
                  );
                })
              )}
            </DatasetList>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
