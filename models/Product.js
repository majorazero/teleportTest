module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    demographic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping_threshold: {
      type: DataTypes.DECIMAL
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false
      }
    });
    Product.belongsTo(models.ProductType, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Product;
}
