const nodemailer = require("nodemailer")

const email = async (subject, message, send_to, sent_from, reply_to) => {
    // transporter sends react component outside rendering tree
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD},
        tls: {  rejectUnauthorized: false } // provides data security sent between internet apps
        })

        // email options
        const options = { 
            from: sent_from,
            to: send_to,
            reply: reply_to,
            subject: subject,
            html: message
        }

        // send email
        transporter.sendMail(options, function (err, info){
            if (err) {
                console.log(err)
            } else {
            console.log(info)
            }
        })
}

module.exports = email