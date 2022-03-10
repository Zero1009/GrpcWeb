const express = require('express');
const app = express();
const routes = require('./routes/api/api')

app.use('/', routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
