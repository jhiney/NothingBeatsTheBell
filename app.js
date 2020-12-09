//neccessary packages
var rp = require('request-promise');
var cheerio = require('cheerio');
const { get } = require('request-promise');

//arrays for the different things
var mainCategories = []
var subMenuUrls = []
var subItems = []


var tempMenu = [];

var order = [];

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
        

        
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked... poor Buzz bee
    });

var getSubMenus = function () {
    //foreach main category append the base URL and push to an array of the submenus
    mainCategories.forEach(function (subMenu) {
        subMenu = subMenu.replace('food/','')
        subMenu = baseURL + subMenu;
        subMenuUrls.push(subMenu);
    })

    //This gets a random submenu, useful for testing
    //randomSub = subMenuUrls[Math.floor(Math.random() * subMenuUrls.length)]; 
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
            tempMenu.push(randomSub);
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                tempMenu.push($(this).text());
            });

            order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);       

        })
        .catch(function (err) {
        });

    
}
function getItem(item) {

    var itemUrl = baseURL + '/' + item

    var itemMenu = {
        uri: itemUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(itemMenu)
        .then(function ($) {          
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                tempMenu.push($(this).text());
                order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);
                
            });
            console.log(10)
        })

        .catch(function (err) {
        }); 

    console.log(5)
}

getItem('drinks')