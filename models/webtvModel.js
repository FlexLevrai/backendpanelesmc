const mongoose = require('mongoose');

// name, email, photo, password, passwordConfirm

WebtvSchema = new mongoose.Schema({
    titre : {
        type: String,
        required: [false, 'Please tell us your title']
    },
    image : {
        type: String,
        required: [false, 'Please select an image JPEG or PNG']
    },
    category : {
        type: String,
        required: [false, 'Please tell us your title']
    },
    cantonId: {
        type: Number,
        required: [false, 'Please send the id of canton ']
    },

    urlVideoPrincipal : {
        type: String,
        required: [false, 'Please tell us your Youtube playlist url']
    },

    urlPlaylist:{
        type: String,
        required: [false, 'Please tell us your Youtube playlist url']
    },
});


const Webtv = mongoose.model('Webtv', WebtvSchema);
module.exports = Webtv;

// const Webtv = mongoose.model('Webtv', WebtvSchema);
// module.exports = Webtv;
