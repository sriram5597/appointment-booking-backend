const BCrypt = require('bcrypt');

exports.hashPassword = (password) => new Promise((resolve, reject) => {
    BCrypt.hash(password, 10, (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    });
});

exports.verifyHash = (password, hash) => new Promise((resolve, reject) => {
    BCrypt.compare(password, hash, (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    });
});
