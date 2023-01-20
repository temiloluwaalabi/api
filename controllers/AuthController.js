import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


const handleLogin = async (req, res) => {
    try{
        const cookies = req.cookies;
        const {username, password} = req.body;
        
        if(!username) return res.status(400).json({'message':"Username is required"});    
        const foundUser = await User.findOne({username:username}).exec();

        if(!foundUser) return res.sendStatus(400).json({msg: "User does not exist!"});

        const match = await bcrypt.compare(password, foundUser.password);
        
        const roles = Object.values(foundUser.role);
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "username" : foundUser.username,
                    "email" : foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '10m'}
        );
        const newRefreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        let newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if(cookies.jwt){
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({refreshToken}).exec();
            //deleted token reuse
            if(!foundToken){
                console.log('attempted refresh token reuse');
                //clear out all previous refresh tokens';
                newRefreshTokenArray = []
            }
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure:true});
        }

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();
        res.cookie('jwt', newRefreshToken, {httpOnly: true, sameSite: 'None', secure:true, maxAge: 24 * 60 * 60 *1000});
        res.status(200).json({accessToken, newRefreshToken, roles, foundUser});
    }catch(err){
        res.status(500).json({'message': "Invalid details"})
    }
}

const resetPassword = async(req, res) => {
    
}

export default handleLogin;