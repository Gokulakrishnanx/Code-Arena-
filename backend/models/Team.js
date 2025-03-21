const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
        unique: true
    },
    teamNumber: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Update rank before saving
teamSchema.pre('save', async function(next) {
    if (this.isModified('totalPoints')) {
        const Team = this.constructor;
        const teams = await Team.find({}).sort({ totalPoints: -1 });
        const index = teams.findIndex(team => team._id.equals(this._id));
        this.rank = index + 1;
    }
    next();
});

module.exports = mongoose.model('Team', teamSchema); 