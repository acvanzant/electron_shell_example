import {BrowserView} from 'electron';
import * as path from 'path';

export default class BrowserViewManager {

    views : Map<number, BrowserView> = new Map();

    constructor(){   }

    public createNewBrowserView() 
    {
        let view = new BrowserView({
            webPreferences: {
            nodeIntegration: false,
            webviewTag: true,
            preload: path.join(__dirname, "../renderer/preload.js")
            }
        });

        this.views.set(view.id, view);
        return view;
    }

    public getCount() {
        return this.views.size;
    }

    public getView(id:number) {
        return this.views.get(id);
    }

    public getAllViews() {
        return this.views.values();
    }

    public deleteView(id:number) {
        let view = this.views.get(id);

        if(view == undefined)
            return;

        view.destroy();
        this.views.delete(id);
    }

    public destroyAllBrowserViews() {
        for(let [key, view] of this.views) {
            view.destroy();
        }
    }
}