import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import teamRouter from "./routes/team.route.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectToDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/team", teamRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});
