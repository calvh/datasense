module.exports = db => {
  const Schema = db.Schema;
  const datasetSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      dataPoints: {
        type: [[Number]],
        required: true,
      },

      notes: {
        type: String,
      },

      reference: {
        type: String,
      },

      source: {
        type: String,
      },

      xLabel: {
        type: String,
      },

      yLabel: {
        type: String,
      },
    },

    { timestamps: true }
  );

  return db.model("Dataset", datasetSchema);
};
