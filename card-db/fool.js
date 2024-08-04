const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isMinorArcana
} = require('./tarot.js');

const { Tower } = require('./abilities.js');
class KitchenSink {
    constructor() {
        this.name = 'Kitchen Sink';
        this.bin = [];
        this.shieldBonusGenerated = false;
        this.damageBonusGenerated = false;
        this.tags = ['fool'];
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

    reset(){
        this.shieldBonusGenerated = false;
        this.damageBonusGenerated = false;
    }

    play(card, state) {
        state.discard.push(card);
        state.log.push(`Using ${card} to play the Kitchen Sink!`);
        if(this.shieldBonusGenerated && this.damageBonusGenerated){
            state.log.push(`this shouldn't happen: kitchen sink used three times`);
            return;
        }
        if(this.damageBonusGenerated || Math.random() < 0.5){
            state.log.push(`The fool draws an improvised shield out of the kitchen sink`)
            if(state.tags.includes('fast')){
                state.shieldBonus = 5;
            }
            else if(state.tags.includes('slow')){
                state.shieldBonus = 3;
            }
            else{
                state.shieldBonus = 4;
            }
            return;
        }
        else{
            state.log.push(`The fool draws an improvised weapon out of the kitchen sink`)
            if(state.tags.includes('strong')){
                state.damageBonus = 5;
            }
            else if(state.tags.includes('weak')){
                state.damageBonus = 3;
            }
            else{
                state.damageBonus = 4;
            }
            return;
        }
    }
}

class KnifeGuy {
    constructor() {
        this.name = 'Knife Guy';
        this.bin = [];
        this.bonusGenerated = false;
        this.tags = ['corruption', 'fool'];
    }

    priorities() {
        return {
            'damage': 4,
            'default': 4,
        }
    }

    reset(){
        this.bonusGenerated = false;
    }

    accepts(card, state) {
        if(this.bonusGenerated){
            return false;
        }
        if(state.corruption <= 0){
            return false;
        }
        return card == "fool";
    }

    play(card, state) {
        state.discard.push(card);
        state.log.push(`Using ${card} to play Mister Knife Guy!`);
        if(this.bonusGenerated){
            state.log.push(`this shouldn't happen: knife guy used twice`);
            return;
        }
        state.corruption -= 1;
        state.damageBonus = 5;
        state.shieldBonus = 5;
    }
}

class Laughter{
    constructor(){
        this.name = 'Laughter';
        this.tags = ['rangedDmg', 'magicDmg', 'fool']
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
        state.doMagicRangedDamage(totalValueOfCardsExiled * 2);
    }
}

class Slaughter{
    constructor(){
        this.name = 'Slaughter';
        this.bin = [];
        this.tags = ['rangedDmg', 'magic', 'corruption', 'fool']
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
        state.doMagicRangedDamage(totalValueOfCardExiled * 10);
    }
}

class Blackjack{
    constructor(){
        this.name = 'Blackjack';
        this.bin = [];
        this.tokens = 0;
        this.tags = ['fool'];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        return isCups(card) || isSwords(card);
    }

    tokenBonus(){
        return this.tokens;
    }

    reset(){
        this.bin = [];
        this.tokens = 0;
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
                state.doDamage(3 + this.tokenBonus());
            }
            else if(state.getTags().includes('weak')){
                state.doDamage(1 + this.tokenBonus());
            }
            else{
                state.doDamage(2 + this.tokenBonus());
            }
            if(state.getTags().includes('fast')){
                state.addShields(3 + this.tokenBonus());
            }
            else if(state.getTags().includes('slow')){
                state.addShields(1 + this.tokenBonus());
            }
            else{
                state.addShields(2 + this.tokenBonus());
            }
            this.tokens += 2;
            for(let card of this.bin){
                state.discard.push(card);
            }
            this.bin = [];
        }
    }
}

class HitMe {
    constructor(){
        this.name = 'Hit Me';
        this.blackjack = new Blackjack();
        this.tags = ['corruption', 'fool'];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card, state){
        return this.blackjack.accepts(card, state);
    }

    reset(){
        this.blackjack.reset();
    }

    play(card, state){
        this.blackjack.play(card, state);
    }

    onTurnEnd(state){
        // maybe a 50% chance of getting hit, which we'll interpret as a coinflip, here
        if(Math.random() < 0.5){
            state.log.push("Hit Me!");
            let topCard = state.deck[state.deck.length - 1];
            if(topCard == "tower"){
                state.corruption -= 1;
                return;
            }
            else if(isMajorArcana(topCard)){
                return;
            }
            else if(isMinorArcana(topCard)){
                this.blackjack.tokens += 1;
                return;
            }
        }
    }

}

class ThrowawayJoke {
    constructor(){
        this.name = 'Throwaway Joke';
        this.bin = [];
        this.tags = ['fool', 'passive'];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card){
        return false;
    }

    onTurnEnd(state){
        this.play(null, state);
    }

    play(card, state){
        state.log.push(`Playing a throwaway joke!`);

        let topCard = state.deck.pop();

        if(topCard == "tower"){
            state.hand.push(card);
            state.log.push(`The joke was too good! Tower was drawn, ${card} was returned to hand.`);
        }

        state.discard.push(topCard);
        /*
            * * If it is a Sword, deal 3 Damage.
            * * If it is a Cup, gain 3 Shields
            * * If it is a Wand, deal 1 Ranged Damage.
            * * If it is a Pentacle, everybody gains 1 Shield.
        */
        if(isSwords(topCard)){
            state.doDamage(3);
        }
        if(isWands(topCard)){
            state.doRangedDamage(1);
        }
        if(isCups(topCard)){
            state.addShields(3);
        }
        if(isPentacles(topCard)){
            state.addShields(1);
        }
    }
}

class SurpriseTwist{
    constructor(){
        this.name = 'Surprise Twist';
        this.bin = [];
        this.tags = ['corruption', 'fool', 'passive'];
    }

    priorities(){
        return {
            'default': 5,
        }
    }

    accepts(card, state){
        return false;
    }

    onTurnEnd(state){
        this.play(null, state);
    }

    play(card, state){
        state.log.push(`Adding a surprise twist!`);

        let topCard = state.deck.pop();

        if(topCard == "tower"){
            state.corruption -= 1;
            return (new Tower()).play(topCard, state);
        }

        if(topCard == "fool" || topCard == "hierophant" || topCard == "emperor" || topCard == "chariot" || topCard == "hermit" || topCard == "moon" || topCard == "chariot"){
            state.hand.push(topCard);
            return;
        }
        if(topCard == "death"){
            state.doDamage(50);
            return;
        }
        if(topCard == "wheel of fortune"){
            let coinFlip = Math.random() < 0.5;
            if(coinFlip){
                state.doRangedDamage(50);
            }
            else{
                state.corruption -= 1;
            }
        }
        if(topCard == "judgement"){
            state.doRangedDamage(30);
            state.corruption -= 1;
        }
        if(topCard == "world"){
            state.addShields(40);
            state.corruption -= 1;
        }
        if(isSwords(topCard)){
            state.doDamage(3);
        }
        if(isWands(topCard)){
            state.doRangedDamage(1);
        }
        if(isCups(topCard)){
            state.addShields(3);
        }
        if(isPentacles(topCard)){
            state.addShields(1);
        }
        state.discard.push(topCard);
    }
}

class Parade{
    constructor(){
        this.name = 'Parade';
        this.bin = [];
        this.tags = ['fool', 'intent'];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card){
        if(this.bin.length == 0){
            return isMinorArcana(card) && numericalValue(card) < 8;
        }
        else{
            return numericalValue(card) == numericalValue(this.bin[0]);
        }
    }

    play(card, state){
        state.log.push(`Playing a parade!`);
        if( this.bin.length == 0){
            this.bin.push(card);
            return;
        }
        else{
            state.discard.push(card);
            state.discard.push(this.bin[0]);
            this.bin = [];
            state.redrawAllIntents();
            state.addShields(3);
        }
    }
}

class Crazy{
    constructor(){
        this.name = 'Crazy';
        this.active = false;
        this.bin = [];
        this.tags = ['fool', 'intent', 'corruption'];
    }

    priorities(){
        return {
            'default': 5,
        }
    }

    accepts(card, state){
        if(state.corruption >= 0 && !this.active){
            state.corruption -= 1;
            this.active = true;
        }
        if(this.bin.length == 0){
            return isMinorArcana(card) && numericalValue(card) < 8;
        }
        else{
            return numericalValue(card) == numericalValue(this.bin[0]);
        }
    }

    play(card, state){
        state.log.push(`You're driving me crazy!`);
        if( this.bin.length == 0){
            this.bin.push(card);
            return;
        }
        else{
            state.discard.push(card);
            state.discard.push(this.bin[0]);
            this.bin = [];
            state.redrawAllIntents();
            state.cancelIntent();
        }
    }

}

/*
    I have no idea how to model Crisis Averted and Happy Accident
*/

module.exports = {
    KitchenSink,
    KnifeGuy,
    Laughter,
    Slaughter,
    Blackjack,
    HitMe,
    ThrowawayJoke,
    SurpriseTwist,
    Parade,
    Crazy,
}