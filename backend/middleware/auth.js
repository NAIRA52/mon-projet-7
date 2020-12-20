// Importer jwt
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'kjdjkoapuerpodcjcj6dkjkdk9jkkjsdk3azinnco4';
// On exporte les fonctions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            //Validité du token 1h
            JWT_SIGN_SECRET, {
                expiresIn: '1h'
            })
    },
    // Vérifier "authotization"
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    // Récuperer le "userId"
    getUserId: function(authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId
            } catch (err) {}
        }
        return userId;
    }
}