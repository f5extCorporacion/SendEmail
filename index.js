const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SQLite
require("./db");

// Rutas
app.use("/contactos", require("./routes/lista"));

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "bienvenidos"
  });
});

app.post("/send", async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos."
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Portafolio Franklim 👻" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Bienvenidos a nuestra web ✔",
      html: `
        <div>
          <p>Datos de Usuario Sr. ${nombre}</p>
          <ul>
            <li>Email: ${email}</li>
            <li>Teléfono: ${telefono || ""}</li>
          </ul>
        </div>
      `
    });

    return res.json({
      ok: true,
      messageId: info.messageId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
});

// LOCAL
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor ejecutándose en ${port}`);
  });
}

// VERCEL
module.exports = app;
