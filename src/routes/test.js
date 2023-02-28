const auth = require('../authentification/auth')

module.exports = (app) => {
    app.get('/test', async (req,res) => {
        res.json('route test ok')
    })
}