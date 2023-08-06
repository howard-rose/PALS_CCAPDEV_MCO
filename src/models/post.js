import { Schema, SchemaTypes, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        require: true
    },
    body: SchemaTypes.String,
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    },
    date: {
        type: SchemaTypes.Date,
        require: true
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