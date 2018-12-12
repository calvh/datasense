import React, { Component } from 'react'
import Navigation from './../components/Navigation/Navigation'
import { Container, Row, Col } from 'reactstrap'
import API from '../utils/API'
import Stats from '../utils/Stats'
import { Scatter } from 'react-chartjs-2'
import Codeblock from '../components/Codeblock'
import Prism from 'prismjs'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import moment from 'moment'

const style = {
  backgroundColor: 'red',
}

class View extends Component {
  state = {
    isLoggedIn: false,
    model: {},
    dataset: false,
    chartOptions: {},
    chartData: {},
  }

  componentDidMount() {
    const accessString = localStorage.getItem('JWT')
    if (!accessString) {
      this.setState({
        isLoggedIn: false,
      })
    } else {
      this.setState({
        isLoggedIn: true,
      })

      this.loadDataset()
        .then(() => this.loadModel(this.state.dataset.dataPoints))
        .then(() => this.loadChart(this.state.dataset, this.state.model))
        .then(() => Prism.highlightAll())
        .catch(err => console.log(err))
    }
  }

  loadDataset = () => {
    const accessString = localStorage.getItem('JWT')
    return API.getDataset(accessString, this.props.match.params.id)
      .then(response => {
        this.setState({
          dataset: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  loadModel = dataPoints => {
    const model = Stats.generateSimpleLinearModel(dataPoints)
    this.setState({ model })
  }

  loadChart = (dataset, model) => {
    const actualDataPoints = Stats.convertToXYPoints(dataset.dataPoints)
    const predictedDataPoints = dataset.dataPoints.map(dataPoint => {
      return {
        x: dataPoint[0],
        y: model.lineFunction(dataPoint[0]),
      }
    })
    const chartData = {
      datasets: [
        {
          data: actualDataPoints,
          showLine: false,
          label: 'Actual',
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 5,
        },
        {
          data: predictedDataPoints,
          type: 'line',
          label: 'Predicted',
          showLine: true,
          pointRadius: 0,
          fill: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
        },
      ],
    }

    const chartOptions = {
      title: {
        display: true,
        text: dataset.name,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: dataset.headers[0],
              fontColor: 'red',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: dataset.headers[1],
              fontColor: 'red',
            },
          },
        ],
      },
    }

    this.setState({
      chartOptions,
      chartData,
    })
  }

  render() {
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container fluid>
          {this.state.dataset ? (
            <Row className="header-top-row">
              <Col md="12" lg="12">
                <div className="white-box analytics-info">
                  <h2>{this.state.dataset.name}</h2>
                  <hr />
                  <p className="notes-p">{this.state.dataset.notes}</p>
                </div>
              </Col>

              <Col md="4" lg="4">
                <div className="blue-box-view-top analytics-info">
                  <h3 className="box-title-view">Equation</h3>
                  <hr className="divider" width="65%" />
                  <ul className="list-inline two-part">
                    <li className="text-left">
                      <i className="ti-arrow-up text-purple" />
                      <span className="counter text-purple">
                        {this.state.model.intercept ? (
                          <BlockMath
                            math={`y=${this.state.model.intercept.toFixed(3)}+${this.state.model.slope.toFixed(3)}x_{1}`}
                          />
                        ) : (
                          <h3>No equation</h3>
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="card-body-icon">
                    <i className="fas fa-brain" />
                  </div>
                </div>
              </Col>
              <Col md="4" lg="4">
                <div className="green-box-view-top analytics-info">
                  <h3 className="box-title-view">Data Points</h3>
                  <hr className="divider" width="65%" />
                  <ul className="list-inline two-part">
                    <li className="text-left">
                      <i className="ti-arrow-up text-purple" />{' '}
                      <span className="counter text-purple data-points">{this.state.dataset.dataPoints.length}</span>
                    </li>
                  </ul>
                  <div className="card-body-icon">
                    <i className="fab fa-connectdevelop connect-color" />
                  </div>
                </div>
              </Col>
              <Col md="4" lg="4">
                <div className="orange-box-view-top analytics-info">
                  <h3 className="box-title-view">Created On</h3>
                  <hr className="divider" width="65%" />
                  <ul className="list-inline two-part">
                    <li className="text-left">
                      <i className="ti-arrow-up text-purple" />{' '}
                      <span className="counter text-purple created-on">
                        {moment(this.state.dataset.createdAt).format('MM/DD/YY')}
                        {/* <Codeblock code={this.state.model} language="javascript" /> */}
                      </span>
                    </li>
                  </ul>
                  <div className="card-body-icon">
                    <i className="fas fa-clock clock-color" />
                  </div>
                </div>
              </Col>
              <Col md="8" lg="8">
                <div className="white-box-chart analytics-info">
                  <h2>Data Chart</h2>
                  <hr />
                  <Scatter data={this.state.chartData} options={this.state.chartOptions} />
                </div>
              </Col>
              <Col md="4" lg="4">
                <div className="white-box-table analytics-info">
                  <h2>Data Table</h2>
                  <hr />
                  <table className="table table-bordered table-hover table-dark table-sm">
                    <thead className="thead-dark">
                      <tr>
                        <th>
                          X-Axis <br />
                          {this.state.dataset.headers[0]}
                        </th>
                        <th>
                          Y-Axis <br /> {this.state.dataset.headers[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.dataset.dataPoints.map((dataPoint, i) => (
                        <tr key={`datapoint-${i}`}>
                          <td>{dataPoint[0]}</td>
                          <td>{dataPoint[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md="12" lg="12">
                <div className="white-box analytics-info">
                  <h2>Model</h2>
                  <hr />
                  <Codeblock code={this.state.model} language="javascript" />
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="header-top-row">
              <Col md="12" lg="12">
                <h3>Loading...</h3>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}

export default View
