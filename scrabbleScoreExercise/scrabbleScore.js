// Programme: takes each letter of string input and saves it in an array
//loops through each letter, saves corresponding score for the letter
// scores are then summed up and scrabble score is displayed back to user
'use strict'

const score1 = ['a', 'e','i','o','u', 'l','n','r','s','t'];
const score2 = ['d','g'];
const score3 = ['b', 'c','m','p'];
const score4 = ['f','h','v','w','y'];
const score5 = ['k'];
const score8 = ['j','x'];
const score10 = ['q','z'];

let scrabbleWord = prompt('Enter your scrabble word: ').toLowerCase();
console.log(scrabbleWord);

const scrabbleLetters = [];
const scrabbleLetterScores = [];

for (let i = 0; i<scrabbleWord.length; i++){
    const letter = scrabbleWord[i]
    scrabbleLetters.push(letter);
}

for (let i = 0; i<scrabbleLetters.length; i++) {
    if (score1.includes(scrabbleLetters[i])){
        const numberScore = 1
        scrabbleLetterScores.push(numberScore);

    } else if(score2.includes(scrabbleLetters[i])){
        const numberScore = 2
        scrabbleLetterScores.push(numberScore);

    } else if(score3.includes(scrabbleLetters[i])){
        const numberScore = 3
        scrabbleLetterScores.push(numberScore);

    } else if(score4.includes(scrabbleLetters[i])){
        const numberScore = 4
        scrabbleLetterScores.push(numberScore);
        
    } else if(score5.includes(scrabbleLetters[i])){
        const numberScore = 5
        scrabbleLetterScores.push(numberScore);
        
    } else if(score8.includes(scrabbleLetters[i])){
        const numberScore = 8
        scrabbleLetterScores.push(numberScore);
        
    }
    else if(score10.includes(scrabbleLetters[i])){
        const numberScore = 10
        scrabbleLetterScores.push(numberScore);
        
    } else {
        console.log(`Input "${letter}" is not a valid input`)
    }

}

let scrabbleWordSum = 0;

for (let i = 0; i <scrabbleLetterScores.length; i++) {
    scrabbleWordSum += scrabbleLetterScores[i];
   
}

console.log(`Score for each letter: ${scrabbleLetterScores}`);
console.log(`Your scrabble score is: ${scrabbleWordSum}`);        
