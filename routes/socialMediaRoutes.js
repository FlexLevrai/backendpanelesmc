const express = require('express');
const socialMediaController = require('./../controllers/socialMediaController');
const router = express.Router();

router
    .route('/')
    .get(socialMediaController.getAllSm)
    .post(socialMediaController.createSm);

router
    .route('/:id')
    .get(socialMediaController.getSm)
    .put(socialMediaController.updateSm)
    .delete(socialMediaController.deleteSm);

router
    .route('/canton/:cantonId')
    .get(socialMediaController.getSmByCantonId);

module.exports = router
