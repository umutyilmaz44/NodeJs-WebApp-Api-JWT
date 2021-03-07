var DataTypes = require("sequelize").DataTypes;
var _grand = require("./grand");
var _grand_role = require("./grand_role");
var _organization = require("./organization");
var _page = require("./page");
var _role = require("./role");
var _user = require("./user");
var _user_login = require("./user_login");
var _user_role = require("./user_role");
var _user_token = require("./user_token");
var _user_type = require("./user_type");

function initModels(sequelize) {
  var grand = _grand(sequelize, DataTypes);
  var grand_role = _grand_role(sequelize, DataTypes);
  var organization = _organization(sequelize, DataTypes);
  var page = _page(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_login = _user_login(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var user_token = _user_token(sequelize, DataTypes);
  var user_type = _user_type(sequelize, DataTypes);

  grand_role.belongsTo(grand, { as: "grand", foreignKey: "grand_id"});
  grand.hasMany(grand_role, { as: "grand_roles", foreignKey: "grand_id"});
  user.belongsTo(organization, { as: "organization", foreignKey: "organization_id"});
  organization.hasMany(user, { as: "users", foreignKey: "organization_id"});
  grand_role.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(grand_role, { as: "grand_roles", foreignKey: "role_id"});
  user_role.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(user_role, { as: "user_roles", foreignKey: "role_id"});
  user_login.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_login, { as: "user_logins", foreignKey: "user_id"});
  user_role.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_role, { as: "user_roles", foreignKey: "user_id"});
  user_token.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_token, { as: "user_tokens", foreignKey: "user_id"});
  user.belongsTo(user_type, { as: "user_type", foreignKey: "user_type_id"});
  user_type.hasMany(user, { as: "users", foreignKey: "user_type_id"});

  return {
    grand,
    grand_role,
    organization,
    page,
    role,
    user,
    user_login,
    user_role,
    user_token,
    user_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
