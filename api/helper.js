"use strict";

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This module has several helper functions.
 * 
 */

const cheerio = require('cheerio')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')
const usageHelper = require('../usage/usage')

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * Constants to display the records in the best way.
 * If not found will use the information in the record.
 * 
 */
const recordTypes = {
    distance: {
        name: 'Distance',
        messure: 'Meters',
    },
    calories: {
        name: 'Calories',
        messure: 'Calories'
    },
    elevation_gain: {
        name: 'Elevation Gain',
        messure: 'feet'
    }
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method take the cookie on the header and make an array.
 * returns an array of cookies
 * 
 */
let parseCookies = (cookiesToProcess) => {
    let cookies = [];
    if (!cookiesToProcess) {
        return cookie;
    }
    for (var i = 0; i < cookiesToProcess.length; i++) {
        let cookiePartly = cookiesToProcess[i].split(';');
        cookies.push(cookiePartly[0]);
    }
    return cookies;
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method converts the html that the response of the login returns
 * and take the authenticity_token that is kind of a session token.
 * 
 */
let getAuthenticationToken = (data) => {
    let html = cheerio.load(data['update']);
    return html('input[name=authenticity_token]').attr('value');
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method returns the headers that are needed after the login to make a proper request.
 * The parameters are the authenticityToken and also the cookies both ensure the session.
 * 
 */
let createHeaders = (cookies, authenticityToken) => {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
        'Referer': 'https://www.runtastic.com',
        'X-App-Version': '1.0',
        'X-App-Key': 'com.runtastic.ember',
        'X-CSRF-Token': authenticityToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json, text/javascript,	application/vnd.api+json, */*; q=0.01',
        'DNT': 1,
        'Cookie': cookies.join('; ')
    }
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method ensure the parameters in the command line and parse those also. 
 * returning an object with the values.
 * 
 */
let getCommandLineArguments = () => {
    let commandLineOptions = [
        { name: 'username', alias: 'u', type: String },
        { name: 'password', alias: 'p', type: String }
    ];
    return commandLineArgs(commandLineOptions);
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method return the usage when any of the parameters is missing.
 * 
 */
let showCommandLineUsage = () => {
    console.log(getUsage(usageHelper));
}

/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * This method displays a record.
 * 
 */
let displayRecord = (record) => {
    if (!recordTypes[record.record_type]) {
        return console.log(record.record_type + " " + record.value);
    }
    console.log(recordTypes[record.record_type].name + " " + record.value + " " +  recordTypes[record.record_type].messure);
}

module.exports = {
    parseCookies: parseCookies,
    getAuthenticationToken: getAuthenticationToken,
    createHeaders: createHeaders,
    getCommandLineArguments: getCommandLineArguments,
    showCommandLineUsage : showCommandLineUsage,
    displayRecord: displayRecord
};

