module.exports = db => {
  const Schema = db.Schema;
  const userSchema = new Schema(
    {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      datasets: [
        {
          type: Schema.Types.ObjectId,
          ref: "Dataset",
        },
      ],
    },
    { timestamps: true }
  );

  return db.model("User", userSchema);
};
