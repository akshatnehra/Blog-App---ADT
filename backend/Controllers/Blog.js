const Blog = require('../Models/Blog');
const User = require('../Models/User');

// Create a blog
exports.createBlog = async (req, res) => {
    try {
        // Get the user input
        const { title, content, userid, tags } = req.body;

        // Check if all fields are entered
        if (!title || !content || !userid) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        // Check if user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exists'
            });
        }

        // Create a new blog
        const newBlog = await Blog.create({
            title,
            content,
            author: user._id,
            tags,
            creationDate: Date.now(),
            comments: []
        });

        // Save the blog in database
        await newBlog.save();

        // Add the blog to user's blogs
        user.blogs.push(newBlog._id);
        await user.save();

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Blog created successfully',
            data: newBlog
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        // Get all blogs
        const blogs = await Blog.find({});

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            data: blogs
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Get a blog
exports.getBlog = async (req, res) => {
    try {
        // Get the blog id
        const { id } = req.body;

        // Get the blog
        const blog = await Blog.findById(id);

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        // Get the blog id
        const { id } = req.body;

        // Get the user input
        const { title, content, tags } = req.body;

        // Check if all fields are entered
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            });
        }

        // Get the blog
        const blog = await Blog.findById(id);

        // Update the blog
        blog.title = title;
        blog.content = content;
        blog.tags = tags;

        // Save the blog
        await blog.save();

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        // Get the blog id
        const { id } = req.body;

        // Get the blog
        const blog = await Blog.findById(id);

        // Check if blog exists
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: 'Blog does not exists'
            });
        }

        // Get the user
        const user = await User.findById(blog.author);

        // Remove the blog from user's blogs
        await user.blogs.pull(blog._id);

        // Save the user
        await user.save();

        // Delete the blog
        await Blog.deleteOne({ _id: id });

        // Return the response
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}