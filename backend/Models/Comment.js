const mongoose = require('mongoose');

// Create a schema
const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    commentText: {
        type:String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;