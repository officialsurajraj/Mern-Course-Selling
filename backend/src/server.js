import dotenv from "dotenv"
import { app } from "./app.js"
import { connected } from "./config/db.js"

dotenv.config({
    path: './env'
})

connected()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on this PORT : ${PORT}`)
})

// here we start a database connection now