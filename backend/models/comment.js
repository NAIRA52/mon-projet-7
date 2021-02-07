'use strict';
module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('Comment', {
        messageId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Message',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    }, {});
    Comment.associate = function(models) {
        // associations can be defined here

        models.User.belongsToMany(models.Message, {
            through: models.Comment,
            foreignKey: 'userId',
            otherKey: 'messageId',
        });

        models.Message.belongsToMany(models.User, {
            through: models.Comment,
            foreignKey: 'messageId',
            otherKey: 'userId',
        });

        models.Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        models.Comment.belongsTo(models.Message, {
            foreignKey: 'messageId',
            as: 'message',
        });
    };
    return Comment;
};