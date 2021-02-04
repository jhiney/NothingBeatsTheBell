# Nothing Beats The Bell

[![Downloads](https://badgen.net/npm/dt/nothing-beats-the-bell)](https://www.npmjs.com/package/nothing-beats-the-bell)

A node package made purely for fun, and the desire to Live Mas&reg; in all aspects of life. I make no claims that this is using best practices as I am constantly learning what those are. If you would like to contribute to this package, please let me know.

Install using npm:

 `$ npm install nothing-beats-the-bell`

## Basic Examples:

```javascript
var NBTB = require('nothing-beats-the-bell')

var myTaco = NBTB.getTaco()

console.log(myTaco) //this will output a random taco from Taco Bell's Taco specific menu.
```
If you would like to get a specific item use any of the following:
```javascript 
.getItem('itemName') //this can grab any menu item
.getTaco('itemname') //this will only search through the Tacos
.getBurrito('itemname') //this will only search through the Burritos
```
An upcoming feature I would like to implement is Regex matching on item names, so you don't have to get it exactly right. As it stands right now you have to get the name exact to find your specific item. Any misspellings will result in grabbing a random item off your specified menu instead.

To find out how much your particular item will cost you, or how much it will expand your waistline:
```javascript
var myTaco = NBTB.getTaco()

var myTacoCalories = NBTB.getCalories(myTaco) //.getCalories('itemName') will also work

var myTacoPrice = NBTB.getPrice(myTaco) //.getPrice('itemName') will also work
```

If you would like all of Taco Bell's many offerings:
```javascript
var allItems = NBTB.getAll()

//output:
[
    {
        "Menu": "new",
        "Item": "Toasted Cheddar Chalupa Box",
        "Price": "$5.00",
        "Calories": "1110 Cal"
    },
    {
        "Menu": "tacos",
        "Item": "Soft Taco",
        "Price": "$1.29",
        "Calories": "180 Cal"
    },...
]
```

To create your own "order", feel free to use NBTB's order methods. The naming is the exact same as the [currently supported menus](#currently-supported-menus), without the "get":

```javascript
var order = NBTB.createOrder;

var myOrder = {
    Burrito: order.Burrito(),
    Taco: order.Taco()
    //etc...
    
}

```

Last, but certainly not least, for those who truly want to Live Mas&reg;

```javascript
var livingMas = NBTB.liveMas();
```

## Currently Supported Menus
```javascript
//New and rotating items
.getNew()
//Drinks
.getDrink()
//Tacos and Taco Party Packs
.getTaco()
//Entrees - Tacos, Quesadillas, Burritos, Nachos, and Specialites
.getEntree()
//Burritos
.getBurrito()
//Cravings Value Menu
.getValue()
//Vegitarian Menu Items
.getVegitarian()
//Breakfast Items
.getBreakfast()
```
## Refreshing the Menu (as of 12/16/2020) 

In the `./src` folder is `refresh.js`, running this file will refresh the json file that the module is pulling from. It uses [axios](https://github.com/axios/axios) and [cheerio](https://github.com/cheeriojs/cheerio) to scrape Taco Bell's online menu, found [here](https://www.tacobell.com/food). 

It would be unreasonble to assume that they (Taco Bell) will never change the layout or structure of their online menu, so attempts will be made to modify the refresh file to keep it updated. If there comes a time when this is no longer possible, the most recent version of `menuItems.json` will become the last version of `menuItems.json`.
