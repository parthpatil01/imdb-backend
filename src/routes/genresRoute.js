const express = require('express');
const router = express.Router();

const { getAllGenres } = require('../controllers/genres');

router.route('/popular-genres').get(getAllGenres);

module.exports= router;