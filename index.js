import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import offerRoutes from "./routes/offerRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 4000;




// Middleware
app.use(bodyParser.json());

// Routes
app.use("/offers", offerRoutes);
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://raouf:28aut2002@travelagence.vuutl.mongodb.net/?retryWrites=true&w=majority&appName=travelAgence"

    
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
