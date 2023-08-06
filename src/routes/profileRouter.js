import { Router } from 'express';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import { loadPosts, loadComments } from './helpers.js';

const profileRouter = Router();

profileRouter.get('/profile/:username', async (req, res) => {
    const user = await User.findOne({username: req.params.username}).lean().exec();

    user.posts = await loadPosts({user: user._id});
    user.comments = await loadComments({user: user._id});
    user.current_user = (req.isAuthenticated()) ? req.user : null;

    res.render('profile', user);
});

export default profileRouter;