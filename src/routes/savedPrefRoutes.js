const express = require('express');
const { 
  savePreference, 
  getSavedPreferences, 
  getSavedPreferencesByEmail, 
  deleteSavedPreference 
} = require('../controllers/savedPrefController');
const router = express.Router();

/**
 * @swagger
 * /api/saved-preferences:
 *   post:
 *     summary: Save a job post as a preference
 *     tags: [Saved Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferenceName:
 *                 type: string
 *                 example: "Dream Job Preference"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               jobRole:
 *                 type: string
 *                 example: "Full Stack Developer"
 *               jobDomain:
 *                 type: string
 *                 example: "Information Technology"
 *               skillsRequired:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Node.js", "React"]
 *               jobDescription:
 *                 type: string
 *                 example: "Responsible for developing scalable applications."
 *               perksAndOffers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Health Insurance", "Work From Home"]
 *               createdByEmail:
 *                 type: string
 *                 example: "user@example.com"
 *               createdBy:
 *                 type: string
 *                 description: Name of the person who created the preference (optional)
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: The created saved preference.
 */
router.post('/', savePreference);

/**
 * @swagger
 * /api/saved-preferences:
 *   get:
 *     summary: Get all saved preferences
 *     tags: [Saved Preferences]
 *     responses:
 *       200:
 *         description: A list of all saved preferences.
 */
router.get('/', getSavedPreferences);

/**
 * @swagger
 * /api/saved-preferences/user/{email}:
 *   get:
 *     summary: Get saved preferences by user email
 *     tags: [Saved Preferences]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: user@example.com
 *     responses:
 *       200:
 *         description: A list of saved preferences for the specified user email.
 *       404:
 *         description: No saved preferences found for this email.
 */
router.get('/user/:email', getSavedPreferencesByEmail);

/**
 * @swagger
 * /api/saved-preferences/{id}:
 *   delete:
 *     summary: Delete a saved preference by ID
 *     tags: [Saved Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the saved preference to delete
 *     responses:
 *       200:
 *         description: Saved preference deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Saved preference deleted successfully."
 *       500:
 *         description: Error deleting saved preference.
 */
router.delete('/:id', deleteSavedPreference);

module.exports = router;
