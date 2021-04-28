const MongoClient = require('mongodb').MongoClient;

function Database () {
  if (!new.target) {
    return new Database();
  }

  let db = null;
  let client = null;

  this.connect = async (config) => {
    try {
        client = await MongoClient.connect(config.url, config.options);
        db = client.db(config.name);

        if (!db) {
          console.error(`can't establish mongo connection reason: null client`);
          throw(e);
        }

        console.info('successful establish DB connection');

    } catch (e) {
      throw e;
    }
  }

  this.disconnect = () => {
    client.close();
  }

  process.on('SIGTERM', () => {
    client.close();
  })

  this.insert = async (name, content) => {


    const collection = db.collection(name);
    var obj = { rss: content.rss };
    return db.collection(name).insertOne(obj, { upsert: true });
  }

  this.findAll = async(name) =>{
    const collection = db.collection(name);
    let res = await collection.find({}).toArray();
    return res;

  }

  this.update = async (name, oldContent, newContent) => {
    const collection = db.collection(name);
    return collection.updateOne(oldContent, newContent);
  }

  this.remove = async (name, content) => {
    const collection = db.collection(name);
    return collection.deleteOne(content);
  }

  this.drop = async (name) => {
    const collection = db.collection(name);
    return collection.drop();
  }
}

module.exports = Database;