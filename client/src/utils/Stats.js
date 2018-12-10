import {
  linearRegression,
  linearRegressionLine,
  rSquared,
} from "simple-statistics";

export default {
  generateSimpleLinearModel(dataPoints) {
    // linearRegression([[0, 0], [1, 1]])  => { m: 1, b: 0 }
    const model = linearRegression(dataPoints);
    const slope = model.m;
    const intercept = model.b;
    const lineFunction = linearRegressionLine(model);
    const r2 = rSquared(dataPoints, lineFunction);

    return {
      slope,
      intercept,
      lineFunction,
      r2,
    };
  },
  
  convertToXYPoints(dataPoints) {
    // converts [[1, 2], [3, 4]] to [{x:1, y:2}, {x:3, y:4}]
    return dataPoints.map(dataPoint => {
      return { x: dataPoint[0], y: dataPoint[1] };
    });
  },
};
