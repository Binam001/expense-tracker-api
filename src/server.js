import express from "express";
import dotenv from "dotenv"
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
import { initDB } from "./config/db.js";

const app = express();

//middleware
app.use(ratelimiter)
app.use(express.json());

dotenv.config()

const PORT = process.env.PORT || 5001;

// app.get('/', (req, res) => {
//   res.send("Hello, World")
// })

app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:",PORT);
  })
})
