var password = 'pcs'

module.exports = {
    get: function() {
        return password
    },
    set: function(pass) {
        return password = pass
    }
}
