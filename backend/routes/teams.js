const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().sort({ totalPoints: -1 });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new team
router.post('/', async (req, res) => {
    const team = new Team({
        teamId: req.body.teamId,
        teamName: req.body.teamName,
        members: req.body.members,
        round1Points: req.body.round1Points || 0,
        round2Points: req.body.round2Points || 0
    });

    try {
        const existingTeam = await Team.findOne({ teamId: req.body.teamId });
        if (existingTeam) {
            // Update existing team
            Object.assign(existingTeam, team);
            const updatedTeam = await existingTeam.save();
            res.status(200).json(updatedTeam);
        } else {
            // Create new team
            const newTeam = await team.save();
            res.status(201).json(newTeam);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a team
router.patch('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        if (req.body.teamId) team.teamId = req.body.teamId;
        if (req.body.teamName) team.teamName = req.body.teamName;
        if (req.body.members !== undefined) team.members = req.body.members;
        if (req.body.round1Points !== undefined) team.round1Points = req.body.round1Points;
        if (req.body.round2Points !== undefined) team.round2Points = req.body.round2Points;

        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        await team.deleteOne();
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 