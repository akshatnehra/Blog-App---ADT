const express = require('express');
const router = express.Router();

// Importing controllers
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../Controllers/Blog');

// Blog Routes
router.get('/getAllBlogs', getAllBlogs);
router.post('/getBlog', getBlog);
router.post('/createBlog', createBlog);
router.put('/updateBlog', updateBlog);
router.delete('/deleteBlog', deleteBlog);

module.exports = router;