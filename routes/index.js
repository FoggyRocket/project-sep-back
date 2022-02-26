const router = require("express").Router();
const authRoutes = require("./auth");
const orderRoutes = require("./order.routes")
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const userRouter = require("./user.routes");
//upload images
const uploadCloud = require("../helpers/cloudinary")
const {uploadProcess} = require('../controllers/upload.controller')
//end upload imports

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
//endpont upload con middelware 
/**
 *  req.body = {
 *  dylan:"",
 *  juana:"",
 *  docs:[] //<--- 
 * }
 */
router.post("/upload",uploadCloud.array('docs',5), uploadProcess);
router.post("/upload/single",uploadCloud.single('doc'), uploadProcess);

//
router.use("/auth", authRoutes);
router.use("/product",productRoutes);
router.use("/cart",cartRoutes);
router.use("/order",orderRoutes);
router.use("/user",userRouter);

module.exports = router;
