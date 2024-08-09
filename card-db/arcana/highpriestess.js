
const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isMinorArcana,
    isKing,
    isQueen,
    isPage,
    isKnight
} = require('../tarot.js');


class AllSignsPointToYes{
    constructor(){
        this.name = "All Signs Point to Yes";
        this.tags = ['highpriestess'];
        this.bin = []
        this.tokens = 0;
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        if(this.bin.length > 0){
            return false;
        }
        else{
            return card == "high priestess";
        }
    }

    reset(){
        this.bin = [];
        this.tokens = 0;
    }

    onConcentrate(card, state){
        if(this.bin.length > 0){
            let num = numericalValue(card);
            if(num == 2 || num == 3 || num == 4 || num == 9){
                this.tokens += 1;
            }
        }
    }

    onFlush(state){
        // "4 to every adversary" is unclear, so I'm thinking "3 adversaries ", approximately
        state.doMagicDamage(this.tokens * 14);
    }

    play(card, state) {
        this.bin.push(card);
        this.tokens = 1;
    }
}

class BetterNot{
    constructor(){
        this.name = "Better Not";
        this.tags = ['highpriestess'];
    }

    priorities() {
        return {
            'default': 4,
        }
    }

    accepts(card) {
        return false;
    }

    play(card, state) {

    }

    onConcentrate(card, state){
    }

    onFlush(state){
    }

}

class YesNo{
    constructor(){
        this.name = "YesNo";
        this.tags = ['highpriestess'];
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        return card == "high priestess";
    }

    play(card, state) {
        state.draw();
        state.draw();
        state.draw();

        state.redrawIntent();
        state.redrawIntent();
        state.redrawIntent();

        state.discard.push(card);
    }
}

class GoodBye{
    constructor(){
        this.name = "Goodbye";
        this.tags = ['highpriestess'];
    }

    priorities() {
        return {
            'default': 4,
        }
    }

    accepts(card) {
        return card == "highpriestess";
    }

    play(card, state) {

    }

}


class LuckyNumbers{
    constructor(){
        this.name = "Lucky Numbers";
        this.tags = ['highpriestess'];
        this.bin = [];
        this.exhausted = false;
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        // Lucky Numbers accepts any card of numerical value 3-8 whose numerical value is not already in the bin
        let num = numericalValue(card);
        let numbersInBin = this.bin.map(numericalValue);
        return num >= 3 && num <= 8 && !numbersInBin.includes(num) && !this.exhausted;
    }

    play(card, state) {
        this.bin.push(card);

        if(this.bin.length === 6){
            for(let card of this.bin){
                // when the bin is full, dump the entire bin back into the players' hand
                state.forceDraw(card);
            }
            this.bin = [];
            this.exhausted = true;
        }
    }

    onTurnEnd(state){
        this.exhausted = false;
    }

    onDraw(card, state){
        let num = numericalValue(card);
        if(num == 7){
            state.addShields(4);
        }
    }
}

class Mistake{
    constructor(){
        this.name = "Mistake";
        this.tags = ['highpriestess'];
    }

    priorities() {
        return {
            'default': 4,
        }
    }

    accepts(card) {
        return card == "highpriestess";
    }

    play(card, state) {

    }

}


class PalmReading{
    constructor(){
        this.name = "Palm Reading";
        this.tags = ['highpriestess'];
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        return false;
    }

    onDraw(card, state){
        if(numericalValue(card) == 5){
            state.draw();
        }
        if(isKing(card)){
            state.doDamage(1);
        }
        if(isQueen(card)){
            state.addShields(1);
        }
    }
}

class ColdReading{
    constructor(){
        this.name = "Palm Reading";
        this.tags = ['highpriestess', 'corruption'];
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        return false;
    }

    onDraw(card, state){
        state.doDamage(1);
    }

}

class OrigamiFolding{
    constructor(){
        this.name = "Origami Folding";
        this.tags = ['highpriestess'];
        this.tokens = 0;
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card) {
        return false;
    }

    reset(){
        this.tokens = 0;
    }

    onFlush(){
        this.tokens = 0;
    }

    onConcentrate(card, state){
        this.tokens += 1;
        if(this.tokens % 5 == 0){
            state.redrawIntent();
            state.doDamage(3);
        }
    }
}

class RollingBones{
    constructor(){
        this.name = "Rolling Bones";
        this.tags = ['highpriestess'];
        this.tokens = 0;
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card){
        return false;
    }

    onConcentrate(card, state){
        state.doDamage(3);
    }
}

class Ballistics{
    constructor(){
        this.name = "Ballistics";
        this.tags = ['highpriestess'];
        this.bin = [];
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card){
        return isWands(card) && this.bin.length == 0;
    }

    play(card, state){
        this.bin.push(card);
        // being able to scoot away and still hit is the same as being better at blocking, right?
        state.shieldMultiplier = 1.5;
    }
}

class Astronomy{
    constructor(){
        this.name = "Astronomy";
        this.tags = ['highpriestess'];
        this.bin = [];
    }

    priorities() {
        return {
            'default': 3,
        }
    }

    accepts(card){
        return isWands(card) && this.bin.length == 0;
    }

    play(card, state){
        this.bin.push(card);
        // being able to scoot away and still hit is the same as being better at blocking, right?
        state.shieldMultiplier = 2.5;
    }

}


module.exports = {
    AllSignsPointToYes,
    BetterNot,
    YesNo,
    GoodBye,
    LuckyNumbers,
    Mistake,
    PalmReading,
    ColdReading,
    OrigamiFolding,
    RollingBones,
    Ballistics,
    Astronomy
}