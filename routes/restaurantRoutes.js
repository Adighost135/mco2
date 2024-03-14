const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getTop3);

router.get('/:id', restaurantController.getTop3);

module.exports = router;