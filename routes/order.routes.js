const router = require("express").Router();
const {
  createOrderProcces,
  getOrderbyIdProccess,
  getOrdersProcces,
} = require("../controllers/order.controller");
//Traer todas las ordenes por usuario
router.get("/", getOrdersProcces);

//traer una ordern por id
router.get("/:id", getOrderbyIdProccess);

//crear una ordern
router.post("/create", createOrderProcces);

module.exports = router;
