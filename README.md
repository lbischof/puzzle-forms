# Puzzle Forms
Easy webforms with json/hjson. Uses basic auth and ldap for authentication.

## Status
Under construction. Pull requests are appreciated.

## Usage
### Docker
Build: docker build -t forms .
Run: docker run -it --name forms -p 8080:8080 forms

### Templates
Examples are in the forms folder. More infos regarding syntax: [json editor](https://www.npmjs.com/package/json-editor), [markup.js](https://github.com/adammark/Markup.js/)

### Environment variables
DISABLE_AUTH: If this is set the basic auth is disabled
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
