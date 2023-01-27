const mongoose = require("mongoose");

module.exports = async function connecDB() {
  await mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL, () => {
    console.log(`MongoDB Database Connected`);
  });
};
