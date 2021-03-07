const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role', {
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
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_role_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_role_role_id_idx",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "user_role_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
