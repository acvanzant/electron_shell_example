import BrowserViewManager from './BrowserViewManager';
import BrowserWindowManager from './BrowserWindowManager';
import {app, BrowserWindow, ipcMain, dialog, session } from 'electron';
import * as path from 'path';

let mainWindow : BrowserWindow;
let viewManager = new BrowserViewManager();
let windowManager = new BrowserWindowManager();
let tabList = new Array();

function createWindow() {

  mainWindow = new BrowserWindow(
    {
      width: 800, 
      height: 600, 
      webPreferences: 
      { 
        nodeIntegration: false, 
        contextIsolation: true,
        preload: path.join(__dirname, "../renderer/preload.js") 
      }
    });
    mainWindow.on('close', (e) => {
    windowManager.closeAllBrowserWindow();
  });
  
  mainWindow.loadURL(`file://${__dirname}/../browser/browser.html`);

  let view = viewManager.createNewBrowserView();
  mainWindow.setBrowserView(view);  
  view.setBounds({x: 0, y: 40, width: 800, height: 590});
  view.setAutoResize({width: true, height: true});  
  view.webContents.openDevTools({mode: 'bottom'});
  //view.webContents.loadURL("https://examiners.caps.ua.edu/client");
  view.webContents.loadURL(`file://${__dirname}/../test/test.html`);

  tabList.push({
    title: view.webContents.getTitle(),
    url: view.webContents.getURL(),
    id: view.id
  });

  //Deny requests for permissions to do things, Electron is by default automatically approving all requests.
  session
    .fromPartition('')
    .setPermissionRequestHandler((webContents, permission, callback) => 
    {
      //TODO Prompt, etc.
      callback(false);
    });

  //view.webContents.on('page-title-updated', () => {
  //console.log('page-title-updated');
  //});

  //view.webContents.on('new-window', (event, url, disposition, options, additionalFeatures) => {
  //  event.preventDefault();
  //  let newView = viewManager.createNewBrowserView();
  //  mainWindow.setBrowserView(newView);
  //  newView.setBounds({x: 0, y: 40, width: 800, height: 590});
  //  newView.setAutoResize({widht: true, height: true});
  //  newView.webContents.loadURL(url);
  //  event.newGuest = windowManager.createNewBrowserWindow({show: false});
  //  // We should bind new BrowserWindow because application will be crash if you bind
  //  // current window as newGuest.
  //});
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  viewManager.destroyAllBrowserViews();
  app.quit();
});

ipcMain.on('viewControl', (event: any, args: { action: string; url: string; }) => {
  console.log(args);
  let view = mainWindow.getBrowserView();
  if(view == null)
    return;
  let webContents = view.webContents;
  console.log(webContents.id);
  if(args.action == 'back') {
    if(webContents.canGoBack()) {
      webContents.goBack();
    }
  } else if(args.action == 'forward') {
    if(webContents.canGoForward()) {
      webContents.goForward();
    }
  } else if(args.action == 'load') {
    webContents.loadURL(args.url);
  } else if(args.action == 'reload') {
    webContents.reload();
  }
});

ipcMain.on('showDialog', (event: any, args: any) => {
  console.log(args);
  dialog.showMessageBox({message:args.message});
});

ipcMain.on('viewManage', (event: any, args: { action: string; }) => 
{
  console.log(args);

  if(args.action == 'addNewView') 
  {
    let newView = viewManager.createNewBrowserView();
    mainWindow.setBrowserView(newView);
    newView.setBounds({x: 0, y: 40, width: 800, height: 590});
  } 
  else if(args.action == 'deleteView') 
  {
    if(viewManager.getCount() > 1) 
    {
      let currentView = mainWindow.getBrowserView();
      if(currentView == null)
        return;
      let views = viewManager.getAllViews();
      for(var view of views) {
        if(view.id == currentView.id) {
          continue;
        }
        mainWindow.setBrowserView(view);
        view.setBounds({x: 0, y: 40, width: 800, height: 590});
      }
      viewManager.deleteView(currentView.id);
    }
  }
});