const { check ,validationResult}=require('express-validator');


//validation 
exports.validateSignupRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('lastName'),
    check('email')
    .isEmail()
    .withMessage(' valid email is required'),
    check('password')
    .isLength({ min :6})
    .withMessage('password must be at last 6 character long'),
];
exports.validateSigninRequest=[
    check('email')
    .isEmail()
    .withMessage(' valid email is required'),
    check('password')
    .isLength({ min :6})
    .withMessage('password must be at last 6 character long'),
];
// bch traja3 glta wn 
exports.isRequestValited =async(req,res,next)=>{
    try {
        const errors = await validationResult(req);
        if (errors.array().length > 0) {
            return res.status(400).json({
                error: errors.array()[0].msg
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
