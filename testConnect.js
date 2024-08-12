require('dotenv').config();
const { connectMongoDB } = require('./lib/mongodb');

console.log('MONGODB_URI:', process.env.MONGODB_URI);


(async () => {
    try {
        await connectMongoDB();
        console.log("Connection successful");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        process.exit();
    }
})();