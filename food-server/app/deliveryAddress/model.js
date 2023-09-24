const { Schema, model } = require("mongoose");

const deliveryAddressSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "Address name is required"],
      maxlength: [
        255,
        "The maximum length of the address name is 255 characters",
      ],
    },
    kelurahan: {
      type: String,
      required: [true, "Kelurahan is required"],
      maxlength: [255, "The maximum length of kelurahan is 255 characters"],
    },
    kecamatan: {
      type: String,
      required: [true, "Kecamatan is required"],
      maxlength: [255, "The maximum length of kecamatan is 255 characters"],
    },
    kabupaten: {
      type: String,
      required: [true, "Kabupaten is required"],
      maxlength: [255, "The maximum length of kabupaten is 255 characters"],
    },
    provinsi: {
      type: String,
      required: [true, "Provinsi is required"],
      maxlength: [255, "The maximum length of provinsi is 255 characters"],
    },
    detail: {
      type: String,
      required: [true, "Address detail is required"],
      maxlength: [
        1000,
        "The maximum length of address detail is 1000 characters",
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);
