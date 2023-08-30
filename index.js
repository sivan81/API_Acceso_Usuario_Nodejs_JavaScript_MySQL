const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'veterinaria'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
  const { email, clave } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ? AND clave = ?', [email, clave], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error en el servidor' });
    } else if (result.length === 1) {
      //res.sendFile(__dirname + '/index.html'); // Enviar archivo index.html si las credenciales son válidas
      res.status(401).json({ message: 'Los datos introducidos son correctos' });
    } else {
      res.status(401).json({ message: 'Los datos introducidos no son correctos' });
    }
  });
});


// Ruta para recuperar contraseña
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  db.query('SELECT clave FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error en el servidor' });
    } else if (result.length === 1) {
      const claveUsuario = result[0].clave;

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ivandevelop81@gmail.com', // Cambia esto por tu correo
          pass: 'sivan81%' // Cambia esto por tu contraseña
        }
      });

      const mailOptions = {
        from: 'ivandevelop81@gmail.com', // Cambia esto por tu correo
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Tu contraseña es: ${claveUsuario}`
      };

      transporter.sendMail(mailOptions, error => {
        if (error) {
          res.status(500).json({ message: 'Error en el servidor' });
        } else {
          res.status(200).json({ message: 'Correo enviado con éxito' });
        }
      });
    } else {
      res.status(404).json({ message: 'El email introducido no está registrado' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});