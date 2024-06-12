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

class Blackjack{
    constructor(){
        this.name = 'Blackjack';
        this.bin = [];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        return isCups(card) || isSwords(card);
    }

    play(card, state){
        this.bin.push(card);
        let valueOfBin = this.bin.reduce((acc, c) => acc + numericalValue(c), 0);
        let cardsExiled = state.hand.filter(c => isMinorArcana(c));
        let totalValueOfCardsExiled = cardsExiled.reduce((acc, c) => acc + numericalValue(c), 0);
        state.hand = state.hand.filter(c => isMinorArcana(c));
        state.log.push(`Using ${card} to play Laughter! with ${cardsExiled.join(",")}`);
        state.doDamage(totalValueOfCardsExiled);
    }
}



module.exports = {
    KitchenSink,
    Laughter
}