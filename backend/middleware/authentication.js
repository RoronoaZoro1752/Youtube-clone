import jwt from 'jsonwebtoken';  // Importing jwt for token verification
import user from '../models/User.js';  // Importing the User model

// Middleware for User Authentication
export const auth = async (req, res, next) => {
    // Extract the token from the cookies
    const token = req.cookies.token;

    // If no token is provided, deny access
    if(!token){
        return res.status(401).json({ error: 'User authentication denied' });
    }else{
        try {
            // Verify the token using the secret key
            const decode = jwt.verify(token, "secretKey");

            // Find the user based on the decoded userId and exclude the password field
            req.user = await user.findById(decode.userId).select('-password');

            // Move to the next middleware or route
            next();
        } catch (err) {
            // If token verification fails, return a 401 error
            res.status(401).json({ error: 'Token is not valid' })
        }
    }
}
