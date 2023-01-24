const mongoose = require('mongoose');

const connect = () => { 
mongoose.connect(process.env.MONGODB_CONNECTION_URL)

mongoose.connection.on("connected", () => { 
    console.log("Connected to MongoDB Successfully"); 
});

mongoose.connection.on("error", (err) => { 
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);    
}); 
}

module.exports = { connect };
