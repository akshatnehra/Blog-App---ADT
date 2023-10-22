const express = require('express');
const router = express.Router();

// Importing controllers
const { getAllComments, getComment , createComment, updateComment, deleteComment } = require('../Controllers/Comment');

// Comment Routes
router.post('/getAllComments', getAllComments);
router.post('/getComment', getComment);
router.post('/createComment', createComment);
router.put('/updateComment', updateComment);
router.delete('/deleteComment', deleteComment);

module.exports = router;