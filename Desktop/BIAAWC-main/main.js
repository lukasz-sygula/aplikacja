const config = require('config')

const app = require('./src/app')

const port = process.env.PORT || config.get('port')

app.listen(port, () => console.log('server listen at: ' + port))