const router = require('express').Router();
// const { asyncHandler } = require('../middlewares/asyncHandler');
// const checkEmail = require('../middlewares/checkEmail');
const doctorsController = require('../controllers/admin/doctors.controller');
const { catchErrors } = require('../handlers/errorHandlers'); 
const { validateDoctor, validateUpdateDoctor,validateGetDoctor } = require('../validators/doctorValidator');
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

module.exports = router;