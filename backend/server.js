const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Config
dotenv.config({path:"backend/config/config.env"});

// Conecta ao banco de dados
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Servidor trabalahando na porta http://localhost:${process.env.PORT}`);
});
