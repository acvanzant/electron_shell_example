import {ipcRenderer, remote} from 'electron';

export default class Bridge implements Bridge
{
    constructor() {  }
      
    public back() {
        ipcRenderer.send('viewControl', {action: 'back'});
    }
    
    public forward() {
        ipcRenderer.send('viewControl', {action: 'forward'});
    }
    
    public reload() {
        ipcRenderer.send('viewControl', {action: 'reload'});
    }
    
    public addNewView() {
        ipcRenderer.send('viewManage', {action: 'addNewView'});
    }
    
    public deleteView() {
        ipcRenderer.send('viewManage', {action: 'deleteView'});
    }
    
    public load(url: string) {
        ipcRenderer.send('viewControl', {action: 'load', url: url});
    }
    
    public showDialog(message:string)
    {
        remote.dialog.showMessageBox({message: message});
    }
}