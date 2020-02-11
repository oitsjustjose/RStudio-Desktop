const electron = require('electron');
const path = require('path');
const shell = require('electron').shell;
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const contextMenu = require('electron-context-menu');

const getTemplate = require('./menu');
const updateWindowCoords = require("./window.js").updateWindowCoords;
const updateWindowDims = require("./window.js").updateWindowDims;
const getWindowData = require("./window.js").getWindowData;
const isDarkMode = require("./window.js").isDarkMode;
const themeEvents = require("./window.js").themeEmitter;

let mainWindow;

const createWindow = () => {
    let windowMeta = getWindowData();

    mainWindow = new BrowserWindow({
        title: 'RStudio Desktop',
        width: windowMeta.width,
        height: windowMeta.height,
        x: windowMeta.x,
        y: windowMeta.y,
        frame: process.platform != "darwin",
        titleBarStyle: process.platform == "darwin" ? 'hidden' : 'default',
        icon: path.join(__dirname, 'assets', 'icons', 'png', 'RStudio.png'),
        show: process.platform != "darwin",
        webPreferences: {
            nodeIntegration: false,
            nativeWindowOpen: true,
            preload: path.join(__dirname, 'preload')
        },
        transparent: process.platform == "darwin"
    });

    mainWindow.loadURL("https://rstudio.cloud/");

    mainWindow.webContents.on('dom-ready', () => {
        addCustomCSS(mainWindow);
    });

    mainWindow.webContents.on('new-window', (e, url) => {
        e.preventDefault();
        if (url.indexOf("https://rstudio.cloud/") != -1) {
            mainWindow.loadURL(url);
            addCustomCSS(mainWindow);
            mainWindow.webContents.session.flushStorageData();
        } else {
            shell.openExternal(url);
        }
    });

    mainWindow.on("move", (event) => {
        var bounds = mainWindow.getBounds();
        updateWindowCoords(bounds.x, bounds.y);
    });

    mainWindow.on("resize", (event) => {
        var bounds = mainWindow.getBounds();
        updateWindowDims(bounds.width, bounds.height);
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });
};

const addCustomCSS = (windowElement) => {
    platform = process.platform == "darwin" ? "macos" : "";
    windowElement.webContents.insertCSS(
        fs.readFileSync(path.join(__dirname, 'assets', 'css', 'style.css'), 'utf8')
    );

    const platformCSSFile = path.join(
        __dirname,
        'assets',
        'css',
        `style.${platform}.css`
    );

    if (fs.existsSync(platformCSSFile)) {
        windowElement.webContents.insertCSS(
            fs.readFileSync(platformCSSFile, 'utf8')
        );
    }

    if (isDarkMode()) {
        windowElement.webContents.insertCSS(
            fs.readFileSync(path.join(__dirname, 'assets', 'css', 'dark.css'), 'utf8')
        );
    }
};

const init = () => {
    app.setName("RStudio Desktop");

    app.on('window-all-closed', () => {
        mainWindow.webContents.session.flushStorageData();
        mainWindow = null;
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on('before-quit', (event) => {
        mainWindow.webContents.session.flushStorageData();
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
            // Dynamically pick a menu-type
            let template = getTemplate(process.platform);
            let menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        }
    });

    app.on('ready', () => {
        if (app.isPackaged) {
            contextMenu({
                shouldShowMenu: true
            });
        } else {
            contextMenu({
                shouldShowMenu: true,
                showInspectElement: true
            });
        }

        if (process.platform == "darwin") {
            app.dock.bounce("critical");
        }
        createWindow();

        // Dynamically pick a menu-type
        let template = getTemplate(process.platform);
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });

    themeEvents.on("changed", (newMode) => {
        console.log(`New mode is ${newMode}`);
        // alert("Restarting to apply changes!");
        if (mainWindow != null) {
            mainWindow.close();
            createWindow();
        }
    });
};

init();