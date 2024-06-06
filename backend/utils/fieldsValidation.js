const { check , body } = require("express-validator");

const signUpValidation=(req ,res , next)=>{
   return [
        check("first_name").trim().isLength({ min: 1 }).withMessage("first name must not be empty"),
        check("last_name").trim().isLength({ min: 1 }).withMessage("last name must not be empty"),
        check("phone_no").trim().isLength({ min: 1 }).withMessage("Phone number must not be empty"),
        check("email").trim().isEmail().withMessage("Invalid email format"),
        check("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
      ]

};

const loginValidation=(req, res ,next)=>{
   return [
        check("email").trim().isEmail().withMessage("Invalid email format"),
        check("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
      ]
};

const editUserValidation=(req , res , next)=>{
   return [
    check("first_name").trim().isLength({ min: 1 }).withMessage("first name must not be empty"),
    check("last_name").trim().isLength({ min: 1 }).withMessage("last name must not be empty"),
    check("phone_no").trim().isLength({ min: 1 }).withMessage("Phone number must not be empty"),
    check("email").trim().isEmail().withMessage("Invalid email format"),
      ]

};

const generatePersonaValidation =()=>{
  return [
    check("idealTraits").trim().not().isEmpty().withMessage("Ideal traits cannot be empty"),
    check("name").trim().not().isEmpty().withMessage("name cannot be empty"),
    check("cities").trim().not().isEmpty().withMessage("Cities cannot be empty"),
    check("usp").trim().not().isEmpty().withMessage("USP cannot be empty"),
  ]
};


const editPersonaValidation =()=>{
  return [
    check("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
    check("background").trim().not().isEmpty().withMessage("Background cannot be empty"),
    check("housing_needs").trim().not().isEmpty().withMessage("Housing needs cannot be empty"),
    check("other_requirements").trim().not().isEmpty().withMessage("Other requirements cannot be empty"),
  ]
};

const generatePostValidation =()=>{
  return [
    check("persona.heading").trim().not().isEmpty().withMessage("Headings cannot be empty"),
    check("persona.name").trim().not().isEmpty().withMessage("Name cannot be empty"),
    check("persona.background").trim().not().isEmpty().withMessage("Background cannot be empty"),
    check("persona.housing_needs").trim().not().isEmpty().withMessage("Housing needs cannot be empty"),
    check("persona.other_requirements").trim().not().isEmpty().withMessage("Other requirements cannot be empty"),
    check("tone").isArray({min:1}).withMessage("Tones must be an array and it cannot be empty")
  ]
};

const confirmPostValidation=()=>{
  return [
    check("heading").trim().not().isEmpty().withMessage("Headings cannot be empty") ,
    check("description").trim().not().isEmpty().withMessage("Description cannot be empty") ,
    // check("generatedImages").isArray({min:1}).withMessage("generatedImages must be array and cannot be empty")
  ]
};

const resetPasswordValidation=()=>{
  return [
    check("userId").trim().not().isEmpty().withMessage("Invalid userId , must not be empty"),
    check("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ]
}

const updatePasswordValidation=()=>{
  return [
    check("previous_password").trim().not().isEmpty().withMessage("Invalid previous password , must not be empty"),
    check("new_password").trim().isLength({ min: 6 }).withMessage("New Password must be at least 6 characters"),
  ]
}

const askHelpValidation=()=>{
  return [
    check("full_name").trim().not().isEmpty().withMessage("Full name cannot be empty"),
    check("email").trim().not().isEmpty().withMessage("Email cannot be empty"),
    check("subject").trim().not().isEmpty().withMessage("Subject cannot be empty"),
    check("description").trim().not().isEmpty().withMessage("Description cannot be empty")
  ]
}

const paymentCardValidation=()=>{
  return [
    body('card_number').notEmpty().isNumeric().withMessage("Invalid card number"),
  body('cvv').notEmpty().isLength({ min: 3, max: 4 }).isNumeric().withMessage("Invalid cvv, must be 3 or 4 digit"),
  body('holder_name').notEmpty().isString().withMessage("Holder name cannot be empty"),
  body('expiry_month').notEmpty().isInt({ min: 1, max: 12 }).withMessage("Invalid expiry month, must be 01-12"),
  body('expiry_year').notEmpty().isInt({ min: new Date().getFullYear()}).withMessage(`Invalid expiry year , must be greater than ${new Date().getFullYear()}`)
  ]
};

const appointmentValidation=()=>{
  return [
    check("date").isDate().withMessage("Invalid date format")
  ]
}


exports.signUpValidation = signUpValidation;
exports.loginValidation = loginValidation;
exports.editUserValidation = editUserValidation;
exports.generatePersonaValidation = generatePersonaValidation;
exports.editPersonaValidation = editPersonaValidation;
exports.generatePostValidation = generatePostValidation;
exports.confirmPostValidation = confirmPostValidation;
exports.resetPasswordValidation = resetPasswordValidation
exports.updatePasswordValidation = updatePasswordValidation
exports.askHelpValidation = askHelpValidation;
exports.paymentCardValidation = paymentCardValidation;
exports.appointmentValidation = appointmentValidation;