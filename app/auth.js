var basicAuth = require('basic-auth');
var ldap      = require('ldapjs');
var util      = require('util');

module.exports = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    var ldap_server = 'ldap://' + process.env.LDAP_HOST
    var ldap_dn = util.format('uid=%s,%s', user.name, process.env.LDAP_BASEDN);

    var client = ldap.createClient({
        url: ldap_server,
        timeout: 5000
    });

    client.bind(ldap_dn, user.pass, function(err){
        if (err) {
            return unauthorized(res);
        }
    });

    client.search(ldap_dn, function(err, response) {
        if (err) {
            console.log(err.message);
            return false;
        }
        response.on('searchEntry', function(entry) {
            req.session.email = entry.object.mail;
            next();
        });
    });
}
