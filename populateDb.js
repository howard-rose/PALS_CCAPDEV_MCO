import "dotenv/config";
import mongoose from 'mongoose';
import { User } from "./src/models/user.js";
import { Profile } from "./src/models/profile.js";
import { Post } from "./src/models/post.js";
import { Comment } from "./src/models/comment.js";
import { PostVote } from "./src/models/post_vote.js";
import { CommentVote } from "./src/models/comment_vote.js"; 
import { connect } from "./src/models/db.js";

connect().then(async (connection) => {
    //console.log(new mongoose.Types.ObjectId());

    const profiles = [
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()}),
        await Profile.create({_id: new mongoose.Types.ObjectId()})
    ];

    //console.log(profiles[0]);
    //console.log(profiles[0]._id);

    const users = [
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "ABCD1234",
            password: "ABCD1234",
            profile: profiles[0]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "easilyimpressed",
            password: "ei",
            profile: profiles[1]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "johndoe",
            password: "jd",
            profile: profiles[2]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "admin",
            password: "admin",
            profile: profiles[3]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "CCAPDEVSTUDENT12100001",
            password: "CCAPDEV",
            profile: profiles[4]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "COMMENTER1",
            password: "1",
            profile: profiles[5]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "COMMENTER2",
            password: "2",
            profile: profiles[6]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "COMMENTER3",
            password: "3",
            profile: profiles[7]._id
        }),
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            username: "redidituser9876",
            password: "9876",
            profile: profiles[8]._id
        })
    ];
    
    console.log("Users created");

    const comment4 = await Comment.create({
        _id: new mongoose.Types.ObjectId(),
        body: "Thanks!",
        user: users[5]._id,
        date: new Date(),
        comments: []
    });

    const comment3 = await Comment.create({
        _id: new mongoose.Types.ObjectId(),
        body: "Nice, welcome to the site!",
        user: users[7]._id,
        date: new Date(),
        comments: [comment4._id]
    });

    const comment2 = await Comment.create({
        _id: new mongoose.Types.ObjectId(),
        body: "This",
        user: users[6]._id,
        date: new Date(),
        comments: []
    });

    const comment1 = await Comment.create({
        _id: new mongoose.Types.ObjectId(),
        body: "My first comment",
        user: users[5]._id,
        date: new Date(),
        comments: [comment2._id, comment3._id]
    });

    const comment0 = await Comment.create({
        _id: new mongoose.Types.ObjectId(),
        body: "cool post bro",
        user: users[8]._id,
        date: new Date(),
        comments: []
    });

    const posts = [
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "My first post",
            body: "My first description",
            user: users[0]._id,
            date: new Date(),
            tags: [],
            comments: [comment0._id, comment1._id]
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "Wow",
            body: "This is a very interesting site! I'm eager to explore its many features.",
            user: users[1]._id,
            date: new Date(),
            tags: [],
            comments: []
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "Just testing my new keyboard",
            body: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog",
            user: users[2]._id,
            date: new Date(),
            tags: [],
            comments: []
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "Welcome!",
            body: "To all new users of this website, I hope you enjoy your stay",
            user: users[3]._id,
            date: new Date(),
            tags: [],
            comments: []
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "looking for people to help me build a website",
            body: "where can a beginner with zero HTML, CSS, and JavaScript experience start?",
            user: users[4]._id,
            date: new Date(),
            tags: [],
            comments: []
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "My second post",
            body: "My second description",
            user: users[0]._id,
            date: new Date(),
            tags: [],
            comments: []
        }),
        await Post.create({
            _id: new mongoose.Types.ObjectId(),
            title: "My third post",
            body: "My third description",
            user: users[0]._id,
            date: new Date(),
            tags: [],
            comments: []
        })
    ];

    console.log("Comments and posts created");

    const postVotes = [
        await PostVote.create({
            user: users[0]._id,
            post: posts[0]._id,
            score: 1
        }),
        await PostVote.create({
            user: users[1]._id,
            post: posts[0]._id,
            score: 1
        }),
        await PostVote.create({
            user: users[2]._id,
            post: posts[0]._id,
            score: 1
        }),
        await PostVote.create({
            user: users[3]._id,
            post: posts[0]._id,
            score: 1
        }),
        await PostVote.create({
            user: users[4]._id,
            post: posts[1]._id,
            score: -1
        }),
    ];

    console.log("Post votes created");
});