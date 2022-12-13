const filiereController = require('../controllers/filiereController');
const router = require('express').Router();

router.post("/", filiereController.addFiliere);
router.get('/', filiereController.getAllFilieres);
router.get('/:id', filiereController.getOneFiliere);
router.put("/:id", filiereController.updateFiliere);
router.delete('/:id', filiereController.deleteFiliere);

module.exports = router;