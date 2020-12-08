//neccessary packages
var rp = require('request-promise');
var cheerio = require('cheerio')

//arrays for the different things
var mainCategories = []
var subMenuUrls = []
var subItems = []

//this is your order
var order = []

//string declaration for the random submenu
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

        //grabs the submenus
        getSubMenu();

        //grabs the items from the submenu (random at the moment - will select in the future)
        //getItems(randomSub)

        var drinks = subMenuUrls.indexOf(baseURL + '/drinks')

        var drinkUrl = subMenuUrls[drinks];

        getDrink(drinkUrl)
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
            //shows where it go the items from
            subItems.push(randomSub);
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                subItems.push($(this).text());
            });

            console.log(subMenuUrls);          
        })
        .catch(function (err) {
        });
}

var getDrink = function (surl) {
    var subMenu = {
        uri: surl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(subMenu)
        .then(function ($) {
            //shows where it go the items from
            order.push(randomSub);
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                order.push($(this).text());
            });

            console.log(order[Math.floor(Math.random() * order.length)]);          
        })
        .catch(function (err) {
        });
}
