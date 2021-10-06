const {app, BrowserWindow} = require('electron');
const path = require('path')

// This function initializes and loads a BrowserWindow of dimensions 1200x800px
const loadMainWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 600,
		height: 800,
		center: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadFile(path.join(__dirname, "index.html"))
}

// Once app is ready, run loadMainWindow function
app.on("ready", loadMainWindow);

app.on("windows-all-closed", () => {
	if(process.platform !== "darwin"){
		app.quit();
	}
});

app.on("activate", () => {
	if(BrowserWindow.getAllWindows() == 0){
		loadMainWindow();
	}
});