module.exports = (sequelize, DataTypes) => {
  let Company = sequelize.define('Company', {
    name: {
      type:      DataTypes.STRING,
      allowNull: false
    }
  });

  Company.associate = (models) => {
    Company.hasMany(models.Product);
  }

  return Company;
}
