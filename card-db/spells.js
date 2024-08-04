const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isGirl,
    randomCard,
} = require('./tarot.js');


class Leo {
    constructor() {
        this.name = 'leo';
        this.bin = [];
        this.tags = ['spell', 'clever', 'magicDmg'];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
    }

    play(card, state) {
        this.bin.push(card);
        // leo can also do 8 damage to all adversaries in your zone
        // todo?
        if(state.getTags().includes('clever')){
            state.doMagicDamage(30);
        }
        else{
            state.doMagicDamage(15);
        }
        state.log.push(`Casting leo with the magician!`);
    }
}

class Sagittarius {
    constructor() {
        this.name = 'sagittarius';
        this.bin = [];
        this.tags = ['spell', 'clever', 'magicDmg', 'rangedDmg'];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
    }

    play(card, state) {
        this.bin.push(card);
        // sagitarrius can also do 5 ranged damage to ALL adversaries
        if(state.getTags().includes('clever')){
            state.doRangedMagicDamage(20);
        }
        else{
            state.doRangedMagicDamage(10);
        }
        state.log.push(`Casting sagittarius with the magician!`);
    }
}

class Cancer {
    constructor() {
        this.name = 'cancer';
        this.bin = [];
        this.tags = ['spell', 'clever', 'shields'];
    }

    priorities() {
        return {
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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
        this.tags = ['spell', 'clever', 'shields'];
    }

    priorities() {
        return {
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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
        this.tags = ['spell', 'clever'];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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
        this.tags = ['spell', 'clever', 'draw'];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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
        this.tags = ['spell', 'clever', 'magicDmg', 'shields'];
    }

    priorities() {
        return {
            'damage': 4,
            'default': 3,
        }
    }

    accepts(card, state) {
        let girlInHand = false;
        for(let card of state.hand){
            if(isGirl(card)){
                girlInHand = true;
            }
        }

        return (card === 'magician' || (state.className === 'magician' && card === 'fool')) && girlInHand;
    }

    play(card, state) {
        if(state.getTags().includes('clever')){
            state.doMagicRangedDamage(80);
        }
        else{
            state.doMagicRangedDamage(40);
        }

        state.discard.push(card);
    }
}

class Scorpio {
    constructor() {
        this.name = 'scorpio';
        this.bin = [];
        this.tags = ['spell', 'clever', 'magicDmg'];
    }

    priorities() {
        return {
            'damage': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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
        this.tags = ['spell', 'clever', 'magicDmg', 'shields'];
    }

    priorities() {
        return {
            'damage': 3,
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
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

class Virgo{
    constructor() {
        this.name = 'virgo';
        this.tags = ['spell', 'charming', 'shields'];
        this.bin = [];
    }

    priorities() {
        return {
            'defense': 3,
            'default': 2,
        }
    }

    accepts(card, state) {
        return card === 'magician' || (state.className === 'magician' && card === 'fool');
    }

    play(card, state) {
        // this activates Virgo
        state.log.push(`Charming with Virgo!`);
        this.bin.push(card);
    }

    onTurnEnd(state){
        if(this.bin.length === 0){
            return;
        }
        let rCard = randomCard();
        if(isSwords(rCard)){
            // discard the card used to play Virgo
            state.log.push(`A sword is drawn! Virgo is cancelled!`);
            let card = this.bin.pop();
            state.discard.push(card);
        }
        else{
            state.log.push(`Virgo is still active! Cancelling enemy intent!`);
            state.cancelIntent();
        }
    }
}

class Worthless{
    // this should perform significantly worse than baseline
    constructor(){
        this.name = 'worthless';
        this.tags = ['spell', 'test'];
    }

    priorities(){
        return {
            'default': 1,
        }
    }

    accepts(card, state){
        return false;
    }

}

module.exports = {
    Leo,
    Cancer,
    Aries,
    Taurus,
    Sagittarius,
    Gemini,
    Capricorn,
    Scorpio,
    Libra,
    Virgo,
    Worthless
}
