var rp = require('request-promise');
var cheerio = require('cheerio')


const url = 'https://www.tacobell.com/food';

var getSubMenu = function (subMenuRef) {

}


var options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};




rp(options)
    .then(function ($) {
        // jQuery here

        //this grabs all the hrefs for the items
        var items = []
        $(".cls-category-card-item").each(function () {
            items.push($(this).attr('href'));
        });

        /* Just for future reference this grabs all the outter menu item names
        $(".cls-category-card-item .text").each(function () {
            items.push($(this).text());
        });
        */

        
        items.forEach(function (subMenu) { console.log(subMenu) }) 

    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor buzz bee
    });