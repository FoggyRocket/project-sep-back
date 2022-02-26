const Product = require("../models/Product.model");

exports.createProcess = (req, res, next) => {
  //agregar imagen
  const product = { ...req.body };

  Product.create(product) //{ result:{...asdasds} }
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(400).json({ errorMessage: error }));
};

exports.enlistProcess = async (req, res, next) => {
  try {
    const result = await Product.find();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

exports.detailProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
