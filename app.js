//neccessary packages
var rp = require('request-promise');
var cheerio = require('cheerio')

//arrays for the different things
var mainCategories = []
var subMenuUrls = []
var subItems = []

//string declaration
var randomSub = '';

//taco bell baseURL
const baseURL = 'https://www.tacobell.com/food';

var mainMenu = {
    uri: baseURL,
    transform: function (body) {
        return cheerio.load(body);
    }
};

//TODO: Replace random selection with user selection

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

        //grabs the items from the submenu (random at the moment - will select in the future)
        getItems(randomSub)
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor Buzz bee
    });

var getSubMenu = function () {
    //foreach main category append the base URL and push to an array of the submenus
    mainCategories.forEach(function (subMenu) {
        subMenu = subMenu.replace('food/','')
        subMenu = baseURL + subMenu;
        subMenuUrls.push(subMenu);
    })

    randomSub = subMenuUrls[Math.floor(Math.random() * subMenuUrls.length)]; 
}
//surl is Sub Menu URL
var getItems = function (surl) {
    var subMenu = {
        uri: surl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(subMenu)
        .then(function ($) {
            $(".product-card .product-name a").each(function () {
                subItems.push($(this).text());
            });

            console.log(subItems);

        })
        .catch(function (err) {
        });
}

