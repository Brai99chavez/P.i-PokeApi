const { Router } = require('express');

const { getTypes } = require('../controllers/GETS')

const router = Router();

router.get('', getTypes);

module.exports = router;