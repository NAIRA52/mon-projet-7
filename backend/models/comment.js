'use strict';
module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('Comment', {
        MessageId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        content: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here

                models.Comment.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });

                models.Comment.belongsTo(models.Message, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Comment;
};