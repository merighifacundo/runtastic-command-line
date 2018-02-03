"use strict";

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This module returns a method for the login.
 * 
 * 
 */

const endpoints = require('./endpoints')
const helper = require('./helper')
const request = require('request')
const q = require('q')

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This is the login method returns a promise that will reject or resolve depending 
 * on the credentials and the server response.
 * 
 * Be aware that if the server is updated and change the signature this method needs
 * to be re-writen.
 * 
 */
let login = (username, password) => {
    let deferred = q.defer();
    request.post({
        url: endpoints.login,
        form: {
            'user[email]': username,
            'user[password]': password
        }
    }, (error, response, data) => {
        //Either because there was an exception or the statusCode is not successful.
        if (error || response.statusCode != 200 || !response.headers['set-cookie']) {
            return deferred.reject(error || response.statusCode);
        }
        let logInformation = {}
        data = JSON.parse(data.toString());
        logInformation.cookie = helper.parseCookies(response.headers['set-cookie']);
        logInformation.authenticityToken = helper.getAuthenticationToken(data);
        logInformation.user = data['current_user'];
        deferred.resolve(logInformation);
    })
    return deferred.promise;
}

module.exports = login;