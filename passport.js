import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
    githubLoginCallback,
    facebookLoginCallback
} from "./controller/userController";

import routes from "./routes";

// strategy:  로그인하는 방식
passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECREAT,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        // Github에 접근하고 나서 실행되는 함수
        githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECREAT,
            // callbackURL: `http://localhost:4000${routes.facebookCallback}`
            callbackURL: `https://strong-bat-94.localtunnel.me${
                routes.facebookCallback
            }`
        },
        facebookLoginCallback
    )
);

// 어떤 정보를 쿠키에게 주는 가, 웹브라우저(클라이언트)에 있는 사용자에 대해서, 어떤 정보를 가질 수 있는 가
// 쿠키에 있는 정보는 자동적으로 백엔드로 전송됨, 쿠키는 아주 작아야 하고, 민감한 정보는 절대 담지 말기를

// serialization: 어떤 field가 쿠키에 포함될 것인지 알려주는 역할
// deserialization: 쿠키의 정보를 어떻게 사용자로 전환하는가를 의미

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
