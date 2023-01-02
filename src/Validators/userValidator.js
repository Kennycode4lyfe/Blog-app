
const joi = require('joi');

const validateUserMiddleWare = (req, res, next) => {
    const bookPayload = req.body;
    const { error } = userValidator(bookPayload);

    if (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }

    next();

}


const userValidator = joi.object({
    created_at: joi.date
    .default(Date.now()),
    first_name: joi.string()
         .required(),
    
    last_name: joi.string
    .required() , 
    email:  joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:  joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
 
})

module.exports = validateUserMiddleWare;