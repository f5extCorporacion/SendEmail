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
app.post("/send", midelware2, (req, res, next) => {
  const { nombre, email, telefono, password } = req.body;
  res.status(200).json({ result: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function midelware1(req, res, next) {
  console.log("ejecutando antes");
  next();
}
//midelware2 valida si nombre es correcto
function midelware2(req, res, next) {
  // Configurar el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Cambia a tu proveedor SMTP
    port: 587, // Cambia el puerto si es necesario
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: "1107050440f@gmail.com",
      pass: "pxmuzwuekjpkpfvh",
    },
  });

  if ("franklim" === req.body.nombre) {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Portafolio Franklim 👻" <maddison53@ethereal.email>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Bienvenidos a nuestra web ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <div>
        <p>Datos de Usuario Sr ${req.body.nombre} :</p> <br/>
        <ul>
        <li>Email :${req.body.email} <li>
        <li>Password :${req.body.password} <li>
        </ul>
        <img src="https://cdn-icons-png.flaticon.com/512/2343/2343805.png" width="150px"/>
        </div>
        
        `, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
    console.log(req.body.nombre);
  } else {
    res.status(400).json({ mensaje: "nombre no valido" });
  }
  next();
}
