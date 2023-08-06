import { Router } from 'express';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { Comment } from '../models/comment.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';

const voteRouter = Router();

voteRouter.post('/vote/post/:postId/:score', async (req, res) => {
    console.log('/vote/post/ POST request received');

    const current_user = (req.isAuthenticated()) ? req.user : null;
    const user_id = await User.findOne({username: current_user}, '_id').lean().exec();

    if (user_id) {  
        let postVote = await PostVote.findOne({user: user_id, post: req.params.postId}).exec();

        if (!postVote) {
            postVote = new PostVote({
                user: user_id,
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
    } else {
        res.sendStatus(500);
    }
});

voteRouter.post('/vote/comment/:commentId/:score', async (req, res) => {
    console.log('/vote/comment/ POST request received');

    const current_user = (req.isAuthenticated()) ? req.user : null;
    const user_id = await User.findOne({username: current_user}, '_id').lean().exec();

    if (user_id) {  
        let commentVote = await CommentVote.findOne({user: user_id, comment: req.params.commentId}).exec();

        if (!commentVote) {
            commentVote = new CommentVote({
                user: user_id,
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
    } else {
        res.sendStatus(500);
    }
});

export default voteRouter;