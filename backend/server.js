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
import chalk from "chalk"; 

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Customize morgan token to include color
morgan.token('coloredstatus', (req, res) => {
  // get status code
  const status = res.statusCode;

  // status code coloring
  const statusColor =
    status >= 500
      ? chalk.red(status)
      : status >= 400
      ? chalk.yellow(status)
      : status >= 300
      ? chalk.cyan(status)
      : status >= 200
      ? chalk.green(status)
      : status;

  return statusColor;
});

// Custom morgan format with colors
const morganFormat = chalk.gray(':method') + ' ' + chalk.yellow(':url') + ' ' + ':coloredstatus' + ' ' + chalk.green(':response-time ms') + ' - ' + chalk.blue(':res[content-length]');

app.use(morgan(morganFormat)); 

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

app.get("/photos/:filename", (req, res) => {
  const { filename } = req.params;
  // Send the photo as a response
  res.sendFile(path.join(__dirname, `public/assets/${filename}`));
});

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
    app.listen(PORT, () => console.log(`Server listening in port : ${chalk.blue(PORT)}`)); // Colorize PORT using chalk
  })
  .catch((error) => {
    console.log(`${chalk.red(error)} did not connect`); // Colorize error using chalk
  });
