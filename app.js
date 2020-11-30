var rp = require('request-promise');
var cheerio = require('cheerio')


const url = 'https://www.tacobell.com/food';

var options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
        console.log($.html())
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });