require('dotenv').config({ path:"/backend/config/config.env" })
const app = require("./app");
const connectDatabase = require("./config/database");

// Trata exceções não capturadas
process.on("uncaughtException", (err) => {
    console.log(`Erro: ${err.message}`);
    console.log(`Desligando o servidor devido a exceções não capturadas`);
    process.exit(1);
});

// Conecta ao banco de dados
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor trabalhando na porta http://127.0.0.1:${process.env.PORT}`);
});

// Rejeição de Promessa Não Tratada
process.on("unhandledRejection", (err) => {
    console.log(`Erro: ${err.message}`);
    console.log(`Desligando o servidor devido a uma Rejeição de Promessa Não Tratada`);

    server.close(() => {
        process.exit(1);
    });
});