document.addEventListener("DOMContentLoaded", () => {
    const mainSentences = ["Сгенерируем Вам пароль за пару мгновений!", "Сгенерь сейчас! Не юзай слитый пароль!", "Cаня, харе думать! Пора делать пароли под любые нужды!"]

    let currentForward = true
    let indexSentence = 0
    let indexSymbolSentence = 0
    let currentSentence = ""

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

    function statisticGeneratedPassword(thisPassword) {
        let statistic = [0, 0, 0, 0, thisPassword.length]
        for (let str of thisPassword) {
            switch (true) {
                case /[a-z]/.test(str): {
                    statistic[0] += 1
                    break
                }
                case /[A-Z]/.test(str): {
                    statistic[1] += 1
                    break
                }
                case /[0-9]/.test(str): {
                    statistic[2] += 1
                    break
                }
                default:
                    statistic[3] += 1
                    break
            }
        }
        return statistic
    }
    
    function generateRandomNumber(start, end) {
        let randomValue = new Uint32Array(1)
        crypto.getRandomValues(randomValue)
        let normalizationDifference = randomValue[0] / Math.pow(2, 32)
        return Math.floor(normalizationDifference * (end - start + 1)) + start
    }

    function getRandomPassword(lengthPassword, args) { // надо чекать на символы которые можно юзать
        const arrayChars = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!?*@#$%()~']
        let allChars = ""
        for (let a in arrayChars) {
            if (args[a]) {
                allChars += arrayChars[a]
            }
        }
        const lengthAllChars = allChars.length - 1
        let result = "", i = 0
        do {
            let currentIndex = generateRandomNumber(0, lengthAllChars)
            result += allChars[currentIndex]
            i++
        } while (i != lengthPassword && allChars != "");

        return result
    }

    function generateRandomPassword(lengthPassword, args) {
        let countNullChars = -1, result = ""
        while (countNullChars != 0) {
            result = getRandomPassword(lengthPassword, args)
            let stats = statisticGeneratedPassword(result)
            countNullChars = 0
            for (let s in stats) {                
                if (args[s] && stats[s] == 0) {
                    countNullChars++
                }
            }
        }
        return result
    }

    function changePreviewGenerator() {
        generateButton.addEventListener("click", () => {
            testedPassword.textContent = generateRandomPassword(8, [true, true, true, true])
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


    const iconClipboard = document.getElementById("iconClipboard")
    const currentPassword = document.getElementById("currentPassword")
    const successText = document.getElementById("successText")
    const generatePassword = document.getElementById("generatePassword")

    generatePassword.addEventListener("click", () => {
        
        let nums = false, ups = false, downs = false, spec = false
        nums = document.getElementById("optDigits").checked
        downs = document.getElementById("optDowner").checked
        ups = document.getElementById("optUpper").checked
        spec = document.getElementById("optSpecial").checked

        if (nums || downs || ups || spec) {
            let windowPasswordPop = new bootstrap.Modal(document.getElementById('windowGeneratedPassword'))
            windowPasswordPop.show()
        } else {
            const blocks = document.querySelectorAll('.form-check');
            blocks.forEach(el => {
                el.classList.add('error');
                setTimeout(() => {
                    el.classList.remove('error') 
                }, 500)
            });
            return
        }

        let args = [downs, ups, nums, spec]
        currentPassword.value = generateRandomPassword(lenRange.value, args)

        let stats = statisticGeneratedPassword(currentPassword.value)
        document.getElementById("upSymbols").textContent = stats[0]
        document.getElementById("downSymbols").textContent = stats[1]
        document.getElementById("numberSymbols").textContent = stats[2]
        document.getElementById("specialSymbols").textContent = stats[3]
        document.getElementById("lengthPassword").textContent = stats[4]

        let circleDiff = document.getElementById('circleDifficult');
        if (stats[4] >= 6 && stats[4] <= 15) {
            circleDiff.style.backgroundColor  = '#22C55E'; // зеленый
        } else if (stats[4] >= 16 && stats[4] <= 22) {
            circleDiff.style.backgroundColor  = '#FACC15'; // желтый
        } else {
            circleDiff.style.backgroundColor  = '#EF4444'; // красный
        }
    })

    function copyToClipboard() {
        iconClipboard.addEventListener("click", () => {
            iconClipboard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16"><path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/></svg>`
            navigator.clipboard.writeText(currentPassword.value)
            successText.classList.add("copied")
            setTimeout(() => {
                successText.classList.remove("copied")
                iconClipboard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>`
            }, 4000)
        })
    }
    copyToClipboard()

    const tryAgain = document.getElementById('tryAgain')
    tryAgain.addEventListener('click', () => {
        document.getElementById('closeButton').click()
        generatePassword.click()
        tryAgain.disabled = true
        tryAgain.style.transition = 'color 0.3s ease'
        setTimeout(() => {
            tryAgain.disabled = false
        }, 500);
    })
})


