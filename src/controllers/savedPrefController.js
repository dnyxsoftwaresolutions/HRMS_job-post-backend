// src/controllers/savedPrefController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Save a job post as a preference
// @route   POST /api/saved-preferences
const savePreference = async (req, res) => {
    try {
        const savedPref = await prisma.savedPreference.create({
            data: req.body,
        });
        res.status(201).json(savedPref);
    } catch (error) {
        res.status(500).json({ message: "Error saving preference", error: error.message });
    }
};

// @desc    Get all saved preferences
// @route   GET /api/saved-preferences
const getSavedPreferences = async (req, res) => {
    try {
        const savedPrefs = await prisma.savedPreference.findMany();
        res.status(200).json(savedPrefs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved preferences", error: error.message });
    }
};

// @desc    Get a user's saved preferences by email ID
// @route   GET /api/saved-preferences/user/:email
const getSavedPreferencesByEmail = async (req, res) => {
    try {
        const savedPrefs = await prisma.savedPreference.findMany({
            where: { createdByEmail: req.params.email },
        });
        if (savedPrefs.length === 0) {
            return res.status(404).json({ message: 'No saved preferences found for this email.' });
        }
        res.status(200).json(savedPrefs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved preferences by email", error: error.message });
    }
};

// @desc    Delete a saved preference
// @route   DELETE /api/saved-preferences/:id
const deleteSavedPreference = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.savedPreference.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "Saved preference deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting saved preference", error: error.message });
    }
};

module.exports = {
    savePreference,
    getSavedPreferences,
    getSavedPreferencesByEmail,
    deleteSavedPreference,
};