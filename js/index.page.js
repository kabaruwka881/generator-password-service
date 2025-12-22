const mainSentences = ["Сгенерируем Вам пароль за пару мгновений!", "Сгенерь сейчас! Не юзай слитый пароль!", "Cаня, харе думать! Пора делать пароли под любые нужды!"]

let currentForward = true

let indexSentence = 0
let indexSymbolSentence = 0

let currentSentence = ""

document.addEventListener("DOMContentLoaded", () => {

    const sentence = document.getElementById("mainSentence")
    const testedPassword = document.getElementById("testedPassword")
    const generateButton = document.getElementById("generateButton")
    const lenRange = document.getElementById("lenRange")
    const lenValue = document.getElementById("lenValue")

    function animateMainSentence() {
        let delay;
        if (currentForward) {
            if (indexSymbolSentence < mainSentences[indexSentence].length) {
                currentSentence += mainSentences[indexSentence][indexSymbolSentence++]
                delay = 75
            } else {
                currentForward = false
                delay = 500
            }
        } else {
            if (indexSymbolSentence > 1) {
                currentSentence = currentSentence.slice(0, -1)
                indexSymbolSentence--
                delay = 50
            } else {
                currentForward = true
                indexSentence++
                delay = 100
            }
        }
        if (mainSentences[indexSentence] == null) {
            indexSentence = 0
        }
        sentence.textContent = currentSentence
        setTimeout(animateMainSentence, delay)
    }
    animateMainSentence()

    function changePreviewGenerator() {
        generateButton.addEventListener("click", () => {
            let generateNumber = function() { // our future function of generate random numberz
                return Math.random().toFixed(7)
            }
            testedPassword.textContent = generateNumber()
            testedPassword.style.fontWeight = 700
        })
    }
    changePreviewGenerator()

    function changeCountSymbols() {
        lenRange.addEventListener("click", () => {
            lenValue.textContent = lenRange.value
        })
    }
    changeCountSymbols()

    const currentDialog = document.getElementById("windowGeneratedPassword")
    const generatePassword = document.getElementById("generatePassword")
    
})