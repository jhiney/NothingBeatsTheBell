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
        // jQuery here
        var items = []
        $(".cls-category-card-item .text").each(function () {
            items.push($(this).text());
        });
        console.log(items);


    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor buzz bee
    });