const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1111',
  database: 'escola'
});

db.connect(err => {
  if (err) console.error(err);
  else console.log('MySQL conectado');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/alunos', (req, res) => {
  db.query('SELECT * FROM alunos ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/alunos', (req, res) => {
  const { nome, email, curso } = req.body;
  db.query('INSERT INTO alunos (nome,email,curso) VALUES (?,?,?)',
    [nome,email,curso],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({id: result.insertId});
    });
});

app.put('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, curso } = req.body;

  db.query('UPDATE alunos SET nome=?, email=?, curso=? WHERE id=?',
    [nome,email,curso,id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({msg:'Atualizado'});
    });
});

app.delete('/alunos/:id', (req, res) => {
  db.query('DELETE FROM alunos WHERE id=?',
    [req.params.id],
    (err)=>{
      if (err) return res.status(500).json(err);
      res.json({msg:'Excluído'});
    });
});

app.listen(3000, ()=> console.log('http://localhost:3000'));
