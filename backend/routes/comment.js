// Création routeur express
const express = require('express');
//Enregistrer nos routes dans le routeur express
const router = express.Router();
// Importer le controlleur "comments"
const commentCtrl = require('../controllers/comments');

// Ajouter un commentaire
router.post('/comment/new', commentCtrl.createComment);
// Lister les commentaire d'un seul utilisateur
router.get('/comment/:id', commentCtrl.listCommentsId);
// Lister les commentaires d'un seul Message
router.get('/comment/message', commentCtrl.listCommentsMessage);
// modifier un message d'un utilisateur
router.put('/comment/:id', commentCtrl.modifyComment);
// Supprimer un message d'utilisateur
router.delete('/comment/:id', commentCtrl.deleteComment);

// On exporte le routeur
module.exports = router;