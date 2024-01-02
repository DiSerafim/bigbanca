const app = require("./app");


app.listen(process.env.PORT, () => {
    console.log(`Servidor trabalahando na porta http://localhost:${process.env.PORT}`);
});