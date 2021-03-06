var allItems = require('./data/menuItems.json');
var newItems = [], drinks = [], combos = [], tacos = [], entrees = [], burritos = [], valueMenu = [], vegitarian = [], breakfast = [];

//These two loops split up the master menu into their relaitve submenus
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

//Returns everything
var getAll = () => { return allItems }

//All the below get% returns a random menu item from the specific menu, unless an item is passed in which case it tries to match the item/
var getNew = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = newItems.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return newItems[specificItemIndex].Item;
        }
        else {
            return newItems[Math.floor(Math.random() * newItems.length)].Item;
        }
    }
};

var getTaco = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = tacos.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return tacos[specificItemIndex].Item;
        }
        else {
            return tacos[Math.floor(Math.random() * tacos.length)].Item;
        }
    }
}

var getEntree = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = entrees.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return entrees[specificItemIndex].Item;
        }
        else {
            return entrees[Math.floor(Math.random() * entrees.length)].Item;
        }
    }
}

var getBurrito = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = burritos.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return burritos[specificItemIndex].Item;
        }
        else {
            return burritos[Math.floor(Math.random() * burritos.length)].Item;
        }
    }
}

var getValue = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = valueMenu.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return valueMenu[specificItemIndex].Item;
        }
        else {
            return valueMenu[Math.floor(Math.random() * valueMenu.length)].Item;
        }
    }
}

var getVegitarian = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = vegitarian.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return vegitarian[specificItemIndex].Item;
        }
        else {
            return vegitarian[Math.floor(Math.random() * vegitarian.length)].Item;
        }
    }
}

var getBreakfast = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = breakfast.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return breakfast[specificItemIndex].Item;
        }
        else {
            return breakfast[Math.floor(Math.random() * breakfast.length)].Item;
        }
    }
}

var getDrink = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = drinks.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return drinks[specificItemIndex].Item;
        }
        else {
            return drinks[Math.floor(Math.random() * drinks.length)].Item;
        }
    }
}

var getItem = (itemName = 'nothing') => {
    if (itemName) {
        var specificItemIndex = allItems.findIndex((item) => {
            return item.Item === itemName;
        })
        if (specificItemIndex > -1) {
            return allItems[specificItemIndex].Item;
        }
        else {
            return allItems[Math.floor(Math.random() * allItems.length)].Item;
        }
    }
}

//Gets the calories of a specified item  - returns and error if the paramters are blank
var getCalories = itemName => {
    try {
        var itemCalories = allItems.findIndex((item) => {
            return item.Item === itemName;
        })
        return allItems[itemCalories].Calories;
    }
    catch (e) {
        return 'Invalid item name - Cannot pass \'\' as parameters'
    }
}

//Gets the price of a specified item  - returns and error if the paramters are blank
var getPrice = itemName => {
    try {
        var itemPrice = allItems.findIndex((item) => {
            return item.Item === itemName;
        })
        return allItems[itemPrice].Price;
    }
    catch (e) {
        return 'Invalid item name - Cannot pass \'\' as parameters'
    }
}

//Order "system"
var createOrder  = {
    Entree: (itemName = 'nothing') => getEntree(itemName),
    newItem: (itemName = 'nothing') => getNew(itemName),
    Drink: (itemName = 'nothing') => getDrink(itemName),
    Taco: (itemName = 'nothing') => getTaco(itemName),
    Burrito: (itemName = 'nothing') => getBurrito(itemName),
    ValueMenu: (itemName = 'nothing') => getValue(itemName),
    Vegitarian: (itemName = 'nothing') => getVegitarian(itemName),
    Breakfast: (itemName = 'nothing') => getBreakfast(itemName)
};

//Gets one of every item and returns it as an object
var liveMas = () => {
    var mas = {
        newItem: getNew(),
        Drink: getDrink(),
        Taco: getTaco(),
        Entree: getEntree(),
        Burrito: getBurrito(),
        ValueMenu: getValue(),
        Vegitarian: getVegitarian(),
        Breakfast: getBreakfast()
    }
    return mas;
}
//TODO: Make the exports a little cleaner

//Module Exports----------------------

//Menu Exports
exports.getNew = getNew;
exports.getDrink = getDrink;
exports.getTaco = getTaco;
exports.getEntree = getEntree;
exports.getBurrito = getBurrito;
exports.getValue = getValue;
exports.getVegitarian = getVegitarian;
exports.getBreakfast = getBreakfast;
exports.getItem = getItem;

//Random Exports
exports.createOrder = createOrder;
exports.liveMas = liveMas;

//Descriptive Exports
exports.getCalories = getCalories;
exports.getPrice = getPrice;

//Exports the whole menu
exports.getAll = getAll;