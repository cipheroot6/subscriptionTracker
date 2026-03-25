import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
        minLength: 5,
        maxLength: 255,
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
        maxLength: 1024,
    },
    role: {
        type: String,
        required: [true, 'User role is required'],
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
