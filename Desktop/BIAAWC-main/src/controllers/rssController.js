
class RssController {
    constructor(db, feedparser) {
        if (!new.target) {
            return new RssController(db);
        }
        const db_ = db;
        this.feedparser = feedparser;

        this.store =  async (content) => {

            console.log("STORE");
            try{
                await this.feedparser.parse(content.rss);
                return await db_.insert("rss", content);
                verified = true;
                console.log("YYYY");
            }
            catch(e)
            {
                console.log("BŁĄD: " + e);
                return "Nie dodano";
            }
        }
        
        this.retrieveAll = async() =>{
            return await db_.findAll("rss");
        }

    }
};

module.exports = RssController;