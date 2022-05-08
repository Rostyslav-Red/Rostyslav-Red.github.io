import {allWords} from './words_db.js'

let allWordsLength = 5
let maxTriesNumber = 6

let currentLength_words = []


for (let i in allWords){
    if (allWords[i].length == allWordsLength){
        currentLength_words.push(allWords[i])
    }
}

// console.log(currentLength_words)

export {currentLength_words as six_symbol_words}




function randomNumber(range){
    return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0])
};

const finalWord = currentLength_words[randomNumber([0, currentLength_words.length])].toUpperCase();

console.log(finalWord)


export {allWordsLength, maxTriesNumber}

export {finalWord}
