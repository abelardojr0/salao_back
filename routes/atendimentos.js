const express = require("express")
const router = express.Router();
const db = require("../db/connection")

router.get("/", (req, res) => {
  db.query("SELECT * FROM atendimentos", (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})


router.post("/", (req, res) => {
  const { data_atendimento, id_cliente, id_servico } = req.body
  const sql = `
        INSERT INTO atendimentos (data_atendimento,id_cliente, id_servico) VALUES
            (?, ?, ?)
  `;
  db.query(sql, [data_atendimento, id_cliente, id_servico], (err, results) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.status(201).json({ mensagem: "Atendimento realizado com sucesso" })
    }
  })
})

module.exports = router