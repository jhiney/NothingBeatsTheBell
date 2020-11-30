const rp = require('request-promise');
const url = 'https://www.tacobell.com/food';

rp(url)
    .then(function (html) {
        //success!
        console.log(html);
    })
    .catch(function (err) {
        //handle error
    });