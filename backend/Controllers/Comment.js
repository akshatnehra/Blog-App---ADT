const Comment = require('../Models/Comment');
const BlogPost = require('../Models/Blog');

// Create a comment
exports.createComment = async (req, res) => {
    try {
        // Get the user input
        const { name, commentText, blogid } = req.body;

        // Check if all fields are entered
        if (!name || !commentText || !blogid) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        // Create a new comment
        const newComment = await Comment.create({
            name,
            commentText,
            blogPost: blogid
        });

        // Save the comment in database
        await newComment.save();

        // Add the comment to blog post's comments
        const blog = await BlogPost.findById(blogid);
        blog.comments.push(newComment._id);
        await blog.save();

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Comment created successfully',
            data: newComment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Get all comments of a blog post
exports.getAllComments = async (req, res) => {
    try {
        // Get the blog post id
        const blogPostId = req.body.blogid;

        // Get all comments
        const comments = await Comment.find({ blogPost: blogPostId });

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Comments retrieved successfully',
            data: comments
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Get a comment
exports.getComment = async (req, res) => {
    try {
        // Get the comment id
        const { id } = req.body;

        // Get the comment
        const comment = await Comment.findById(id);

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Comment retrieved successfully',
            data: comment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        // Get the comment id
        const { id } = req.body;

        // Get the comment
        const comment = await Comment.findById(id);

        // Update the comment
        comment.name = req.body.name || comment.name;
        comment.commentText = req.body.commentText || comment.commentText;

        await comment.save();

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            data: comment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        // Get the comment id
        const { id } = req.body;

        // Get the comment
        const comment = await Comment.findById(id);

        // Get the blog post
        const blog = await BlogPost.findById(comment.blogPost);

        // Remove the comment from blog post's comments
        blog.comments.pull(comment._id);

        // Save the blog post
        await blog.save();

        // Delete the comment
        await Comment.deleteOne({ _id: id });

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}