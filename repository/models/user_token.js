const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_token', {
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
    access_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_logout: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    login_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    },
    logout_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'user_token',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "refresh_token_token_idx",
        fields: [
          { name: "access_token" },
        ]
      },
      {
        name: "refreshtoken_expirydate_idx",
        fields: [
          { name: "expiry_date" },
        ]
      },
      {
        name: "refreshtoken_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "refreshtoken_userid_idx",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_token_refresh_token_idx",
        fields: [
          { name: "refresh_token" },
          { name: "user_id" },
        ]
      },
    ]
  });
};
