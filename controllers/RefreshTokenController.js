import User from "../model/User.js";
import jwt  from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401);
    } 
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {httpOnly:true, sameSite: 'None',secure:true});

    const foundUser = await User.findOne({refreshToken}).exec()

    //detected refresh token reuse!
    if(!foundUser){
        console.log('attempted refresh token reuse');
        return res.sendStatus(403);
        
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async(err, decoded) => {
                console.log(decoded)
                if(err){
                    console.log('attempted refresh token reuse');
                    return res.sendStatus(403);
                } 
                const hackedUser = await User.findOne({username:decoded.username}).exec()
                hackedUser.refreshToken = []
                const result = await hackedUser.save();
                console.log(result)
            }
        )
    } 


    //evaluate jwt
    //expired refresh token //time elasped
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken); //it deletes the expired refreshtoken from the database and returns all other active refresh token

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async(err, decoded) => {
            if(err){
                console.log('expired refresh token');
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save()
                console.log(result)
            }
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            //refresh token still valid
            const roles = Object.values(foundUser.role);
            const accessToken = jwt.sign({
                    "UserInfo": {
                        "username":decoded.username,
                        "roles" : roles
                    }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "20m"}
            );

            const newRefreshToken = jwt.sign(
                {'username': foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );

            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            res.cookie('jwt', newRefreshToken, {httpOnly:true, sameSite: 'None',secure:true, maxAge: 24 * 60 * 60 * 1000});
            res.json({roles, accessToken})
        }
    );
}

export default handleRefreshToken;

