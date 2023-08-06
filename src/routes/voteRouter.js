import { Router } from 'express';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { Comment } from '../models/comment.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';

const voteRouter = Router();

voteRouter.post('/vote/post/:userId/:postId/:score', async (req, res) => {
    console.log('/vote/post/ POST request received');

    const newPostVote = new PostVote({
        user: req.params.userId,
        post: req.params.postId,
        score: req.params.score
    });

    newPostVote.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

voteRouter.post('/vote/comment/:userId/:commentId/:score', async (req, res) => {
    console.log('/vote/comment/ POST request received');

    const newCommentVote = new commentVote({
        user: req.params.userId,
        comment: req.params.commentId,
        score: req.params.score
    });

    newCommentVote.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

export default voteRouter;