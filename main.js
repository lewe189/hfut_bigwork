//npm run start启动测试
//npm run build打包，打包后的文件在build文件夹下
const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
//窗口基本属性
let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 500,
        minHeight: 300,
        icon: path.join(__dirname, 'icons', 'lg.ico'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: false, 
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    // 窗口关闭处理
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // 禁用 F12 ，防止用户打开开发者工具来作弊
    globalShortcut.register('F12', () => {
    });
});

// 关闭所有窗口时，使应用退出
app.on('window-all-closed', function () {
    app.quit();
});

// 程序退出前注销全局快捷键
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
