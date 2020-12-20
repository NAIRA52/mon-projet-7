// Création routeur express
const express = require('express');
//Enregistrer nos routes dans le routeur express
const router = express.Router();
// Importer le middleware "auth"
const auth = require('../middleware/auth');
// Importer le middleware "multer"
const multer = require('../middleware/multer-config');

// Importer le controlleur "user"
const userCtrl = require('../controllers/user');
// Importer le controlleur "messages"
const messageCtrl = require('../controllers/messages');
// Importer le controlleur "commentaires"
const commentCtrl = require('../controllers/comments');

// Inscription d'un utilisateur
router.post('/signup', userCtrl.signup);
//connexion d'un utilisateur
router.post('/login', userCtrl.login);
// information de l'utilisateur
router.get('/user', userCtrl.getOneUser);
// modifier la biographie du compte utilisateur
router.put('/user', userCtrl.modifyUserProfile);
// Supprimer le compte utilisateur
router.delete('/user', userCtrl.deleteUser);

// Creer un message
router.post('/message/new', multer, messageCtrl.createMessage);
// Information concernant le message
router.get('/messages', messageCtrl.listMessages);
// modifier un message d'un utilisateur
router.put('/message/id', multer, messageCtrl.modifyMessage);
// Supprimer un message d'utilisateur
router.delete('/message/id', messageCtrl.deleteMessage);

// Ajouter un commentaire
router.post('/comment/new', commentCtrl.createComment);
// Lister les commentaire d'un seul utilisateur
router.get('/comment/id', commentCtrl.listCommentsId);
// Lister les commentaires d'un seul Message
router.get('/comment/message', commentCtrl.listCommentsMessage);
// modifier un message d'un utilisateur
router.put('/comment/id', commentCtrl.modifyComment);
// Supprimer un message d'utilisateur
router.delete('/comment/id', commentCtrl.deleteComment);
// On exporte le routeur
module.exports = router;