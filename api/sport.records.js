"use strict";

const session = require('../services/session')
const helper = require('./helper')
const endpoints = require('./endpoints')
const request = require('request')
const q = require('q')

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method will retrieve all the records for the existing sesion.
 * If the session doesn't exist or is invalid will reject the promise.
 * If the session is valid and the response is valid too will resolve the promise.
 * 
 */
let getRecordsSessions = () => {
    let deferred = q.defer();
    if (session.authenticityToken) {
        let url = endpoints.records.replace('token', session.user.slug);
        request.get({
            url: url,
            headers: helper.createHeaders(session.cookie, session.authenticityToken)
        }, (error, response, data) => {
            deferred.resolve(JSON.parse(data));
        })
        return deferred.promise;
    }
    return q.reject(deferred);
}

module.exports = getRecordsSessions;