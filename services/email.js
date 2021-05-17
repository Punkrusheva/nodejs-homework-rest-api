const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  #sender = sendgrid
  #GenerateTemplate = Mailgen

  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }

  createTemplateVerifyEmail(verifyToken, email) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'System contacts',
        link: this.link,
      },
    })
    const mail = {
      body: {
        name: email,
        intro:
          "Welcome to System cats! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with System cats, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }

    const emailBody = mailGenerator.generate(mail)
    return emailBody
  }
  async sendVerifyEmail(verifyToken, email) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email, // Change to your recipient
      from: 'a.pankrusheva@gmail.com', // Change to your verified sender
      subject: 'Verify email',
      html: this.createTemplateVerifyEmail(verifyToken, email),
    }

    this.#sender.send(msg)
  }
}

module.exports = EmailService