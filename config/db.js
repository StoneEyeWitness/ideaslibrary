const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        
        const conection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conection.connection.host}`);
    }catch(error){
        console.log(`Something went wrong`);
        console.log(error);
    }
}

// mongoose.set('strictQuery',true);

module.exports = connectDB;