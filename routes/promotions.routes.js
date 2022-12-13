const promotionController = require('../controllers/promotionController');
const router = require('express').Router();

router.post("/", promotionController.addPromotion);
router.get('/', promotionController.getAllPromotions);
router.get('/:id', promotionController.getOnePromotion);
router.put("/:id", promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;