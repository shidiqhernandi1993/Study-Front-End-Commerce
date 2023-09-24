const mongoose = require("mongoose");
const { dbHost, dbPass, dbPort, dbUser, dbName } = require("../app/config");

//for local
/*mongoose.connect(
  `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);
const db = mongoose.connection;
*/
//mongo atlas
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log(`Server database terhubung ${db.host}`));

module.exports = db;
