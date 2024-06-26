let deck = [];

let majorArcana = [
    'fool',
    'magician',
    'high priestess',
    'empress',
    'emperor',
    'hierophant',
    'lovers',
    'chariot',
    'strength',
    'hermit',
    'wheel of fortune',
    'justice',
    'hanged man',
    'death',
    'temperance',
    'devil',
    'tower',
    'star',
    'moon',
    'sun',
    'judgement',
    'world'
];
let minorArcana = [];

let cups = [];
let swords = [];
let wands = [];
let pentacles = [];

for(let value of ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king']) {
    for (let suit of ['swords', 'pentacles', 'wands', 'cups']){
        if(suit === 'swords') {
            swords.push(`${value} of ${suit}`);
        }
        if(suit === 'pentacles') {
            pentacles.push(`${value} of ${suit}`);
        }
        if(suit === 'wands') {
            wands.push(`${value} of ${suit}`);
        }
        if(suit === 'cups') {
            cups.push(`${value} of ${suit}`);
        }
        deck.push(`${value} of ${suit}`);
        minorArcana.push(`${value} of ${suit}`);
    }
}
for(let card of majorArcana) {
    deck.push(card);
}

function getDeck() {
    return JSON.parse(JSON.stringify(deck));
}

function getMinorArcana() {
    return JSON.parse(JSON.stringify(minorArcana));
}

function getMajorArcana() {
    return JSON.parse(JSON.stringify(majorArcana));
}

function getCups(){
    return JSON.parse(JSON.stringify(cups));
}

function getSwords(){
    return JSON.parse(JSON.stringify(swords));
}

function getWands(){
    return JSON.parse(JSON.stringify(wands));
}

function getPentacles(){
    return JSON.parse(JSON.stringify(pentacles));
}

const setDeck = new Set(deck);
Object.freeze(setDeck);
function isCard(card) {
    return setDeck.has(card);
}

const setMajorArcana = new Set(majorArcana);
Object.freeze(setMajorArcana);
function isMajorArcana(card) {
    return setMajorArcana.has(card);
}

const setMinorArcana = new Set(minorArcana);
Object.freeze(setMinorArcana);
function isMinorArcana(card) {
    return setMinorArcana.has(card);
}

const setCups = new Set(cups);
Object.freeze(setCups);
function isCups(card) {
    return setCups.has(card);
}

const setSwords = new Set(swords);
Object.freeze(setSwords);
function isSwords(card) {
    return setSwords.has(card);
}

const setWands = new Set(wands);
Object.freeze(setWands);
function isWands(card) {
    return setWands.has(card);
}

const setPentacles = new Set(pentacles);
Object.freeze(setPentacles);
function isPentacles(card) {
    return setPentacles.has(card);
}

// freeze the arrays to prevent modification
Object.freeze(deck);
Object.freeze(majorArcana);
Object.freeze(minorArcana);
Object.freeze(cups);
Object.freeze(swords);
Object.freeze(wands);
Object.freeze(pentacles);

function numericalValue(card){
    if(!isCard(card)){
        return null;
    }
    if(isMajorArcana(card)){
        return 0;
    }
    if(card.includes('ace')){
        return 1;
    }
    if(card.includes('2')){
        return 2;
    }
    if(card.includes('3')){
        return 3;
    }
    if(card.includes('4')){
        return 4;
    }
    if(card.includes('5')){
        return 5;
    }
    if(card.includes('6')){
        return 6;
    }
    if(card.includes('7')){
        return 7;
    }
    if(card.includes('8')){
        return 8;
    }
    if(card.includes('9')){
        return 9;
    }
    if(card.includes('10')){
        return 10;
    }
    if(card.includes('page')){
        return 10;
    }
    if(card.includes('knight')){
        return 10;
    }
    if(card.includes('queen')){
        return 10;
    }
    if(card.includes('king')){
        return 10;
    }
}

// the "get" functions produce a deep copy
// (the arrays are frozen to prevent modification)
module.exports = {
    deck,
    getDeck,
    isCard,
    majorArcana,
    getMajorArcana,
    isMajorArcana,
    minorArcana,
    getMinorArcana,
    isMinorArcana,
    cups,
    getCups,
    isCups,
    swords,
    getSwords,
    isSwords,
    wands,
    getWands,
    isWands,
    pentacles,
    getPentacles,
    isPentacles,
    numericalValue
};
