const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = 3000;

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://sweet-sorbet-5077bc.netlify.app',
  'https://sravyasolutions.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow sending cookies
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

app.use(function(req, res, next) {
  res.status(404).json({ message: "No such route exists" });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message });
});

mongoose.connect("mongodb+srv://svemuri:svemuri123@test.q6pcyki.mongodb.net/test", {
  useNewUrlParser: true,
})
  .then(() => {
    console.log("connected to database");

    app.listen(port, () => {
      console.log(`API listening to http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
