import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";
import Stats from "../utils/Stats";
import { Scatter } from "react-chartjs-2";
import Codeblock from "../components/Codeblock";
import Prism from "prismjs";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

class View extends Component {
  state = {
    isLoggedIn: false,
    model: {},
    dataset: {},
    chartOptions: {},
    chartData: {},
  };

  componentDidMount() {
    const accessString = localStorage.getItem("JWT");
    if (!accessString) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      this.setState({
        isLoggedIn: true,
      });

      this.loadDataset()
        .then(() => this.loadModel(this.state.dataset.dataPoints))
        .then(() => this.loadChart(this.state.dataset, this.state.model))
        .then(() => Prism.highlightAll())
        .catch(err => console.log(err));
    }
  }

  loadDataset = () => {
    const accessString = localStorage.getItem("JWT");
    return API.getDataset(accessString, this.props.match.params.id)
      .then(response => {
        this.setState({
          dataset: response.data,
        });
      })
      .catch(err => console.log(err));
  };

  loadModel = dataPoints => {
    const model = Stats.generateSimpleLinearModel(dataPoints);
    this.setState({ model });
  };

  loadChart = (dataset, model) => {
    const actualDataPoints = Stats.convertToXYPoints(dataset.dataPoints);
    const predictedDataPoints = dataset.dataPoints.map(dataPoint => {
      return {
        x: dataPoint[0],
        y: model.lineFunction(dataPoint[0]),
      };
    });
    const chartData = {
      datasets: [
        {
          data: actualDataPoints,
          showLine: false,
          label: "Actual",
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          // pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 5,
        },
        {
          data: predictedDataPoints,
          type: "line",
          label: "Predicted",
          showLine: true,
          pointRadius: 0,
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
        },
      ],
    };

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
              labelString: dataset.xLabel,
              fontColor: "red",
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
              labelString: dataset.yLabel,
              fontColor: "red",
            },
          },
        ],
      },
    };

    this.setState({
      chartOptions,
      chartData,
    });
  };

  render() {
    return (
      <div>
        <Navigation isLoggedIn={this.state.isLoggedIn} />
        <Container>
          {this.state.dataset.dataPoints ? (
            <Row>
              <Col>
                <Col>
                  <h2>Dataset</h2>
                  <p>Name: {this.state.dataset.name}</p>
                  <p>Created at: {this.state.dataset.createdAt}</p>
                  <p>Updated at: {this.state.dataset.updatedAt}</p>
                  <p>
                    Number of data points:{" "}
                    {this.state.dataset.dataPoints.length}
                  </p>
                  <p>Reference: {this.state.dataset.reference}</p>
                  <p>
                    Source: <a href={this.state.dataset.source}>URL</a>
                  </p>
                  <p>Notes: {this.state.dataset.notes}</p>
                </Col>
                <Col>
                  <h2>Data table</h2>
                  <table className="table table-bordered table-hover table-dark table-sm">
                    <thead className="thead-dark">
                      <tr>
                        <th>x</th>
                        <th>y</th>
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
                </Col>
              </Col>
              <Col>
                <Col>
                  <h2>Model</h2>
                  <Codeblock code={this.state.model} language="javascript" />
                </Col>
                <Col>
                  <h2>Equation</h2>
                  {this.state.model.intercept ? (
                    <BlockMath
                      math={`y=${this.state.model.intercept.toFixed(
                        3
                      )}+${this.state.model.slope.toFixed(3)}x_{1}`}
                    />
                  ) : (
                    <h3>No equation</h3>
                  )}
                </Col>
                <Col>
                  <h2>Chart</h2>
                  <Scatter
                    data={this.state.chartData}
                    options={this.state.chartOptions}
                  />
                </Col>
              </Col>
            </Row>
          ) : (
            <h3>Empty dataset!</h3>
          )}
        </Container>
      </div>
    );
  }
}

export default View;
