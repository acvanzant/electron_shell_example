interface Bridge 
{
    back(),
    forward(),
    reload(),
    addNewView(),
    deleteView(),
    load(url:string);
    showDialog(message:string);
}