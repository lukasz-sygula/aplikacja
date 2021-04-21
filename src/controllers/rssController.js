class RssController {
    constructor(db) {
    if (!new.target) {
    return new RssController(db)
    }
    const db_ = db
    
     this.store = async (content) => {
    db_.store(content)
    }
    
     this.retrive = async (email) => {
    db_.find(email)
    }
    }
    }
    
    module.exports = RssController