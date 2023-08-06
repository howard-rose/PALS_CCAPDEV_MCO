import { Schema, SchemaTypes, model } from 'mongoose';

const commentVoteSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    },
    comment: {
        type: SchemaTypes.ObjectId,
        ref: 'comment',
        require: true
    },
    score: {
        type: SchemaTypes.Number,
        enum: [-1, 1]
    }
});

export const CommentVote = model('comment_vote', commentVoteSchema);