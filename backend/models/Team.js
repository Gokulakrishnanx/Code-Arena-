const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true
    },
    members: {
        type: String,
        default: ''
    },
    round1Points: {
        type: Number,
        default: 0
    },
    round2Points: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for total points
teamSchema.virtual('totalPoints').get(function() {
    return (this.round1Points || 0) + (this.round2Points || 0);
});

// Ensure virtuals are included in JSON
teamSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Team', teamSchema); 