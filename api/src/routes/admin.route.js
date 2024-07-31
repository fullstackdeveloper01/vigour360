const router = require('express').Router();
// const { asyncHandler } = require('../middlewares/asyncHandler');
// const checkEmail = require('../middlewares/checkEmail');
const doctorsController = require('../controllers/admin/doctors.controller');
const classController = require('../controllers/admin/class.controller');
const { catchErrors } = require('../handlers/errorHandlers'); 
const { 
    validateDoctor,
    validateUpdateDoctor,
    validateGetDoctor,
    validateClasses,
    validateUpdateClasses,
    validateGetClasses,
} = require('../validators/doctorValidator');
const checkToken = require('../middlewares/checkToken');
//-----------------------------------this api for Doctor Section start--------------------------------------------- 
// Create a new doctor
router.route('/doctors/create').post(checkToken, validateDoctor, catchErrors(doctorsController.create));

// Update an existing doctor
router.route('/doctors/:id').put(checkToken, validateUpdateDoctor, catchErrors(doctorsController.update));

// Get all doctors
router.route('/doctors').get(checkToken, catchErrors(doctorsController.getAll));

// Get a specific doctor by ID
router.route('/doctors/:id').get(checkToken, validateGetDoctor, catchErrors(doctorsController.getById));

// Delete a doctor
router.route('/doctors/:id').delete(checkToken, validateGetDoctor, catchErrors(doctorsController.delete));
//-----------------------------------this api for Doctor Section end--------------------------------------------- 

//-----------------------------------this api for class Section start--------------------------------------------- 
// Create a new classes
router.route('/classes/create').post(checkToken, validateClasses, catchErrors(classController.create));

// Update an existing classes
router.route('/classes/:id').put(checkToken, validateUpdateClasses, catchErrors(classController.update));

// Get all classes
router.route('/classes').get(checkToken, catchErrors(classController.getAll));

// Get a specific classes by ID
router.route('/classes/:id').get(checkToken, validateGetClasses, catchErrors(classController.getById));

// Delete a classes
router.route('/classes/:id').delete(checkToken, validateGetClasses, catchErrors(classController.delete));
//-----------------------------------this api for class Section end--------------------------------------------- 

module.exports = router;