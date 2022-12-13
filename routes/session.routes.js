const sessionController = require('../controllers/sessionController');
const router = require('express').Router();

router.post("/", sessionController.addSession);
router.get('/', sessionController.getAllSession);
router.get('/:id', sessionController.getOneSession);
router.put("/:id", sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;