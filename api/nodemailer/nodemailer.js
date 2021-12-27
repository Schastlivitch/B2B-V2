const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport( {
  service: "Gmail",
  auth: {
    user: "amanatik10@gmail.com",
    pass: "test123"
  }
})

const mailer = messageForMail => {
  transporter.sendMail(messageForMail, (err, info) => {
    if (err){
      console.log(err)
      return
    }
    console.log('Sent: ' + info.response)
  })
}

module.exports = mailer
