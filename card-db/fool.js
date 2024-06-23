const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isMinorArcana
} = require('./tarot.js');

class KitchenSink {
    constructor() {
        this.name = 'Kitchen Sink';
        this.bin = [];
        this.shieldBonusGenerated = false;
        this.damageBonusGenerated = false;
    }

    priorities() {
        return {
            'damage': 3,
            'default': 3,
        }
    }

    accepts(card) {
        if(this.shieldBonusGenerated && this.damageBonusGenerated){
            return false;
        }
        return card == "fool";
    }

    play(card, state) {
        state.discard.push(card);
        state.log.push(`Using ${card} to play the Kitchen Sink!`);
        if(this.shieldBonusGenerated && this.damageBonusGenerated){
            state.log.push(`this shouldn't happen: kitchen sink used three times`);
            return;
        }
        if(this.shieldBonusGenerated){
            state.log.push(`The fool draws an improvised weapon out of the kitchen sink`)
            state.damageBonus = 2;
            return;
        }
        if(this.damageBonusGenerated){
            state.log.push(`The fool draws an improvised shield out of the kitchen sink`)
            state.shieldBonus = 2;
            return;
        }
        if(Math.random() < 0.5){
            state.log.push(`The fool draws an improvised shield out of the kitchen sink`)
            state.shieldBonus = 2;
        }
        else{
            state.log.push(`The fool draws an improvised weapon out of the kitchen sink`)
            state.damageBonus = 2;
        }
    }
}

class KnifeGuy {
    constructor() {
        this.name = 'Knife Guy';
        this.bin = [];
        this.shieldBonusGenerated = false;
        this.damageBonusGenerated = false;
    }

    priorities() {
        return {
            'damage': 4,
            'default': 4,
        }
    }

    accepts(card, state) {
        if(this.shieldBonusGenerated && this.damageBonusGenerated){
            return false;
        }
        if(state.corruption <= 0){
            return false;
        }
        return card == "fool";
    }

    play(card, state) {
        state.discard.push(card);
        state.corruption -= 1;
        state.log.push(`Using ${card} to play the Kitchen Sink!`);
        if(this.shieldBonusGenerated && this.damageBonusGenerated){
            state.log.push(`this shouldn't happen: kitchen sink used three times`);
            return;
        }
        if(this.shieldBonusGenerated){
            state.log.push(`The fool draws a knife, and takes 1 corruption`)
            state.damageBonus = 5;
            return;
        }
        if(this.damageBonusGenerated){
            state.log.push(`The fool draws a hat, and takes 1 corruption`)
            state.shieldBonus = 5;
            return;
        }
        if(Math.random() < 0.5){
            state.log.push(`The fool draws a hat, and takes 1 corruption`)
            state.shieldBonus = 5;
        }
        else{
            state.log.push(`The fool draws a knife, and takes 1 corruption`)
            state.damageBonus = 5;
        }
    }
}

class Laughter{
    constructor(){
        this.name = 'Laughter';
        this.bin = [];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        return card == "fool" && state.hand.filter(c => isMinorArcana(c) ).length > 0;
    }

    play(card, state){
        state.discard.push(card);
        let cardsExiled = state.hand.filter(c => isMinorArcana(c));
        let totalValueOfCardsExiled = cardsExiled.reduce((acc, c) => acc + numericalValue(c), 0);
        state.hand = state.hand.filter(c => isMinorArcana(c));
        state.log.push(`Using ${card} to play Laughter! with ${cardsExiled.join(",")}`);
        state.doDamage(totalValueOfCardsExiled);
    }
}

class Slaughter{
    constructor(){
        this.name = 'Slaughter';
        this.bin = [];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card, state){
        if(state.corruption <= 0){
            return false;
        }
        return card == "fool" && state.hand.filter(c => isMinorArcana(c) ).length > 0;
    }

    play(card, state){
        state.discard.push(card);
        let cardExiled = state.hand.filter(c => isMinorArcana(c))[0];
        let totalValueOfCardExiled = numericalValue(cardExiled);
        state.hand = state.hand.filter(c => c != cardExiled);
        state.log.push(`Using ${card} to play Slaughter! with ${cardExiled}`);
        state.doDamage(totalValueOfCardExiled * 5);
    }
}

class Blackjack{
    constructor(){
        this.name = 'Blackjack';
        this.bin = [];
        this.tokens = 0;
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        return isCups(card) || isSwords(card);
    }

    tokenBonus(state){
        if(state.hitMe){
            return this.tokens + (state.hitMe * 3);
        }
        return this.tokens;
    }

    play(card, state){
        this.bin.push(card);
        let valueOfBin = this.bin.reduce((acc, c) => acc + numericalValue(c), 0);
        if(valueOfBin < 21){
            return;
        }
        if(valueOfBin >= 21){
            state.log.push(`Using ${this.bin.join(",")} to play Blackjack!`);
            if(state.getTags().includes('strong')){
                state.doDamage(5 + this.tokenBonus(state));
            }
            else if(state.getTags().includes('weak')){
                state.doDamage(1 + this.tokenBonus(state));
            }
            else{
                state.doDamage(3 + this.tokenBonus(state));
            }
            if(state.getTags().includes('fast')){
                state.addShields(5 + this.tokenBonus(state));
            }
            else if(state.getTags().includes('slow')){
                state.addShields(1 + this.tokenBonus(state));
            }
            else{
                state.addShields(3 + this.tokenBonus(state));
            }
            this.tokens += 1;
            for(let card of this.bin){
                state.discard.push(card);
            }
            this.bin = [];
        }
    }
}

class HitMe{
    constructor(){
        this.name = 'Blackjack';
        this.bin = [];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card, state){
        if(state.corruption <= 0){
            return false;
        }
        return card == "fool";
    }

    play(card, state){
        if(!state.hitMe){
            state.hitMe = 0;
        }
        state.log.push(`Using ${card} to play Hit Me!`);
        state.hitMe += 1;
        state.corruption += 1;
        state.discard.push(card);
    }
}



module.exports = {
    KitchenSink,
    KnifeGuy,
    Laughter,
    Slaughter,
    Blackjack,
    HitMe
}