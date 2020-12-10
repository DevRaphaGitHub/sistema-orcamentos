import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';

import './models/Orcamento.js';
const Orcamento = mongoose.model('Orcamento');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});

mongoose.connect("mongodb://localhost/sistema_orcamentos", { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((error) => {
  console.log("Erro: Conexão com MongoDB não foi realizada! Motivo: " + error);
});

app.post("/orcamento", async (req, res) => {
    await Orcamento.create(req.body, (error) => {
      if (error) return res.status(400).json({
        error: true,
        message: "Erro: Solicitação de orçamento não pode ser enviada!"
      });
    });

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ae6bb80768c516",
        pass: "290a8925b8771a"
      }
    });

    var emailHtml = 'Prezado(a)<br><br> Recebi a solicitação de orçamento.<br><br>Em breve será encaminhado o orçamento.<br><br>';
    var emailTexto = 'Prezado(a)\n\n Recebi a solicitação de orçamento.\n\nEm breve será encaminhado o orçamento.\n\n';

    var emailSendInfo = {
      from: '6e8f608201-efc6da@inbox.mailtrap.io',
      to: req.body.email,
      subject: "Recebi a solicitação de orçamento",
      text: emailTexto,
      textEncoding: emailHtml
    };

    await transport.sendMail(emailSendInfo, (error) => {
      if (error) return res.status(400).json({
        error: true,
        message: "Erro: Solicitação de orçamento não pode ser enviada!"
      });
  
      return res.json({
        error: false,
        message: "Solicitação de orçamento enviada com sucesso!"
      });
    });

    return res.json({
      error: false,
      message: "Solicitação de orçamento enviada com sucesso!"
    });
  });

app.listen(3333, () => {
  console.log("Servidor iniciado na porta 3333: http://localhost:3333");
});