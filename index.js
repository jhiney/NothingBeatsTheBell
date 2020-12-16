var allItems = require('./menuItems.json');
var newItems = [];
var drinks = [];
var combos = [];
var tacos = [];
var entrees = [];
var burritos = [];
var valueMenu = [];
var vegitarian = [];
var breakfast = [];

allItems.forEach((item) => {

    if (item.Menu === 'new') {
        newItems.push({
            Menu: 'New Item',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'drinks') {
        drinks.push({
            Menu: 'Drink',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'deals-and-combos') {
        combos.push({
            Menu: 'Combo',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'tacos') {
        tacos.push({
            Menu: 'Tacos',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'burritos') {
        burritos.push({
            Menu: 'Burritos',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'breakfast') {
        breakfast.push({
            Menu: 'Breakfast',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'cravings-value-menu') {
        valueMenu.push({
            Menu: 'Cravings Value Menu',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
    else if (item.Menu === 'vegetarian') {
        vegitarian.push({
            Menu: 'Vegitarian',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
});

allItems.forEach((item) => {
    if (item.Menu === 'burritos' || item.Menu === 'nachos' || item.Menu === 'tacos' || item.Menu === 'quesadillas' || item.Menu === 'specialties') {
        entrees.push({
            Menu: 'Entrees',
            Item: item.Item,
            Price: item.Price,
            Calories: item.Calories
        })
    }
});

var getNew = () => {
    return newItems[Math.floor(Math.random() * newItems.length)].Item;
};

var getDrink = () => {
    return drinks[Math.floor(Math.random() * newItems.length)].Item;;
}

var getCalories = itemName => {
    var itemCalories = allItems.findIndex((item) => {
         return item.Item === itemName;
    })
    return allItems[itemCalories].Calories;
}

var getPrice = itemName => {
    var itemPrice = allItems.findIndex((item) => {
        return item.Item === itemName;
    })
    return allItems[itemPrice].Price;
}

//module exports
exports.getNew = getNew;

exports.getDrink = getDrink;

exports.getCalories = getCalories;

exports.getPrice = getPrice;
