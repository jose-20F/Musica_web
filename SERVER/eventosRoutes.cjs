// eventosRoutes.cjs
const express = require('express');
const sql = require('mssql');

const router = express.Router();

module.exports = function(poolPromise, autenticarRol) {
  // Obtener todos los eventos
  router.get('/', autenticarRol(['admin']), async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Eventos ORDER BY Fecha ASC');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener eventos', detalle: error.message });
    }
  });

  // Obtener todos los eventos (PÚBLICO)
  router.get('/public', async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Eventos ORDER BY Fecha ASC');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener eventos', detalle: error.message });
    }
  });

  // Crear nuevo evento
  router.post('/', autenticarRol(['admin']), async (req, res) => {
    try {
      const { titulo, descripcion, fecha, lugar, tipo } = req.body;
      if (!titulo || !fecha || !tipo) {
        return res.status(400).json({ error: 'Título, fecha y tipo son obligatorios' });
      }
      const pool = await poolPromise;
      await pool.request()
        .input('Titulo', sql.VarChar(100), titulo)
        .input('Descripcion', sql.VarChar(255), descripcion || '')
        .input('Fecha', sql.DateTime, new Date(fecha))
        .input('Lugar', sql.VarChar(100), lugar)
        .input('Tipo', sql.VarChar(20), tipo)
        .query('INSERT INTO Eventos (Titulo, Descripcion, Fecha, Lugar, Tipo) VALUES (@Titulo, @Descripcion, @Fecha, @Lugar, @Tipo)');
      res.json({ message: 'Evento creado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear evento', detalle: error.message });
    }
  });

  // Actualizar evento existente
  router.put('/:id', autenticarRol(['admin']), async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion, fecha, lugar, tipo } = req.body;
      if (!titulo || !fecha || !tipo) {
        return res.status(400).json({ error: 'Título, fecha y tipo son obligatorios' });
      }
      const pool = await poolPromise;
      await pool.request()
        .input('Id', sql.Int, id)
        .input('Titulo', sql.VarChar(100), titulo)
        .input('Descripcion', sql.VarChar(255), descripcion || '')
        .input('Fecha', sql.DateTime, new Date(fecha))
        .input('Lugar', sql.VarChar(100), lugar || '') // <--- valor por defecto
        .input('Tipo', sql.VarChar(20), tipo || '')    // <--- valor por defecto
        .query('UPDATE Eventos SET Titulo = @Titulo, Descripcion = @Descripcion, Fecha = @Fecha, Lugar = @Lugar, Tipo = @Tipo WHERE Id = @Id');
      res.json({ message: 'Evento actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar evento', detalle: error.message });
    }
  });

  // Eliminar evento
  router.delete('/:id', autenticarRol(['admin']), async (req, res) => {
    try {
      const { id } = req.params;
      console.log('ELIMINAR evento ID:', id); // <-- Agrega esto
      const pool = await poolPromise;
      await pool.request()
        .input('Id', sql.Int, id)
        .query('DELETE FROM Eventos WHERE Id = @Id');
      res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar evento', detalle: error.message });
    }
  });

  return router;
};
