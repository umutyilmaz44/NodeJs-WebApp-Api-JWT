const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    page_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naviagte_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'page',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pages_naviagte_url_idx",
        fields: [
          { name: "naviagte_url" },
        ]
      },
      {
        name: "pages_page_idx",
        fields: [
          { name: "page_name" },
        ]
      },
      {
        name: "pages_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
