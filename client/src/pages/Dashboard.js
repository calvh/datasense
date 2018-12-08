import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";
import Datasets from "./../components/Datasets/Datasets";
import Header from "./../components/Header/Header";
import API from "../utils/API";

class Dashboard extends Component {
  state = {
    isLoggedIn: false,
    datasets: [],
  };

  componentDidMount() {
    const accessString = localStorage.getItem("JWT");
    if (!accessString) {
      this.setState({
        isLoggedIn: false,
      });
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
    const projectName = "Test dataset";
    const xVals = [[1], [2], [3]];
    const yVals = [[3], [5], [7]];
    const testDataset = { name: projectName, xVals, yVals };

    API.createDataset(accessString, testDataset)
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  updateDataset = datasetId => {
    const accessString = localStorage.getItem("JWT");
    // TODO where do updates come from?
    const projectName = "Updated dataset";
    const xVals = [[4], [5], [6]];
    const yVals = [[3], [5], [7]];
    const updatedDataset = { name: projectName, xVals, yVals };

    API.updateDataset(accessString, datasetId, updatedDataset)
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  deleteDataset = datasetId => {
    const accessString = localStorage.getItem("JWT");
    API.deleteDataset(accessString, datasetId)
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  renderDataset = dataset => {
    // TODO change to proper component
    return (
      <Row key={dataset._id}>
        <div>{dataset._id}</div>
        <div>{dataset.name}</div>
        <button
          className="btn btn-sm"
          onClick={() => this.updateDataset(dataset._id)}
        >
          Update Dataset
        </button>
        <button
          className="btn btn-sm"
          onClick={() => this.deleteDataset(dataset._id)}
        >
          Delete Dataset
        </button>
      </Row>
    );
  };

  render() {
    // TODO replace Datasets with actual data from this.state.datasets
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container>
          <Header />
          <button className="btn btn-sm" onClick={this.createDataset}>
            Create Sample Dataset
          </button>
        </Container>
        <Container>
          <Row>
            {this.state.datasets.map(dataset => this.renderDataset(dataset))}

            {/* // TODO pass names, dataset IDs (as keys) of this.state.datasets to the Datasets component */}
            <Datasets />
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
