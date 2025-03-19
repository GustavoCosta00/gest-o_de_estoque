const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  pagamento: {
    type: Boolean,
    default: false, // Por padrão, o pagamento está pendente
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Antes de salvar, criptografa a senha se ela foi modificada
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 4);
  next();
});

// Método para comparar senha informada com a criptografada
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
