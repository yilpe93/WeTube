import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
    // console.log(req.body);
    const {
        body: { name, email, password, password2 }
    } = req;
    
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: 'Join' });
    } else {
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home);
    }
    /* 
        status coad(상태 코드): 인터넷이 서로 어떻게 상호작용하는지 표시  
        204 - 내용이 없음
        403 - 금지됨
        400 - 잘못된 요청
    */
};

export const getLogin = (req, res) =>
    res.render("login", { pageTitle: 'Log In' });

export const postLogin = (req, res) => {
    // To Do: Validate into Database
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do: Process Log Out
    res.redirect(routes.home);
}

export const userDetail = (req, res) => 
    res.render("userDetail", { pageTitle: 'User Detail' });

export const editProfile = (req, res) => 
    res.render("editProfile", { pageTitle: 'Edit Profile' });

export const changePassword = (req, res) => 
    res.render("changePassword", { pageTitle: 'Change Password' });