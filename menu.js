const Window = require("./window");

const getTemplate = (platform) => {
    if (platform != "darwin") {
        return [{
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            },
            {
                type: 'separator'
            },
            {
                label: "Dark Mode",
                type: "checkbox",
                checked: Window.isDarkMode(),
                click: () => {
                    Window.toggleDarkMode();
                }
            }]
        },
        {
            label: 'View',
            submenu: [{
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
            ]
        },
        {
            label: 'Go',
            submenu: [{
                role: 'reload'
            }, {
                role: 'forcereload'
            }]
        }];
    } else {
        return [{
            label: 'RStudio Desktop',
            submenu: [{
                label: 'About RStudio Desktop',
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
            ]
        },
        {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            },
            {
                type: 'separator'
            },
            {
                label: "Dark Mode",
                type: "checkbox",
                checked: Window.isDarkMode(),
                click: () => {
                    Window.toggleDarkMode();
                }
            }]
        },
        {
            label: 'View',
            submenu: [{
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
            ]
        },
        {
            label: 'Go',
            submenu: [{
                role: 'reload'
            }, {
                role: 'forcereload'
            }]
        },
        {
            label: 'Window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                selector: 'performMiniaturize:'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                selector: 'performClose:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }
            ]
        }];
    }
};

module.exports = getTemplate;