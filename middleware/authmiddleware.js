import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const protect = async (req,res)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded).select('-password')

            if(!req.user){
                return res.status(401).json({
                    message:'Usuario no encontrado'
                })
            }
            next
        } catch (error) {
            console.error('Error en autenticación:', error.message);
            res.status(401).json({ message: 'Token no válido' });
        }
        if (!token) {
        res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }
    }
}

export {protect}
