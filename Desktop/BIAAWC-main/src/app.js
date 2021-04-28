const express = require('express');
const path = require('path');
const config = require('config');
const app = express();

const Database = require('./storage/db');
const FeedParser = require('./utils/feedparser');
const MailSender = require('./utils/mailsender');
const MailBuilder = require('./utils/mailbuilder');
const MailController = require('./controllers/mailController');
const RssController = require('./controllers/rssController');
const bodyParser = require("body-parser");

const db = new Database();
db.connect(config.db);



const feedParser = new FeedParser();
const mailSender = new MailSender();
const mailBuilder = new MailBuilder();

const rssCtrl = new RssController(db, feedParser);
const mailCtrl = new MailController(db, feedParser, mailBuilder, mailSender, rssCtrl);

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.status(200).sendFile('/index.html');
});

app.post('/api/v1/rss', async(req,res) =>{
    try{
        console.log("TEST");
        await rssCtrl.store(req.body);
        res.sendStatus(200);
    }catch (e){
        console.error(e.message);
        res.sendStatus(500);
    }
})

// get all
app.get('/api/v1/rss_all', async (req,res) =>{
    try{
        let content =   await rssCtrl.retrieveAll();
        await res.send(content)
    }catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
})
//


// preview
app.get('/api/v1/mail', async (req,res) => {
    try{
        let content = await mailCtrl.previewMail();
        await res.send(content);
    }catch (e) {
        await console.log(e);
        await res.sendStatus(500);
    }
});



// send
app.post('/api/v1/mail', async (req,res) => {
    try{
        let content = await mailCtrl.sendToSettedEmail(req.body.email);
        res.send(content);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = app;