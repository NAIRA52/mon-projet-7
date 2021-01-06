// Création routeur express
const express = require('express');
//Enregistrer nos routes dans le routeur express
const router = express.Router();
// Importer le controlleur "user"
const userCtrl = require('../controllers/user');

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

// On exporte le routeur
module.exports = router;