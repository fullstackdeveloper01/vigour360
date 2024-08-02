const { body, param, validationResult } = require('express-validator');
// this fun is for to check create doctor request
const validateDoctor = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('code').notEmpty().withMessage('Code is required'),
    body('specialist').notEmpty().withMessage('Specialist is required'),
    body('phone').isMobilePhone().withMessage('Phone number is invalid'),
    body('location').notEmpty().withMessage('Location is required'),
    // Add more validation rules as needed
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];

// this fun is for to check updating a doctor request
const validateUpdateDoctor = [
    body('name').optional().notEmpty().withMessage('Name must not be empty if provided'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long if provided'),
    body('code').optional().notEmpty().withMessage('Code must not be empty if provided'),
    body('specialist').optional().notEmpty().withMessage('Specialist must not be empty if provided'),
    body('phone').optional().isMobilePhone().withMessage('Phone number is invalid if provided'),
    body('location').optional().notEmpty().withMessage('Location must not be empty if provided'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];

// Validation for getting a doctor by ID
const validateGetDoctor = [
    param('id').isInt().withMessage('Doctor ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];

// this fun is for to check create doctor request
const validateClasses = [
    body('className').notEmpty().withMessage('Class is required'),
    body('order').notEmpty().withMessage('Order is required'),
    body('order').isInt().withMessage('Order is Intiger'),
    // Add more validation rules as needed
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];
// this fun is for to check updating a doctor request
const validateUpdateClasses = [
    body('className').optional().notEmpty().withMessage('Class must not be empty if provided'),
    body('order').optional().notEmpty().withMessage('Order must not be empty if provided'),
    body('order').optional().isInt().withMessage('Order must be Intiger if provided'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];
// Validation for getting a doctor by ID
const validateGetClasses = [
    param('id').isInt().withMessage('Classes ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];

// this fun is for to check create doctor request
const validateSchool = [
    body('type').isInt().withMessage('Type Must be integir'),
    body('school_name').notEmpty().withMessage('School Name is required'),
    body('school_prefix').notEmpty().withMessage('School prefix is required'),
    // body('doctor_id').isArray({ min: 1 }).withMessage('Doctor is required'),
    // body('doctor_id.*').isInt().withMessage('Doctor is Intiger'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // body('location').notEmpty().withMessage('Location is required'),
    // body('contact_persons').isArray({ min: 1 }).withMessage('Contact Person is required'),
    body('contact_persons.*').custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error('Each Contact Person must be an array');
        }
        value.forEach(item => {
            if (typeof item.contact_name !== 'string' || typeof item.contact_mobile !== 'number') {
            throw new Error('Each Contact Person must have a valid name and number');
            }
        });
        return true;
    }).withMessage('Each Contact Person must be a valid object with name and number'),
    // Add more validation rules as needed
    (req, res, next) => {
        req.body.contact_persons = JSON.parse(req.body.contact_persons)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }else if(req.body.contact_persons.length == 0){
            return res.status(400).json({ status: 'error', message: 'Contact Person is required' });
        }
        next();
    }
];

// this fun is for to check create doctor request
const validateUpdateSchool = [
    // body('doctor_id').isArray({ min: 1 }).withMessage('Doctor is required'),
    // body('doctor_id.*').isInt().withMessage('Doctor is Intiger'),
    // body('location').notEmpty().withMessage('Location is required'),
    // body('contact_persons').isArray({ min: 1 }).withMessage('Contact Person is required'),
    body('user_id').notEmpty().withMessage('User id required'),
    body('type').isInt().withMessage('Type Must be integir'),
    body('school_name').notEmpty().withMessage('School Name is required'),
    body('school_prefix').notEmpty().withMessage('School prefix is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('contact_persons.*').custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error('Each Contact Person must be an array');
        }
        value.forEach(item => {
            if (typeof item.contact_name !== 'string' || typeof item.contact_mobile !== 'number') {
            throw new Error('Each Contact Person must have a valid name and number');
            }
        });
        return true;
    }).withMessage('Each Contact Person must be a valid object with name and number'),
    // Add more validation rules as needed
    (req, res, next) => {
        req.body.contact_persons = JSON.parse(req.body.contact_persons)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }else if(req.body.contact_persons.length == 0){
            return res.status(400).json({ status: 'error', message: 'Contact Person is required' });
        }
        next();
    }
];

const validateGetSchool = [
    param('id').isInt().withMessage('Classes ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateDoctor,
    validateUpdateDoctor,
    validateGetDoctor,
    validateClasses,
    validateUpdateClasses,
    validateGetClasses,
    validateSchool,
    validateUpdateSchool,
    validateGetSchool,
};
