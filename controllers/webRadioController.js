const Webradio = require('./../models/webRadioModel');

const multer = require('multer');
// const upload = multer({dest: 'images/webtv/'})

// const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './images/webradio/');
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname)
    }
})

const fileFilter = (req, file, cd) => {
//     reject file
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg') {
        cd(null, true);
    } else {
        cd(null, false);
    }
};

const limit = {
    fileSize: 255 * 1024, // 255KB in bytes
};
exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limit
});

exports.getAllRadio = async (req, res, next) => {
    const features = new APIFeatures(Webradio.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const radios = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: radios.length,
        data: {
            webradio: radios
        }
    });
};

exports.getRadio = async (req, res, next) => {
    console.log(req.params)
    // const tv = await Webtv.findById(req.params.id);
    // Webtv.findOne({ _id: req.params.id })

    // if (!tour) {
    //     // return next(new AppError('No tour found with that ID', 404));
    // }

    res.status(200).json({
        status: 'success',
        data: {
            Webradio
        }
    });
};

exports.createRadio = async (req, res, next) => {
    console.log(req.body)
    try {

        const imageBuffer = Buffer.from(req.body.image.split(',')[1], 'base64');
        const fileName = `webradio-${Date.now()}.${req.body.image.split(';')[0].split('/')[1]}`;
        const imagePath = path.join(__dirname, '../images/webradio/', fileName);
        const imgPath = `/images/webradio/${fileName}`

        fs.writeFileSync(imagePath, imageBuffer);


        const newRadio = await Webradio.create({
            titre: req.body.titre,
            image: imgPath,
            category: req.body.category,
            cantonId: req.body.cantonId,
            urlRadioPrincipal: req.body.urlRadioPrincipal.split('/')[3],
            urlPlaylist: req.body.urlPlaylist,
        });

        res.status(201).json({
            status: 'success',
            data: {
                webradio: newRadio
            }
        });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({error: 'An error occurred while saving the image.'});
    }
};

exports.updateRadio = async (req, res, next) => {
    const radio = await Webradio.findByIdAndUpdate(req.params.id, {
        titre: req.body.titre,
        category: req.body.category,
        cantonId: req.body.cantonId,
        urlPlaylist: req.body.urlPlaylist,
        urlRadioPrincipal: req.body.urlRadioPrincipal.split('/')[3],
    }, {
        new: true,
        runValidators: true
    });

    // if (!radio) {
    //     // return next(new AppError('No tour found with that ID', 404));
    // }

    res.status(200).json({
        status: 'success',
        data: {
            webradio: radio
        }
    });
};

exports.deleteRadio = async (req, res, next) => {
    const radio = await Webradio.findByIdAndDelete(req.params.id);

    // if (!radio) {
    //     // return next(new AppError('No tour found with that ID', 404));
    // }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

exports.getRadioByCantonId = async (req, res, next) => {
    try {
        const {cantonId} = req.params;
        const features = new APIFeatures(Webradio.find({cantonId}), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const radios = await features.query;

        res.status(200).json({
            status: 'success',
            results: radios.length,
            data: {
                webradio: radios
            }
        });
    } catch (error) {
        console.error('Error fetching TV channels by Canton ID:', error);
        res.status(500).json({error: 'An error occurred while fetching TV channels.'});
    }
};

exports.getradioByCantonIdCategory = async (req, res, next) => {
    try {
        const {cantonId, category} = req.params;
        const features = new APIFeatures(Webradio.find({cantonId, category}), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const radios = await features.query;

        res.status(200).json({
            status: 'success😉 😎',
            results: radios.length,
            data: {
                webradio: radios
            }
        });
    } catch (error) {
        console.error('Error fetching TV channels by Canton ID:', error);
        res.status(500).json({error: 'An error occurred while fetching TV channels.'});
    }
};
