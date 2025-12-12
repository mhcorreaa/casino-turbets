const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = 3000;

// Configurar Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars", 
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos (css, imágenes, etc.)
app.use(express.static(__dirname));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", { title: "Casino Turbets" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
