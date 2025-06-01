import User from "../models/User.js";

export const protect= async (req, res, next) => {
    const userId = req.auth.userId; // Assuming the user ID is available in req.auth.userId
    if (!userId) {
        res.json({success: false, message: "Unauthorized access"});
    }
    else{
        const user =await User.findById(userId);
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler
    }
}