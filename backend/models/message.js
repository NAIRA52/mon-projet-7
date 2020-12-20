'use strict';
module.exports = (sequelize, DataTypes) => {
    let Message = sequelize.define('Message', {
        UserId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        attachment: DataTypes.STRING,
        likes: DataTypes.INTEGER,
    }, {
        classMethods: {
            associate: function(models) {
                models.Message.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }

                })

            }
        }
    });
    return Message;
};