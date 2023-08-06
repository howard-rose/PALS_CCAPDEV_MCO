import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import { PostVote } from '../models/post_vote.js';
import { CommentVote } from '../models/comment_vote.js';
import { User } from '../models/user.js';

export const getScorePost = async (id) => {
    return await PostVote.countDocuments({post: id, score: 1}).lean().exec() - await PostVote.countDocuments({post: id, score: -1}).lean().exec();
}

export const getScoreComment = async (id) => {
    return await CommentVote.countDocuments({comment: id, score: 1}).lean().exec() - await PostVote.countDocuments({comment: id, score: -1}).lean().exec();
}

export async function loadPostById(id, current_user) {
    const currPost = await Post.findById(id).populate('user').populate('comments').lean().exec();
    await loadPostScores(currPost, current_user);

    return currPost;
}

export async function loadPosts(filter, current_user) {
    const posts = await Post.find(filter).populate('user').lean().exec();

    for (const currPost of posts) {
        await loadPostScores(currPost, current_user);
    }

    return posts;
}

export async function loadComments(filter, current_user) {
    const comments = await Comment.find(filter).populate('user').lean().exec();

    for (const comment of comments) {
        await loadCommentScores(comment, current_user);
    }

    return comments;
}

export async function loadPostScores(post, current_user) {
    post.score = await getScorePost(post._id);
    
    post.current_user_vote = 0;
    if (current_user) {
        const user_id = await User.findOne({username: current_user}, '_id').lean().exec();
        const postVote = await PostVote.findOne({user: user_id, post: post._id}, 'score').lean().exec();

        if (postVote) {
            post.current_user_vote = postVote.score;
        }
    }
    //console.log(`Score of post: ${post.score}`);

    for (const comment of post.comments) {
        await loadCommentScores(comment);
    }
}

export async function loadCommentScores(comment, current_user) {
    comment.score = await getScoreComment(comment._id);

    comment.current_user_vote = 0;
    if (current_user) {
        const user_id = await User.findOne({username: current_user}, '_id').lean().exec();
        const commentVote = await CommentVote.findOne({user: user_id, comment: comment._id}, 'score').lean().exec();
        
        if (commentVote) {
            comment.current_user_vote = commentVote.score;
        }
    }

    if (comment.comments) {
        for (const subcomment of comment.comments) {
            await loadCommentScores(subcomment);
        }
    }
}

/*
export async function getUserPostVote(user_filter, post_filter) {
    const user_id = await User.findOne(user_filter, '_id').lean().exec();
    const post_id = await Post.findOne(post_filter, '_id').lean().exec();

    return await PostVote.findOne({user: user_id, post: post_id}, 'score').lean().exec();
}

export async function getUserCommentVote(user_filter, comment_filter) {
    const user_id = await User.findOne(user_filter, '_id').lean().exec();
    const comment_id = await Comment.findOne(comment_filter, '_id').lean().exec();

    return await CommentVote.findOne({user: user_id, comment: comment_id}, 'score').lean().exec();
}*/