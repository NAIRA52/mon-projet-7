// Importer models 
const models = require('../models');
// // Importer auth
const auth = require('../middleware/auth');
const fs = require('fs');
// // Creer un message
module.exports = {
    createMessage: function(req, res) {
        // On reprend l'authentification
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        console.log(req.body);
        // Parametre à utiliser pour creer un message
        let title = req.body.title;
        let content = req.body.content;
        // let attachment = req.file.filename;
        // si les 2 champs ne sont pas rempli , un message d'erreur apparait
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
                where: { id: userId }
            })
            .then(function(userFound) {
                if (userFound) {
                    let newMessage =
                        models.Message.create({
                            title: title,
                            content: content,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            likes: 0,
                            UserId: userFound.id

                        })

                    .then(function(newMessage) {
                        return res.status(201).json({
                            'newMessageId': newMessage.id
                        })

                    })

                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
                    console.log(req.file.filename);
                }
            })
    },
    // Récupérer un seul objet
    getOneMessage: function(req, res) {
        models.Message.findOne({ id: req.params.id })
            .then(message => res.status(200).json(message))
            .catch(error => res.status(404).json({ error }));

    },
    // Récuperer tout les messages
    listMessages: function(req, res) {
        models.Message.findAll()
            .then(function(messages) {
                if (messages) {
                    res.status(200).json(messages);
                }
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json({ "error": "Problème paramétre!" });
            });
    },
    // Modifier un message
    modifyMessage: function(req, res) {
        // On reprend l'authentification
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);

        // Paramétre à prendre pour modifier le message
        let title = req.body.title;
        let content = req.body.content;
        // let attachment = req.file.filename;
        // console.log(req.body);
        // si les 2 champs ne sont pas rempli , un message d'erreur apparait
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.Message.findOne({
                // attributes: ['id', 'title', 'content', 'attachment'],
                where: { id: req.params.id }
            })
            .then(function(messages) {
                if (messages) {
                    messages.update({
                        title: (title ? title : req.body.title),
                        content: (content ? content : req.body.content),
                        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            // attachment: (attachment ? attachment : messages.attachment)
                    }, { where: { id: req.params.id } })

                    .then(function(messages) {
                        return res.status(200).json({
                            'newmessagesId': messages.id,

                        })
                    })

                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé!' });
                }
            })

        .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible de vérifier l/utilisateur!' });
        });
    },

    // Supprimer un message
    deleteMessage: function(req, res) {
        // Récuperer l'en tête "authorization" de notre requête
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);

        // console.log(id);
        models.Message.destroy({
                // Identification de l'userId
                where: {
                    id: req.params.id
                }
            })
            .then(messages => res.status(200).json(messages))
            .catch(error => res.status(404).json({ 'error': 'Impossible de supprimer le message!' }));
    }

}