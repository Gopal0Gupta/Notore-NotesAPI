const express = require('express');
const { getnote, createnote, deletenote, updatenote } = require('../controllers/notescontroller');
const auth = require('../middlewares/auth');
const noteRouter = express.Router(); 

noteRouter.get('/',auth, getnote);

noteRouter.post('/',auth, createnote);

noteRouter.delete('/:id',auth, deletenote);

noteRouter.put('/:id',auth, updatenote);

module.exports = noteRouter;