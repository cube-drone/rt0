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
        state.flush();
        state.log.push("The tower has fallen! Catastrophe strikes!");
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

module.exports = {
    Strike,
    Defend,
    Concentrate,
    Tower,
    Foolish
}