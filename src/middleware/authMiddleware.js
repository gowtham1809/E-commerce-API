const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {    
    const token = req?.cookies?.token;
        if (!token) return res.status(401).json({ message: "Not authorized" });
    try {
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded
        next();
    } catch (error) {
        res.status(403).json({page:"middleware", message:error});
       }
}

module.exports = authMiddleware;