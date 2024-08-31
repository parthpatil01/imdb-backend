const express = require('express');
const router = express.Router();

const { getAllTopTen } = require('../controllers/top10Controller');

router.route('/top-ten').get(getAllTopTen)

module.exports = router;