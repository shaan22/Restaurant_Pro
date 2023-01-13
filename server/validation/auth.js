import joi from 'joi';

export const ValidateSignUp = (userData) => {
    const Schema = joi.object({
        fullname: joi.string().required().min(5),
        email: joi.string().email().required(),
        password: joi.string().min(10).max(10),
        address: joi
        .array()
        .items(joi.object({details: joi.string(), for: joi.string()})),
        phoneNumber: joi.number(),
    });
    return Schema.validateAsync(userData);
};

export const ValidateSignIn = (userData) => {
    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    return Schema.validateAsync(userData);
};