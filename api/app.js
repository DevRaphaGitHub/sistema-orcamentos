import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost/sistema-orcamentos", { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((error) => {
  console.log("Erro: Conexão com MongoDB não foi realizada! Motivo: " + error);
});

app.post("/orcamento", async (req, res) => {
  console.log(req.body);
  res.send("Orçamento");
});

app.listen(3333, () => {
  console.log("Servidor iniciado na porta 3333: http://localhost:3333");
});