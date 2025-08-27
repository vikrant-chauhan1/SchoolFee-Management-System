import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js"

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/admin",adminRoutes);
//app.use("/api/students",studentRoutes);
//app.use("/api/fees",feeRoutes);

app.listen(5000,()=>{console.log("server is running on port 5000")});