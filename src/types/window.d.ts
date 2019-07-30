//Extend existing global::Window, adding our Bridge object.
interface Window {
    Bridge: Bridge;
}
  
declare var window: Window;