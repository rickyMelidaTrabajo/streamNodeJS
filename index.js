const express = require('express');
const path = require('path');
// const Readable = require('stream').Readable;
// const Writable = require('stream').Writable;
const Duplex = require('stream').Duplex;

const app = express();

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/datos:songs', (req, res)=>{
  res.send(req.params);
});

class DuplexCount extends Duplex {
    constructor(count, options) {
        super(options);
        this.count = count;
    }

    _read(size) {
        this.push(this.count.toString());

        if (this.count-- === 0) {
            this.push(null);
        }

    }

    _write(chunk, encoding, callback) {
        console.log(`write: ${chunk.toString()}`);
        callback();
    }
}

const duplex = new DuplexCount(1000);
duplex.pipe(duplex);

/*
const myStream = new Writable();

myStream.write('somea');
myStream.write('somee data');
myStream.end('doneting data');
*/


/*
const rs = new Readable();

    rs.push('beep ');
    rs.push('boop\n');
 rs.push(null);

rs.pipe(process.stdout);
*/


app.listen(3000, ()=>{
  console.log('Servidor corriendo');
});
