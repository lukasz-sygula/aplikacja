const mjml2html = require('mjml')

class MailBuilder{
    
    constructor(feed){
        this.feed = feed
    }

    build(feed){
        const htmlOutput = mjml2html(`
        <mjml>
        <mj-body>
        <mj-section>
            <mj-column>
            <mj-text>
                ${feed.title}
            </mj-text>
            </mj-column>
        </mj-section>
        <mj-section>
            <mj-column>
            <mj-text>
                ${feed.item}
            </mj-text>
            </mj-column>
        </mj-section>
        </mj-body>
        </mjml>
        `, options)
    }   
}

module.exports= MailBuilder