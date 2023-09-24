const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema({
  name: {
    type: String,
    minlength: [3, "Katergori minimal 3 karakter"],
    maxlength: [20, "Kategori maksimal 20 karakter"],
    required: [true, "Nama kategori tidak boleh kosong"],
  },
});

module.exports = model("Category", categorySchema);
