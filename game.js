let energy = 50;
let happiness = 0;
let full = 50;
let bond = 0;
let day = 1;
let actions = 6; // Actions will decrease with button presses

const interact1 = document.querySelector("#interact-btn1");
const interact2 = document.querySelector("#interact-btn2");
const interact3 = document.querySelector("#interact-btn3");
const interact4 = document.querySelector("#interact-btn4");

const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");

const energyText = document.querySelector("#energy");
const happyText = document.querySelector("#happy");
const fullText = document.querySelector("#full");
const bondText = document.querySelector("#bond");

const cats = [{
    type: "friendly",
    interactions: ["feed", "pet", "play", "care"],
    points: [10, 15, 15, 15],
}, {
    type: "aloof"
}, {
    type: "needy",
    interactions: []
}];

const interactions = [];

const questions = [{
    id: 1,
    question: "I have always wanted a cat that is...",
    btnText: ["Black", "Orange", "Tabby"],
    btnFunctions: [black, orange, tabby]
}, {
    id: 2,
    queston: "What personality type would you best get along with?",
    btnText: ["Friendly", "Aloof", "Needy"],
    btnFunctions: [friendly, aloof, needy]
}]

interact1.onclick = feed;
interact2.onclick = pet;
interact3.onclick = play;
interact4.onclick = care;

function feed() {

}

function pet() {

}

function play() {

}

function care() {

}