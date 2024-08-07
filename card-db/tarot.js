let assert = require('assert');

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

let girls = [
    'queen of swords',
    'queen of wands',
    'queen of cups',
    'queen of pentacles',
    'high priestess',
    'empress',
    'lovers',
    'strength',
    'devil',
    'star',
    'world'
];


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

function suit(card){
    if(isCups(card)){
        return 'cups';
    }
    if(isSwords(card)){
        return 'swords';
    }
    if(isWands(card)){
        return 'wands';
    }
    if(isPentacles(card)){
        return 'pentacles';
    }
    if(isMajorArcana(card)){
        return 'major';
    }
    return null;
}

function isGirl(card){
    return girls.includes(card);
}
assert(isGirl('queen of swords'));
assert(isGirl('queen of wands'));
assert(isGirl('high priestess'));
assert(!isGirl('knight of wands'));

function isKing(card){
    return card.includes('king');
}

function isQueen(card){
    return card.includes('queen');
}

function isKnight(card){
    return card.includes('knight');
}

function isPage(card){
    return card.includes('page');
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
        return 11;
    }
    if(card.includes('knight')){
        return 12;
    }
    if(card.includes('queen')){
        return 13;
    }
    if(card.includes('king')){
        return 14;
    }
    if(card === 'fool'){
        return 0;
    }
    if(card === 'magician'){
        return 1;
    }
    if(card === 'high priestess'){
        return 2;
    }
    if(card === 'empress'){
        return 3;
    }
    if(card === 'emperor'){
        return 4;
    }
    if(card === 'hierophant'){
        return 5;
    }
    if(card === 'lovers'){
        return 6;
    }
    if(card === 'chariot'){
        return 7;
    }
    if(card === 'strength'){
        return 8;
    }
    if(card === 'hermit'){
        return 9;
    }
    if(card === 'wheel of fortune'){
        return 10;
    }
    if(card === 'justice'){
        return 11;
    }
    if(card === 'hanged man'){
        return 12;
    }
    if(card === 'death'){
        return 13;
    }
    if(card === 'temperance'){
        return 14;
    }
    if(card === 'devil'){
        return 15;
    }
    if(card === 'tower'){
        return 16;
    }
    if(card === 'star'){
        return 17;
    }
    if(card === 'moon'){
        return 18;
    }
    if(card === 'sun'){
        return 19;
    }
    if(card === 'judgement'){
        return 20;
    }
    if(card === 'world'){
        return 21;
    }
    return 0;
}

function randomHand(size){
    let hand = [];
    let deck = getDeck();
    for(let i = 0; i < size; i++){
        let card = deck[Math.floor(Math.random() * deck.length)];
        hand.push(card);
    }
    return hand;
}

function randomCard(){
    let deck = getDeck();
    return deck[Math.floor(Math.random() * deck.length)];
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
    isGirl,
    isKing,
    isQueen,
    isKnight,
    isPage,
    suit,
    numericalValue,
    randomHand,
    randomCard,
};
