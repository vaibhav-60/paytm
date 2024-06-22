import mongoose, {Schema, schema} from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    }
    

})

export const User = new mongoose.model('User', userSchema)