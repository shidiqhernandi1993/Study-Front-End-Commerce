export const capitalizeFirst = (input) => {
  if (Array.isArray(input)) {
    return input.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  } else if (typeof input === "string") {
    return input.charAt(0).toUpperCase() + input.slice(1);
  } else {
    return input; // Return input unchanged for other types
  }
};

export const rupiahFormat = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
};

export const totalPrice = (items) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
};

export const logVal = {
  email: {
    required: { value: true, message: "Email tidak boleh kosong" },
    pattern: {
      value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      message: "Masukkan email yang valid",
    },
  },
  password: {
    required: { value: true, message: "Password tidak boleh kosong" },
  },
};

export const regVal = {
  full_name: {
    required: { value: true, message: "Nama lengkap tidak boleh kosong" },
  },
  email: {
    required: { value: true, message: "Email tidak boleh kosong" },
    pattern: {
      value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      message: "Masukkan email yang valid",
    },
  },
  password: {
    required: { value: true, message: "Password tidak boleh kosong" },
  },
  password_confirmation: {
    required: {
      value: true,
      message: "Konfirmasi Password tidak boleh kosong",
    },
  },
};

export const addressVal = {
  nama_alamat: {
    required: { value: true, message: "Nama alamat tidak boleh kosong" },
    maxLength: { value: 500, message: "Panjang alamat maksimal 500 karakter" },
    minLength: { value: 5, message: "Panjang alamat minimal 5 karakter" },
  },
  provinsi: {
    required: { value: true, message: "Provinsi tidak boleh kosong" },
  },
  kabupaten: {
    required: { value: true, message: "kabupaten tidak boleh kosong" },
  },
  kecamatan: {
    required: { value: true, message: "kecamatan tidak boleh kosong" },
  },
  kelurahan: {
    required: { value: true, message: "kelurahan tidak boleh kosong" },
  },
  detail_alamat: {
    required: { value: true, message: "Detail alamat harus diisi" },
    maxLength: { value: 1000, message: "Detail alamat maksimal 1000 karakter" },
  },
};
