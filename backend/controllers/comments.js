// Importer models 
const models = require('../models');
// // Importer auth
const auth = require('../middleware/auth');;
// Creer un message
module.exports = {
    createComment: function(req, res) {
        // On reprend l'authentification
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        console.log(req.body);
        // Parametre à utiliser pour creer un message
        let content = req.body.content;
        let messageId = req.params.messageId;
        console.log(req.params);
        // si le champs n'est pas rempli , un message d'erreur apparait
        if (content <= 0) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.Message.findOne({
                where: { id: messageId, userId }
            })
            .then(function(messageFound) {
                if (messageFound) {
                    let newComment =
                        models.Comment.create({
                            content: content,
                            // messageId: req.body.messageId,
                            // messageId: req.params.messageId,
                            MessageId: messageFound.id
                        })

                    .then(function(newComment) {
                            return res.status(201).json({
                                'newComment': newComment.id
                            })
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                }
            })
    },
    // Affiche tout les comemntaires d'un Utilisateur
    listCommentsId: function(req, res) {
        // On reprend l'authentification
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        // si le champs ne sont pas rempli , un message d'erreur apparait
        // if (comment == null) {
        //     return res.status(400).json({ 'error': 'missing parameters' });
        // }
        models.Comment.findOne({
                // attributes: ['id', 'comment'],
                where: { UserId: userId }
            })
            // models.Comment.findAll()
            .then(function(comments) {
                if (comments) {
                    res.status(200).json(comments);
                }
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json({ "error": "Problème paramétre!" });
            });
    },
    // Lister les commentaires d'un seul message
    listCommentsMessage: function(req, res) {
        let messageId = req.body.userId;
        models.Comment.findAll({
                where: { MessageId: messageId }
            })
            .then(function(comments) {
                if (comments) {
                    res.status(200).json(comments);
                }
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json({ "error": "Problème paramétre!" });
            });
    },
    // Modifier un commentaire d'un message
    modifyComment: function(req, res) {
        // On reprend l'authentification
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        // Paramétre à prendre pour modifier le message
        //let title = req.body.title;
        let content = req.body.content;
        // si les 2 champs ne sont pas rempli , un message d'erreur apparait
        if (content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        let messageId = req.body.userId;
        models.Comment.findOne({
                attributes: ['id', 'userId', 'content'],
                where: {
                    MessageId: messageId
                }
            })
            .then(function(comments) {
                if (comments) {
                    comments.update({
                            content: (content ? content : comments.content)
                        })
                        .then(function(comments) {
                            return res.status(200).json({
                                'newcommentairesId': comments.id
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

    // Supprimer un commentaire
    deleteComment: function(req, res) {
        // Récuperer l'en tête "authorization" de notre requête
        let headerAuth = req.headers['authorization'];
        let userId = auth.getUserId(headerAuth);
        // let id = req.body.title;
        console.log(userId);
        models.Comment.destroy({
                // Identification de l'userId
                where: {
                    UserId: userId
                }
            })
            .then(comments => res.status(200).json(comments))
            .catch(error => res.status(404).json({ 'error': 'Impossible de supprimer le message!' }));
    }

}