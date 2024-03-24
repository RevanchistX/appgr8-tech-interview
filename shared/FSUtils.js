const fs = require('node:fs');

function readFile(path) {
    if (!path) {
        console.log("ERROR: path is required");
        return;
    }
    try {
        return fs.readFileSync(path, {encoding: 'utf-8'});
    } catch (err) {
        console.error('Error reading file:', err);
        throw err; // Re-throw the error for caller to handle
    }
}

function appendFile(path, line) {
    if (!path && !line) {
        console.log("ERROR: path and line are required");
        return;
    }
    fs.appendFile(path, line, {encoding: 'utf-8'}, (err) => {
        if (err) throw err;
        console.log("line: " + line + " appended to " + path);
    });
}

module.exports = {
    readFile,
    appendFile
}