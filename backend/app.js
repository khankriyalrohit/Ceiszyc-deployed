import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

export const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(fileUpload())
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//Config
dotenv.config({ path:"config/config.env"});
// dotenv.config({ path:"backend/config/config.env"});

// Routes 
import {eventRouter} from "./routes/eventRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { teamRouter } from "./routes/teamRoute.js";
import { guestRouter } from "./routes/guestRoute.js";
import { sponsorRouter } from "./routes/sponsorRoute.js";
import { participationRouter } from "./routes/participationRoute.js";
import { errorMiddleware } from "./middlewares/error.js";


app.use("/api/v1",eventRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",teamRouter);
app.use("/api/v1",sponsorRouter);
app.use("/api/v1",guestRouter);
app.use("/api/v1",participationRouter);

app.use(express.static(join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/build', 'index.html'));
});
  

app.use(errorMiddleware)

