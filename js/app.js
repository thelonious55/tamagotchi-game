/*----- constants -----*/
const pet = {
    hunger: 100,
    sleep: 100,
    activity: 100,
    name: document.querySelector('input')
}



/*----- app's state (variables) -----*/
let actionPoints; 

let dayNum = 0;

/*----- cached element references -----*/
let hungerStat = document.querySelector('#hunger')
let sleepStat = document.querySelector('#sleep')
let activityStat = document.querySelector('#activity')

const feedBtn = document.querySelector('#feed-btn')
const sleepBtn = document.querySelector('#sleep-btn')
const playBtn = document.querySelector('#play-btn')

let currentDay = document.querySelector('#current-day')

const startBtn = document.querySelector('#start-btn')
/*----- event listeners -----*/
feedBtn.addEventListener('click', hungerInc)
sleepBtn.addEventListener('click', sleepInc)
playBtn.addEventListener('click', activityInc)
startBtn.addEventListener('click', initialize)

/*----- functions -----*/

//Start game function

function initialize() {
    const hungerDec = setInterval(function () {
        pet.hunger -= 1
        if (pet.hunger === 0) {
            clearInterval(hungerDec)
        }
        renderStats()
    }, 3000)
    
    const sleepDec = setInterval(function () {
        pet.sleep -= 1
        if (pet.sleep === 0) {
            clearInterval(sleepDec)
        }
        renderStats()
    }, 10000)
    
    const activityDec = setInterval(function () {
        pet.activity -= 1
        if (pet.activity === 0) {
            clearInterval(activityDec)
        }
        renderStats()
    }, 7000)

    const dayCounter = setInterval(function () {
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
}

function sleepInc() {
    if (pet.sleep <= 90) {
        pet.sleep += 10
    } else {
        pet.sleep = 100
    }
}

function activityInc() {
    if (pet.activity <= 93) {
        pet.activity += 7
    } else {
        pet.activity = 100
    }
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

if (pet.activity === 0 || pet.hunger === 0 || pet.sleep === 0) {
    //placeholder lose message
} else if (dayNum === 15) {
    //placeholder win message
}