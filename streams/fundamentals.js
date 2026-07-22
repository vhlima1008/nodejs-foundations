// Netflix & Spotify
// A ideia de Streams é ler, escrever, transformar
// arquivos recebidos sem que necessite tê-lo completo
// como ocorre em um vídeo/música.

// Importação de clientes via CSV (Excel)
// 1GB ~1.000.000
// POST /upload import.csv
// 10mb/s ~100s
// teria que esperar 100s para realizar inserções
// 10mb/s -> com stream, leio já, processo e retorno

// Readable Streams / Writeable Streams

// No Node.js, toda porta de entrada e saída é Stream.

// Streams
// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(()=> {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MutiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MutiplyByTenStream())