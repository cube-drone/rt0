
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
            return card == "highpriestess";
        }
    }

    reset(){
        this.bin = [];
        this.tokens = 0;
    }

    onConcentrate(card, state){
        let num = numericalValue(card);
        if(num == 2 || num == 3 || num == 4 || num == 9){
            this.tokens += 1;
        }
    }

    onFlush(state){
        // "4 to every adversary" is unclear, so I'm thinking "3 adversaries ", approximately
        state.doMagicRangedDamage(this.tokens * 3);
    }

    play(card, state) {
        this.bin.push(card);
        this.tokens = 1;
    }
}


class LuckyNumber{
    /*
        at the start of combat, draw cards until you draw a numbered minor arcana card: that's your lucky number
        every time your lucky number comes up, gain 4 shields
    */
    constructor(){
        this.name = "Lucky Number";
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
        let num = numericalValue(card);
        if(num == 7 && !isCups(card)){
            state.addShields(4);
        }
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



module.exports = {
    AllSignsPointToYes,
    LuckyNumber,
    LuckyNumbers,
    PalmReading,
    ColdReading
}