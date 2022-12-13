const coursController = require('../controllers/coursController');
const router = require('express').Router();

router.post("/", coursController.addCours);
router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getOneCours);
router.put("/:id", coursController.updateCours);
router.delete('/:id', coursController.deleteCours);

module.exports = router;