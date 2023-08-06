import { Router } from 'express';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import { loadPosts } from './helpers.js';

const searchRouter = Router();

searchRouter.get('/search/:searchQuery', async (req, res) => {
    const current_user = (req.isAuthenticated()) ? req.user : null;

    console.log(req.params.searchQuery);

    res.render('search_results', {
        title: 'Search results',
        current_user: current_user,
        posts: await loadPosts({
            title: {$regex: req.params.searchQuery, $options: 'i'}
        }, current_user)
    });
});

export default searchRouter;