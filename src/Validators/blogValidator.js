
const joi = require('joi');

const validateBlogMiddleWare = (req, res, next) => {
    const bookPayload = req.body;
    const { error } = blogValidator(bookPayload);

    if (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }

    next();

}


const blogValidator = joi.object({
    title: joi.string()
        .min(5)
        .max(255)
        .required(),
    Description: joi.string()
        .min(5)
        .max(255)
        .optional(),
    
    state: joi.string
        .optional(), 
    read_count: joi.number
        .min(0)
        .optional(),
    reading_time: joi.string
    .optional(),
    tags: Joi.array()
    .items(Joi.string())
    .optional(),
    body: joi.string
    .min(100)
    .required(),
    timestamp:{
        created_at: joi.date
        .default(Date.now()),
        updated_at:joi.date
        .default(Date.now())
    }

})

module.exports = validateBlogMiddleWare;