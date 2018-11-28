module.exports = db => {
  const Schema = db.Schema;
  const datasetSchema = new Schema(
    {
      yVals: [],
      xVals: [],
    },
    { timestamps: true }
  );

  return db.model("Dataset", datasetSchema);
};
