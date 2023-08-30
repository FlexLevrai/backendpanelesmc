const express = require('express');
const  webtvController = require('./../controllers/webtvController');


const router = express.Router();

router
    .route('/')
    .get(webtvController.getAllTvs)
    .post(webtvController.upload.single('image'),  webtvController.createTv);

router
    .route('/:id')
    .get(webtvController.getTv)
    .put(webtvController.updateTv)
    .delete(webtvController.deleteTv);

// New route to get TV channels by cantonId
router.route('/canton/:cantonId').get(webtvController.getTvsByCantonId);
router.route('/canton/:cantonId/:category').get(webtvController.getTvsByCantonIdCategory);

module.exports = router
