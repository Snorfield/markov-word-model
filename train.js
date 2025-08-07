const fileSystem = require('fs');

if (!fileSystem.existsSync('./markovModelData.json')) {
    console.log('Could not find data file to train on.');
    process.exit(1);
} else {
    console.log('Data file found. Loading.');
}

let words = require('./markovModelData.json')

let filePath = './model.json'

if (!fileSystem.existsSync(filePath)) {
    fileSystem.writeFileSync(filePath, '{}');
    console.log('Could not find model file. Model file created.');
} else {
    console.log('Model file found. Loading.');
}

let model = require(filePath);

console.log('Loaded.');
console.log('Training started.')
console.time('train');

function train() {

    for (let i = 0; i < words.length; i++) {

        let word = words[i];

        if (word.length < 2) continue;

        for (let n = 0; n < word.length - 1; n++) {

            let first = word[n]
            let second = word[n + 1]

            if (!(first in model)) {
                model[first] = [];
            }

            model[first].push(second)
        }
    }
}

train();

console.timeEnd('train');

console.log("Training complete with " + words.length + " words trained on");
console.log("Model now has " + Object.keys(model).length + " connections.");

fileSystem.writeFileSync(filePath, JSON.stringify(model, null, 2));