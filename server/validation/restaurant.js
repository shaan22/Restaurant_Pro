import Joi from "joi";

export const validateRestaurantCity = (restaurantObject) => {
    const Schema = Joi.object({
        city: Joi.string().required(),
    });
    return Schema.validateAsync(restaurantObject);
}

export const validateRestaurantSearchString = (restaurantObject) => {
    const Schema = Joi.object({
        searchString : Joi.string().required(),
    });
    return Schema.validateAsync(restaurantObject);
}