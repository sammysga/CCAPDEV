import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';


const url = 'mongodb://localhost:27017/ccapdev-mp';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: async function () {
        try {
            await mongoose.connect(process.env.MONGODB_URI || url, options);
            console.log('Connected to: ' + url);
        } catch (error) {
            throw error;
        }
    },
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    }

    // Other methods related to database operations
};

export default database;