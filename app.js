import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// Import Router
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());
app.use(morgan("dev"));

// Route
app.use(routes.home, globalRouter);
// app.use(routes.users, userRouter);
// app.use(routes.videos, videoRouter);

export default app;