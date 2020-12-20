'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        classMethods: {
            // Associer les models
            associate: function(models) {
                models.User.hasMany(models.Message);
            }
        }
    });
    return User;
};