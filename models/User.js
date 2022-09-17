var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,

    fullName: this.fullName,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model("User", UserSchema);
