import { Schema, SchemaTypes, model } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password'))
        return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // Generate hash
        const hash = await bcrypt.hash(this.password, salt);
        // Replace password with hash
        this.password = hash;
        next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

userSchema.method('comparePassword', function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

export const User = model('user', userSchema);