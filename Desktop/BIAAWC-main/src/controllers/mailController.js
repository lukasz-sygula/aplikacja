const config = require('config');
const fetch = require("node-fetch");
const request = require('request');
const { simpleHtmlEmail } = require('mailbuilder');
const { response } = require('../app');
let Parser = require('rss-parser');
let parser = new Parser();
const MailBuilder = require('../utils/mailbuilder');
const MailSender = require('../utils/mailsender');
const mjml2html = require( 'mjml');
const MailGun = require('mailgun-js');

class MailController {
    constructor(db,feedParser,mailSender,mailBuilder, rssController){
        this.db = db;
        this.feedparser = feedParser;
        this.mailSender = mailSender;
        this.mailBuilder = mailBuilder;
        this.rssController = rssController;
    }


    async previewMail(){
        try{
            let res = await this.rssController.retrieveAll();
            let rss_array = await this.getAllRssFromArray(res); // lista linkow rss
            // new approach

            var feed;
            feed = await this.feedparser.parse(rss_array);
            // html

            var html_data = `
            <html>
                <table style="width:100%">
                    <tr>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Link</th>
                    </tr>  
            `;

            for(var i=0;i<feed.length;i++)
            {
                html_data+=`
                <tr>
                    <td>` + feed[i].title + `</td>
                    <td>` + feed[i].description+ `</td>
                    <td>` + feed[i].link + `</td>
                </tr>`;
            };

            html_data += `</table>
            </html>`;

            return html_data;


        }
        catch(ex)
        {
            console.log("EXC: " + ex);
            return "Brak podglądu";
        }

    }

    async sendToSettedEmail(email){

        //

        try{
            let res = await this.rssController.retrieveAll();
            let rss_array = await this.getAllRssFromArray(res); // lista linkow rss

            // new approach


            var feed = await this.feedparser.parse(rss_array);
            // html
            var html_data = `
            <html>
                <table style="width:100%">
                    <tr>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Link</th>
                    </tr>  
            `;

            for(var i=0;i<feed.length;i++)
            {
                html_data+=`
                <tr>
                    <td>` + feed[i].title + `</td>
                    <td>` + feed[i].description+ `</td>
                    <td>` + feed[i].link + `</td>
                </tr>`;
            };

            html_data += `</table>
            </html>`;
            // send email
            const mg = MailGun({apiKey: config.get("mailGun.api_key"), domain: config.get("mailGun.domain")});
            const data2 = {
                from: 'User <me@samples.mailgun.org>',
                to: email,
                subject: 'Hello',
                html: html_data
            };
            mg.messages().send(data2, function (error, body) {
                console.log(error);
                console.log(body);
                if(error)
                    return error;
            });

            return "Wysłano";


        }
        catch(ex)
        {
            return "Nie wysłano";
        }
        //

    }

    async getAllRssFromArray(array){
        let result = Array();
        
        for(var i=0;i<array.length;i++)
        {
            // convert to json
            var json = JSON.stringify(array[i]);
            json = JSON.parse(json);
            // get rss link
            var rss_link = json.rss;
            if(rss_link != null)
            {
                // push to result
                result.push(rss_link);
            }
        }
        return await result;
    }

    async build(mail){
        const urls = await this.db.find(config.name, mail);
        const feeds =  await this.feedparser.parse(urls);
        const content = await this.mailBuilder(feeds);
        return content.html;
    }

    async send(email,content){
        let rss = await db.find(config.name, email);
        let feeds = await feedParser.parse(rss);
        let mail = this.mailBuilder.build(feeds);

        return this.mailSender.send(email, mail.html);
    }    
};

module.exports = MailController;