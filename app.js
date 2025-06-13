const express = require("express")
const app = express()
app.use(express.json())

const servicosRoutes = require("./routes/servicos")
const clientesRoutes = require("./routes/clientes")
const atendimentosRoutes = require("./routes/atendimentos")

app.use("/servicos", servicosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/atendimentos", atendimentosRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log("API está rodando")
})