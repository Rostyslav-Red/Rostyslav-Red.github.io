import {allWords, secret_words_list, regular_words_list} from './words_db.js'

let allWordsLength = 5
let maxTriesNumber = 6

let n_symbol_words = []


// for (let i in allWords){
//     if (allWords[i].length == allWordsLength){
//         n_symbol_words.push(allWords[i])
//     }
// }

// console.log(n_symbol_words)

n_symbol_words = secret_words_list.concat(regular_words_list)

export {n_symbol_words}




function randomNumber(range){
    return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0])
};

//const finalWord = n_symbol_words[randomNumber([0, n_symbol_words.length])].toUpperCase();
const finalWord = secret_words_list[randomNumber([0, secret_words_list.length])].toUpperCase();

// const finalWord = 'КОЗИР'

console.log(finalWord)


export {allWordsLength, maxTriesNumber}

export {finalWord}
