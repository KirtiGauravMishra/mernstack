import User from '../models/user.js';

export const roleCheck = (roles) => (req, res, next) => {
    return User.findById(req.userId).then((user) => {
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    });
};