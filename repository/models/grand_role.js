const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grand_role', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    grand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'grand',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'grand_role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grand_role_grand_id_idx",
        fields: [
          { name: "grand_id" },
        ]
      },
      {
        name: "grand_role_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "grand_role_role_id_idx",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
