var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    imageUrl: String,
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function () {
  let product = {
    id: this._id,
    name: this.name,
    description: this.description,
    price: this.price,
    imageUrl: this.imageUrl,
    updatedAt: this.updatedAt,
  }
  if(product.user && product.user.id){
    product.user = this.user.toJSON();
  }
  return product;
};

mongoose.model("Product", ProductSchema);
