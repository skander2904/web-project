var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["protein", "creatine", "preworkout", "clothes", "other"], 
    default: "other",
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
