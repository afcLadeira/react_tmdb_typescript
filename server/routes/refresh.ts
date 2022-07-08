import express from 'express';
const refreshController = require('../controller/refreshController');

const app = express();


app.get('/', refreshController.handleRefreshToken);

module.exports = app;
