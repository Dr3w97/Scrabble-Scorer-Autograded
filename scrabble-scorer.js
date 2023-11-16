// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure)

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question(`Let's play some scrabble! Enter a word: `);
   console.log(oldScrabbleScorer(word))
   return word;
};

let simpleScorer = function simpleScorer(word) {
   word = word.toUpperCase();
   let pointsPerLetter = 0;
   transform(oldPointStructure)
   for (let i = 0; i < word.length; i++) {
      
      for (const pointValue in oldPointStructure){
      
         if (oldPointStructure[pointValue].includes(word[i])) {
         pointsPerLetter += 1
         }  
      }

   }
   return pointsPerLetter;
}
// console.log(simpleScorer('drew'))

let vowelBonusScorer = function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let pointsPerLetter = 0;
   let vowels = ["A","E","I","O","U"]

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure){
      
         if (vowels.includes(word[i])) {
         pointsPerLetter += 3;
         break   
         }  else if (oldPointStructure[pointValue].includes(word[i])) {
         pointsPerLetter += 1;
         break
         }
      }
          
   }
   return pointsPerLetter;
};
// console.log(vowelBonusScorer("drew"))

let scrabbleScorer = function(word) {
   
	word = word.toLowerCase();
	let pointsPerLetter = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const letter in newPointStructure) {
 
		 if (word[i] === letter) {
			pointsPerLetter += newPointStructure[letter[0]]
		 }
      }
      
	}
	return pointsPerLetter;
}
const scoringAlgorithms = [{
   name: 'Simple',
   description: 'One point per letter',
   scorerFunction: simpleScorer
}, {
   name: 'vowel bonus',
   description: 'vowels are worth 3 points',
   scorerFunction: vowelBonusScorer
}, {
   name: 'Scrabble',
   description: 'Uses the scrabble scoring system',
   scorerFunction: scrabbleScorer
}
];

function scorerPrompt() {
   let selectedAlg = input.question(`Choose a scoring algorithm -
   0 - ${scoringAlgorithms[0].name}
   1 - ${scoringAlgorithms[1].name}
   2 - ${scoringAlgorithms[2].name} \n`);
   return scoringAlgorithms[selectedAlg]
};

function transform(oldPointStructure) {
   let newPointStructure = {}
   for (let number in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[number].length; i++) {
         let letter = oldPointStructure[number][i];
         newPointStructure[letter.toLowerCase()] = Number(number);
      }
      
   }
   return  newPointStructure;
};
// console.log(transform(oldPointStructure))
// let newPointStructure = transform(oldPointStructure);

function runProgram() {
   transform(oldPointStructure)
   let word = initialPrompt();
   let scoringAlg = scorerPrompt()
   console.log(scoringAlg.scorerFunction(word))
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
