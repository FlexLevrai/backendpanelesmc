const express = require('express');
const morgan = require('morgan');
const webtvRouter = require('./routes/webtvRoutes');
const webtvRadioRouter = require('./routes/webRadioRoutes');
const socialMediaRouter = require('./routes/socialMediaRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression')

// 1) MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(compression())
// console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV==='developpement'){
    app.use(morgan('dev'));
}


app.use(express.json());
//Eneable
app.use(express.static(`/esmcpanel/v1/webtv`));
app.use(express.static(`/esmcpanel/v1/webradio`));
app.use(express.static(`/esmcpanel/v1/sm`));

// Eneable Routes for showing images
app.use('/images/webtv', express.static('images/webtv'));
app.use('/images/webradio', express.static('images/webradio'));

app.use(function(req, res, next) {
    // Faire des opérations sur la requête
    req.requestTime = new Date().toISOString();
    // Passer la main au middleware suivant
    next();
});

// 3) ROUTE
app.use('/esmcpanel/v1/webtv', webtvRouter);
app.use('/esmcpanel/v1/webradio', webtvRadioRouter);
app.use('/esmcpanel/v1/sm', socialMediaRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Faill',
        massage: `Can't find ${req.originalUrl} on this server!`
    })
    // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app
