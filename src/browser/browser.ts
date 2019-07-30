function back()
{
    if(window)
        window.Bridge.back();
}

function forward()
{
    if(window)
        window.Bridge.forward();
}

function reload()
{
    if(window)
        window.Bridge.reload();
}

function addNewView()
{
    if(window)
        window.Bridge.addNewView();
}

function deleteView()
{
    if(window)
        window.Bridge.deleteView();
}

function load(url:string)
{
    if(window)
        window.Bridge.load(url);
}

function showDialog(message:string)
{
    if(window)
        window.Bridge.showDialog(message);
}