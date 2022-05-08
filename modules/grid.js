import {maxTriesNumber, allWordsLength } from "./current_words.js";

let chosenCellNumber = 0

function divClickEvents(div){
    div = div.srcElement
    if (div.hasAttribute("chosenCell")){
        div.removeAttribute("chosenCell")
        div.setAttribute("activeRow", true)
    }
    else if (div.hasAttribute("activeRow")){


        const allCells = Array.from(document.querySelectorAll(".inner"))

        
        allCells.forEach((element) => {

            
            if (element.hasAttribute("chosenCell")){
                element.removeAttribute("chosenCell") 
                element.setAttribute("activeRow", true)
                changeChosenCellNumber(null)
            }
        })
    
        div.removeAttribute("activeRow")
        div.setAttribute("chosenCell", true)

        chosenCellNumber = Array.from(document.querySelectorAll('.inner')).indexOf(div)
    }


}

export function gridInit() {
    let gameDiv = document.createElement('div');
    gameDiv.setAttribute('id', 'game');
    let mainDiv = document.createElement('div');
    mainDiv.classList.add("table");
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');


    for (let i = 0; i < maxTriesNumber; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < allWordsLength; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            let div = document.createElement('div');
            div.classList.add('inner');
            td.appendChild(div);
            div.innerHTML = ""
            div.setAttribute("unactiveRow", true)
            div.addEventListener("click", divClickEvents)
        };
        tbody.appendChild(tr);
    };

    table.appendChild(tbody)
    mainDiv.appendChild(table);
    gameDiv.appendChild(mainDiv);
    document.getElementById('body').appendChild(gameDiv);

    Array.from(document.querySelectorAll(".inner")).slice(0, allWordsLength).forEach((element) => {element.setAttribute("activeRow", true); element.removeAttribute('unactiveRow')})
}



export function changeChosenCellNumber (val){
    let allCells = Array.from(document.querySelectorAll(".inner"))
    if (val != null){
        allCells[chosenCellNumber].removeAttribute("chosenCell")
        allCells[chosenCellNumber].setAttribute("activeRow", true)
        chosenCellNumber = val
        allCells[chosenCellNumber].removeAttribute("activeRow")
        allCells[chosenCellNumber].setAttribute("chosenCell", true)
    }
    else{
        allCells[chosenCellNumber].removeAttribute("chosenCell")
        allCells[chosenCellNumber].setAttribute("unactiveRow", true)
        chosenCellNumber = null
    }
}
export {chosenCellNumber}