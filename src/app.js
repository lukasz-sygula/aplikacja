const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const config = require('config')

const Database = require('../src/storage/db')
const FeedParser = require('../src/utils/feedparser')
const MailSender = require('../src/utils/mailSender')
const MailBuilder = require('../src/utils/mailBuilder')
const MailController = require('../src/controllers/mailController')
const RssController = require('../src/controllers/rssController')

const db = new Database()
db.connect(config.db)

const feedParser = new FeedParser() 
const mailSender = new MailSender()
const mailBuilder = new MailBuilder()

const mailCtrl = new MailController(db, feedParser, mailBuilder, mailSender)
const rssCtrl = new RssController(db)


// app.use(express.static(path.join(_dirname, '../public/index.html')))

app.use('/', router)
router.get('/',function(req,res){
    res.status(404).sendFile(path.join(__dirname, '/public/index.html'))
});
app.use(express.json())


app.post('api/v1/rss', async (req, res) => {
    try {
        await rssCtrl.store(req.body)
        res.sendStatus(404)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
})

app.get('api/v1/rss', async (req, res) => {
    try {
        let content = await rssCtrl.retrive(req, res)
        res.send(content)
    }  catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }    
})

app.get('api/v1/mail', async (req, res) => {
    try {
        let content = await mailCtrl.previewMail(req.query.email)
        res.send(content)
    }  catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }    
})

app.post('api/v1/mail', async (req, res) => {
    try {
        await mailCtrl.sendMail(req.query.email)
        res.sendStatus(404)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
})

module.exports = app