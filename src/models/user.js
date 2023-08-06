import { Schema, SchemaTypes, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        require: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        require: true
    },
    profile: {
        type: SchemaTypes.ObjectId,
        ref: 'profile',
        require: true
    }
});

export const User = model('user', userSchema);