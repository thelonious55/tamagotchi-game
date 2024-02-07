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
// let actionPoints; 
let dayNum = 1;
let stopTimers;
let youLose;
let youWin;
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

//cached empty element
let nameTag = document.querySelector('#name')

let inputBox = document.querySelector('input')
const sprite = document.querySelector('#sprite')

const dropdownMenu = document.querySelector('#dropdown-menu')
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
    }, 2000)
    
     sleepDec = setInterval(function () {
        pet.sleep -= 1
        if (pet.sleep === 0) {
            stopTimers()
            youLose()
        }
        renderStats()
    }, 8000)
    
     activityDec = setInterval(function () {
        pet.activity -= 1
        if (pet.activity === 0) {
            stopTimers()
            youLose()
        }
        renderStats()
    }, 5000)

     dayCounter = setInterval(function () {
        dayNum += 1
        renderDay()
        if (dayNum === 15) {
            stopTimers()
            youWin()
        }
    }, 30000)

    renderStats()
    renderDay()
    dropdownSelection()
    
    nameTag.innerHTML = document.querySelector('input').value
    document.querySelector('input').value = ''

    sprite.style.display = ''
    startBtn.style.display = 'none'
    inputBox.style.display = 'none'
    feedBtn.style.display = ''
    sleepBtn.style.display = ''
    playBtn.style.display = ''
    currentDay.style.display = ''
    dropdownMenu.style.display = 'none'
}


//Increase stats

function hungerInc() {
    if (pet.hunger <= 95) {
        pet.hunger += 5
    } else {
        pet.hunger = 100
    }
    renderStats()
}

function sleepInc() {
    if (pet.sleep <= 90) {
        pet.sleep += 10
    } else {
        pet.sleep = 100
    }
    renderStats()
}

function activityInc() {
    if (pet.activity <= 93) {
        pet.activity += 7
    } else {
        pet.activity = 100
    }
    renderStats()
}

//Render functions

function renderStats() {
    hungerStat.innerHTML = `hunger ${pet.hunger}%`
    sleepStat.innerHTML = `sleep ${pet.sleep}%`
    activityStat.innerHTML = `activity ${pet.activity}%`
}

function renderDay() {
    currentDay.innerHTML = `Day ${dayNum}`
}

function resetGame() {
    stopTimers()
    dayNum = 1
    pet.activity = 100
    pet.sleep = 100
    pet.hunger = 100
    renderDay()
    renderStats()
    resultMsg.innerHTML = ''
    startBtn.style.display = ''
    inputBox.style.display = ''
    nameTag.innerHTML = ''
    feedBtn.style.display = 'none'
    sleepBtn.style.display = 'none'
    playBtn.style.display = 'none'
    currentDay.style.display = 'none'
    sprite.style.display = 'none'
    hungerStat.innerHTML = ''
    sleepStat.innerHTML = ''
    activityStat.innerHTML = ''
    dropdownMenu.style.display = ''
}


// stop timers
stopTimers = function () {
    clearInterval(hungerDec)
    clearInterval(activityDec)
    clearInterval(sleepDec)
    clearInterval(dayCounter)
}

//loss message
youLose = function () {
    resultMsg.innerHTML = "You  Lose!"
    
}

//win message
youWin = function () {
    resultMsg.innerHTML = "You  Win!"
    
}

function dropdownSelection () {
    const selectedOption = dropdownMenu.value
    sprite.src = selectedOption
}


feedBtn.style.display = 'none'
sleepBtn.style.display = 'none'
playBtn.style.display = 'none'
sprite.style.display = 'none'