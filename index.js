const http = require('http');
const path = require('path')
const fs = require('fs')


const server = http.createServer((req, res) => {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    })
        .on('end', () => {
            body = Buffer.concat(body).toString();

            var conversion = require("phantom-html-to-pdf")();
            conversion({ html: body }, function (err, pdf) {
                console.log(pdf.logs);
                console.log(pdf.numberOfPages);
                // pdf.stream.pipe(fs.createWriteStream('./test.pdf'));
                pdf.stream.pipe(res);

            });
            //var rstream = fs.createReadStream('existFile');
            //rstream.pipe(res);
        })
});

server.listen(9898, '127.0.0.1')
