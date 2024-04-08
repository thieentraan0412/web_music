const jwt = require("jsonwebtoken")
const dotenv =  require("dotenv")
dotenv.config();
const middlewareControler = {
    //verifytoken
    verifyToken: async(req,res,next) =>
    {
        const token = req.headers.token;
        if(token)
        {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>
            {
                if(err)
                {
                    res.status(403).json("token is not valid")
                }else{             
                req.user = user;
                next();
                }
            })
        }else{
            res.status(401).json("you are not authenticated")
        }
    },
        verifyTokenandAmin: async (req,res,next) =>
     {
        middlewareControler.verifyToken(req,res,()=>
        {
            if(req.user.id == req.params.id || req.user.admin)
            {
                next();
            }
            else{
                res.status(403).json("you not allow delete user")
            }
        })
     }
}
module.exports = middlewareControler;