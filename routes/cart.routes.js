const router = require("express").Router();
const {
  findCartProcess,
  createCartProcess,
  deleteCartProcess,
} = require("../controllers/cart.controller");
//middelware

//traernos el carrito previo!
router.get("/", findCartProcess);

//crear el carrito!!!
router.post("/create", createCartProcess);

//delete
router.delete("/delete", deleteCartProcess);

/**
 * delete
 *  put
 *  patch
 */

module.exports = router;
