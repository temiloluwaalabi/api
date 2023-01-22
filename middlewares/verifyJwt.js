import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
    try{
        let authHeader = req.header("Authorization");
        if(!authHeader) {
            return res.status(403).send("Access Denied")
        }
        if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        const token = authHeader.slice(7, authHeader);
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if(err) return res.sendStatus(403);//you're not authorized
                req.user = decoded.UserInfo.username;
                req.userId = decoded.UserInfo.userId
                req.verify = verified;
                req.roles = decoded.UserInfo.roles;
                next();
            }
        );        
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export default verifyJwt;