// Default word length

let wordLength = 5;

// Default starting phrase (can be letter or word)

let startingPhrase = 'a'

// Get command line args, order is "node file.js wordLength startingPhrase"

let args = process.argv.slice(2);

if (args.length > 1) {
    wordLength = args[0];
    startingPhrase = args[1];
}


let filePath = './model.json'

const fileSystem = require('fs');

// Exit program if it can't find a model file, otherwise load model file

if (!fileSystem.existsSync(filePath)) {
    console.log('Could not find model file.');
    process.exit(1);
} else {
    console.log('Model file found. Loading.');
}

let model = require(filePath);

console.log('Loaded.');

function markov(letter) {
    if (!(model[letter])) return '';
    let index = model[letter];
    return index[Math.floor(Math.random() * index.length)];
}

function generate(seed, length) {
    let letter = seed[seed.length - 1];
    let output = seed;
    for (let i = 0; i < length; i++) {
        letter = markov(letter);
        output += letter;
    }
    return output;
}


for (let i = 0; i < 100; i++) {
    console.log(generate(startingPhrase, wordLength));
}