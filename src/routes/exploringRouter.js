const express = require('express');
const router = express.Router();

const { getAllExploring } = require('../controllers/exploringController');

//GET /api/exploring
router.route('/exploring').get(getAllExploring)

module.exports = router;