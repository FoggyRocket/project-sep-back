const router = require("express").Router();
const authRoutes = require("./auth");
const orderRoutes = require("./order.routes")
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const userRouter = require("./user.routes");
//aqui esta como importe Cloudinary
const cloudinary  =  require("cloudinary")
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
router.post("/delete-image",async (req, res, next) => {
  try {
                              //agregue mi folder y el public id de la imagen 
    cloudinary.v2.uploader.destroy("tiendita-dylan/app-badZack.jpeg", function (error, result) {
          res.status(200).send({ result, error });
      });
  } catch (error) {
      next(error);
  }
});
//
router.use("/auth", authRoutes);
router.use("/product",productRoutes);
router.use("/cart",cartRoutes);
router.use("/order",orderRoutes);
router.use("/user",userRouter);



module.exports = router;
