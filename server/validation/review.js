import Joi from "joi";

export const validateRating = (reviewObject) => {
    const Schema = Joi.object({
        rating : Joi.number().required(),
    });
    return Schema.validateAsync(reviewObject);
};

export const validateReviewText = (reviewObject) =>{
    const Schema = Joi.object({
        reviewText: Joi.string().required(),
    });
    return Schema.validateAsync(reviewObject);
}