var rp = require('request-promise');
var cheerio = require('cheerio')
var mainCategories = []
var subMenuURLS = []

const baseURL = 'https://www.tacobell.com/food';

var mainMenu = {
    uri: baseURL,
    transform: function (body) {
        return cheerio.load(body);
    }
};

//TODO: add another API call for each submenu to get items. Shouldn't need to grab it all at once though - need to think about how I want to grab items.

rp(mainMenu)
    .then(function ($) {
        //this grabs all the hrefs for the mainCategories
        $(".cls-category-card-item").each(function () {
            mainCategories.push($(this).attr('href'));
        });

        /* Just for future reference this grabs all the outter menu item names
        $(".cls-category-card-item .text").each(function () {
            mainCategories.push($(this).text());
        }); */

        //grabs the submenus
        getSubMenu();
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor Buzz bee
    });

var getSubMenu = function () {
    //foreach main category append the base URL and push to an array of the submenus
    mainCategories.forEach(function (subMenu) {
        subMenu = baseURL + subMenu;
        subMenuURLS.push(subMenu);
    })
    console.log(subMenuURLS);
}
