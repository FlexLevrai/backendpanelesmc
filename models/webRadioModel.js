const mongoose = require('mongoose');

// name, email, photo, password, passwordConfirm

WebradioSchema = new mongoose.Schema({
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

    urlRadioPrincipal : {
        type: String,
        required: [false, 'Please tell us your video link']
    },
    urlPlaylist:{
        type: String,
        required: [false, 'Please tell us your Youtube playlist url']
    },
});


const Webradio = mongoose.model('Webradio', WebradioSchema);
module.exports = Webradio;

// const Webtv = mongoose.model('Webtv', WebtvSchema);
// module.exports = Webtv;
