const express = require("express")
const router = express.Router();
const db = require("../db/connection")

router.get("/", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})


router.post("/", (req, res) => {
  const { nome, telefone, endereco, email } = req.body
  const sql = `
        INSERT INTO clientes (nome,telefone, endereco, email) VALUES
            (?, ?, ?, ?)
  `;
  db.query(sql, [nome, telefone, endereco, email], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(201).json({ mensagem: "Cliente adicionado com sucesso" })
    }
  })
})



router.put("/:id", (req, res) => {
  const { nome, telefone, endereco, email } = req.body
  const { id } = req.params
  const sql = `
          UPDATE clientes
          SET nome = ?, telefone = ?, endereco = ?, email = ?
          WHERE id = ?
  `;
  db.query(sql, [nome, telefone, endereco, email, id], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({ mensagem: "Cliente alterado com sucesso" })
    }
  })
})


router.delete("/:id", (req, res) => {
  const { id } = req.params
  const sql = `
          DELETE FROM clientes WHERE id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({ mensagem: "Cliente excluído com sucesso" })
    }
  })
})

module.exports = router