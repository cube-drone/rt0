const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue
} = require('./tarot.js');

class Strike {
    constructor() {
        this.name = 'Strike';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 2,
            'default': 1,
        }
    }

    accepts(card) {
        return isSwords(card) || isWands(card);
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(this.totalValueOfBin() >= 10){
            state.log.push(`Striking with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            if(state.getTags().includes('strong')){
                state.doDamage(7);
            }
            else if(state.getTags().includes('weak')){
                state.doDamage(3);
            }
            else{
                state.doDamage(5);
            }
            this.bin = [];
            return {type: 'strike', damage: 10};
        }
        else{
            state.log.push(`Playing ${card} to strike, sitting at ${this.totalValueOfBin()}/10.`);
        }
    }
}
class Defend {
    constructor() {
        this.name = 'Defend';
        this.bin = [];
    }

    priorities() {
        return {
            'defense': 2,
            'default': 1,
        }
    }

    accepts(card) {
        return isCups(card) || isPentacles(card);
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(this.totalValueOfBin() >= 10){
            state.log.push(`Defending with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            if(state.getTags().includes('fast')){
                state.addShields(7);
            }
            else if(state.getTags().includes('slow')){
                state.addShields(3);
            }
            else{
                state.addShields(5);
            }
            this.bin = [];
            return {type: 'defense', shields: 10};
        }
        else{
            state.log.push(`Playing ${card} to defend, sitting at ${this.totalValueOfBin()}/10.`);
        }
    }
}

class Concentrate {
    constructor() {
        this.name = 'Concentrate';
        this.bin = [];
    }

    priorities() {
        return {
            'draw': 2,
            'default': 1,
        }
    }

    accepts(card) {
        return isMajorArcana(card);
    }

    play(card, state) {
        this.bin.push(card);

        let binLengthRequired = 2;
        if(state.getTags().includes('wise')){
            binLengthRequired = 1;
        }
        else if(state.getTags().includes('foolish')){
            binLengthRequired = 3;
        }

        if(this.bin.length >= binLengthRequired){
            state.log.push(`Concentrating with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            this.bin = [];
            state.draw();
            return {type: 'draw', cards: 1};
        }
        else{
            state.log.push(`Playing ${card} to concentrate, sitting at ${this.bin.length}/2.`);
        }
    }

}

class Tower {
    constructor() {
        this.name = 'Tower';
        this.type = 'catastrophe';
        // this is a mandatory ability that must be played when drawn
        this.mandatory = true;
    }

    priorities() {
        return {
            'default': 10,
        }
    }

    accepts(card) {
        return card === 'tower';
    }

    play(card, state) {
        state.log.push("The tower has fallen! Catastrophe strikes!");
        if(state.getTags().includes('lucky')){
            state.log.push("Lucky: 10 shields anyways!");
            state.addShields(10);
        }
        state.flush();
        return {type: "tower"};
    }
}

class Foolish{
    constructor(){
        this.name = 'Foolish';
        this.bin = [];
        this.mandatory = true;
    }

    priorities(){
        return {
            'default': 10,
        }
    }

    accepts(card){
        return false;
    }

    onTurnStart(state){
        // discard the lowest valued minor arcana card in hand
        let lowestValue = 100;
        let lowestCard = '';
        for(let card of state.hand){
            if(isMajorArcana(card)){
                continue;
            }
            let value = numericalValue(card);
            if(value < lowestValue){
                lowestValue = value;
                lowestCard = card;
            }
        }
        if(lowestCard){
            state.hand = state.hand.filter(card => card !== lowestCard);
            state.discard.push(lowestCard);
            state.log.push(`Discarding ${lowestCard} due to foolishness.`);
        }
    }
}

class GoodIdea{
    constructor(){
        this.name = 'Good Idea';
    }

    priorities(){
        return {
            'draw': 2,
            'default': 4,
        }
    }

    accepts(card){
        return card == "hierophant";
    }

    play(card, state){
        state.discard.push(card);

        // technically, it's choose another player, but for the sake of calculation we're going to say "ourselves"

        state.draw();
        state.draw();
        state.draw();
    }
}

class Feint{
    constructor(){
        this.name = 'Feint';
    }

    priorities(){
        return {
            'block': 3,
            'default': 4,
        }
    }

    accepts(card){
        return card === 'moon';
    }

    play(card, state){
        state.discard.push(card);
        state.log.push(`Feinting with ${card}`);

        state.redrawIntent();
    }
}

class Flex {
    constructor() {
        this.name = 'Flex';
    }

    priorities() {
        return {
            'damage': 2,
            'default': 4,
        }
    }

    accepts(card) {
        return card === "emperor";
    }

    play(card, state) {
        state.discard.push(card);
        state.log.push(`Flexing with ${card}`);

        state.temporaryDamageMultiplier = 2;
    }
}

class Blur {
    constructor() {
        this.name = 'Blur';
    }

    priorities() {
        return {
            'block': 2,
            'default': 4,
        }
    }

    accepts(card) {
        return card === "chariot";
    }

    play(card, state){
        state.discard.push(card);
        state.log.push(`Blurring with ${card}`);

        // technically blur rolls over leftover shields to next turn, but let's just call that a 1.5 multiplier
        state.temporaryShieldMultiplier = 1.5;
    }
}

class Study {
    constructor(){
        this.name = 'Study';
    }

    priorities(){
        return {
            'draw': 2,
            'default': 4,
        }
    };

    accepts(card){
        return card === 'hermit';
    }

    play(card, state){
        // remove the top four cards from the deck
        let cards = state.deck.splice(0, 4);

        // what card do we want to select?
        let cardToSelect = cards[0];
        if (cards.includes('tower')) {
            state.log.push(`Studying with ${card} and found the tower! Catastrophe strikes!`);
            cardToSelect = 'tower';
        }
        else if(cards.filter(card => isMajorArcana(card)).length >= 1){
            state.log.push(`Studying with ${card} and found the fool! Honk honk! `);
            cardToSelect = cards.filter(card => isMajorArcana(card))[0];
        }
        else {
            // find the highest value card
            let highestValue = 0;
            for (let card of cards) {
                let value = numericalValue(card);
                if (value > highestValue) {
                    highestValue = value;
                    cardToSelect = card;
                }
            }
        }

        // do the hermit thing
        let cardsToPutBack = cards.filter(card => card !== cardToSelect);
        state.deck = cardsToPutBack.concat(state.deck);
        state.shuffle();
        state.hand.push(cardToSelect);

        state.discard.push(card);
    }
}

class TakeAChance{
    constructor(){
        this.name = 'Take A Chance';
    }

    priorities(){
        return {
            'draw': 2,
            'default': 3,
        }
    }

    accepts(card){
        return card === 'wheel of fortune';
    }

    play(card, state){
        // just do "Good Idea", about half the time
        let flip = Math.random() > 0.5;
        if(flip){
            let gi = new GoodIdea();

            return gi.play(card, state);
        }
        else{
            state.discard.push(card);
        }

    }

}

module.exports = {
    Strike,
    Defend,
    Concentrate,
    Tower,
    Foolish,
    GoodIdea,
    Feint,
    Flex,
    Blur,
    Study,
    TakeAChance
}