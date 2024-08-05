const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isMinorArcana,
    suit
} = require('./tarot.js');

class Rabbit{
    constructor(){
        this.name = 'Rabbit';
        this.bin = [];
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    cupsOrWands(state){
        let everythingIsCups = false;
        let everythingIsWands = false;
        for(let ability of state.abilities){
            if(ability.name === 'Cups' && ability.bin.length > 0) {
                everythingIsCups = true;
            }
            if(ability.name === 'Magic Wand' && ability.bin.length > 0){
                everythingIsWands = true;
            }
        }
        return {everythingIsCups, everythingIsWands};
    }

    accepts(card, state){
        // otherwise: you can only add cards if their suit isn't already in the bin
        if(card === 'magician'){
            return false;
        }
        let existingSuits = this.bin.map(suit);

        let {everythingIsCups, everythingIsWands} = this.cupsOrWands(state);

        if(everythingIsCups && isCups(card)){
            // because everything is cups, you don't need cups
            return false;
        }
        if(everythingIsWands && isWands(card)){
            // because everything is wands, you don't need wands
            return false;
        }
        if(existingSuits.includes(suit(card))){
            return false;
        }
        return true;
    }

    play(card, state){

        let {everythingIsCups, everythingIsWands} = this.cupsOrWands(state);

        state.log.push(`Putting a ${card} in the hat: ${this.bin.join(",")}`);
        this.bin.push(card);

        let hasCups = this.bin.some(isCups) || everythingIsCups;
        let hasWands = this.bin.some(isWands) || everythingIsWands;
        let hasSwords = this.bin.some(isSwords);
        let hasPentacles = this.bin.some(isPentacles);
        let hasMajorArcana = this.bin.some(isMajorArcana);

        if(hasCups && hasWands && hasSwords && hasPentacles && hasMajorArcana){
            for(let card of this.bin){
                state.discard.push(card);
            }
            state.discard.push(card);
            state.log.push(`Pulling a magician out of the hat! With ${this.bin.join(",")}`);
            this.bin = [];
            state.hand.push('magician');
            return;
        }
    }
}

class Saw{
    constructor(){
        this.name = 'Saw';
        this.tags = ['magician'];
        this.active = false;
        this.rabbit = new Rabbit();
    }

    priorities(){
        return {
            'default': 5,
        }
    }

    accepts(card, state){
        if(state.corruption > 0){
            state.corruption -= 1;
            this.active = true;
        }
        return this.rabbit.accepts(card, state);
    }

    play(card, state){
        return this.rabbit.play(card, state);
    }
}

class Ears{
    constructor(){
        this.name = 'Ears';
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card, state){
        return isPentacles(card);
    }

    play(card, state){
        state.log.push(`Find some coins in your ears! ${card}`);
        state.doDamage(1);
        state.redrawIntent();
        state.discard.push(card);
    }
}

class Miser{
    constructor(){
        this.name = 'Miser';
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 5,
        }
    }

    accepts(card, state){
        return isPentacles(card);
    }

    play(card, state){
        state.log.push(`Find infinite coins in your pockets! ${card}`);
        state.doDamage(1);
        state.redrawIntent();
        state.discard.push(card);
        let topCard = state.deck[state.deck.length - 1];
        if(topCard === 'tower'){
            state.corruption -= 1;
            state.log.push(`Miser drew the tower! Oh no!`);
        }
        state.draw()
    }
}

class Cups{
    constructor(){
        this.name = 'Cups';
        this.tags = ['magician'];
        this.bin = [];
    }

    priorities(){
        return {
            'default': 4,
        }
    }

    accepts(card, state){
        return isCups(card) && this.bin.length == 0;
    }

    play(card, state){
        state.log.push("Activating Cups & Balls: all cards are now cups!")
        this.bin.push(card);
    }
}

class MagicWand{
    constructor(){
        this.name = 'Magic Wand';
        this.tags = ['magician'];
        this.bin = [];
    }

    priorities(){
        return {
            'default': 6,
        }
    }

    accepts(card, state){
        return isWands(card) && this.bin.length == 0;
    }

    play(card, state){
        state.log.push(`Magic Wand: ${card}`);
        this.bin.push(card);
    }
}

class DisappearingAct{
    constructor(){
        this.name = 'Disappearing Act';
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        if(card === 'moon' || card === "devil"){
            return true;
        }
        return false;
    }

    play(card, state){
        state.log.push(`Disappearing Act: ${card}`);
        state.addShields(10);
        state.discard.push(card);
    }

}

class SmokeAndMirrors{
    constructor(){
        this.name = 'Smoke & Mirrors';
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        if(card === 'moon' || card === "devil"){
            return true;
        }
        return false;
    }

    play(card, state){
        state.log.push(`Smoke and Mirrors: ${card}`);
        state.addShields(10);
        state.doMagicDamage(10);
        state.discard.push(card);
    }

}

class ThreeCardMonte{
    constructor(){
        this.name = 'Three Card Monte';
        this.tags = ['magician'];
    }

    priorities(){
        return {
            'default': 3,
        }
    }

    accepts(card, state){
        if(numericalValue(card) === 3){
            return true;
        }
        else{
            return false;
        }
    }

    play(card, state){
        state.log.push(`Three Card Monte: ${card}`);
        let oneInThreeChance = Math.random() < 0.333;
        if(oneInThreeChance){
            state.log.push(`You win! You get a magician!`);
            state.hand.push('magician');
        }
        else{
            state.log.push(`You lose! You get nothing!`);
        }

    }
}

module.exports = {
    Rabbit,
    Saw,
    Ears,
    Miser,
    Cups,
    MagicWand,
    DisappearingAct,
    SmokeAndMirrors,
    ThreeCardMonte
}