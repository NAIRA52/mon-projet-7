// Création routeur express
const express = require('express');
//Enregistrer nos routes dans le routeur express
const router = express.Router();
// Importer le middleware "multer"
const multer = require('../middleware/multer-config');
// Importer le controlleur "messages"
const messageCtrl = require('../controllers/messages');

// Creer un message
router.post('/message/new', multer, messageCtrl.createMessage);
// Information concernant un message
router.get('/message/:id', messageCtrl.getOneMessage);
// Information concernant les messages
router.get('/messages', messageCtrl.listMessages);
// modifier un message d'un utilisateur
router.put('/message/:id', multer, messageCtrl.modifyMessage);
// Supprimer un message d'utilisateur
router.delete('/message/:id', messageCtrl.deleteMessage);

// On exporte le routeur
module.exports = router;