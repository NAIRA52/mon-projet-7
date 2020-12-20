// Importer bcrypt
const bcrypt = require('bcrypt');
// Importer auth
const auth = require('../middleware/auth');
// Importer models
const models = require('../models');
// Fonction creer un utilisateur
module.exports = {
    signup: function(req, res) {
        // Récupérer les parametres
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio = req.body.bio;
        // Si les parametres obligatoires sont vides ,on renvoi une errreur 400
        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Recherche paramètre!' });
        }
        models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
            // La fonction permet de passer à la fonction suivante
            .then(function(userFound) {
                if (!userFound) {
                    //hacher le mot de passe avec bcrypt
                    bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                        // On creer le nouveau utilisateur
                        let newUser = models.User.create({
                                email: email,
                                username: username,
                                password: bcryptedPassword,
                                bio: bio,
                                isAdmin: 0
                            })
                            .then(function(newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'impossible d/ajouter un utilisateur' });
                            });
                    });
                } else {
                    return res.status(409).json({ 'error': 'Cet utilisateur existe déjà!' });
                }
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de vérifier l/utilisateur!' });
            });
    },
    // Paramétre du login
    login: function(req, res) {
        // Parametre de connexion login
        let email = req.body.email;
        let password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Recherche paramétre' });
        }

        models.User.findOne({
                where: { email: email }
            })
            .then(function(userFound) {
                if (userFound) {
                    // On compare le mot de passe du 'user' avec le hash qui est garder dans la base de donnée
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'userId': userFound.id,
                                'token': auth.generateTokenForUser(userFound),
                                'user': userFound
                            });
                        } else {
                            return res.status(403).json({ 'error': 'Mot de pass invalid!' });
                        }
                    });
                } else {
                    return res.status(404).json({ 'error': 'Utilisateur inexistant dans la base de donnée!' });
                }
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de vérifier l/utilisateur!' });

            });
    },
    // Parametre information de l'utilisateur
    getOneUser: function(req, res) {
        // Récuperer l'en tête "authorization" de notre requête
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        if (userId < 0)
            return res.status(400).json({ 'error': 'erreur token' });

        models.User.findOne({
                attributes: ['id', 'email', 'username', 'bio'],
                where: { id: userId }
            })
            .then(function(user) {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé!' });
                }
            })
            .catch(function(err) {
                res.status(500).json({ 'error': 'Impossible de récupérer l/utilisateur' });
            });
    },
    // Modifier la biographie d'un utilisateur
    modifyUserProfile: function(req, res) {
        // Récuperer l'en tête "authorization" de notre requête
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);

        // Parametre
        let bio = req.body.bio;
        models.User.findOne({
                attributes: ['id', 'bio'],
                where: { id: userId }
            })
            .then(function(user) {
                if (user) {
                    user.update({
                        bio: (bio ? bio : user.bio)
                    })
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé!' });
                }
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de vérifier l/utilisateur!' });
            });
    },
    // Suppression du compte utilisateur
    deleteUser: function(req, res) {
        // Récuperer l'en tête "authorization" de notre requête
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);

        models.User.destroy({
                attributes: ['id', 'email', 'password'],
                where: {
                    id: userId
                }
            })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(404).json({ 'error': 'Impossible de supprimer le compte!' }));
    }
}