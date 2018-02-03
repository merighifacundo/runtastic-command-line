"use strict";

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This is the usage of the app.
 * Which are the parameters and also an example.
 * 
 */

const ansi = require('ansi-escape-sequences')
const header = require('./header')

module.exports = [
    {
        content: ansi.format(header, 'grey'),
        raw: true
    },
    {
        header: 'RUNTASTIC RECORDS COMMAND LINE',
    },
    {
        header: 'Example',
        content: "node index.js --username=\"test@test.com\" --password=\"password\""
    }
]