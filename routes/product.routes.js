const router = require("express").Router();
const {
  createProcess,
  enlistProcess,
  detailProcess,
} = require("../controllers/product.controller");
const {checkRole,verifyToken} = require("../middleware/util-mid")
//Upload (todos los mid que necesitmos en esta ruta)

//express y hbs  //get(View (form))  post(data(redirect ))

// get <--- es para traer info
// post <--- para mandar

// crear producto
//router.post("/create",verifyToken,checkRole(["STAFF","ADMIN"]) ,createProcess);
router.post("/create",createProcess);

//esta ruta sirve para traer todos los productos
router.get("/", enlistProcess);

//para el detalle de un solo producto
router.get("/detail/:id", detailProcess);

module.exports = router;
