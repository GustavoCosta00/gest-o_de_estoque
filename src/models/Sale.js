const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SaleSchema = new mongoose.Schema({
  sale: {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        price: Number,
        formattedPrice: String,
      },
    ],
    total: Number,
  },

  formattedDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SaleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Sale", SaleSchema);
