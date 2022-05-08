import {gridInit} from './modules/grid.js';
import {Keyboard, keyboardOpen} from './modules/keyboard.js'


window.addEventListener("DOMContentLoaded", function() {

    gridInit();
    Keyboard.init();
    
    Keyboard.open(keyboardOpen.openFunc)
})