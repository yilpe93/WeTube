import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo"; // 쿠키 저장소
// Import Middleware
import { localsMiddleware } from "./middlewares";
// Import Router
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
// View template
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
/* 
  # Express Session
  [options]
  - secret: 무작위 문자열로써, 쿠키에 들어있는 session ID를 암호화하기 위한 옵션
  - resave: session을 강제적으로 저장시키는 옵션

  Express는 session을 이용함으로써, 쿠키를 이용할 수 있다.
  passport를 통해서, session이 가진 쿠키를 이용한다. ( session은 암호화된 쿠키를 해석한다. )
  해독된 쿠키는 실제 ID가 되며. 이가 passport를 넘어가면 deserialize() 실행된다.
  deserialize()로 사용자를 식별하게 되면 passport는 방금 찾은 그 사용자를 middleware나 routes의 request object에 할당된다.
  이로인해, 어느 route에서든 로그인한 사용자가 누구인지 체크할 수 있다.
*/
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
/* 
  이 위치에 써준 이유, 위에서 실행된 cookieParser로 부터 쿠키가 쭉 여기까지 내려와서 passport는 초기화되고, 그 다음엔 passport가 제 스스로 쿠키를 들여다봐서, 그 쿠키 정보에 행당하는 사용자를 찾아준다.
  그리곤, passport는 자기가 찾은 그 사용자를 요청한 object, 즉 req.user로 만들어준다.
  그러면 이 user object를 template에 추가시켜 줄 수 있다.
*/
app.use(passport.initialize());
app.use(passport.session());

// Local Middleware
app.use(localsMiddleware);

// Route
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
