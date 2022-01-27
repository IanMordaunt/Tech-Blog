const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User')


Post.hasMany(Comment, {
    foreignKey: 'postId'
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});


module.exports = {User, Post, Comment}