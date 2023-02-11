import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to mongodb. Database: ', connection.connections[0].name)
}

export default connectDB