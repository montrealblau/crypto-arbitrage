const fs = require('fs');
exports.getFile = (url) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(url,'utf8',function(err, data) {
            if (err) { return reject(err); }
            return resolve(data);
        });
    });
}


exports.postFile = (url,str) => {
    return new Promise(function(resolve, reject) {
        fs.writeFile(url,str,'utf8',function(err, data) {
            if (err) { return reject(err); }
            return resolve('completed postFile');
        });
    });
}