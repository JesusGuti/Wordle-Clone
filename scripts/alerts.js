export function showWordAlert (selectedWord) {
    const $wordToShow = document.getElementById('word-display')
    $wordToShow.style.display = 'initial'
    $wordToShow.innerText = selectedWord.toUpperCase()
}

export function showNotEnoughLettersAlert () {
    const $notEnoughAlert = document.getElementById('not-enough')
    $notEnoughAlert.style.display = 'initial'
    setTimeout(() => {
        $notEnoughAlert.style.display = 'none'
    }, 2000)
}

export function showWordNotInTheListAlert () {
    const $notInTheList = document.getElementById('not-in-list')
    $notInTheList.style.display = 'initial'
    setTimeout(() => {
        $notInTheList.style.display = 'none'
    }, 2000)
}