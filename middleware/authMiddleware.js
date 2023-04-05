

// const userMosel = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
    // const authorization = req.headers.authorization;
    // if (authorization && authorization.startsWith('Bearer')) {
    //     try {
    //         const token = req.headers.authorization.split(' ')[1];
    //         const userVerify = jwt.verify(token, 'masobimat');
    //         const userId = userVerify._id;
    //         const userInf = await userMosel.findById(userId).select('-password');
    //         req.user = userInf;
    //         next();
    //     } catch (e) {
    //         res.status(401);
    //         throw new Error('token khong dung!');
    //     }
    // } else {
    //     res.status(401);
    //     throw new Error('token truyen khong dung!')
    // }
})

const isAdmin = (req, res, next) => {

    // if (req.user && req.user.isAdmin) {
    //     console.log(req.user.isAdmin)
    //     next();
    // } else {
    //     res.status(401);
    //     throw new Error('khong phai admin!')
    // }
}

module.exports = {
    protect,
    isAdmin
}