import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import { PostVote } from '../models/post_vote.js';
import { CommentVote } from '../models/comment_vote.js';

export const getScorePost = async (id) => {
    return await PostVote.countDocuments({post: id, score: 1}).lean().exec() - await PostVote.countDocuments({post: id, score: -1}).lean().exec();
}

export const getScoreComment = async (id) => {
    return await CommentVote.countDocuments({comment: id, score: 1}).lean().exec() - await PostVote.countDocuments({comment: id, score: -1}).lean().exec();
}

export async function loadPostById(id) {
    const currPost = await Post.findById(id).populate('user').populate('comments').lean().exec();
    await loadPostScores(currPost);

    return currPost;
}

export async function loadPosts(filter) {
    const posts = await Post.find(filter).populate('user').lean().exec();

    for (const currPost of posts) {
        await loadPostScores(currPost);
    }

    return posts;
}

export async function loadComments(filter) {
    const comments = await Comment.find(filter).populate('user').lean().exec();

    for (const comment of comments) {
        await loadCommentScores(comment);
    }

    return comments;
}

export async function loadPostScores(post) {
    post.score = await getScorePost(post._id);
    //console.log(`Score of post: ${post.score}`);

    for (const comment of post.comments) {
        await loadCommentScores(comment);
    }
}

export async function loadCommentScores(comment) {
    comment.score = await getScoreComment(comment._id);

    if (comment.comments) {
        for (const subcomment of comment.comments) {
            await loadCommentScores(subcomment);
        }
    }
}