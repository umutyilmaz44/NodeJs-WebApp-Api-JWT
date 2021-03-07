const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grand', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    grand_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'grand',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grand_grand_name_idx",
        fields: [
          { name: "grand_name" },
        ]
      },
      {
        name: "grand_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
