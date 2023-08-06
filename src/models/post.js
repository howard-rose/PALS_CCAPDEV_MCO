import { Schema, SchemaTypes, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        required: true
    },
    body: SchemaTypes.String,
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: SchemaTypes.Date,
        required: true
    },
    tags: [{
        type: SchemaTypes.String
    }],
    comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'comment'
    }]
});

export const Post = model('post', postSchema);