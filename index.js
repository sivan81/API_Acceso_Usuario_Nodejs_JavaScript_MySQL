import express from 'express';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import { config } from './config.js';

const app = express();
const PORT = config.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuración de la conexión a la base de datos en servidor
const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_DATABASE
});

/*
// Configuración de la conexión a la base de datos en local
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'veterinaria'
});
*/

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
      res.status(500).json({ message: 'Error en el servidor API login' });
    } else if (result.length === 1) {
      //res.sendFile(__dirname + '/index.html'); // Enviar archivo index.html si las credenciales son válidas
      res.json({ message: 'Los datos introducidos son correctos' });
    } else {
      res.status(401).json({ message: 'Los datos introducidos no son correctos' });
    }
  });
});


// Ruta para recuperar contraseña
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  console.log('Recibido email:', email); // Registro de depuración

  db.query('SELECT clave FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error en la consulta SQL:', err); // Registro de error
      res.status(500).json({ message: 'No se estableció la conexión' });
    } else if (result.length === 1) {
      const claveUsuario = result[0].clave;
      console.log('Clave encontrada:', claveUsuario); // Registro de depuración

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.EMAIL_SEND, // email desde el que envia
          pass: config.PASS_APP_EMAIL // Contraseña de aplicación generada porque la contraseña del email daba problemas
        }
      });

      const mailOptions = {
        from: config.EMAIL_SEND, // envía el email con la clave
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Tu contraseña es: ${claveUsuario}`
      };

      transporter.sendMail(mailOptions, error => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error); // Registro de error
          res.status(500).json({ message: 'Error en el servidor' });
        } else {
          console.log('Correo electrónico enviado con éxito'); // Registro de depuración
          res.status(200).json({ message: 'Correo enviado con éxito' });
        }
      });
    } else {
      console.log('Email no registrado:', email); // Registro de depuración
      res.status(404).json({ message: 'El email introducido no está registrado' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});