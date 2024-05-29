import { Schema, model } from 'mongoose';


//An instance of Schema that defines the structure of user documents.
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//create user model
const User = model('User', userSchema);

export default User;