const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tagSchema = Schema({
  name: {
    type: String,
    minlength: [3, "Tag minimal 3 karakter"],
    maxlength: [20, "Tag maksimal 20 karakter"],
    required: [true, "Nama tag tidak boleh kosong"],
  },
});

module.exports = model("Tag", tagSchema);
