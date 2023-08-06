import { Schema, SchemaTypes, model } from 'mongoose';

const postVoteSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: SchemaTypes.ObjectId,
        ref: 'post',
        required: true
    },
    score: {
        type: SchemaTypes.Number,
        enum: [-1, 1]
    }
});

export const PostVote = model('post_vote', postVoteSchema);