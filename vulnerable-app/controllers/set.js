var password = require('../helpers/password')

module.exports = function(req, res) {
    password.set(req.body.password)
    res.status(200).send('OK\n')
}
