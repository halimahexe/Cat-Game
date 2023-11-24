let energy = 50;
let happiness = 0;
let full = 50;
let bond = 0;
let day = 1;
let actions = 6; // Actions will decrease with button presses
let cat; // This will be the cat randomly selected for the game

const interact1 = document.querySelector("#interact-btn1");
const interact2 = document.querySelector("#interact-btn2");
const interact3 = document.querySelector("#interact-btn3");
const interact4 = document.querySelector("#interact-btn4");

const start = document.querySelector("#startBtn");

const energyText = document.querySelector("#energy");
const happyText = document.querySelector("#happy");
const fullText = document.querySelector("#full");
const bondText = document.querySelector("#bond");
const daysText = document.querySelector("#day")
const actionsText = document.querySelector("#action")

// I've created different cats that will be randomly selected and assigned to the variable 'cat'
// The idea is that they each have different point scores depending on what they enjoy and need more of
// A needy cat will need more attention to get the same number of points as a friendly/aloof cat

const cats = [{
    name: "Enzo",
    type: "needy",
    interactions: ["feed", "pet", "play", "care"],
    interactText: ["Enzo screams at you before you've prepared his meal and gobbles it up as soon as you set it down. He looks at you expectantly for more.",
"Enzo purrs as you pet him, rubbing his cheeks against your hand.",
"Enzo burbles as you wave a feather toy at him, eyeing it up before he pounces and catches it with his paws.",
"Enzo eyes you warily as you bring out the claw trimmers before tucking his paws under his body and out of reach."],
    points: [10, 10, 15, 5], // Get less points for 'care' because that entails discomfort
}, {
    name: "Cleo",
    type: "aloof",
    interactions: ["feed", "pet", "play", "care"],
    points: [30, 5, 15, 10]
}, {
    name: "Mungo",
    type: "friendly",
    interactions: ["feed", "pet", "play", "care"],
    interactText: ["Mungo is happy you fed him"],
    points: [15, 15, 15, 15] // Friendly cats give the same amount of points for everything
}];

const types = [{
    type: "needy",
    multiplier: [0.5],
}] // have an idea to make a multiplier dependent on type of cat chosen but not sure how to access/apply this in the game yet

const interactions = [];

interact1.onclick = feed;
interact2.onclick = pet;
interact3.onclick = play;
interact4.onclick = care;
start.onclick = startGame;

function startGame() {
    energy = 50;
    energyText.innerText = energy;
    happiness = 0;
    happyText.innerText = happiness;
    full = 50;
    fullText.innerText = full;
    bond = 0;
    bondText.innerText = bond;
    day = 1;
    daysText.innerText = day;
    actions = 6;
    actionsText.innerText = actions;
    cat = Math.floor(Math.random() * cats.length);
    start.classList.add("hidden");
}


function feed() {
    if (actions > 0) {
        full += cat.points[0];
        happiness += (25 * types[0].multiplier); // Make this multiplier more universal in future
        actions--;
        fullText.innerText = full;
        happyText.innerText = happiness;
        actionsText.innerText = actions;
    } else endDay;
}

function pet() {

}

function play() {

}

function care() {

}

function endDay() {
    bond += (energy + happiness + full) * 0.5;
    bondText.innerText = bond;
    newDay;
}

function newDay() {
    day++;
    actions = 6;
}