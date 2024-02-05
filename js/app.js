/*----- constants -----*/
const pet = {
    hunger: 100,
    sleep: 100,
    activity: 100,
    name: document.querySelector('input')
}



/*----- app's state (variables) -----*/
let hungerDec;
let sleepDec;
let activityDec;
let dayCounter;

let actionPoints; 

let dayNum = 1;

/*----- cached element references -----*/
let hungerStat = document.querySelector('#hunger')
let sleepStat = document.querySelector('#sleep')
let activityStat = document.querySelector('#activity')

const feedBtn = document.querySelector('#feed-btn')
const sleepBtn = document.querySelector('#sleep-btn')
const playBtn = document.querySelector('#play-btn')

let currentDay = document.querySelector('#current-day')

const startBtn = document.querySelector('#start-btn')

const resetBtn = document.querySelector('#reset-btn')
/*----- event listeners -----*/
feedBtn.addEventListener('click', hungerInc)
sleepBtn.addEventListener('click', sleepInc)
playBtn.addEventListener('click', activityInc)
startBtn.addEventListener('click', initialize)
resetBtn.addEventListener('click', resetGame)
/*----- functions -----*/

//Start game function

function initialize() {
     hungerDec = setInterval(function () {
        pet.hunger -= 1
        if (pet.hunger === 0) {
            clearInterval(hungerDec)
        }
        renderStats()
    }, 3000)
    
     sleepDec = setInterval(function () {
        pet.sleep -= 1
        if (pet.sleep === 0) {
            clearInterval(sleepDec)
        }
        renderStats()
    }, 10000)
    
     activityDec = setInterval(function () {
        pet.activity -= 1
        if (pet.activity === 0) {
            clearInterval(activityDec)
        }
        renderStats()
    }, 7000)

     dayCounter = setInterval(function () {
        dayNum += 1
        renderDay()
    }, 60000)
    
    renderStats()
    renderDay()
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
    clearInterval(hungerDec)
    clearInterval(sleepDec)
    clearInterval(activityDec)
    dayNum = 1
    pet.activity = 100
    pet.sleep = 100
    pet.hunger = 100
}






//win lose conditions

// if (pet.activity === 0 || pet.hunger === 0 || pet.sleep === 0) {
//     clearInterval(hungerDec)
//     clearInterval(sleepDec)
//     clearInterval(activityDec)
    //lose message
// } else if (dayNum === 15) {
//     clearInterval(hungerDec)
//     clearInterval(sleepDec)
//     clearInterval(activityDec)
//     //win message
// }