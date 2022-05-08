import {six_symbol_words, finalWord, allWordsLength, maxTriesNumber} from './current_words.js';
import {chosenCellNumber, changeChosenCellNumber} from './grid.js';

let alt = false

function convertLetters(letter){
    const engLetters = ["Backquote", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight",
                        "Minus", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote",
                        "Enter", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", 'Backspace']
    
    const uaLetters = ["'", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ї",
                        "-", "Ф", "І", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Є",
                        '<i class="material-icons">keyboard_return</i>', "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", '<i class="material-icons">backspace</i>']

    let letters = new Object();



    for (let i in engLetters){
         letters[engLetters[i]] = uaLetters[i]
    }

    let answ = letters[letter]

    if (letter == 'KeyU'){
        if (alt == true) {
            answ = 'Ґ'
        }
    }


    return answ
}

function moveChosenCell(direction){
    const cellsList = Array.from(document.querySelectorAll('.inner'))
    if (direction == 'right'){
        if (cellsList[chosenCellNumber+1] && cellsList[chosenCellNumber+1].hasAttribute("activeRow")){

            // cellsList[chosenCellNumber].removeAttribute("chosenCell")
            // cellsList[chosenCellNumber].setAttribute("activeRow", true)
            // cellsList[chosenCellNumber+1].removeAttribute("activeRow")
            // cellsList[chosenCellNumber+1].setAttribute("chosenCell", true)
            changeChosenCellNumber(chosenCellNumber+1)
        }
        else if(cellsList[Keyboard.properties.words.length * allWordsLength].hasAttribute("activeRow")){

            // cellsList[chosenCellNumber].removeAttribute("chosenCell")
            // cellsList[chosenCellNumber].setAttribute("activeRow", true)
            // cellsList[Keyboard.properties.words.length * allWordsLength].removeAttribute("activeRow")
            // cellsList[Keyboard.properties.words.length * allWordsLength].setAttribute("chosenCell", true)
            changeChosenCellNumber(Keyboard.properties.words.length * allWordsLength)
        }
    
    }
    else if (direction == 'left'){
        if (cellsList[chosenCellNumber-1] && cellsList[chosenCellNumber-1].hasAttribute("activeRow")){

            // cellsList[chosenCellNumber].removeAttribute("chosenCell")
            // cellsList[chosenCellNumber].setAttribute("activeRow", true)
            // cellsList[chosenCellNumber-1].removeAttribute("activeRow")
            // cellsList[chosenCellNumber-1].setAttribute("chosenCell", true)
            changeChosenCellNumber(chosenCellNumber-1)
        }
        else if (cellsList[(Keyboard.properties.words.length+1) * allWordsLength-1].hasAttribute("activeRow")){
            // cellsList[chosenCellNumber].removeAttribute("chosenCell")
            // cellsList[chosenCellNumber].setAttribute("activeRow", true)
            // cellsList[(Keyboard.properties.words.length+1) * allWordsLength-1].removeAttribute("activeRow")
            // cellsList[(Keyboard.properties.words.length+1) * allWordsLength-1].setAttribute("chosenCell", true)
            changeChosenCellNumber((Keyboard.properties.words.length+1) * allWordsLength-1)

        }
    }
}

export const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    
    eventHandlers: {
        oninput: null,
        gameResult: "None"
    },

    properties: {
        value: '',
        words: [],
        endWord: finalWord
    },

    init() {
        this.elements.main = document.createElement("div")
        this.elements.keysContainer = document.createElement("div")


        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

    },

    _changeColorKeys(lastWord, finWord, allKeys) {


        let keyGuesed = []
        let keyFound = []
        let keyUsed = []

        for (let key in lastWord){
            if (lastWord[key] == finWord[key]){
                keyGuesed.push(lastWord[key])
            }
            else if (finWord.includes(lastWord[key])){
                keyFound.push(lastWord[key])
            }
            else{
                keyUsed.push(lastWord[key])
            }
        }

        for (let key in allKeys){

            if (keyGuesed.includes(allKeys[key].innerHTML)){

                if (allKeys[key].hasAttribute("found")){
                    allKeys[key].removeAttribute("found");}
                
                allKeys[key].setAttribute("guesed", 1)
            }
            else if (keyFound.includes(allKeys[key].innerHTML)){
                if (!(allKeys[key].hasAttribute("guesed"))){
                    allKeys[key].setAttribute("found", 1);
                }
            }
            else if(keyUsed.includes(allKeys[key].innerHTML)){
                allKeys[key].setAttribute("used", 1);
            }
        }


    },


    _changeColorCells(lastWord, finWord, allCells, words){

        let cellsGuesed = []
        let cellsFound = []



        for (let keys = (words.length-1)*allWordsLength; keys < words.length*allWordsLength; keys++){
            if (allCells[keys].innerHTML == finWord[keys - (words.length-1)*allWordsLength]){
                cellsGuesed.push(allCells[keys])
            }
            else if(finWord.includes(allCells[keys].innerHTML)){
                cellsFound.push(allCells[keys])
            }
        }

        let cellsGuesedValues = []

        cellsGuesed.forEach(val => cellsGuesedValues.push(val.innerHTML))

        for (let keys in cellsGuesed){
            cellsGuesed[keys].style.background = 'green'
        }



        const countChar = (str) => {
            const counts = {};
            for (const s of str) {
              if (counts[s]) {
                counts[s]++
              } else {
                counts[s] = 1
              }
            }
            return counts;
          }
        
          let counts = countChar(finWord)
          let changedSymbolsString = ""
          let changedCounts = {}

        for (let keys in cellsFound){

            if (!(cellsGuesedValues.includes(cellsFound[keys].innerHTML)) && (changedCounts[cellsFound[keys].innerHTML] < counts[cellsFound[keys].innerHTML] || changedCounts[cellsFound[keys].innerHTML] == undefined)){
                changedSymbolsString+=cellsFound[keys].innerHTML
                changedCounts = countChar(changedSymbolsString)
                cellsFound[keys].style.background = 'rgb(176, 176, 52)'
            }
        }



    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "'", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ї",
            "-" ,"ф", "і", "в", "а", "п", "р", "о", "л", "д", "ж", "є",
            "enter",  "ґ", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "backspace"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["ї", "є", "backspace"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key", "button");

            switch (key) {
                case "backspace":
                    let cellsList = Array.from(document.querySelectorAll(".inner")).slice(this.properties.words.length * allWordsLength , (this.properties.words.length+1) * allWordsLength)
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace")
                    keyElement.addEventListener("click", () => {

                        if (this.eventHandlers.gameResult == "None"){
                            let firstNonEmptyCellIndex = chosenCellNumber
                            for (let i = chosenCellNumber; i >= this.properties.words.length * allWordsLength; i--){
                                if (cellsList[i] && cellsList[i].innerHTML != ""){
                                    firstNonEmptyCellIndex = i
                                    break
                                }
                            }
                            changeChosenCellNumber(firstNonEmptyCellIndex)
                            this.properties.value = ""
                            this._triggerEvent("oninput");
                            if(chosenCellNumber % allWordsLength != 0){
                                moveChosenCell("left")
                            }
                        }
                    });

                    break;
                
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    keyElement.addEventListener("click", () => {
                    
                    let cellsList = Array.from(document.querySelectorAll(".inner")).slice(this.properties.words.length * allWordsLength , (this.properties.words.length+1) * allWordsLength)
                    function combineSymbols (total, nextCell){
                        return total + nextCell.innerHTML
                    }
                    let newWord = cellsList.reduce(combineSymbols, '')

                        if (newWord.length % allWordsLength == 0 && this.eventHandlers.gameResult == "None"){
                            let allKeys = Array.from(document.querySelectorAll('.keyboard__key'));
                            let allCells = Array.from(document.querySelectorAll('.inner'));

                            if (!(this.properties.words.includes(newWord)) && six_symbol_words.includes(newWord.toLowerCase())){
                                this.properties.words.push(newWord);

                                this._changeColorKeys(newWord, this.properties.endWord, allKeys)
                                this._changeColorCells(newWord, this.properties.endWord, allCells, this.properties.words)
                                
                                if (this.properties.words.length != maxTriesNumber){
                                    changeChosenCellNumber(this.properties.words.length * allWordsLength)
                                }
                                else{
                                    this.eventHandlers.gameResult = "fail"
                                    changeChosenCellNumber(null)
                                }
                            }

                            if (newWord == this.properties.endWord){
                                this.eventHandlers.gameResult = "win"
                                allCells.slice((this.properties.words.length-1) * allWordsLength, this.properties.words.length * allWordsLength).forEach((element) => {element.removeAttribute("activeRow"); element.removeAttribute("chosenCell"); element.setAttribute("unactiveRow", 1)})
                                changeChosenCellNumber(null)
                                console.log("You won!")
                            }
                            else{
                                allCells.slice((this.properties.words.length-1) * allWordsLength, this.properties.words.length * allWordsLength).forEach((element) => {element.removeAttribute("activeRow"); element.removeAttribute("chosenCell"); element.setAttribute("unactiveRow", 1)})
                                allCells.slice(this.properties.words.length * allWordsLength, (this.properties.words.length+1) * allWordsLength).forEach((element) => {element.removeAttribute("unactiveRow"); element.removeAttribute("chosenCell"); element.setAttribute("activeRow", 1)})
                            }

                        };
                    });

                    break;
                
                default:
                    let allCells = Array.from(document.querySelectorAll('.inner'));

                    keyElement.textContent = key.toUpperCase();

                    keyElement.addEventListener("click", () => {

                        if (this.eventHandlers.gameResult == "None") {
                            if (allCells[chosenCellNumber].innerHTML == ""){
                                this.properties.value = key.toUpperCase();
                                this._triggerEvent("oninput");
                                if (allCells[chosenCellNumber+1] && (chosenCellNumber+1)%allWordsLength != 0 && allCells[chosenCellNumber+1].innerHTML == ""){
                                    moveChosenCell("right")
                                }
                            }
                            else if(allCells[chosenCellNumber].innerHTML != "" ){
                                if (allCells[chosenCellNumber+1] && (chosenCellNumber+1)%allWordsLength != 0 && allCells[chosenCellNumber+1].innerHTML == ""){
                                    moveChosenCell("right")
                                }
                                this.properties.value = key.toUpperCase();
                                this._triggerEvent("oninput");

                            }                
                            
                        }
                    });
                    

                    break;

            }
            
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;

    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(oninput) {
        this.eventHandlers.oninput = oninput;
    },


};

export const keyboardOpen = {

    // prevValueLength : null,

    openFunc : function (currentValue) {

        let cellsList = Array.from(document.querySelectorAll(".inner"));
        // let valueLength = currentValue.length
        // let prevValueLength = keyboardOpen.prevValueLength;

        if (currentValue == "") {
            cellsList[chosenCellNumber].innerHTML = ""
            // keyboardOpen.prevValueLength = valueLength
        }

        else if (cellsList[chosenCellNumber]){
            cellsList[chosenCellNumber].innerHTML = currentValue
            // keyboardOpen.prevValueLength = valueLength
        }



    }

};



window.addEventListener("keydown", ({ code }) => {
    // console.log(code)
    let buttonsList = Array.from(document.getElementsByClassName("keyboard__key"));
    let cellsList = Array.from(document.querySelectorAll('.inner'))
    let symbol = convertLetters(code)

    for (let i in buttonsList){
        if (symbol == buttonsList[i].innerHTML){

            buttonsList[i].click();
            

            if (buttonsList[i].hasAttribute("guesed")){
                buttonsList[i].style.background = "rgba(55, 186, 59, 0.951)"
            }
            else if (buttonsList[i].hasAttribute("found")){
                buttonsList[i].style.background = "rgb(176, 176, 52)"
            }
            else if (buttonsList[i].hasAttribute("used")){
                buttonsList[i].style.background = "rgb(71, 71, 71)"
            }
            else{
                buttonsList[i].style.background = "rgba(166, 120, 120, 0.7)"
            }


        }
    };

    
    if (code == "ArrowRight" && Keyboard.properties.words.length < maxTriesNumber){
        moveChosenCell("right")
    }

    if (code == "ArrowLeft" && Keyboard.properties.words.length < maxTriesNumber){
        moveChosenCell("left")
    }
    
    if (code == 'AltRight'){
        alt = true
    }
    
    if (code == 'Delete'){
        cellsList.slice(Keyboard.properties.words.length * allWordsLength, (Keyboard.properties.words.length+1) * allWordsLength).forEach((element) => element.innerHTML = "")
        changeChosenCellNumber(Keyboard.properties.words.length * allWordsLength)
    }
    
    if (code == "Space"){
        moveChosenCell("right")
    }

})


window.addEventListener("keyup", ({ code }) => {
    let buttonsList = Array.from(document.getElementsByClassName("keyboard__key button"));
    let symbol = convertLetters(code)

    if (code == "AltRight"){
        alt = false
        buttonsList[26].style.background = ""
}

    for (let i in buttonsList){
        if (symbol == buttonsList[i].innerHTML){


            buttonsList[i].style.background = ""

            
        }
    }

})