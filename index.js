const keys =require('./config/keys');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
require('./routes/index')(app);

if (!keys.jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

let dbUri = keys.dburl;
const connect = (databaseUrl = dbUri) => {
  return mongoose
      .connect(databaseUrl,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
      .then(() => console.log('Database connected'))
      .catch(err => console.error('Database connection failed', err));
};
connect();
app.listen(keys.port, () => console.log(`Listening on port ${keys.port}...`));
