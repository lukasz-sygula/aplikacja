const MailGun = require('mailgun-js')

class MailSender {
    constructor(config) {
        this.mailgun = new MailGun({apiKey: "config.api_key", domain: "config.domain"});   
    }

    send = async (to, from, text) => {
        var data = {
            from: from,
            to: to,
            subject: 'Feedmail',
            html:html
        };

        return this.mailgun.messages(data);
    }
}

module.exports = MailSender

