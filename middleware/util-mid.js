//JWT USER

//esto nos va server para verificar y crear el jwt, tambien limpiar la resputa del backend, 
//checar roles, verificar si el token existe!



const jwt = require("jsonwebtoken");
const User = require("../models/User.model");


//Middelware

/**
 *  Este nos va a servir para verificar si tengo un usuario loggeado
 */


exports.verifyToken = (req,res,next) =>{
    //destructurando de las cookies para obtener mi jwt
    console.log("cookies",req.cookies)
    const {headload,signature} = req.cookies
    //Como se ejecutan los metodos y las funciones se ejecutan name()
    if(!headload || !signature) return res.status(401).json({errorMessage:"Unauthorized"})

            //732726347.123123.423e3e3d3e, Perrro182, (error,{emai:"",_id:"",perro:"No"}
    jwt.verify(`${headload}.${signature}`, process.env.SECRET, (err,decoded)=>{
        //estoy dentro del callback del verify
        if(err){
            return res.status(401).json({errorMessage:"Unauthorized"})
        }
        console.log("quee es el decoded = {}",decoded)
        User.findById(decoded.userId)
        .then(user => {
            req.user = user //aqui guardo mi usuario loggeado en el req para usarlo en otros endpoints o middelwares
            next()// el next da paso a mi siguiente accion en mi ruta 
        })
        .catch(error =>{
            res.status(401).json({errorMessage:"Peluquín  " , error })
        });


   })//<-- aqui se termina el verify

}

//para checar los roles quien tiene permitido acceder a esa ruta o endpoint
                    //["USER","ADMIN"] || ["ADMIN"] || ["STAFF"]
exports.checkRole = (arrayRoles)=>{

    return (req,res,next)=>{
        //voy a sacar del req.user 
        //{_id:123,name:"Chayanne",email:"dylan@gog.co"} = req.user
        const {role} = req.user

        //validamos con un if
        if( arrayRoles.includes(role) ){
            return next()
        }else{
            return res.status(403).json({errorMessage:"Naranjas!!! No tienes permiso para realizar esta acción"})
        }
    }
}

//util o helper 

// creamos un JWT para no repetir codigo
exports.createJWT = (user) =>{
        //jwt.sign({valorEncrip},palabraSecreta,{opciones})
        //sadasdouasodi.dausdioasudio.1231231231235
    return jwt.sign({
        userId: user._id,
        email: user.email,
        //role:user.role
        //username: user.username
      }, process.env.SECRET, {expiresIn:'24h'}).split('.')
}

//limpiar la respuesta de mongo 
                 //data = {}
exports.clearRes = (data)=>{

    //destructuramos el objeto "data" vamos a retornar un nuevo objeto  unicamente con
    //los datos requeridos para nuestro desarrollador = dev

    const {password, __v, updatedAt, ...cleanedData} = data;

    return cleanedData
}