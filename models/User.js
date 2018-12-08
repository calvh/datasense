module.exports = db => {
  const Schema = db.Schema;
  const userSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
      },

      password: {
        type: String,
        required: true,
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
