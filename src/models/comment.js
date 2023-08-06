import { Schema, SchemaTypes, model } from 'mongoose';

const commentSchema = new Schema({
    body: {
        type: SchemaTypes.String,
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: SchemaTypes.Date,
        required: true
    },
    comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'comment'
    }]
});

const autoPopulateSubcomments = function(next) {
    this.populate('user');
    this.populate('comments');
    next();
}

commentSchema
.pre('findOne', autoPopulateSubcomments)
.pre('find', autoPopulateSubcomments);

export const Comment = model('comment', commentSchema);