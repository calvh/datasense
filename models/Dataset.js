module.exports = db => {
  const Schema = db.Schema;
  const datasetSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      yVals: {
        type: [[Number]],
        required: true,
      },

      xVals: {
        type: [[Number]],
        required: true,
      },
    },

    { timestamps: true }
  );

  return db.model("Dataset", datasetSchema);
};
