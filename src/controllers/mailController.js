const config = require('config')

class MailController {
constructor(db,feedParser,mailSender,mailBuilder){
this.db = db
this.feedparser = feedParser
this.mailSender = mailSender
this.mailBuilder = mailBuilder
}

 async build(mail){
const urls = await this.db.find(config.name, mail)
const feeds = await this.feedparser.parse(urls)
const content = await this.mailBuilder(feeds)
return content.html
}

 async send(email,content){
let rss = await db.find(config.name, email)
let feeds = await feedParser.parse(rss)
let mail = this.mailBuilder.build(feeds)

 return this.mailSender.send(email, mail.html)
}
}

module.exports = MailController