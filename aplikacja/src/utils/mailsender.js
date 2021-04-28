const MailGun = require('mailgun-js')
const config = require('config')

class MailSender {
    constructor(config, mailbuilder){
        this.mailgun = new MailGun({apiKey: "config.api_key", domain: "config.domain"});
        this.mailbuilder = mailbuilder;
    }

    async sendMsg(to, from, html){
        var data = {
            from: from,
            to: to,
            subject: 'Feedmail',
            html: html
        }
        return this.mailbuilder.sendMsg(data)
    }
}

module.exports = MailSender