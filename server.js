const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const PORT = 3000;

require("dotenv").config();

// Configurar Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars", 
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials")
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos (css, imágenes, etc.)
app.use(express.static(__dirname));

//leer metodos post
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index", { 
    title: "Turbets",
    showRegisterButton: true,
    showLoginButton: true,
    showProfileButton: false
 });
});

app.get("/registro", (req, res) => {

    res.render("registro", {
        title: "Registro - Turbets",
        showRegisterButton: false,
        showLoginButton: true,
        showProfileButton: false
    })
})

app.post("/registro", async (req, res) => {

  const {fullname, username, email, password, passwordConfirm, fechaNacimiento} = req.body;

  if(password != passwordConfirm){

    return res.send("Las contraseñas no coinciden");
  }

  try{

    await User.create({

      fullname, username, email, password, fechaNacimiento: new Date(fechaNacimiento)
    });

    res.redirect("/perfil");
  }
  catch (err){

    console.error("Error creando usuario:", err.message);
    res.status(500).send("Error registranbdo usuario");
  }
  
});

app.get("/acceso", (req, res) => {

    res.render("acceso", {
        title: "Acceso - Turbets",
        showRegisterButton: true,
        showLoginButton: false,
        showProfileButton: false
    })
})

app.post("/acceso", (req, res) => {

  const {email, password} = req.body;

  res.redirect("/perfil");
});

app.get("/perfil", (req, res) => {

    res.render("perfil", {
        title: "Perfil - Turbets",
        showRegisterButton: false,
        showLoginButton: false,
        showProfileButton: false
    })
})

app.get("/info-app", (req, res) => {

    res.render("info-app", {
        title: "¿Quiénes somos? - Turbets",
        bodyClass: "info_app",
        showRegisterButton: false,
        showLoginButton: false,
        showProfileButton: false
    })

})

app.get("/transacciones", (req, res) => {

  res.render("transacciones", {

    title: "Transacciones - Turbets",
    showLoginButton: false,
    showProfileButton: true,
    showRegisterButton: false
  })
})

app.get("/historial", (req, res) => {

  res.render("historial", {

    title: "Historial - Turbets",
    showLoginButton: false,
    showProfileButton: true,
    showRegisterButton: false
  })
})

app.get("/ruleta", (req, res) => {

  res.render("ruleta", {

    title: "Ruleta - Turbets",
    showLoginButton: false,
    showProfileButton: true,
    showRegisterButton: false
  })
})

app.get("/juegos", (req, res) => {

  res.render("juegos", {

    title: "Juegos - Turbets",
    showLoginButton: false,
    showProfileButton: true,
    showRegisterButton: false
  })
})

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {

    console.log("Conectado a MongoDB Atlas");
  })
  .catch((err) => {

    console.error("Error conectando a MongoDB: ", err.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
