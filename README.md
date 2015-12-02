# Puzzle Forms
Easy webforms with json/hjson. Uses basic auth and ldap for authentication.

## Installing
Requires node 4+

### Templates
Examples are in the forms folder. More infos regarding syntax: [json editor](https://www.npmjs.com/package/json-editor), [markup.js](https://github.com/adammark/Markup.js/)

### Environment variables
PUZZLE_LDAP_HOST_1: The ldap hostname  
PUZZLE_LDAP_BASEDN_MEMBERS: Specify who is allowed to login

## Testing
There are already a few simple tests written with [tape](https://www.npmjs.com/package/tape). "npm test" 

## Libraries
[json editor](https://www.npmjs.com/package/json-editor): create forms with json  
[hjson](https://www.npmjs.com/package/json-editor): json for humans without strict syntax  
[markup.js](https://github.com/adammark/Markup.js/): templating  
[juice](https://www.npmjs.com/package/juice): merge css with html for the emails  
more in package.json
