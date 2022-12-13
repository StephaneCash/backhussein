const etudiantController = require('../controllers/etudiantController');
const router = require('express').Router();

router.post("/", etudiantController.addEtudiant);
router.get('/', etudiantController.getAllEtudiants);
router.get('/:id', etudiantController.getOneEtufiant);
router.put("/:id", etudiantController.updateEtudiant);
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;