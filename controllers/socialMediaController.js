const SocialMedia = require('./../models/socialMediaModel.js');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllSm = async (req, res, next) =>{
    const features = new APIFeatures(SocialMedia.find(), req.query).filter().sort().limitFields().paginate();

    const socialMed = await features.query

    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        result: socialMed.length,
        data: {
            SocialMedia: socialMed
        }
    })
}

exports.getSm =  async (req, res, next) =>
{
    const sm =  await  SocialMedia.findById(req.params.id)
    SocialMedia.findOne({_id: req.params.id})

    res.status(200).json({
        status: 'success',
        data: {
            SocialMedia:sm
        }
    })
}

//////////////////////////
//CREATE SOCIAL MEDIA

exports.createSm = async (req, res, next) => {
    const { cantonId } = req.body;

    // Vérifier si un objet avec le même cantonId existe déjà
    const existingSm = await SocialMedia.findOne({ cantonId });
    console.log(existingSm)
    if (existingSm) {
        // Effectuer une mise à jour si l'objet existe déjà avec le même cantonId
        const updatedSm = await SocialMedia.findOneAndUpdate(
            { cantonId },
            {
                nomCanton: req.body.nomCanton,
                youtube: req.body.youtube,
                facebook: req.body.facebook,
                linkedin: req.body.linkedin,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
                tiktok: req.body.tiktok,
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            status: 'success',
            data: {
                SocialMedia: updatedSm,
            },
        });
    }

    // Si l'objet avec le même cantonId n'existe pas, créer un nouvel objet
    const newSm = await SocialMedia.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            SocialMedia: newSm,
        },
    });
};



exports.updateSm = async (req,res,next)=>{
    const Sm = await SocialMedia.findByIdAndUpdate( req.params.id, {
        cantonId: req.body.cantonId,
        youtube: req.body.youtube,
        facebook: req.body.facebook,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
    }, {new: true, runValidators: true});

    // if (!Sm ){
    //     return next(new AppError('No Social Media found with that ID, 404'))
    // }

    res.status(201).json({
        status: 'success',
        data:{
            SocialMedia: Sm,
        }
    })
}

exports.deleteSm  = async (req, res, next) => {
    const sm = await SocialMedia.findByIdAndDelete(req.params.id);
    console.log(`Delete: ${sm}`)
    // if (!radio) {
    //     // return next(new AppError('No tour found with that ID', 404));
    // }

    res.status(204).json({
        status: 'success deletion',
        data: sm
    });
};

exports.getSmByCantonId = async (req, res, next) => {
    try {
        const { cantonId } = req.params;
        const features = new APIFeatures(SocialMedia.find({ cantonId }), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const sm = await features.query;

        if (sm.length === 0) {
            const defData =[ {
                // cantonId: req.body.cantonId,
                youtube: "Lien youtube",
                facebook: 'Lien facebook',
                linkedin: 'linkedin',
                twitter: 'twitter',
                instagram: 'instagram',
                tiktok: 'tiktok',
                nomCanton:'ESMC GIE'
            }]

            res.status(200).json({
                status: 'success Default Data',
                results: sm.length,
                data: {
                    SocialMedia: defData
                }
            });
        } else {
            res.status(200).json({
                status: 'success',
                results: sm.length,
                data: {
                    SocialMedia: sm
                }
            });
        }
    } catch (error) {
        console.error('Error fetching social media by Canton ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching social media data.' });
    }
};


