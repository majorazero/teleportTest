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
    db.ProductType.findAll().then((data) => {
      let arr = [];

      data.map((type) => {
        let prices = type.products.map((product) => product.price);
        let min    = Math.min(...prices);
        let result = type.products.filter((item) => item.price === min);
        arr.push(result[0]);
      })

      response.json(arr);
    })
  })

  app.get('/products/companyCheap', (request, response) => {
    db.Company.findAll().then((data) => {
      let array = data.map((company) => {
        let products = company.products.map((product) => product.price);
        let price = Math.min(...products);
        return {name: company.name, price: price}
      });

      let result = array.sort((a, b) => a.price - b.price);
      res.json(result);
    })
  })


  app.get('products/freeShipping/:total', (request, response) => {
    db.Product.where({shipping_threshold: {
      [Op.lt]: request.params.total
    }}).then((data) => {
      response.json(data)
    })
  })
};
