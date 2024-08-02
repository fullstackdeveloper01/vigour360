const router = require('express').Router();
const upload = require('../middlewares/upload');
// const { asyncHandler } = require('../middlewares/asyncHandler');
// const checkEmail = require('../middlewares/checkEmail');
const doctorsController = require('../controllers/admin/doctors.controller');
const classController = require('../controllers/admin/class.controller');
const schoolController = require('../controllers/admin/school.controller');
const adminController = require('../controllers/admin/admin.controller');

const { catchErrors } = require('../handlers/errorHandlers'); 
const { 
    validateDoctor,
    validateUpdateDoctor,
    validateGetDoctor,
    validateClasses,
    validateUpdateClasses,
    validateGetClasses,
    validateSchool,
    validateUpdateSchool,
    validateGetSchool,
    validAdminLogin,
    validAdminChangepassword,
} = require('../validators/doctorValidator');
const checkToken = require('../middlewares/checkToken');
//-----------------------------------this api for admin module start--------------------------------------------- 
// Create a new doctor
router.route('/login').post(validAdminLogin,  catchErrors(adminController.signin));
router.route('/changePassword').post(checkToken,validAdminChangepassword,  catchErrors(adminController.changePassword));
router.route('/user').get(checkToken, catchErrors(adminController.getAdminData));
router.route('/user/:id').put(checkToken,catchErrors(adminController.update));
//-----------------------------------this api for admin module end--------------------------------------------- 

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

//-----------------------------------this api for schools Section start--------------------------------------------- 
// Create a new schools
router.route('/schools/create').post(checkToken, upload.fields([
    { name: 'school_logo', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]), validateSchool, catchErrors(schoolController.create));

// Update an existing schools
router.route('/schools/:id').put(checkToken, upload.fields([
    { name: 'school_logo', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]),validateUpdateSchool, catchErrors(schoolController.update));

// Get all schools
router.route('/schools').get(checkToken, catchErrors(schoolController.getAll));

// Get a specific schools by ID
router.route('/schools/:id').get(checkToken, validateGetSchool, catchErrors(schoolController.getById));

// Delete a schools
router.route('/schools/:id').delete(checkToken, validateGetSchool, catchErrors(schoolController.delete));
//-----------------------------------this api for schools Section end--------------------------------------------- 

module.exports = router;