const Webtv = require('./../models/webtvModel');

const multer = require('multer');
// const upload = multer({dest: 'images/webtv/'})
// const os = require('os')

// const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './images/webtv/');
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

exports.getAllTvs = async (req, res, next) => {

    // console.log(os.networkInterfaces())
    const features = new APIFeatures(Webtv.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tvs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tvs.length,
        data: {
            webtv: tvs
        }
    });
};

exports.getTv = async (req, res, next) => {
    console.log(req.params)

    res.status(200).json({
        status: 'success',
        data: {
            Webtv
        }
    });
};

exports.createTv = async (req, res, next) => {
    try {

        // Décoder la chaîne base64 en données binaires (bytes) de l'image
        const imageBuffer = Buffer.from(req.body.image.split(',')[1], 'base64');

        // Spécifier le nom du fichier pour enregistrer l'image (vous pouvez utiliser un nom de fichier unique ici, ou un autre format d'image comme jpg)
        // const fileName = 'image.png'; // Utilisation de l'extension .jpg pour les images JPEG
        const fileName = `webtv-${Date.now()}.${req.body.image.split(';')[0].split('/')[1]}`;

        // Chemin complet pour enregistrer l'image (assurez-vous que le dossier existe)

        const imagePath = path.join(__dirname, '../images/webtv/', fileName);

        // j
        let imgPath = `/images/webtv/${fileName}`

        // Écrire les données binaires (bytes) de l'image dans un fichier sur le serveu
        fs.writeFileSync(imagePath, imageBuffer);

        // Créer un nouvel enregistrement Webtv avec le chemin du fichier de l'image

        // c'est pour enregistre uniquement l'id de la video
        const urlVideo = req.body.urlVideoPrincipal.split('/')[3] === undefined ? req.body.urlVideoPrincipal : req.body.urlVideoPrincipal.split('/')[3]


        const newTv = await Webtv.create({
            titre: req.body.titre,
            image: imgPath,
            category: req.body.category,
            cantonId: req.body.cantonId,
            urlPlaylist: req.body.urlPlaylist,
            urlVideoPrincipal: urlVideo,
        });

        res.status(201).json({
            status: 'success',
            data: {
                webtv: newTv
            }
        });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({error: 'An error occurred while saving the image.'});
    }
};

exports.updateTv = async (req, res, next) => {
    const tv = await Webtv.findByIdAndUpdate(req.params.id, {
        titre: req.body.titre,
        category: req.body.category,
        cantonId: req.body.cantonId,
        urlVideoPrincipal: req.body.urlVideoPrincipal.split('/')[3],
        urlPlaylist: req.body.urlPlaylist,
    }, {
        new: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            webtv: tv
        }
    });
};

exports.deleteTv = async (req, res, next) => {
    const tv = await Webtv.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
};

////////////////////////////////////////
exports.getTvsByCantonId = async (req, res, next) => {
    try {
        const {cantonId} = req.params;
        const features = new APIFeatures(Webtv.find({cantonId}), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tvs = await features.query;

        res.status(200).json({
            status: 'success',
            results: tvs.length,
            data: {
                webtv: tvs
            }
        });
    } catch (error) {
        console.error('Error fetching TV channels by Canton ID:', error);
        res.status(500).json({error: 'An error occurred while fetching TV channels.'});
    }
};

exports.getTvsByCantonIdCategory = async (req, res, next) => {
    try {
        const {cantonId, category} = req.params;
        const features = new APIFeatures(Webtv.find({cantonId, category}), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tvs = await features.query;

        res.status(200).json({
            status: 'success😉 😎',
            results: tvs.length,
            data: {
                webtv: tvs
            }
        });
    } catch (error) {
        console.error('Error fetching TV channels by Canton ID:', error);
        res.status(500).json({error: 'An error occurred while fetching TV channels.'});
    }
};
