var sleep = require('sleep').usleep
var password = require('./password')

module.exports = function(req, res, next) {
    var pass = password.get()
    var key = req.body.password
    if (pass.length !== key.length) {
        return res.status(500).send('Better luck next time...\n')
    }
    for (var i = 0; i < pass.length; i++) {
        sleep(100000)
        if (pass[i] !== key[i]) {
            return res.status(500).send('Better luck next time...\n')
        }
    }
    next()
}
