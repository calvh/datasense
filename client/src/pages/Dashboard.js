import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Navigation from '../components/Navigation/Navigation'
import DatasetList from '../components/DatasetList/DatasetList'
import Header from '../components/Header/Header'
import API from '../utils/API'
import DatasetRow from '../components/DatasetRow'
import SampleDatasets from '../utils/SampleDatasets'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    isLoggedIn: false,
    datasets: [],
  }

  componentDidMount() {
    const accessString = localStorage.getItem('JWT')
    if (!accessString) {
      this.props.history.push('/login')
    } else {
      this.setState({
        isLoggedIn: true,
      })
      this.loadDatasets()
    }
  }

  loadDatasets = () => {
    const accessString = localStorage.getItem('JWT')
    API.getAllDatasets(accessString)
      .then(response => {
        console.log(response.data)
        this.setState({
          datasets: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  createDataset = data => {
    const accessString = localStorage.getItem('JWT')
    // TODO replace testDataset with actual data

    API.createDataset(accessString, SampleDatasets.getRandomDataset())
      .then(response => {
        console.log(response.data)
        this.loadDatasets()
      })
      .catch(err => console.log(err))
  }

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
    event.preventDefault()
    const accessString = localStorage.getItem('JWT')

    // TODO replace testDataset with actual data
    API.updateDataset(
      accessString,
      datasetId,
      SampleDatasets.getRandomDataset()
    )
      .then(response => {
        console.log(response.data)
        this.loadDatasets()
      })
      .catch(err => console.log(err))
  }

  deleteDataset = (event, datasetId) => {
    event.preventDefault()
    const accessString = localStorage.getItem('JWT')

    API.deleteDataset(accessString, datasetId)
      .then(response => {
        console.log(response.data)
        this.loadDatasets()
      })
      .catch(err => console.log(err))
  }

  render() {
    // TODO replace Datasets with actual data from this.state.datasets
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container fluid>
          <Header />
          <Row>
            {/* // TODO pass names, dataset IDs (as keys) of this.state.datasets to the Datasets component */}
            <Col md="12">
              <button className="btn btn-sm" onClick={this.loadSampleDatasets}>
                Load sample datasets
              </button>
              <button className="btn btn-sm" onClick={this.createDataset}>
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
            {/* // TODO pass names, dataset IDs (as keys) of this.state.datasets to the Datasets component */}
            <DatasetList>
              {this.state.datasets.map(dataset => {
                return (
                  <DatasetRow
                    datasetName={dataset.name}
                    datasetCreatedAt={dataset.createdAt}
                    datasetUpdatedAt={dataset.UpdatedAt}
                    key={`display-${dataset._id}`}
                    onClickDelete={e => this.deleteDataset(e, dataset._id)}
                    onClickUpdate={e => this.updateDataset(e, dataset._id)}
                    onClickView={e => this.props.history.push(`/dashboard/view/${dataset._id}`)}
                  />
                )
              })}
            </DatasetList>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Dashboard
