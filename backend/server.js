const app = require("./app");
require('dotenv').config({ path:"/backend/config/config.env" })

// Config
// dotenv.config({ path:"/backend/config/config.env" });

const connectDatabase = require("./config/database");

// Conecta ao banco de dados
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Servidor trabalhando na porta http://127.0.0.1:${process.env.PORT}`);
});
