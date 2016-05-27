"use strict";
var test       = require('tape');
var hjson      = require('hjson');
var path       = require('path');
var fakefs     = require('fake-fs');
fakefs         = new fakefs;
var fs         = require('fs');
var rewire     = require('rewire');
var controller = rewire('../app/controller');


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
