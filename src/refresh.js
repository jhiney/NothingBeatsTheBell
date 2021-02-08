//neccessary packages
var cheerio = require('cheerio');
let axios = require('axios')
let fs = require('fs')

//arrays for the different things
var mainCategories = []
var subItems = []

//taco bell baseURL
const baseURL = 'https://www.tacobell.com/food';
const baseURLNoFood = 'https://www.tacobell.com';

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

async function mainToJson() {

    await getMainMenu()

    for (var categories of mainCategories) {
        categories = baseURLNoFood + categories;
        await getItems(categories)
        //console.log(categories)
    }
}

//surl is Sub Menu URL
async function getItems(surl) {
    var menu = surl.replace('https://www.tacobell.com/food/', '')
    await axios.get(surl)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
               
                $(".product-card .product-details").each(function (i) {
                    subItems.push( {
                        Menu: menu,
                        Item: $(this).children('.product-name').find('a').text(),
                        Price: $(this).children('.product-price').text().trim(),
                        Calories: $(this).children('.product-calorie').text().trim()
                    })
                });           
            }
            fs.writeFile('menuItems.json',
                JSON.stringify(subItems, null, 4),
                (err) => console.log('File successfully written!'))
        
        }, (error) => console.log(error));
}

async function start() {
    await mainToJson()
}

start()
