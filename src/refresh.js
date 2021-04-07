//neccessary packages
var cheerio = require("cheerio");
let axios = require("axios");
let fs = require("fs");

//arrays for the different things
var firstFilter = [];
var mainCategories = [];
var subItems = [];

//taco bell baseURL
const baseURL = "https://www.tacobell.com/food";
const baseURLNoFood = "https://www.tacobell.com";

async function getMainMenu() {
  await axios.get(baseURL).then(
    (response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        
        //Grab the href in each <a> tag on the page
        const item = [];
        $("a").each(function () {
          item.push($(this).attr("href"));
        });
        
        //remove all the unneccessary href that don't link to submenus
        item.forEach((e) => {
          if (e.startsWith("/food/")) {
            firstFilter.push(e);
          }
        });
        
        /**
         * This filters out any href with more than 2 '/' because that means they link to specific items and not submenus
         * TODO #9: Edit RegEx to not need the "else"
         */
        firstFilter.forEach((e) => {
          if ((e.match(new RegExp("/", "g")) || []).length > 2) {
          } else {
            mainCategories.push(e);
          }
        });
      }

      //Filter for only unique submenus - some are repeated on the homepage for some reason
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      mainCategories = mainCategories.filter(onlyUnique);
    },
    (error) => console.log(error)
  );
}

async function mainToJson() {
  await getMainMenu();

  for (var categories of mainCategories) {
    categories = baseURLNoFood + categories;
    await getItems(categories);
  }
}

//surl is Sub Menu URL
async function getItems(surl) {
  var menu = surl.replace("https://www.tacobell.com/food/", "");
  await axios.get(surl).then(
    (response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".product-card .product-details").each(function (i) {
          subItems.push({
            Menu: menu,
            Item: $(this).children(".product-name").find("a").text(),
            Price: $(this).children(".product-price").text().trim(),
            Calories: $(this).children(".product-calorie").text().trim(),
          });
        });
      }

      fs.writeFile("menuItems.json", JSON.stringify(subItems, null, 4), (err) =>
        console.log("File successfully written!")
      );
    },
    (error) => console.log(error)
  );
}

async function start() {
  await mainToJson();
}

start();
