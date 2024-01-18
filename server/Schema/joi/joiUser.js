import Joi from "joi";

const joiValidateUser = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(60)
        .regex(/^[a-zA-Z\s]+$/),
    email: Joi.string()
        .regex(
            /^[^\x00-\x1F\x7F\x80-\xFF\s()<>@,;:"\[\]|ç%&,]+@[a-zA-Z0-9.-]+\.(com|net|co|org)$/u
        )
        .required(),
    password: Joi.string().min(6).max(64).required(),
    repeatPassword: Joi.ref("password"),
});

export default joiValidateUser;
