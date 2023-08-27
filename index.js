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


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});