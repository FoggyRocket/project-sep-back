const Order = require("../models/Order.model");
//todas las ordenes del usaurio loggeado;
exports.getOrdersProcces = async (req, res, next) => {
    try{
        const { _id: _client } = req.user;
        const result = await Order.find({ _client })
        res.status(200).json({ result });
    }catch(error){
        res.status(400).json({errorMessage:error})
    }
}

exports.getOrderbyIdProccess = async (req,res,next) => {
    try{
        const { _id: _client } = req.user;
        const { id } = req.params;
        const result = await Order.findOne({ _id: id, _client })
        res.status(200).json({ result });
    }catch(error){
        res.status(400).json({errorMessage:error})
    }
}

exports.createOrderProcces = async (req,res,next)=>{
    try{
        const { _id: _client } = req.user;
        const order = { ...req.body, _client };
        const result = await Order.create(order)
        res.status(200).json({ result });
    }catch(error){
        res.status(400).json({errorMessage:error})
    }
}