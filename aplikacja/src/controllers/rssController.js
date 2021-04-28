class RssController {
    constructor(db) {
        if (!new.target) {
            return new RssController(db);
        }
        const db_ = db;

        this.store =  async (content) => {
            return await db_.insert("rss", content);
        }
        
        this.retrieveAll = async() =>{
            return await db_.findAll("rss");
        }

    }
};

module.exports = RssController;