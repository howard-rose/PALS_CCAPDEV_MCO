import 'dotenv/config.js';
import { Router } from 'express';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { Comment } from '../models/comment.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';
import { loadPostById } from './helpers.js';

const postRouter = Router();

postRouter.get('/post/:postId', async (req, res) => {
    console.log('REQUEST RECEIVED!');
    console.log(req.params);
    const currPost = await loadPostById(req.params.postId);
    console.log('Loaded post object from database:');
    //console.log(currPost);
    console.log(currPost);
    console.log('Post comments: ');
    //console.log(currPost.comments);

    currPost.current_user = process.env.CURRENT_USER;
    
    res.render('post_main', currPost);
});

postRouter.get('/createPost', (req, res) => {
    res.render('create_post', {
        title: 'Create a post',
        current_user: process.env.CURRENT_USER
    });
});

postRouter.post('/createPost', async (req, res) => {
    console.log('/createPost POST request received');

    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        user: await User.findOne({username: process.env.CURRENT_USER}, '_id').lean().exec(),
        date: new Date(),
        tags: req.body.tags,
        comments: []
    });

    newPost.save().then((result) => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

postRouter.post('/deletePost/:postId', async (req, res) => {
    console.log('/deletePost POST request received');

    try {
        await Post.findByIdAndDelete(req.params.postId);
        console.log(`Post with id ${req.params.postId} deleted`);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

postRouter.post('/editPost/:postId', async (req, res) => {
    console.log('/editPost POST request received');

    try {
        await Post.findByIdAndUpdate(req.params.postId, req.body);
        console.log(`Post with id ${req.params.postId} updated`);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


export default postRouter;