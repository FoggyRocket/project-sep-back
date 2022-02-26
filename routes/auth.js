const router = require("express").Router();
const {signupProcess,loginProcess,logoutProcess} = require("../controllers/auth.controller")
//importa mi middelware
const {verifyToken} = require("../middleware/util-mid")

router.post("/signup",signupProcess);

router.post("/login",loginProcess);

router.post("/logout",logoutProcess)

module.exports = router;
