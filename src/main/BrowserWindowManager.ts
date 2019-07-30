import { BrowserWindow } from 'electron';

export default class BrowserWindowManager 
{
    windows: Map<number, BrowserWindow> = new Map();

    constructor() {  }
      
    public createNewBrowserWindow(args: Electron.BrowserWindowConstructorOptions | undefined) 
    {
        let window = new BrowserWindow(args);
        this.windows.set(window.id, window);
        return window;
    }
    
    getCount() {
        return this.windows.size;
    }

    getWindow(id:number) {
        return this.windows.get(id);
    }

    public closeAllBrowserWindow() {
        for(let [key, window] of this.windows) {
            console.log("on closeAllBrowserWindow: key = " + key);
            window.close();
        }   
    }
}