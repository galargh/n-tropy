module.exports = function(req, res, next) {
    if (!req.body || !req.body.password) {
        return res.status(500).send("Where's the password?!\n")
    }
    if (!/^[a-z`]+$/i.test(req.body.password)) {
        return res.status(500).send("Lowercase and uppercase letters only, please :)\n")
    }
    next()
}
