const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const PORT       = process.env.PORT || 3025;
const app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./controllers/index.js")(app);

const db = require('./models')

db.sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
})
