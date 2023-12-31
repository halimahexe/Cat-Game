// Declaring variables
let energy;
let happiness;
let full;
let bond;
let day;
let actions; // Actions will decrease with button presses
let cat; // This will be the cat randomly selected for the game

const image = document.querySelector('#image');
const catPic = '<svg xmlns="http://www.w3.org/2000/svg" height="5rem" viewBox="0 0 576 512" alt="icon of cat"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>'

// Buttons
const interactBtns = document.querySelectorAll('[id^="interact-btn"]'); // This was used for my attempt to make my code less repetitive
const interact1 = document.querySelector("#interact-btn1");
const interact2 = document.querySelector("#interact-btn2");
const interact3 = document.querySelector("#interact-btn3");
const interact4 = document.querySelector("#interact-btn4");
const start = document.querySelector("#startBtn");
const end = document.querySelector('#endDay');
const next = document.querySelector('#nextDay');
const restart = document.querySelector('#restart');

// Text containers
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
    interactions: {"feed": [25, 1], "pet": [10, 1.5], "play": [15, 1], "care": [10, 0.25]}, // interactions now have points and multipliers assigned to each type of interaction for readability
    interactText: {"feed": "Enzo screams at you before you've prepared his meal and gobbles it up as soon as you set it down. He looks at you expectantly for more.",
        "pet": "Enzo purrs as you pet him, rubbing his cheeks against your hand.",
        "play": "Enzo burbles as you wave a feather toy at him, eyeing it up before he pounces and catches it with his paws.",
        "care": "Enzo eyes you warily as you bring out the claw trimmers before tucking his paws under his body and out of reach."},
    colour: "#000000"
}, {
    name: "Cleo",
    type: "aloof",
    typeText: "An aloof cat pretends that humans are beneath them but they enjoy your care nonetheless. You will get less points for some actions and more for others. It's your job to figure out which!",
    interactions: {"feed": [25, 1], "pet": [10, 0.5], "play": [15, 1], "care": [10, 0.5]},
    interactText: {"feed": "Cleo is pleased that you deigned to finally feed her.",
        "pet": "Cleo has decided to allow you to touch her fluffyness ... for now.",
        "play": "Cleo is excited to use her sharp claws to destroy her prey.",
        "care": "Cleo is displeased by your attempts to coerce her into submission, even if it is for 'the greater good', whatever that means..."},
    colour: "#E3963E"
}, {
    name: "Mungo",
    type: "friendly",
    typeText: "A friendly cat is uncomplicated in their desire for love and affection and will give you the same points for all actions.",
    interactions: {"feed": [25, 1], "pet": [15, 1], "play": [15, 1], "care": [15, 1]},
    interactText: {"feed": "Mungo is happy you fed him.",
        "pet": "Mungo purrs as you stroke his soft fur. He's blissful.",
        "play": "Mungo waits for the feather toy to be within paw's reach and bats it away.",
        "care": "Mungo is happy to be taken care of."},
    colour: "#808080"
}];

// Object of functions to run depending on which button is clicked
const interactFunc = {interact1: feed, interact2: pet, interact3: play, interact4: care};

// Click listeners lead to functions
start.onclick = startGame;
end.onclick = endDay;
next.onclick = nextDay;
restart.onclick = startGame;

// Refactoring so I only run feed, pet, play, care functions if action > 0
interactBtns.forEach(function(interactBtn) {
    interactBtn.addEventListener('click', function(event) {
        let num = event.target.id.match(/\d/);

        if (actions > 0) {
            interactFunc[`interact${num}`]();
        } else noActions();
    })
});

// Disabling buttons before start to avoid game errors
interact1.disabled = true;
interact2.disabled = true;
interact3.disabled = true;
interact4.disabled = true;

// Start Game
function startGame() {
    energy = 50;
    happiness = 0;
    full = 50;
    bond = 0;
    day = 1;
    actions = 6;
    energyText.innerText = energy;
    happyText.innerText = happiness;
    fullText.innerText = full;
    bondText.innerText = bond;
    daysText.innerText = day;
    actionsText.innerText = actions;
    cat = cats[Math.floor(Math.random() * cats.length)];
    start.classList.add("hidden");
    restart.classList.remove("hidden");
    textOne.innerText = `Thank you for agreeing to join the cat distribution system. Your cat is called ${cat.name}. Their trait is ${cat.type}.`
    textTwo.innerText = `${cat.typeText} You will need to feed, pet, play and care for them to improve your bond. Good luck!`;
    image.innerHTML = `${catPic}<h2>${cat.name}</h2>`;
    // Means that you can't click the feed, pet, play, care buttons until the game has started to avoid issues;
    interact1.disabled = false;
    interact2.disabled = false;
    interact3.disabled = false;
    interact4.disabled = false;
    document.querySelector('svg').style.fill = cat.colour;
}

// Feed action
function feed() {
    if (full < 100) {
        full += (cat.interactions["feed"][0] * cat.interactions["feed"][1]);
        actions--;
        fullText.innerText = full;
        actionsText.innerText = actions;
        textOne.innerText = `You fed ${cat.name}.`;
        textTwo.innerText = cat.interactText["feed"];
    } else {
        textOne.innerText = `${cat.name} is full.`;
        textTwo.innerText = "Please try another action.";
    }
}

// Pet action
function pet() {
    if (happiness < 100) {
        happiness += (Math.floor(cat.interactions["pet"][0] * cat.interactions["pet"][1]));
        actions--;
        happyText.innerText = happiness;
        actionsText.innerText = actions;
        textOne.innerText = `You pet ${cat.name}.`
        textTwo.innerText = cat.interactText["pet"];
    } else {
        textOne.innerText = `${cat.name} is as happy as they can be.`;
        textTwo.innerText = "Please try another action.";
    }
}

// Play action
function play() {
    if (energy > 0) {
        energy -= (cat.interactions["play"][0] * cat.interactions["play"][1]);
        actions--;
        energyText.innerText = energy;
        actionsText.innerText = actions;
        textOne.innerText = `You played with ${cat.name}.`
        textTwo.innerText = cat.interactText["play"];
    } else {
        textOne.innerText = `${cat.name} has played to their heart's content and is now exhausted.`;
        textTwo.innerText = "Please try another action.";
    }
}

// Care action
function care() { // I think this function would work better if it modified a health stat, which I previously removed. If I had more time, I'd add it back in and replace energy with health in the function below.
    if (energy < 100) {
        energy += (cat.interactions["care"][0] * cat.interactions["care"][1]);
        actions--;
        energyText.innerText = energy;
        actionsText.innerText = actions;
        textOne.innerText = `You cared for ${cat.name} and restored some of their energy.`
        textTwo.innerText = cat.interactText["care"];
    } else {
        textOne.innerText = `${cat.name} has enough energy and they don't require any care.`;
        textTwo.innerText = "Please try another action.";
    }
}

// End day button action
function endDay() {
    bond += (Math.floor(((happiness + full) - energy) * 0.2));
    bondText.innerText = bond;
    end.classList.add('hidden');
    interact1.disabled = true;
    interact2.disabled = true;
    interact3.disabled = true;
    interact4.disabled = true;
    if (bond < 100) {
        textOne.innerHTML = `<strong>End of Day ${day} summary:</strong>`
        textTwo.innerText = `You have increased ${cat.name}'s stats as follows: ${(energy - 50)} energy, ${(happiness - 0)} happiness and ${(full - 50)} fullness. Your bond has increased to ${bond}. You need ${(100-bond)} points to win the game. Press 'Next Day' to continue!`
        next.classList.remove('hidden');
    } else if (bond >= 100) {
        textOne.innerText = `Congratulations, you and ${cat.name} have reached a bond of ${bond}.`;
        textTwo.innerText = `You won the game in ${day} days. Do you think you can beat your score? Press 'Restart' to try again!`
    }
}

// Next day button action
function nextDay() {
    day++;
    actions = 6;
    energy = 100;
    full -= 50;
    happiness -= Math.floor((Math.random() * 30));
    daysText.innerText = day;
    actionsText.innerText = actions;
    energyText.innerText = energy;
    fullText.innerText = full;
    happyText.innerText = happiness;
    textOne.innerText = `Today is Day ${day}.`;
    textTwo.innerText = `How will you take care of ${cat.name} today?`
    next.classList.add('hidden');
    interact1.disabled = false;
    interact2.disabled = false;
    interact3.disabled = false;
    interact4.disabled = false;
}

function noActions() {
    textOne.innerText = "Oh dear, you have run out of actions.";
    textTwo.innerText = "All you can do is end the day and see whether you've done enough to improve your bond with your cat. Press 'End Day' below.";
    end.classList.remove('hidden');
}

// The below was an attempt to refactor my code to avoid repeating the if (actions > 0) code but I wasn't sure how to make it work with the variables that have values assigned to them

// const stats = [{
//     stat: full,
//     statText: `${fullText}`,
//     one: `You fed ${cat.name}.`,
//     two: cat.interactText["feed"],
//     altOne: `${cat.name} is full.`,
//     altTwo: "Please try another action."
// }, {
//     stat: happiness,
//     statText: `${happyText}`,
//     one: `You pet ${cat.name}.`,
//     two: cat.interactText["pet"],
//     altOne: `${cat.name} is as happy as they can be.`,
//     altTwo: "Please try another action."
// }, {
//     stat: energy,
//     statText: `${energyText}`,
//     one: `You played with ${cat.name}.`,
//     two: cat.interactText["play"],
//     altOne: `${cat.name} has played to their heart's content and is now exhausted.`,
//     altTwo: "Please try another action."
// }, {
//     stat: energy,
//     statText: `${energyText}`,
//     one: `You cared for ${cat.name} and restored some of their energy.`,
//     two: cat.interactText["care"],
//     altOne: `${cat.name} has enough energy and they don't require any care.`,
//     altTwo: "Please try another action."
// }, ]

// function update(statistic, i) {
//     if (actions > 0) {
//         if (statistic.stat < 100) {
//             statistic.stat += (cat.points[i] * cat.multiplier[i]);
//             actions--;
//             statistic.stat.statText.innerText = statistic.stat;
//             actionsText.innerText = actions;
//             textOne.innerText = one;
//             textTwo.innerText = two;
//         } else {
//             textOne.innerText = altOne;
//             textTwo.innerText = altTwo;
//         }
//     } else {
//         textOne.innerText = "Oh dear, you have run out of actions.";
//         textTwo.innerText = "All you can do is end the day and see whether you've done enough to improve your bond with your cat. Press 'End Day' below.";
//         end.classList.remove('hidden');
//     }
// }

// function feed() {
//     update(stats[0], 0);
// }