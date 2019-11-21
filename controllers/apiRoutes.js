const db = require('../models');

module.exports = (app) => {
  app.get('/products', (request, response) => {
    db.Product.findAll({
      include: [{ model: db.Company }, { model: db.ProductType }]
    }).then((data) => {
      response.json(data);
    })
  })

  app.get('/products/free_shipping', (request, response) => {
    db.Product.findAll({
      where: {shipping: 0},
      include: [{ model: db.Company }, { model: db.ProductType }]
    }).then((data) => {
      response.json(data);
    })
  })

  app.get('/product/:name', (request, response) => {
    db.Product.findOne({
      where: {name: request.params.name},
      include: [{ model: db.Company }, { model: db.ProductType }]
    }).then((data) => {
      response.json(data);
    })
  })

  app.get('/products/category/:category', (request, response) => {
    db.Product.findAll({
      where: {category: request.params.category},
      include: [{ model: db.Company }, { model: db.ProductType }]
    }).then((data) => {
      response.json(data);
    })
  })

  app.get('/products/expensive', (request, response) => {
    db.Product.findAll({
      include: [{ model: db.Company }, { model: db.ProductType }],
      order: [
      ['price', 'DESC']
    ]}).then((data) => {
      response.json(data);
    })
  })

  app.get('/products/cheapestByType', (request, response) => {
    db.ProductType.findAll({
      include: [
        {
          model: db.Product,
          include: [{model: db.Company}, {model: db.ProductType}]
        }
      ],
    }).then((data) => {
      let arr = [];

      data.map((type) => {
        let prices = type.Products.map((product) => product.price);
        let min    = Math.min(...prices);
        let result = type.Products.filter((item) => item.price == min);
        arr.push(result[0]);
      })

      response.json(arr);
    })
  })

  app.get('/products/companyCheap', (request, response) => {
    db.Company.findAll({
      include: [
        {
          model: db.Product
        }
      ],
    }).then((data) => {
      let array = data.map((company) => {
        let products = company.Products.map((product) => product.price);
        let price = Math.min(...products);
        return {name: company.name, price: price}
      });

      let result = array.sort((a, b) => a.price - b.price);
      response.json(result);
    })
  })


  app.get('/products/type/:type', (request, response) => {
    db.ProductType.findOne({
      where: { name: request.params.type },
      include: [
        {
          model: db.Product,
          include: [{model: db.Company}, {model: db.ProductType}]
        }
      ],
    }).then((data) => {
      response.json(data.Products);
    })
  })
};
