const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new  mongoose.Schema({
 name : {
     type : String,
     required : [true, "Please  provide a name!"]

    },
email : {
    type : String,
    required : [true, "Please provide an email!"],
    unique : true,
    lowercase:true,
    validate : [validator.isEmail]
},

photo : String,

password :{
    type : String,
    required : [true, "Please provide a password!"],
    minLength: 8,
    select:false,

},
ConfirmPassword:{
    type : String,
    required : [true,"Please confirm the password!"],
    minLength: 8,
    validate : {
        validator:function(el){
            return el === this.password;
        },
    message:'Passwords did not match'
    }
}
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){return next();}
    this.password = await bcrypt.hash(this.password,12)
    this.ConfirmPassword = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candiatePassword,userPassword)
{
    return bcrypt.compare(candiatePassword,userPassword)
}

const User = mongoose.model('User',userSchema);
module.exports = User;