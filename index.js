/**
 * @author: Facundo Merighi (merighifacundo@gmail.com)
 * 
 * Entrypoint for the app.
 * 
 */
const login = require('./api/login')
const records = require('./api/sport.records')
const helper = require('./api/helper')
const session = require('./services/session')

const options = helper.getCommandLineArguments()

if (!options.username || !options.password) {
    return helper.showCommandLineUsage();
}

login(options.username, options.password).then((loggedInInformation) => {
    session.cookie = loggedInInformation.cookie;
    session.user = loggedInInformation.user;
    session.authenticityToken = loggedInInformation.authenticityToken;
    records().then((response) => {
        response.records.forEach((record) => {
            helper.displayRecord(record);
        })
    });
}).catch(error => {
    console.error(error);
});
