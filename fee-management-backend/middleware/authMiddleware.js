import jwt from "jsonwebtoken";

const JWT_SECRET = "dihhAhhNigga"; // move this to .env later 

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]; //req.headers is just a normal way of saying give me the value of property called authorization in headers object which is in req object
    const token = authHeader && authHeader.split(" ")[1];//splits at the space into an array and grabs whatever is at index 1, we also added the and operator so first it checks if the auth header exists and then splits it if it does not then no splits happen and there is no crash 
    //we have extracted the token on the above line 
    if (!token){
        return res.status(403).json({message:"Access denied"});

    }

    try {
        const decoded= jwt.verify(token,JWT_SECRET);
        req.adminInfo= decoded; // attach user data to request
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"Invalid token"});

        
    }
}

