import Bridge from './bridge/bridge';

init();

function init() 
{
    window.Bridge = new Bridge();
}

function doBack()
{
    window.Bridge.back();
}