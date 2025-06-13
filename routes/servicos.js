const express = require("express")
const router = express.Router();
const db = require("../db/connection")

router.get("/", (req, res) => {
  db.query("SELECT * FROM servicos", (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

router.post("/", (req, res) => {
  const { nome, descricao, preco } = req.body
  const sql = `
        INSERT INTO servicos (nome,descricao, preco) VALUES
            (?, ?, ?)
  `;
  db.query(sql, [nome, descricao, preco], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(201).json({ mensagem: "Serviço adicionado com sucesso" })
    }
  })
})

router.put("/:id", (req, res) => {
  const { nome, descricao, preco } = req.body
  const { id } = req.params
  const sql = `
          UPDATE servicos
          SET nome = ?, descricao = ?, preco = ?
          WHERE id = ?
  `;
  db.query(sql, [nome, descricao, preco, id], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({ mensagem: "Serviço alterado com sucesso" })
    }
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const sql = `
          DELETE FROM servicos WHERE id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({ mensagem: "Serviço excluído com sucesso" })
    }
  })
})

module.exports = router
