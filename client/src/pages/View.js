import React, { Component } from "react";
import Navigation from "./../components/Navigation/Navigation";
import { Container, Row, Col } from "reactstrap";
import API from "../utils/API";
import MLR from "../utils/MLR";
import utils from "../utils/utils";
import { Scatter } from "react-chartjs-2";
import Codeblock from "../components/Codeblock";
import Prism from "prismjs";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

class View extends Component {
  state = {
    isLoggedIn: false,
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
        .then(() =>
          this.loadModel(this.state.dataset.xVals, this.state.dataset.yVals)
        )
        .then(model =>
          this.loadChart(
            utils.convertToXYPoints(
              this.state.dataset.xVals,
              this.state.dataset.yVals
            ),
            this.state.dataset.xVals.map(xVal => {
              return { x: xVal[0], y: MLR.predict(model, xVal) };
            })
          )
        )
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
        return response.data;
      })
      .catch(err => console.log(err));
  };

  loadModel = (xVals, yVals) => {
    const model = MLR.generateModel(xVals, yVals);
    this.setState({ model });
    return model;
  };

  getPredictedDatapoints = (model, xVals) => {};

  loadChart = (actualDatapoints, predictedDataPoints) => {
    const chartData = {
      datasets: [
        {
          data: actualDatapoints,
          showLine: false,
          label: "Actual",
        },
        {
          data: predictedDataPoints,
          type: "line",
          label: "Predicted",
          showLine: true,
          fill: false,
        },
      ],
    };

    const chartOptions = {
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
              labelString: "X",
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
              labelString: "Y",
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
          {this.state.dataset.xVals ? (
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h2>Data table</h2>
                    <table>
                      <tbody className="d-flex flex-column align-content-center">
                        <tr>
                          <th>x</th>
                          <th>y</th>
                        </tr>

                        {this.state.dataset.xVals.map((currVal, i) => (
                          <tr key={i}>
                            <td>{currVal}</td>
                            <td>{this.state.dataset.yVals[i]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2>Model</h2>
                    <Codeblock code={this.state.model} language="javascript" />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <h2>Equation</h2>
                    {this.state.model ? (
                      <BlockMath
                        math={`y=${this.state.model.weights[
                          this.state.model.weights.length - 1
                        ][0].toFixed(
                          2
                        )}+${this.state.model.weights[0][0].toFixed(2)}x_{1}`}
                      />
                    ) : (
                      <h3>No equation</h3>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2>Chart</h2>
                    <Scatter
                      data={this.state.chartData}
                      options={this.state.chartOptions}
                    />
                  </Col>
                </Row>
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
