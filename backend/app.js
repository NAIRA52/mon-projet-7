// Importer l'application express
const express = require('express');
// Importer l'appli Cors
const cors = require('cors');
// Importer "body-parser" afin de transformer le corps de la requête en objet Javascropt utiisable(Json)
const bodyParser = require('body-parser');
// Création application express
const app = express();
const path = require('path');
// Importer route "user"
const userRoutes = require('./routes/user');

// Connexion à la base de donnée mysql
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mon-projet-7', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

//Accéder à notre API depuis n'importe quelle origine ('*'),ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.),envoyer des requêtes avec les méthodes mentionnées(GET,POST,etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Définir la fonction Json comme middleware global pour l'application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Configuration des routes, "get" récuperation des informations du serveur et la fonctionqui sera appeler par l'utilisateur
app.get('/', function(req, res) {
    // Renvoi une réponse HTML
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue voici mon super site</h1>');
});
// On applique la route
app.use('/api/', userRoutes);
// Indique à express de gérer la ressources images à chaque requête venant de la route images
app.use('/images', express.static(path.join(__dirname, 'images')));
// On enregistre les routes
app.use('/api/messages', userRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/messages/', userRoutes);
module.exports = sequelize;
module.exports = app;