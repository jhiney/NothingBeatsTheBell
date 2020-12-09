//neccessary packages
var rp = require('request-promise');
var cheerio = require('cheerio');

//arrays for the different things
var mainCategories = []
var subMenuUrls = []
var subItems = []

//stores all items of a particular submenu to then be placed in an order
var tempMenu = [];

//this is what will be output. Live Mas
var order = [];

//string declaration for the random submenu
var randomSub = '';

//taco bell baseURL
const baseURL = 'https://www.tacobell.com/food';


async function getMainMenu() {

    var mainMenu = {
        uri: baseURL,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    //TODO: Replace random selection with user selection
    await rp(mainMenu)
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
}

var getSubMenus = function () {
    //foreach main category append the base URL and push to an array of the submenus
    mainCategories.forEach(function (subMenu) {
        subMenu = subMenu.replace('food/','')
        subMenu = baseURL + subMenu;
        subMenuUrls.push(subMenu);
    })

    //This gets a random submenu, useful for testing
    randomSub = subMenuUrls[Math.floor(Math.random() * subMenuUrls.length)]; 
}
//surl is Sub Menu URL
async function getItems(surl) {
    var subMenu = {
        uri: surl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await rp(subMenu)
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
async function getDrinks(surl) {

    var subMenu = {
        uri: surl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await rp(subMenu)
        .then(function ($) {
            //shows where it go the items from
            tempMenu.push(randomSub);
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                tempMenu.push($(this).text());
            });

            order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);       

            //clear the temp menu for speed
            tempMenu = []
        })
        .catch(function (err) {
        });
}

async function getItem(item) {

    var itemUrl = baseURL + '/' + item

    var itemMenu = {
        uri: itemUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await rp(itemMenu)
        .then(function ($) {          
            //.class #id tag
            $(".product-card .product-name a").each(function () {
                tempMenu.push($(this).text());
            });
            //add a random item to your order
            order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);

            //clear the temp menu for speed
            tempMenu = []
        })

        .catch(function (err) {
        }); 
}

async function start() {

    getItem('drinks')
    getItem('tacos')

    //Only need 1 await but it has to be on the last async function call
    await getMainMenu()

    //testing
    console.log(order);
    console.log(mainCategories)
}

// Call start
start();