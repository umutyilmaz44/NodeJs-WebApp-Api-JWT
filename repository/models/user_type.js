const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token_life_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
      comment: "second based time interval"
    }
  }, {
    sequelize,
    tableName: 'user_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_type_type_name_idx",
        fields: [
          { name: "type_name" },
        ]
      },
    ]
  });
};
