let fileSystem = require('fs');

let filePath = './markovModelData.json';

if (!fileSystem.existsSync(filePath)) {

    // Creates empty json file if it can't find a current one matching filePath.

    fileSystem.writeFileSync(filePath, '{}');
    console.log('Could not find data file. Data file created.');
} else {
    console.log('Data file found. Loading.');
}

(async () => {

    let words = [];

    // Fetch words from length 4 to 15 from the datamuse api, adding them to a list after cleaning each one.

    for (let i = 4; i < 15; i++) {

        let request = await fetch(`https://api.datamuse.com/words?sp=${'?'.repeat(i)}&max=500`);
        let json = await request.json();

        // I've found that the datamuse api will return weird words that have spaces and other stuff, so this is just to clean those
        // and filter the ones that too short.

        let temporaryWords = json
            .map(entry =>
                entry.word
                    .replace(/[\n\r\s]+/g, '')
                    .replace(/[^a-zA-Z]/g, '')
                    .toLowerCase()
            )
            .filter(word => word.length >= 2);

        words.push(...temporaryWords);

        console.log("Words with length " + i + " have been fetched and saved.")

    }

    // Write final array to the file path.

    fileSystem.writeFileSync(filePath, JSON.stringify(words, null, 2));

    console.log("Finished fetching data.")
})();


