const router = require('express').Router();
const  authController  = require('../controller/authController');
const middlewareControler = require('../middleware/middleware');

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/logout",middlewareControler.verifyToken,authController.logoutUser);
router.post("/refesh",authController.refeshToken)

module.exports = router;