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


module.exports = {
    validateDoctor,
    validateUpdateDoctor,
    validateGetDoctor
};
