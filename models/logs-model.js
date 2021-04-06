const mongoose = require('mongoose');
const schema = mongoose.Schema;

const logsSchema = new schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    newsLetterName: {
        type: String,
        required: true
    },
    emailFrom: {
        type: String,
        required: true
    },
    emailTo: {
        type: String,
        required: true
    }
});
const logs = mongoose.model('logs', logsSchema);

module.exports = logs;