let energy = 50;
let happiness = 0;
let full = 50;
let bond = 0;
let day = 1;
let actions = 6; // Actions will decrease with button presses
let cat; // This will be the cat randomly selected for the game

const image = document.querySelector('#image');
const catPic = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>'

const interact1 = document.querySelector("#interact-btn1");
const interact2 = document.querySelector("#interact-btn2");
const interact3 = document.querySelector("#interact-btn3");
const interact4 = document.querySelector("#interact-btn4");

const start = document.querySelector("#startBtn");
const end = document.querySelector('#endDay');
const next = document.querySelector('#nextDay');

const energyText = document.querySelector("#energy");
const happyText = document.querySelector("#happy");
const fullText = document.querySelector("#full");
const bondText = document.querySelector("#bond");
const daysText = document.querySelector("#day");
const actionsText = document.querySelector("#action");
const textOne = document.querySelector(".text-one");
const textTwo = document.querySelector(".text-two");

// I've created different cats that will be randomly selected and assigned to the variable 'cat'
// The idea is that they each have different point scores depending on what they enjoy and need more of
// A needy cat will need more attention to get the same number of points as a friendly/aloof cat

const cats = [{
    name: "Enzo",
    type: "needy",
    typeText: "A needy cat will need more attention and care than other cats and you will get less points for your actions overall.",
    interactions: ["feed", "pet", "play", "care"],
    interactText: ["Enzo screams at you before you've prepared his meal and gobbles it up as soon as you set it down. He looks at you expectantly for more.",
"Enzo purrs as you pet him, rubbing his cheeks against your hand.",
"Enzo burbles as you wave a feather toy at him, eyeing it up before he pounces and catches it with his paws.",
"Enzo eyes you warily as you bring out the claw trimmers before tucking his paws under his body and out of reach."],
    points: [10, 10, 15, 5], // Get less points for 'care' because that entails discomfort
}, {
    name: "Cleo",
    type: "aloof",
    typeText: "An aloof cat pretends that humans are beneath them but they enjoy your care nonetheless. You will get less points for some actions and more for others. It's your job to figure out which!",
    interactions: ["feed", "pet", "play", "care"],
    interactText: ["","","",""],
    points: [30, 5, 15, 10]
}, {
    name: "Mungo",
    type: "friendly",
    typeText: "A friendly cat is uncomplicated in their desire for love and affection and will give you the same points for all actions.",
    interactions: ["feed", "pet", "play", "care"],
    interactText: ["Mungo is happy you fed him", "", "", "",],
    points: [15, 15, 15, 15] // Friendly cats give the same amount of points for everything
}];

const types = [{
    type: "needy",
    multiplier: [1, 1.5, 1, 0.25],
}, {
    type: "aloof",
    multiplier: []
}, {
    type: "friendly",
    multiplier: [1, 1, 1, 1]
}] // have an idea to make a multiplier dependent on type of cat chosen but not sure how to access/apply this in the game yet

const gameBtns = [{
 startGame, newDay, endDay, 
}] // This will ideally have the different buttons that will sit on the bottom of the game, with start/restart and other functions like that

const interactions = []; // I want to make interactions more complicated but not sure how to do that yet

interact1.onclick = feed;
interact2.onclick = pet;
interact3.onclick = play;
interact4.onclick = care;
start.onclick = startGame;
end.onclick = endDay;

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
    cat = cats[Math.floor(Math.random() * cats.length)];
    start.classList.add("hidden");
    textOne.innerText = `Thank you for agreeing to join the cat distribution system. Your cat is called ${cat.name}.`
    textTwo.innerText = `Their trait is ${cat.type}.`;
}

function feed() {
    if (actions > 0) {
        if (full < 100) {
            full += cat.points[0];
            actions--;
            energy += 10;
            fullText.innerText = full;
            actionsText.innerText = actions;
            energyText.innerText = energy;
            textOne.innerText = `You fed ${cat.name}.`
            textTwo.innerText = cat.interactText[0];
        } else {
            textOne.innerText = `${cat.name} is full.`;
            textTwo.innerText = "Please try another action.";
        }
    } else {
        textOne.innerText = "Oh dear, you have run out of actions.";
        textTwo.innerText = "All you can do is end the day and see whether you've done enough to improve your bond with your cat. Press 'End Day' below.";
    } //refactor this statement into a function perhaps? As it's repeated for all functions
}

function pet() {
    if (actions > 0) {
        if (happiness < 100) {
            happiness += (25 * types[0].multiplier[1]); // Make this multiplier more universal in future
            actions--;
            energy += 5;
            happyText.innerText = happiness;
            actionsText.innerText = actions;
            energyText.innerText = energy;
            textOne.innerText = `You pet ${cat.name}.`
            textTwo.innerText = cat.interactText[1];
        } else {
            textOne.innerText = `${cat.name} is as happy as they can be.`;
            textTwo.innerText = "Please try another action.";
        }
    } else {
        textOne.innerText = "Oh dear, you have run out of actions.";
        textTwo.innerText = `All you can do is end the day and see whether you've done enough to improve your bond with ${cat.name}. Press 'End Day' below.`;
    }
}

function play() {
    if (actions > 0) {
        if (energy > 0) {
            energy -= (25 * types[0].multiplier[1]); // Make this multiplier more universal in future
            actions--;
            energyText.innerText = energy;
            actionsText.innerText = actions;
            textOne.innerText = `You played with ${cat.name}.`
            textTwo.innerText = cat.interactText[2];
        } else {
            textOne.innerText = `${cat.name} has played to their heart's content and is now exhausted.`;
            textTwo.innerText = "Please try another action.";
        }
    } else {
        textOne.innerText = "Oh dear, you have run out of actions.";
        textTwo.innerText = "All you can do is end the day and see whether you've done enough to improve your bond with your cat. Press 'End Day' below.";
    }
}

function care() {
    if (actions > 0) {
        if (energy < 100 || happiness < 100) {
            energy += (25 * types[0].multiplier[1]); // Make this multiplier more universal in future
            actions--;
            energyText.innerText = energy;
            actionsText.innerText = actions;
            textOne.innerText = `You cared for ${cat.name} and restored some of their energy.`
            textTwo.innerText = cat.interactText[2];
        } else {
            textOne.innerText = `${cat.name} is happy and energetic enough and they don't require any care.`;
            textTwo.innerText = "Please try another action.";
        }
    } else {
        textOne.innerText = "Oh dear, you have run out of actions.";
        textTwo.innerText = "All you can do is end the day and see whether you've done enough to improve your bond with your cat. Press 'End Day' below.";
    }
}

function endDay() {
    bond += (- energy + happiness + full) * 0.05;
    bondText.innerText = bond;
    next.onclick = newDay;
}

function newDay() {
    day++;
    actions = 6;
    energy = 100;
    full -= 50;
    daysText.innerText = day;
    actionsText.innerText = actions;
    energyText.innerText = energy;
    fullText.innerText = full;
}

function winGame() {
    
}