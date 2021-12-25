// Perlu bcrypt untuk hashing password
const bcrypt = require('bcryptjs');

// Buat user model
// Akan diexport ke server
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Buat custom method untuk user model
  // method ini digunakan untuk membandingkan password
  // eslint-disable-next-line func-names
  User.prototype.validPassword = function (userPassword) {
    return bcrypt.compareSync(userPassword, this.user_password);
  };

  // Sebelum user dibuat, hash dulu passwordnya
  User.beforeCreate((user) => {
    user.user_password = bcrypt.hashSync(
      user.user_password,
      bcrypt.genSaltSync(10),
      null,
    );
  });

  return User;
};
