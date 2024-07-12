const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/login')
    .post(signinValidator, asyncHandler(authController.signin));

// GET method route
router.get('/setting/listAll', (req, res) => {
    res.status(200).json({
        success: true,
        result: [],
        message: 'Collection is Empty',
      }); 
  })

module.exports = router;