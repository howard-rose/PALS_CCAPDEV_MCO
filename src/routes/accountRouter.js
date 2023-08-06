import 'dotenv/config.js';
import { Router } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js';

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

export default accountRouter;