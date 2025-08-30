const express = require('express');
const { createJobPost, getAllJobPosts, getJobPostsByEmail, updateJobPost, deleteJobPost } = require('../controllers/jobPostController');
const router = express.Router();

/**
 * @swagger
 * /api/job-posts:
 *   post:
 *     summary: Create a new job post
 *     tags: [Job Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               jobRole:
 *                 type: string
 *               jobDomain:
 *                 type: string
 *               skillsRequired:
 *                 type: array
 *                 items:
 *                   type: string
 *               jobDescription:
 *                 type: string
 *               perksAndOffers:
 *                 type: array
 *                 items:
 *                   type: string
 *               createdByEmail:
 *                 type: string
 *               createdBy:
 *                 type: string
 *                 description: Name of the person who created the post (optional)
 *     responses:
 *       201:
 *         description: The created job post.
 */
router.post('/', createJobPost);

/**
 * @swagger
 * /api/job-posts:
 *   get:
 *     summary: Get all job posts
 *     tags: [Job Posts]
 *     responses:
 *       200:
 *         description: A list of all job posts.
 */
router.get('/', getAllJobPosts);

/**
 * @swagger
 * /api/job-posts/user/{email}:
 *   get:
 *     summary: Get job posts by user email
 *     tags: [Job Posts]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of job posts by the specified user email.
 *       404:
 *         description: No job posts found for this email.
 */
router.get('/user/:email', getJobPostsByEmail);

/**
 * @swagger
 * /api/job-posts/{id}:
 *   put:
 *     summary: Update a job post
 *     tags: [Job Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               jobRole:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated job post.
 */
router.put('/:id', updateJobPost);

/**
 * @swagger
 * /api/job-posts/{id}:
 *   delete:
 *     summary: Delete a job post
 *     tags: [Job Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job post deleted successfully.
 */
router.delete('/:id', deleteJobPost);

module.exports = router;
