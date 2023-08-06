import { Router } from 'express';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { Comment } from '../models/comment.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';
import { loadPostById } from './helpers.js';

const commentRouter = Router();

commentRouter.post('/createComment', async (req, res) => {
    const current_user = (req.isAuthenticated()) ? req.user : null;

    console.log('/createComment POST request received');

    const newComment = new Comment({
        body: req.body.body,
        user: await User.findOne({username: current_user}, '_id').lean().exec(),
        date: new Date(),
        comments: []
    });

    newComment.save().then((result) => {
        //res.child_id = newComment._id;
        //res.sendStatus(200);
        console.log(newComment._id);
        res.status(200);
        return newComment._id;
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

commentRouter.post('/replyPost', async (req, res) => {
    console.log('/replyPost POST request received');

    try {
        const parent = await Post.findById(req.body.parent_id).exec();
        parent.comments.push(req.body.child_id);
        parent.save()

        console.log(parent);
        console.log(parent.comments);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

commentRouter.post('/replyComment', async (req, res) => {
    console.log('/replyComment POST request received');

    /*
    const parent = Comment.findById(req.body.parent_id).exec();
    parent.comments.push(req.body.child_id);

    parent.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });*/

    try {
        const parent = await Comment.findById(req.body.parent_id).exec();
        parent.comments.push(req.body.child_id);
        parent.save()
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

commentRouter.post('/deleteComment/:commentId', async (req, res) => {
    console.log('/deleteComment POST request received');

    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        console.log(`Comment with id ${req.params.commentId} deleted`);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

commentRouter.post('/editComment/:commentId', async (req, res) => {
    console.log('/editComment POST request received');

    try {
        await Comment.findByIdAndUpdate(req.params.commentId, req.body);
        console.log(`Comment with id ${req.params.commentId} updated`);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default commentRouter;