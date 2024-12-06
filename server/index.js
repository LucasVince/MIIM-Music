const dotenv = require('dotenv');
dotenv.config();

const connectToDb = require('./DB/connect/connect');

const express = require('./modules/express');

connectToDb();