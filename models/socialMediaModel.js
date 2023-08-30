const mongoose = require('mongoose')

SocialMediaSchema = new mongoose.Schema({

    nomCanton: {
        type: String,
        required: [false, 'Please tell us your link']
    }, youtube: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    facebook: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    linkedin:{
        type: String,
        required:[false, 'Please tell us your link']
    },
    twitter: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    instagram: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    tiktok: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    whatsapp: {
        type: String,
        required: [false, 'Please tell us your link']
    },
    cantonId: {
        type: Number,
        unique: true,
        required: [true, 'cantonId is required']
    },
});

const SocialMedia = mongoose.model('socialMedia', SocialMediaSchema);
module.exports = SocialMedia
