export default {
  convertToXYPoints(xVals, yVals) {
    return xVals.map((xVal, i) => {
      return { x: xVal[0], y: yVals[i][0] };
    });
  },
};
