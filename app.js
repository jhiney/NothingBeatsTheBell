//neccessary packages
var cheerio = require('cheerio');
let axios = require('axios')
let fs = require('fs')

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

    await axios.get(baseURL)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                $(".cls-category-card-item").each(function () {
                    mainCategories.push($(this).attr('href'));
                });
            }
        }, (error) => console.log(error));
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

    await axios.get(surl)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                //shows where it go the items from
                subItems.push(randomSub);
                //.class #id tag
                $(".product-card .product-name a").each(function () {
                    subItems.push($(this).text());
                }); 
            }
        }, (error) => console.log(error));
}

async function getDrinks(surl) {

    await axios.get(surl)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                //shows where it go the items from
                tempMenu.push(randomSub);
                //.class #id tag
                $(".product-card .product-name a").each(function () {
                    tempMenu.push($(this).text());
                });

                order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);

                //clear the temp menu for speed
                tempMenu = []
            }
        }, (error) => console.log(error));

}

async function getItem(item) {

    var itemUrl = baseURL + '/' + item

    await axios.get(itemUrl)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                $(".product-card .product-name a").each(function(i) {
                    tempMenu[i] = {
                        Menu: item,
                        Item: $(this).text()
                    }

                    //tempMenu.push($(this).text());
                });
                //add a random item to your order
                order.push(tempMenu[Math.floor(Math.random() * tempMenu.length)]);

                //clear the temp menu for speed
                tempMenu = []
            }
        }, (error) => console.log(error));
}

async function start() {

    await getItem('drinks')
    await getItem('tacos')

    /* You need all 3 to use getItems - TODO: Change this so it doesn't require
    await getMainMenu()
    await getSubMenus()
    await getItems(randomSub)
    */

    //testing
    console.log(order.item);
    
}

start();