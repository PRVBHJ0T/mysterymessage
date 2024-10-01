
import mongoose from "mongoose"

type ConnectionObect = {
    isConnected? : number
}
const connection: ConnectionObect={}

export default async function dbConnect() :Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "",{})

        connection.isConnected= db.connections[0].readyState

        console.log("db connected succesfuly")
    } catch (error) {
        console.log("database connection failed", error);
        process.exit(1);
        
    }
}