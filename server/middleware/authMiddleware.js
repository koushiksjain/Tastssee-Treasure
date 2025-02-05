const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).send({ message: "Access Denied. No Token Provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!token) {
        return res.status(401).send({ message: "Access Denied. Invalid Token Format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify token
        req.user = decoded; // Attach user payload to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).send({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
