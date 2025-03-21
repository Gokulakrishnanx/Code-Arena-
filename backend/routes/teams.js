const router = require('express').Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().sort({ totalPoints: -1 });
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new team
router.post('/', async (req, res) => {
    const team = new Team({
        teamId: req.body.teamId,
        teamNumber: req.body.teamNumber,
        totalPoints: req.body.totalPoints || 0
    });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update team points
router.patch('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team == null) {
            return res.status(404).json({ message: 'Team not found' });
        }

        if (req.body.totalPoints != null) {
            team.totalPoints = req.body.totalPoints;
        }
        if (req.body.teamNumber != null) {
            team.teamNumber = req.body.teamNumber;
        }

        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team == null) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await team.remove();
        res.json({ message: 'Team deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 