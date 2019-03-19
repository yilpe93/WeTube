import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

/* 
  # possport 인증 방식
  1. username(email), password를 찾도록 설정
  2. middleware가 정보를 다음으로 넘겨준다 [globalRouter, postJoin]
  3. postJoin은 이메일, 패스워드 등 정보들을 받아서 사용자를 가입시킨다.
  4. next() 호출되어서 다음 같은 정보를 전달하여, 다음것이 실행된다. [globalRouter, postLogin]
*/
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            // To Do: Register User
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (err) {
            console.log(err);
            res.redirect(routes.home);
        }
    }
    /* 
        status coad(상태 코드): 인터넷이 서로 어떻게 상호작용하는지 표시  
        204 - 내용이 없음
        403 - 금지됨
        400 - 잘못된 요청
    */
};

export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url, name, email }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.avatarUrl = avatar_url;
            user.save();
            return cb(null, user);
        }

        const newUser = await User.create({
            email,
            name,
            githubID: id,
            avatarUrl: avatar_url
        });
        return cb(null, newUser);
    } catch (err) {
        return cb(err);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (acc, ref, profile, cb) => {
    console.log(acc, ref, profile, cb);
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (err) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => res.redirect(routes.editProfile);

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;

    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        // req.flash("success", "Profile updated");
        res.redirect(routes.me);
    } catch (err) {
        // req.flash("err", "Can't update profile");
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            // req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }

        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        // req.flash("error", "Can't change password");
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
};
