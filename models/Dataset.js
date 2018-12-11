module.exports = db => {
  const Schema = db.Schema;
  const datasetSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        default: `Dataset ${Date.now()}`,
      },

      dataPoints: {
        type: [[Number]],
        required: true,
      },

      headers: {
        type: [String],
      },

      notes: {
        type: String,
      },

      source: {
        type: String,
      },
    },

    { timestamps: true }
  );

  return db.model("Dataset", datasetSchema);
};
