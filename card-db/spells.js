const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue
} = require('./tarot.js');


class Leo {
    constructor() {
        this.name = 'leo';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
        if(state.getTags().includes('clever')){
            state.doMagicDamage(30);
        }
        else{
            state.doMagicDamage(15);
        }
        state.log.push(`Casting leo with the magician!`);
    }
}

class Cancer {
    constructor() {
        this.name = 'cancer';
        this.bin = [];
    }

    priorities() {
        return {
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
        if(state.getTags().includes('clever')){
            state.addShields(30);
        }
        else{
            state.addShields(15);
        }
        state.log.push(`Casting cancer with the magician!`);
    }
}

class Aries {
    constructor() {
        this.name = 'aries';
        this.bin = [];
    }

    priorities() {
        return {
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
        state.shieldMultiplier = 2;
        if(state.getTags().includes('clever')){
            state.shieldMultiplier = 3;
        }
        state.log.push(`Casting aries with the magician!`);
    }

    onFlush(state){
        state.shieldBonus = 0;
        state.shieldMultiplier = 1;
    }
}

class Taurus {
    constructor() {
        this.name = 'taurus';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
        state.damageMultiplier = 2;
        if(state.getTags().includes('clever')){
            state.damageMultiplier = 3;
        }
        state.log.push(`Casting taurus with the magician!`);
    }

    onFlush(state){
        state.damageBonus = 0;
        state.damageMultiplier = 1;
    }
}

class Gemini{
    constructor() {
        this.name = 'gemini';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        state.log.push(`Casting gemini to draw a bunch of cards!`);
        state.discard.push(card);
        let n = 3;
        if(state.getTags().includes('clever')){
            n += 3;
            state.draw();
            state.draw();
            state.draw();
            state.draw();
            state.draw();
        }
        state.draw();
        state.draw();
        state.draw();
        state.draw();
        state.draw();
    }
}

class Capricorn {
    constructor() {
        this.name = 'capricorn';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        if(state.deck.length === 0){
            state.log.push(`Casting capricorn with the magician, but the deck is empty!`);
            return;
        }
        let peek = state.deck[0];
        if( peek === "fool" || isCups(peek) || isPentacles(peek) ){
            state.log.push(`Casting capricorn with the magician to generate shields!`);
            if(state.getTags().includes('clever')){
                state.addShields(48);
            }
            else{
                state.addShields(24);
            }

        }
        else if( isSwords(peek) || isWands(peek) ){
            state.log.push(`Casting capricorn with the magician to do damage!`);
            if(state.getTags().includes('clever')){
                state.doMagicDamage(48);
            }
            else{
                state.doMagicDamage(24);
            }
        }
        else {
            state.log.push(`Casting capricorn with the magician... failed!`);

        }
        state.discard.push(card);
    }
}

class Scorpio {
    constructor() {
        this.name = 'scorpio';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
        state.log.push(`Casting scorpio with the magician!`);
    }

    onCardDrawn(card, state){
        if(!this.bin.includes('magician')){
            return;
        }
        state.log.push(`Stinging with scorpio!`);
        state.doMagicDamage(1);
    }
}

class Libra{
    constructor() {
        this.name = 'libra';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 3,
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    play(card, state) {
        this.bin.push(card);
    }

    onTurnEnd(state){
        if(this.bin.length === 0){
            return;
        }
        let damageDealt = state.damageThisTurn;
        let shieldsGenerated = state.shieldsThisTurn;
        if(damageDealt > shieldsGenerated){
            state.log.push(`Balancing with libra!`);
            state.doMagicDamage(damageDealt - shieldsGenerated);
        }
        if(shieldsGenerated > damageDealt){
            state.log.push(`Balancing with libra!`);
            state.addShields(shieldsGenerated - damageDealt);
        }

    }
}

module.exports = {
    Leo,
    Cancer,
    Aries,
    Taurus,
    Gemini,
    Capricorn,
    Scorpio,
    Libra,
}