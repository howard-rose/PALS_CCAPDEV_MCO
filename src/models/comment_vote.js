import { Schema, SchemaTypes, model } from 'mongoose';

const commentVoteSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: SchemaTypes.ObjectId,
        ref: 'comment',
        required: true
    },
    score: {
        type: SchemaTypes.Number,
        enum: [-1, 0, 1]
    }
});

export const CommentVote = model('comment_vote', commentVoteSchema);