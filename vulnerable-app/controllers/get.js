var secret = 'Timing attacks are scary!\n'

module.exports = function(req, res) {
    res.status(200).send(secret)
}
