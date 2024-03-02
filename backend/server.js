require('dotenv').config({ path:"../.env" })
const app = require("./app");
const cloudinary = require("cloudinary");
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

// Nuvem Mídia
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Rejeição de Promessa Não Tratada
process.on("unhandledRejection", (err) => {
    console.log(`Erro: ${err.message}`);
    console.log(`Desligando o servidor devido a uma Rejeição de Promessa Não Tratada`);

    server.close(() => {
        process.exit(1);
    });
});