import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/authController.js";
import { createPost } from "./controllers/postController.js";
import { verifyToken } from "./middlewares/auth.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT;
console.log(PORT)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // User.insertMany(users);
    // Post.insertMany(posts);
    app.listen(PORT, () => console.log(`Server listening in port : ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
