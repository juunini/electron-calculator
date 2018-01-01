var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './dist/calculator-win32-x64',
    outputDirectory: './dist/calculator-setup',
    exe: 'calculator.exe',
    setupExe: 'Setup.exe'
});

resultPromise.then(function () {
    console.log("It worked!");
}, function (e) {
    console.log('No dice: ' + e.message);
});
