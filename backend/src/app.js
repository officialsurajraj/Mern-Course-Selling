import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser());


// Routes import
import userRouter from "./routes/user.routes.js"
import courseRouter from "./routes/course.routes.js"
import enrolledRouter from "./routes/enrolled.routes.js";

app.get("/", (req, res) => {
    res.json({ message: "Hello Coder" })
});

// Routes Delarations
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/enrolled", enrolledRouter)


export { app }