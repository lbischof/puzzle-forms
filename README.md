# Puzzle Forms
Easy webforms with json/hjson. Uses basic auth and ldap for authentication.

## Status
Under construction. Pull requests are appreciated.

## Usage
### Docker
Build: docker build -t forms . <br>
Run: docker run -it --rm --name forms -p 8080:8080 -v $(pwd)/forms:/usr/src/forms forms

### Templates
Examples are in the forms folder. More infos regarding syntax: [json editor](https://www.npmjs.com/package/json-editor), [markup.js](https://github.com/adammark/Markup.js/)

### Environment Variables
LDAP_HOST: The ldap hostname<br>
LDAP_BASEDN: Specify who is allowed to login<br>
SMTP_HOST: SMTP host for [nodemailer](https://github.com/andris9/Nodemailer)

## Testing
There are already a few simple tests written with [tape](https://www.npmjs.com/package/tape). "npm test"

## Libraries
[json editor](https://www.npmjs.com/package/json-editor): create forms with json<br>
[hjson](https://www.npmjs.com/package/json-editor): json for humans without strict syntax<br>
[markup.js](https://github.com/adammark/Markup.js/): templating
