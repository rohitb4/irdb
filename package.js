var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/dist-prods/ui.zip');
var archive = archiver('zip', {
    store: true // Sets the compression method to STORE.
});

// listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.directory('dist/');
archive.file('package.json');
archive.file('server.js');
archive.finalize();