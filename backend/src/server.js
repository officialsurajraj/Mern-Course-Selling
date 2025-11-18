import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on this PORT : ${PORT}`)
})

// here we start a database connection now