const router = require("express").Router();
const {getUserLogged,editUser} = require("../controllers/user.controller")
//importa mi middelware
const {verifyToken} = require("../middleware/util-mid")

router.get("/getUser", verifyToken  ,getUserLogged)
router.post("/edit",verifyToken,editUser)

module.exports = router;