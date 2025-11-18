import mongoose from "mongoose";

const connected = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("Database is connected successfully :", connection.connection.host)
    } catch (error) {
        console.log(`Database is failed now : ${error}`)
        process.exit(1)
    }
}

export { connected }