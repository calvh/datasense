import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";
import Datasets from "./../components/Datasets/Datasets";
import Header from "./../components/Header/Header";
import API from "../utils/API";
import DisplayData from "../../src/components/DisplayData/DisplayData";
import DeleteDatasetBtn from "../../src/components/DisplayData/DeleteDatasetBtn";
import UpdateDatasetBtn from "../../src/components/DisplayData/UpdateDatasetBtn";
import ViewDatasetBtn from "../../src/components/DisplayData/ViewDatasetBtn";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
        console.log(this.state);
        this.loadDatasets();
        console.log(response.data);
        console.log("state: ")
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  updateDataset = event => {
    event.preventDefault();
    //grab id from the event that invoked the function
    let datasetId = event.target.id;
    const accessString = localStorage.getItem("JWT");
    // TODO where do updates come from?
    const projectName = "Updated dataset";
    const xVals = [[4], [5], [6]];
    const yVals = [[3], [5], [7]];
    // x = [4, 5, 6]
    const updatedDataset = { name: projectName, xVals, yVals };

    API.updateDataset(accessString, datasetId, updatedDataset)
      .then(response => {
        console.log(response.data);
        this.loadDatasets();
      })
      .catch(err => console.log(err));
  };

  deleteDataset = event => {
    event.preventDefault();
    //grab id from the event that invoked the function
    let datasetId = event.target.id;

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
          <button className="btn btn-sm" onClick={this.createDataset}>
            Create Sample Dataset
          </button>
        </Container>
        <Container>
          <Row>
            {/* // TODO pass names, dataset IDs (as keys) of this.state.datasets to the Datasets component */}
            <Datasets>
                {this.state.datasets.map((dataset, i) => {
                  return (
                  <DisplayData datasetname={dataset.name} > 
                      <DeleteDatasetBtn 
                        onClick = {this.deleteDataset}
                        key = {`delete${i}`}
                        id = {dataset._id}
                      />
                      
                      <ViewDatasetBtn 
                        // add link component route to view.js page
                        //pass state from one sibling component to next
                        onClick = {this.ViewDataset}
                        key = {`view${i}`}
                        id = {dataset._id}
                      />

                      <UpdateDatasetBtn 
                        onClick = {this.updateDataset}
                        key = {`update${i}`}
                        id = {dataset._id}
                      />
                  </DisplayData>
                )
                }
              )}
            </Datasets>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
