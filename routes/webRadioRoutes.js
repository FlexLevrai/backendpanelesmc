const express = require('express');
const  webtvRadioController = require('./../controllers/webRadioController');
const webtvController = require("../controllers/webtvController");

const router = express.Router();

router
    .route('/')
    .get(webtvRadioController.getAllRadio)
    .post(webtvRadioController.upload.single('image'),  webtvRadioController.createRadio);

router
    .route('/:id')
    .get(webtvRadioController.getRadio)
    .put(webtvRadioController.updateRadio)
    .delete(webtvRadioController.deleteRadio);

// New route to get TV channels by cantonId
router.route('/canton/:cantonId').get(webtvRadioController.getRadioByCantonId);

router.route('/canton/:cantonId/:category').get(webtvRadioController.getradioByCantonIdCategory);

module.exports = router
