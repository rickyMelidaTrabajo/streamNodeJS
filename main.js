const Duplex = require('stream').Duplex;
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/otro', (req, res)=>{
  res.sendFile(path.join(__dirname, 'otro.html'));
});


app.listen(3000, ()=>{
  console.log('Ejemplo en el puerto 3000');
})

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
      setTimeout(()=>{
        console.log(`write: ${chunk.toString()}`);
        callback();
      }, 1000);
    }


}

const duplex = new DuplexCount(1000);
//duplex.pipe(duplex);
