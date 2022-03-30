const express = require('express');
const app = express();
const routes = require('./routes/api/api');
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/', routes);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
