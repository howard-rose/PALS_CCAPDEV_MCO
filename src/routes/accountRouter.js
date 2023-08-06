import 'dotenv/config.js';
import { Router } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log(`Received user: ${username}`);
        console.log(`Received password: ${password}`);
        console.log('Authenticating!');
        const user = await User.findOne({username: username}).exec();
        
        if (!user) {
            return done(null, false, { message: 'User not found.'});
        }

        console.log('Correct user');

        if (!(await user.comparePassword(password))) {
            return done(null, false, { message: 'Incorrect password.'});
        }

        console.log('Correct password');

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.username);
});

passport.deserializeUser(async (user, done) => {
    const foundUser = await User.findOne({username: user.username}).lean().exec();
    return done(null, foundUser);
});
const accountRouter = Router();

accountRouter.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register account'
    });
});

accountRouter.post('/register', (req, res) => {
    console.log('/register POST request received:');
    //console.log(req);
    
    console.log(req.method);
    console.log(req.headers);
    console.log(req.body);

    const profileId = new mongoose.Types.ObjectId();

    const newProfile = Profile.create({
        _id: profileId
    });

    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password, // TODO hashing
        profile: profileId
    });

    newUser.save().then((result) => {
        res.redirect(200, '/');
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

accountRouter.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

accountRouter.get('/loginfail', (req, res) => {
    console.log('LOGIN FAILED!');
    res.sendStatus(500);
});

accountRouter.post('/login', passport.authenticate('local', { failureRedirect: '/loginfail', failureMessage: true }), (req, res) => {
    res.sendStatus(200);
});

export default accountRouter;