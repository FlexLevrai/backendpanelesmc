const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path:'./config.env'})
const app = require('./app');

console.log(process.env.NODE_ENV)

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB).then(console.log('DB connect') );
const port = process.env.PORT || 3000;
app.listen(port,() => console.log('App is running on port:' + port + '...'));


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
