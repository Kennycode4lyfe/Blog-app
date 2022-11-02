const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

require('dotenv').config()

exports.signup = async (req,res) =>{

// const user = await userModel.findOne({email: req.user.email})

// user.first_name = req.body.first_name
// user.last_name = req.body.last_name


// await user.save()
// delete user.password

res.status(201).json({
    message:'Signup successful ',
    user: req.user
})

}


exports.login = (req,res, {err, user,info})=>{
try {
    if (err) {
        return next(err);
    }
    if (!user) {
        const error = new Error('Username or password is incorrect');
        return next(error);
    }

    req.login(user, { session: false },
        async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            //ADD EXPIRATION TIME, ONCE EXCEEDED, REFRESH TOKEN IS REQUIRED, AND USER IS LOGGED OUT
            // OR THE USER NEEDS TO LOGIN AGAIN
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ token });
        }
    );
} catch (error) {
    return next(error);
}
}






