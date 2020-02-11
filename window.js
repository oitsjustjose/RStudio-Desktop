const Store = require("./store");
const events = require('events');

let themeEmitter = new events.EventEmitter();


let store = new Store({
    configName: "user-preferences",
    defaults: {
        "width": 800,
        "height": 600,
        "x": 0,
        "y": 0,
        "dark": false
    }
});

const isDarkMode = () => {
    return store.get("dark");
};

const toggleDarkMode = () => {
    let original = isDarkMode();
    store.set("dark", !original);
    
    // Emit that we've changed to dark/light
    themeEmitter.emit("changed", !original);
};

const getWindowData = () => {
    return {
        "width": store.get("width"),
        "height": store.get("height"),
        "x": store.get("x"),
        "y": store.get("y"),
        "dark": store.get("dark")
    };
};

const updateWindowCoords = (x, y) => {
    store.set("x", x);
    store.set("y", y);
};

const updateWindowDims = (width, height) => {
    store.set("width", width);
    store.set("height", height);
};

module.exports = {
    "getWindowData": getWindowData,
    "updateWindowCoords": updateWindowCoords,
    "updateWindowDims": updateWindowDims,
    "isDarkMode": isDarkMode,
    "toggleDarkMode": toggleDarkMode,
    "themeEmitter": themeEmitter
};