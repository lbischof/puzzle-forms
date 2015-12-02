var fs         = require("fs");
var path       = require("path");
var async      = require("async");
var jsdom      = require('jsdom');
var juice      = require('juice');
var nodemailer = require('nodemailer');
var hjson      = require('hjson');
var dto        = require('directory-to-object');
var pretty     = require('json-human');


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
    createHtml(req.body)
        .then(addStyles)
        .then(function(html) {
            return {
                from: from,
                to: to,
                cc: from,
                subject: subject,
                html: html
            }
        })
        .then(send)
        .then(function() {
            res.send({message: 'Ihr Email wurde versandt. Sie erhalten eine Kopie.'});
        }).catch(function(){
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

var createHtml = function(json) {
    return new Promise(function(resolve, reject) {
        document = jsdom.jsdom();
        resolve(pretty.format(json).outerHTML);
    });
}

var addStyles = function(html) {
    return new Promise(function(resolve, reject) { 
        fs.readFile('email.css', 'utf-8', function(err, data) {
            resolve(juice.inlineContent(html, data));
        });
    });
}

var send = function(json) {
    return new Promise(function(resolve, reject) {
        var transporter = nodemailer.createTransport({host: 'mail.puzzle.ch'});
        resolve(transporter.sendMail(json));
    });
}

exports.renderIndex = renderIndex;
exports.getForm     = getForm;
exports.getForms    = getForms;
exports.sendMail    = sendMail;
exports.createHtml  = createHtml;
exports.addStyles   = addStyles;
exports.send        = send;
