const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com", // Usando o host do Gmail
        port: 465, // Porta para TLS/STARTTLS
        service: process.env.SMTP_SERVICE,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Envio do e-mail
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erro ao enviar e-mail:", error);
        } else {
            console.log("E-mail enviado com sucesso:", info.messageId);
            console.log("URL de visualização do Ethereal:", nodemailer.getTestMessageUrl(info));
        }
    });
};

module.exports = sendEmail;
