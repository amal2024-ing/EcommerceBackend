const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Import des routes
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.DATABASECLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database successfully connected"))
.catch(err => {
    console.error("Unable to connect to database", err);
    process.exit(1);
});

// Routes
app.get("/", (req, res) => {
    res.send("Bonjour, serveur MERN fonctionne !");
});
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);

// module.exports pour que Vercel puisse gérer le serveur
module.exports = app;
