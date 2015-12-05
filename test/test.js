"use strict";
var test       = require('tape');
var hjson      = require('hjson');
var path       = require('path');
var fakefs     = require('fake-fs');
fakefs         = new fakefs;
var fs         = require('fs');
var rewire     = require('rewire');
var controller = rewire('../app/controller');

test('Create html from json', function(t) {
    var should = '<table class="jh-type-object jh-root"><tbody><tr><th class="jh-key jh-object-key">test</th><td class="jh-value jh-object-value"><span class="jh-type-string">test</span></td></tr></tbody></table>';
    controller.createHtml({test: 'test'}).then(function(html) {
        t.equal(should, html);
    });
    t.end()
});

test('Add styles to html', function(t) {
    var should = '<span style="color: red;">test</span>';
    var html = '<span>test</span>';
    var fsMock = {
        readFile: function(path, encoding, cb) {
            t.equal(path, 'app/static/email.css', "check if correct file is read");
            cb(null, "span { color: red; }");
        }
    }
    controller.__set__("fs", fsMock);
    controller.addStyles(html).then(function(data) {
        t.equal(should, data, "returns html with inline styles");
        t.end();
    });
});

test('Check forms syntax', function(t){
    controller.getForms().then(function(data) {
        // loop all folders
        for (var folder in data) {
            // loop the files in the folder
            for (var file in data[folder]) {
                // concat the form path
                let formPath = path.join('forms',folder,data[folder][file]);
                // read the json file
                fs.readFile(formPath, 'utf-8', function(err, content) {
                    let parsed;
                    // check if json is valid
                    t.doesNotThrow(function() {
                        parsed = hjson.parse(content);
                    }, Object, formPath);
                    // check if 'to' key exists
                    t.ok(parsed.properties.hasOwnProperty('to'), formPath + " must have 'to' property");
                    // check if 'subject' key exists
                    t.ok(parsed.properties.hasOwnProperty('subject'), formPath + " must have 'subject' property");
                });
            }
        }
        t.end();
    });
});
