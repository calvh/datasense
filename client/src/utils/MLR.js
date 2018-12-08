import MLR from "ml-regression-multivariate-linear";

// example datasets:

// #1
// x = [[1], [2], [3]]
// y = [[3], [5], [7]]

// #2
// x = [[0, 0], [1, 2], [2, 3], [3, 4]]
// y = [[0, 0, 0], [2, 4, 3], [4, 6, 5], [6, 8, 7]];

export default {
  getModel(xVals, yVals) {
    return new MLR(xVals, yVals);
  },

  getPredictedValue(model, yVal) {
    return model.predict(yVal);
  },
};
