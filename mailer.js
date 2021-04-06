const mailer = require('nodemailer')

let testAccount =  mailer.createTestAccount();

let options = {
  host: 'smtp.ethereal.com',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
}
let transport = mailer.createTransport(options);
module.exports = transport