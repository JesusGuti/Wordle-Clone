const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word?length=5&lang=en'
const WORD_DEFINITION_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export async function getRandomWordFromApi () {
    try {
        const response = await fetch(RANDOM_WORD_API)          
        const data = await response.json()
        return data[0]
    } catch (err) {
        console.log(err)
    }
}

export async function getDefinitionOfRandomWord (randomWord) {
    const url = WORD_DEFINITION_API + randomWord
    try {
        const response = await fetch(url)
        const data = await response.json()
        const word = await data[0]
        const { meanings } = word
        const wordDefinition = meanings[0].definitions[0].definition
        return wordDefinition
    } catch (err) {
        console.log(err)
        console.log('The word selected doesn\'t have a definition.')
    }
}
