const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb Conectado com o Servidor: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err, "EROAQUI");
    })
}

module.exports = connectDatabase;
