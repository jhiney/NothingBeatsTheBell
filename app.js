var rp = require('request-promise');
var cheerio = require('cheerio')
var items = []

const baseURL = 'https://www.tacobell.com/food';

var getSubMenu = function () {
    items.forEach(function (subMenu) { console.log(subMenu) }) 
}


var mainMenu = {
    uri: baseURL,
    transform: function (body) {
        return cheerio.load(body);
    }
};


rp(mainMenu)
    .then(function ($) {
        // jQuery here

        //this grabs all the hrefs for the items
        
        $(".cls-category-card-item").each(function () {
            items.push($(this).attr('href'));
        });

        /* Just for future reference this grabs all the outter menu item names
        $(".cls-category-card-item .text").each(function () {
            items.push($(this).text());
        }); */
        getSubMenu();
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor buzz bee
    });