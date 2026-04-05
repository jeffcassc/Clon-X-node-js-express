import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'nombre es requerido'],
        unique: true,
        trim: true,
        minlength: [3, 'el nombre del usuario debe tener al menos 3 caracteres'],
        maxlength: [30, 'el nombre del usuario debe tener un maximo de 30 caracteres']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'la contraseña debe de tener al menos 6 caracteres'],
        select: false
    },
    displayName:{
        type: String,
        default: function() {return this.username}
    },
    bio:{
        type: String,
        maxlength: [160, 'la bios no debe superar los 160 caracteres'],
        default: ""
    },
    avatar:{
        type: String,
        default: ""
    },
    coverImage:{
        type: String,
        default: ""
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

},{
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return 
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

userSchema.methods.matchPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
    
}

 const User = mongoose.model('User', userSchema)

 export default User