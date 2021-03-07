const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_login', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    login_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'user_login',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_login_login_time_idx",
        fields: [
          { name: "login_time" },
        ]
      },
      {
        name: "user_login_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_login_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
