'use strict';
module.exports = (sequelize, DataTypes) => {
    let Comment = sequelize.define('Comment', {
        content: DataTypes.STRING,
        messageId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                models.Comment.belongsTo(models.Message, {
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return Comment;
};