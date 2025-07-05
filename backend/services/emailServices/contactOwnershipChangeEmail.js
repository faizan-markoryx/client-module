const nodemailer = require('nodemailer')

const MAIL_SETTINGS = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

const contactOwnershipChangeEmail = (email,currentUsersName,oldOwnershipsName,newOwnershipsName) => {

    const ownershipBody = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Wise Skulls Client Module</title>
      </head>
      <body>
        <div class="container">
          <img src="https://www.wiseskulls.com/assets/img/logo1new2.png" alt="Wise Skulls Logo" class="logo">
          <p>${currentUsersName} Change Ownership Oldownership ${oldOwnershipsName} Newownership ${newOwnershipsName},</p>
          </div>
          <p>Best regards,<br>Wise Skulls Team</p>
        </div>
      </body>
    </html>
    `

    try {

        transporter.sendMail({
            from: {
                name: 'WiseSkulls',
                address: process.env.SMTP_SENDER,
            },
            to: email,
            sender: process.env.SMTP_SENDER,
            // replyTo: params.to,
            subject: "Wise Skulls",
            html: ownershipBody,
        }).then(() => {
            // return res.status(200).send({
            //     success: true
            // })
        }).catch(() => {
            // return res.status(200).send({
            //     success: false
            // })
        })

    } catch (error) {
        // return res.status(500).send({
        //     success: false
        // })
    }

}
module.exports = contactOwnershipChangeEmail;