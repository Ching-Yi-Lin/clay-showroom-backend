var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model("User", UserSchema);
