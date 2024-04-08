const middlewareControler = require('../middleware/middleware');
const userController = require('../controller/userController');

const router = require('express').Router();

router.get("/",middlewareControler.verifyToken,userController.getAlluser)
router.get("/demo",userController.getAlluser)
router.delete("/:id",middlewareControler.verifyTokenandAmin,userController.deleteUser)

module.exports = router;