import 'dotenv/config.js';
import { Router } from 'express';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';

const searchRouter = Router();

searchRouter.get('/search/:searchQuery', async (req, res) => {
    console.log(req.params.searchQuery);
    
    const results = await Post.find({
        title: {$regex: req.params.searchQuery, $options: 'i'}
    }).populate('user').lean().exec();

    console.log(results);    

    res.render('search_results', {
        title: 'Search results',
        current_user: process.env.CURRENT_USER,
        posts: results
    });
});

export default searchRouter;