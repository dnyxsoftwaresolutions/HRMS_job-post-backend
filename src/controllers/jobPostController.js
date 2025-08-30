// src/controllers/jobPostController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create a new job post
// @route   POST /api/job-posts
const createJobPost = async (req, res) => {
    try {
        const { jobTitle, jobRole, jobDomain, skillsRequired, jobDescription, perksAndOffers, createdByEmail, createdBy } = req.body;
        const newJobPost = await prisma.jobPost.create({
            data: { jobTitle, jobRole, jobDomain, skillsRequired, jobDescription, perksAndOffers, createdByEmail, createdBy },
        });
        res.status(201).json(newJobPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating job post", error: error.message });
    }
};

// @desc    Get all job posts
// @route   GET /api/job-posts
const getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await prisma.jobPost.findMany();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job posts", error: error.message });
    }
};

// @desc    Get job posts by email ID
// @route   GET /api/job-posts/user/:email
const getJobPostsByEmail = async (req, res) => {
    try {
        const jobPosts = await prisma.jobPost.findMany({
            where: { createdByEmail: req.params.email },
        });
        if (jobPosts.length === 0) {
            return res.status(404).json({ message: "No job posts found for this email." });
        }
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job posts by email", error: error.message });
    }
};

// @desc    Update a job post
// @route   PUT /api/job-posts/:id
const updateJobPost = async (req, res) => {
    try {
        const updatedJobPost = await prisma.jobPost.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.status(200).json(updatedJobPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating job post", error: error.message });
    }
};

// @desc    Delete a job post
// @route   DELETE /api/job-posts/:id
const deleteJobPost = async (req, res) => {
    try {
        await prisma.jobPost.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Job post deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job post", error: error.message });
    }
};

module.exports = {
    createJobPost,
    getAllJobPosts,
    getJobPostsByEmail,
    updateJobPost,
    deleteJobPost,
};