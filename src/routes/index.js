import { Router } from 'express';
import accountRouter from './accountRouter.js';
import postRouter from './postRouter.js';
import profileRouter from './profileRouter.js';
import searchRouter from './searchRouter.js';
import commentRouter from './commentRouter.js';
import voteRouter from './voteRouter.js';
import { Post } from '../models/post.js';
import { PostVote } from '../models/post_vote.js';
import { getScorePost, loadPosts } from './helpers.js';

const router = Router();

router.get('/', async (req, res) => {
    let current_user = null;
    
    console.log(`User authenticated: ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
        console.log(req.user);
        current_user = req.user;
    } 

    res.render('index', {
        title: 'Redidit - Dive into anything',
        current_user: current_user,
        posts: await loadPosts({})
    });
});

router.use(accountRouter);
router.use(postRouter);
router.use(profileRouter);
router.use(searchRouter);
router.use(commentRouter);
router.use(voteRouter);

router.use((req, res) => {
    res.render('error');
})

export default router;