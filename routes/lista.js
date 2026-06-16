const express = require('express');
const router = express.Router();
const db = require('../db');


// LISTAR
router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM contactos ORDER BY id DESC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(rows);
    }
  );
});


// BUSCAR POR ID
router.get('/:id', (req, res) => {
  db.get(
    'SELECT * FROM contactos WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (!row) {
        return res.status(404).json({
          mensaje: 'Contacto no encontrado'
        });
      }

      res.json(row);
    }
  );
});


// CREAR
router.post('/', (req, res) => {

  const {
    nombre,
    celular,
    email,
    ubicacion,
    estado = 'activo'
  } = req.body;

  if (!nombre || !email || !ubicacion) {
    return res.status(400).json({
      message: [
        'nombre es requerido',
        'email es requerido',
        'ubicacion es requerida'
      ]
    });
  }

  db.run(
    `INSERT INTO contactos
      (nombre, celular, email, ubicacion, estado)
      VALUES (?, ?, ?, ?, ?)`,
    [nombre, celular, email, ubicacion, estado],
    function (err) {

      if (err) {
        return res.status(500).json({
          message: [err.message]
        });
      }

      res.status(201).json({
        mensaje: 'Contacto creado',
        id: this.lastID
      });
    }
  );
});


// ACTUALIZAR
router.put('/:id', (req, res) => {

  const {
    nombre,
    celular,
    email,
    ubicacion,
    estado
  } = req.body;

  if (!nombre || !email || !ubicacion) {
    return res.status(400).json({
      message: [
        'nombre es requerido',
        'email es requerido',
        'ubicacion es requerida'
      ]
    });
  }

  db.run(
    `UPDATE contactos
      SET nombre=?,
          celular=?,
          email=?,
          ubicacion=?,
          estado=?
      WHERE id=?`,
    [
      nombre,
      celular,
      email,
      ubicacion,
      estado,
      req.params.id
    ],
    function (err) {

      if (err) {
        return res.status(500).json({
          message: [err.message]
        });
      }

      res.json({
        mensaje: 'Contacto actualizado',
        cambios: this.changes
      });
    }
  );
});


// ELIMINAR
router.delete('/:id', (req, res) => {

  db.run(
    'DELETE FROM contactos WHERE id = ?',
    [req.params.id],
    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        mensaje: 'Contacto eliminado',
        cambios: this.changes
      });
    }
  );
});

module.exports = router;