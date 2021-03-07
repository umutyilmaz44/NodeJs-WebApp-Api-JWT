const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'organization',
        key: 'id'
      }
    },
    last_login_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'user_type',
        key: 'id'
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_email_address_idx",
        fields: [
          { name: "email_address" },
        ]
      },
      {
        name: "user_firstname_idx",
        fields: [
          { name: "first_name" },
        ]
      },
      {
        name: "user_organizationid_idx",
        fields: [
          { name: "organization_id" },
        ]
      },
      {
        name: "user_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
