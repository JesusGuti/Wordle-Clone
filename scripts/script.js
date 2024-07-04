import { keyboardRows } from './keyboard.js'
import { words } from './words.js'
import {
    showNotEnoughLettersAlert,
    showWordAlert,
} from './alerts.js'

const $matrix = document.getElementById('matrix')
const $keyboard = document.getElementById('keyboard')
const delayToAnimate = 500
let $actualSquare = null
let actualRowIndex = 0
let actualSquareIndex = 0
let word = ""
let selectedWord = null

function getRandomWord () {
    const sizeOfWordsArray = words.length
    const randomIndex = Math.floor(Math.random() * sizeOfWordsArray)
    selectedWord = words[randomIndex]
}

function drawRows (numberOfRows) {
    for (let row = 0; row < numberOfRows + 1; row++) {
        let $row = document.createElement('div')
        $row.classList.add('row')
        $row.id = `row-${row}`
        $matrix.appendChild($row)

        for (let column = 0; column < numberOfRows; column++) {
            let $square = document.createElement('div')
            $square.classList.add('square')
            $square.id = `square-${row}-${column}`
            $row.appendChild($square)
        }
    }

    setSquare()
}

function drawKeyboard () {
    keyboardRows.forEach((row) => {
        let $keyboardRow = document.createElement('div')
        $keyboardRow.classList.add('keyboard-row')
        $keyboard.appendChild($keyboardRow)

        row.forEach((key) => {
            let $key = document.createElement('div')
            $key.id = `key-${key}`
            $key.classList.add('key')
            $key.innerText = key
            drawSpecialKey($key)
            $keyboardRow.appendChild($key)
        })
    })
}

function drawSpecialKey ($key) {
    if ($key.innerText !== 'ENTER' && $key.innerText !== 'DEL') return 
    
    $key.classList.add('special')
    if ($key.innerText === 'DEL') {
        $key.classList.add('delete')
    }
}

function writeLetter (event) {
    const { key, keyCode } = event
  
    if (key === 'Backspace') {
        goBack()
        $actualSquare.innerText = ''
        word = word.slice(0,actualSquareIndex)
    } else if (key === 'Enter') {
        if (word.length === selectedWord.length) {
            checkWord()        
        } else {
            showNotEnoughLettersAlert()
        }
    } else if (word.length < selectedWord.length) {
        if (keyCode >= 65 && keyCode <= 90) {
            $actualSquare.innerText = key.toUpperCase()
            word = word + key
            goNext()
        }
    }
}

function clickLetter (target) {
    const key = target?.innerText

    if (key === 'DEL') {
        goBack()
        $actualSquare.innerText = ''
        word = word.slice(0,actualSquareIndex)
    } else if (key === 'ENTER') {
        if (word.length === selectedWord.length) {
            checkWord()        
        } else {
            showNotEnoughLettersAlert()
        }
    } else if (word.length < selectedWord.length) {
        $actualSquare.innerText = key.toUpperCase()
        word = word + key
        goNext()
    }
}

function checkWord () {
    const selectedWordToArray = selectedWord.split('')
    const wordToArray = word.split('')
    const actualRow = actualRowIndex

    // We should verify if the letters we put exists 
    wordToArray.forEach((letter, index) => {
        setTimeout(() => {
            let doesLetterExists = selectedWordToArray.includes(letter)
            let $squareToVerify = document.getElementById(`square-${actualRow}-${index}`)
            let $keyLetter = document.getElementById(`key-${letter.toUpperCase()}`)
            $keyLetter.classList.remove(['correct', 'incorrect', 'lack'])

            $squareToVerify.classList.add('filled')

            if (doesLetterExists) {
                let indexOfLetter = selectedWordToArray.indexOf(letter, index)
                console.log(indexOfLetter)

                if (index === indexOfLetter) {
                    $squareToVerify.classList.add('correct')
                    $keyLetter.classList.add('correct')
                } else {
                    $squareToVerify.classList.add('incorrect')
                    $keyLetter.classList.add('incorrect')
                }
            } else {
                $squareToVerify.classList.add('lack')
                $keyLetter.classList.add('lack')
            }

            $squareToVerify.classList.add('filled')
        }, delayToAnimate * index)
    })

    checkWinner()
}

function checkWinner () {
    if (word === selectedWord) {
        const delayToFinishGame = 5000
        setTimeout(() => {
            finalizeGame()
        }, delayToFinishGame)    
    } else {
        const delayToChangeRow = 2000
        setTimeout(() => {
            word = ''
            actualRowIndex++
            actualSquareIndex = 0
            setSquare()
        }, delayToChangeRow)
    }
}

function goNext () {
    if (actualSquareIndex < selectedWord.length) {
        $actualSquare.classList.remove('active')
        actualSquareIndex++
        setSquare()
    }
}

function goBack () {
    if (actualSquareIndex > 0) {
        $actualSquare.classList.remove('active')
        actualSquareIndex--
        setSquare()
    }
}

function setSquare () {
    const wordLength = selectedWord.length
    if (actualRowIndex < wordLength + 1 && actualSquareIndex < wordLength ) {
        $actualSquare = document.getElementById(`square-${actualRowIndex}-${actualSquareIndex}`)
        $actualSquare.focus()
        $actualSquare.classList.add('active')
    } else {
        gameOver()
    }
}

function animationToShowIfCorrectWord () {
    const $correctRow = document.getElementById(`row-${actualRowIndex}`)
    const $squaresToAnimate = $correctRow.children
    for (let index=0; index < $squaresToAnimate.length; index++) {
        setTimeout(() => {
            let item = $squaresToAnimate.item(index)
            item.classList.add('completed')
        }, index * delayToAnimate)
    }
}

function finalizeGame () {
    animationToShowIfCorrectWord()
    showWordAlert(selectedWord)
}

function gameOver () {

}

function initEvents () {
    document.addEventListener('keydown', (event) => {
        writeLetter(event)
    })

    const keys = document.querySelectorAll('.key')
    keys.forEach((key) => {
        key.addEventListener('click', (event) => {
            clickLetter(event.target)
        })
    })
}

getRandomWord()
drawRows(5)
drawKeyboard()
initEvents()
