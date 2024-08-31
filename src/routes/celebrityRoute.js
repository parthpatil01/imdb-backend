const express = require('express');
const router = express.Router();

const {getAllCelebrities} = require('../controllers/celebrities');

//GET /api/born-today
router.route('/born-today').get(getAllCelebrities);

module.exports = router;