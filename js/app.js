/*----- constants -----*/
const pet = {
    hunger: 100,
    sleep: 100,
    activity: 100,
}

/*----- app's state (variables) -----*/
let hungerDec;
let sleepDec;
let activityDec;
let dayCounter;
let imageChanger;
let dayNum = 1;
let actionPoints = 10;
let statsAverage;

/*----- cached element references -----*/
let hungerStat = document.querySelector('#hunger');
let sleepStat = document.querySelector('#sleep');
let activityStat = document.querySelector('#activity');
const feedBtn = document.querySelector('#feed-btn');
const sleepBtn = document.querySelector('#sleep-btn');
const playBtn = document.querySelector('#play-btn');
let currentDay = document.querySelector('#current-day');
const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
let resultMsg = document.querySelector('#result-msg');
let nameTag = document.querySelector('#name');
let inputBox = document.querySelector('#input');
const sprite = document.querySelector('#sprite');
const dropdownMenu = document.querySelector('#dropdown-menu')
const currentPoints = document.querySelector('#action-points')
/*----- event listeners -----*/
feedBtn.addEventListener('click', hungerInc);
sleepBtn.addEventListener('click', sleepInc);
playBtn.addEventListener('click', activityInc);
startBtn.addEventListener('click', initialize);
resetBtn.addEventListener('click', resetGame);
dropdownMenu.addEventListener('change', dropdownSelection)
/*----- functions -----*/

//Start game function

function initialize() {
    hungerDec = setInterval(function () {
        pet.hunger -= 1
        if (pet.hunger === 0) {
            stopTimers()
            youLose()
        }
        renderStats()
        updateAverage()
    }, 1500)

    sleepDec = setInterval(function () {
        pet.sleep -= 1
        if (pet.sleep === 0) {
            stopTimers()
            youLose()
        }
        renderStats()
        updateAverage()
    }, 2000)

    activityDec = setInterval(function () {
        pet.activity -= 1
        if (pet.activity === 0) {
            stopTimers()
            youLose()
        }
        renderStats()
        updateAverage()
    }, 1000)

    dayCounter = setInterval(function () {
        dayNum += 1
        actionPoints += 3
        renderDay()
        renderAP()
        if (dayNum === 15) {
            stopTimers()
            youWin()
        }
    }, 15000)

    if (dropdownMenu.value === 'https://i.imgur.com/lwusw0B.png') {
        imageChanger = setInterval(function() {
            if (statsAverage >= 60) {
                sprite.src = 'https://i.imgur.com/lwusw0B.png'
            } else if (statsAverage < 60 && statsAverage >= 30) {
                sprite.src = 'https://i.imgur.com/4aRsznK.png'
            } else if (statsAverage < 30) {
                sprite.src = 'https://i.imgur.com/sHQI6w7.png'
            }
            console.log(statsAverage)
        }, 500)
    }

    renderStats()
    renderDay()
    renderAP()
    dropdownSelection()

    nameTag.innerHTML = document.querySelector('input').value
    document.querySelector('input').value = ''

    toggleDisplay([startBtn, inputBox, dropdownMenu], 'none')
    toggleDisplay([sprite, feedBtn, sleepBtn, playBtn, currentDay, currentPoints], '')
}


//Increase stats

function hungerInc() {
    if (actionPoints === 0) {
        return
    } else {
        pet.hunger <= 97 ? pet.hunger += 3 : pet.hunger = 100;
        renderStats()
        actionPoints -= 1
        renderAP()
    }

}
function sleepInc() {
    if (actionPoints === 0) {
        return
    } else {
        pet.sleep <= 92 ? pet.sleep += 8 : pet.sleep = 100;
        renderStats()
        actionPoints -= 1
        renderAP()
    }

}
function activityInc() {
    if (actionPoints === 0) {
        return
    } else {
        pet.activity <= 95 ? pet.activity += 5 : pet.activity = 100;
        renderStats()
        actionPoints -= 1
        renderAP()
    }

}
//Render functions

function renderStats() {
    hungerStat.innerHTML = `hunger ${pet.hunger}%`
    sleepStat.innerHTML = `sleep ${pet.sleep}%`
    activityStat.innerHTML = `activity ${pet.activity}%`
    toggleDisplay([hungerStat, sleepStat, activityStat], '')
}

function renderDay() {
    currentDay.innerHTML = `Day ${dayNum}`
}

function renderAP() {
    currentPoints.innerHTML = `Action points: ${actionPoints}`
}

function updateAverage() {
    statsAverage = (pet.hunger + pet.sleep + pet.activity) / 3
}

function resetGame() {
    stopTimers()
    actionPoints = 10
    dayNum = 1
    pet.activity = 100
    pet.sleep = 100
    pet.hunger = 100
    renderDay()
    renderStats()
    clearHTML([resultMsg, nameTag], '')
    toggleDisplay([startBtn, inputBox, dropdownMenu], '')
    toggleDisplay([feedBtn, sleepBtn, playBtn, currentDay, sprite, hungerStat, sleepStat, activityStat, currentPoints], 'none')
}


// stop timers
stopTimers = function () {
    clearInterval(hungerDec)
    clearInterval(activityDec)
    clearInterval(sleepDec)
    clearInterval(dayCounter)
    clearInterval(imageChanger)
}

//loss message
youLose = function () {
    resultMsg.innerHTML = "You  Lose!"
}

//win message
youWin = function () {
    resultMsg.innerHTML = "You  Win!"
}

function dropdownSelection() {
    const selectedOption = dropdownMenu.value
    sprite.src = selectedOption
}

//change display value of cached elements passed through as array
function toggleDisplay(n, displayValue) {
    n.forEach(function (n) {
        n.style.display = displayValue
    })
}

//resets html exactly like displayValue
function clearHTML (n, value) {
    n.forEach(function(n) {
        n.innerHTML = value
    })
}

//initial display
toggleDisplay([feedBtn, sleepBtn, playBtn, sprite], 'none')