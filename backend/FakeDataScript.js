const mongoose = require('mongoose');
const { connectMongoDb } = require('./Config/database');
const { faker } = require('@faker-js/faker');
const User = require('./Models/User');
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const Blog = require('./Models/Blog');
const Comment = require('./Models/Comment');

// Get the number of users to create from the command line
const numberOfUsers = process.argv[2];

// Create async iife
(async () => {
    // Connect to MongoDB
    await connectMongoDb();

    bar1.start(numberOfUsers, 0);

    // Generate user with blogs that contain comments and add them to the array
    for (let i = 0; i < numberOfUsers; i++) {
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registrationDate: faker.date.recent(),
            blogs: []
        };

        // Insert the user in database
        const newUser = await User.create(user);

        // Generate blogs
        const numberOfBlogs = Math.floor(Math.random() * 10) + 1;
        for (let j = 0; j < numberOfBlogs; j++) {
            const generatedBlog = {
                title: faker.lorem.words(),
                content: faker.lorem.paragraphs(),
                author: newUser._id,
                tags: faker.lorem.words(),
                creationDate: Date.now(),
                comments: []
            };

            // Create a new blog
            const blog = await Blog.create(generatedBlog);
            
            // Add blogs to user's blogs
            await newUser.blogs.push(blog._id);

            // Generate random number of comments
            const numberOfComments = Math.floor(Math.random() * 10) + 1;
            for (let k = 0; k < numberOfComments; k++) {
                const generatedComment = {
                    name: faker.internet.userName(),
                    commentText: faker.lorem.paragraph(),
                    blogPost: blog._id
                };

                // Create a new comment
                const comment = await Comment.create(generatedComment);

                // Add comments to blog's comments
                await blog.comments.push(comment._id);
            }
            
            await newUser.blogs.push(blog._id);

            // Save the blog in database
            await blog.save();
        }

        // Insert the user in database
        await newUser.save();

        bar1.update(i + 1);
    }

    bar1.stop();
    console.log('\nData inserted successfully');
    process.exit(0);
})();
