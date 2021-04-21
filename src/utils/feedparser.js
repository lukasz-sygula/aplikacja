const Parser = require('rss-parser')

class feedParser {
    constructor() {
        this.parser = new Parser();
    }    
    async parse(url) {
        let urls = Array.isArray(url) ? url: [url]
        const promieses = []

        for (let url of urls) {
            promieses.push(this.parser.parseURL(url))
        }

        return Promise.all(promieses)        
    }
}

module.exports = feedParser