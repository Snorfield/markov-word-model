# Markov Model for Generating Words

This is a group of scripts to generate and use a markov model that can generate words as well as add on to existing words. It trains off of common patterns in english words.

## How To Use

Clone the repo, or download the files. This requires [Node.js](https://nodejs.org/en) to run standalone Javascript code. It comes with a pretrained model file (`model.json`), and you can use it out of the box.

To use it, run the model script with optional arguments. 
`node model.js wordLength startingPhrase` 

You don't have to provide arguments, and if you don't, it will default to a word length of 5 and a starting phrase of 'a'. 

## Arguments

- `wordLength`: This argument controls how many characters the model can add on to your starting phrase. (e.g Adding 3 characters to 'blue' -> 'bluetin')

- `startingPhrase`: This argument is your starting phrase, and can be any letter, or word. (e.g 'blue', 'a')


## Fetching Data

`node fetchdata.js`

This also includes a script to fetch data from the **datamuse** api. By default it will fetch a thousand words for each length, going from length 4 to 15.
There are no command line arguments to configure this, and you will have to edit the code. The json structure for data you'd like to train upon is:

```
[
  "avid",
  "appall"
  ...
]
```

## Training

`node train.js`

If you have your training data under the proper file path (default is './markovModelData.json') it will automatically load and train the model on the data, otherwise the process will exit. If you have a prexisting 'model.json', it will load that model and add on to it. If you do not, the training script will automatically create a new 'model.json' file for you. 'model.json' is the file path which the actual model script reads from, so unless you edit the 'model.js' file to use your own file path, the script will exit the process without generating any words.  

## Disclaimer

I'm not responsible for any content this model generates.
