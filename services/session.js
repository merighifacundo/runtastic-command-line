"use strict";

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This module refers to the session and should be populated
 * after the login.
 * 
 */
let session = {
    authenticityToken: null,
    user: null,
    cookie: null,
}

module.exports = session;