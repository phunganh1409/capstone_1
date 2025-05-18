import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Comment from  "./Comment.js";
import _Image from  "./Image.js";
import _Roles from  "./Roles.js";
import _Users from  "./Users.js";

export default function initModels(sequelize) {
  const Comment = _Comment.init(sequelize, DataTypes);
  const Image = _Image.init(sequelize, DataTypes);
  const Roles = _Roles.init(sequelize, DataTypes);
  const Users = _Users.init(sequelize, DataTypes);

  Comment.belongsTo(Image, { as: "hinh", foreignKey: "hinh_id"});
  Image.hasMany(Comment, { as: "Comments", foreignKey: "hinh_id"});
  Comment.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Comment, { as: "Comments", foreignKey: "user_id"});
  Image.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Image, { as: "Images", foreignKey: "user_id"});

  return {
    Comment,
    Image,
    Roles,
    Users,
  };
}
