const mongoose = require('mongoose');
module.exports = mongoose.model('vocabulary', new mongoose.Schema ({
    vocabulary: String,
    spelling: String,
    meaning: String,
    audio_link: String,
    images_card: String,
    example: String,
    admin_id: Number,
    create_time: Number
}, { versionKey: false }), 'vocabulary');