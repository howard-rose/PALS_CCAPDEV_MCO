import { Router } from 'express';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { Comment } from '../models/comment.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';

const voteRouter = Router();

voteRouter.post('/vote/post/:userId/:postId/:score', async (req, res) => {
    console.log('/vote/post/ POST request received');

    let postVote = await PostVote.findOne({user: req.params.userId, post: req.params.postId}).exec();

    if (!postVote) {
        postVote = new PostVote({
            user: req.params.userId,
            post: req.params.postId,
            score: req.params.score
        });
    } else {
        postVote.score = req.params.score;
    }

    postVote.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

voteRouter.post('/vote/comment/:userId/:commentId/:score', async (req, res) => {
    console.log('/vote/comment/ POST request received');

    let commentVote = await CommentVote.findOne({user: req.params.userId, comment: req.params.commentId}).exec();

    if (!commentVote) {
        commentVote = new CommentVote({
            user: req.params.userId,
            comment: req.params.commentId,
            score: req.params.score
        });
    } else {
        commentVote.score = req.params.score;
    }

    commentVote.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

export default voteRouter;