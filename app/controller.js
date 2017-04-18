var fs         = require("fs");
var path       = require("path");
var async      = require("async");
var nodemailer = require('nodemailer');
var hjson      = require('hjson');
var dto        = require('directory-to-object');
var yaml       = require('js-yaml');

var renderIndex = function(req, res) {
    getForms().then(function(data) {
        res.render('index', {list: data});
    });
}

var getForm = function(req, res) {
    var formPath = path.join('forms', req.params.folder, req.params.file);
    fs.readFile(formPath, 'utf-8', function(err, data) {
        if (err) return res.sendStatus(404);
        res.send(hjson.parse(data));
    });
}


var sendMail = function(req, res) {
    var from    = req.session.email;
    var to      = req.body.to;
    var subject = req.body.subject;
    delete req.body.to;
    delete req.body.subject;
    send({
        from: from,
        to: to,
        cc: from,
        subject: subject,
        html: yaml.safeDump(req.body).replace(/\n/g, '<br>')
    }).then(function() {
        res.send({message: 'Ihr Email wurde versandt. Sie erhalten eine Kopie.'});
    }).catch(function(error){
        console.log(error);
        res.sendStatus(500);
    });
}

var getForms = function() {
    return new Promise(function(resolve, reject) {
        dto('forms', function(err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

var send = function(json) {
    return new Promise(function(resolve, reject) {
        var transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST });
        resolve(transporter.sendMail(json));
    });
}

exports.renderIndex = renderIndex;
exports.getForm     = getForm;
exports.getForms    = getForms;
exports.sendMail    = sendMail;
exports.send        = send;
