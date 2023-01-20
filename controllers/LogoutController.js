import User from "../model/User.js";

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();

    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure:true});
        return res.sendStatus(204)
    };

    //delete refreshToken 
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    const result = foundUser.save();
    console.log(result)
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure:true});
    res.status(200).json("Succesfully logged out")
}

export default handleLogout;