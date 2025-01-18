const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/",  (req, res, next) => {
  res.status(200).json({ mensaje: "bienvenidos" });
});
app.post("/send", async (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  // Configurar el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Cambia a tu proveedor SMTP
    port: 587, // Cambia el puerto si es necesario
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: "1107050440f@gmail.com", // Asegúrate de usar un correo válido
      pass: "pxmuzwuekjpkpfvh", // Asegúrate de usar una contraseña válida
    },
  });

  try {
    if (nombre === "franklim") {
      // Enviar correo con Nodemailer
      const info = await transporter.sendMail({
        from: '"Portafolio Franklim 👻" <maddison53@ethereal.email>', // Dirección del remitente
        to: email, // Dirección del destinatario
        subject: "Bienvenidos a nuestra web ✔", // Asunto del correo
        text: `Hello ${nombre}`, // Texto plano
        html: `
          <div>
            <p>Datos de Usuario Sr. ${nombre} :</p>
            <ul>
              <li>Email: ${email}</li>
              <li>Password: ${password}</li>
            </ul>
            <img src="https://cdn-icons-png.flaticon.com/512/2343/2343805.png" width="150px" />
          </div>
        `, // Cuerpo del correo en HTML
      });

      console.log("Message sent: %s", info.messageId);

      return res.status(200).json({ message: "Correo enviado con éxito", result: info });
    } else {
      return res.status(400).json({ error: "El nombre no es válido." });
    }
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return res.status(500).json({ error: "Error al enviar el correo." });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



