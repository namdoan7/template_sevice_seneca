const mongoose = require('mongoose');
module.exports = mongoose.model('lesson', new mongoose.Schema ({
    title: String,
    content: {},
    lesson_type: Number,
    course_id: Number,
    topic_id: Number,
    lesson_id: Number
}, { versionKey: false }), 'lesson');