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

    accepts(card, state){
        // otherwise: you can only add cards if their suit isn't already in the bin
        if(card === 'magician'){
            return false;
        }
        let existingSuits = this.bin.map(suit);
        if(existingSuits.includes(suit(card))){
            return false;
        }
        return true;
    }

    play(card, state){
        if( this.bin.length < 4){
            state.log.push(`Putting a ${card} in the hat: ${this.bin.join(",")}`);
            this.bin.push(card);
            return;
        }
        else{
            // discard all four cards and put a magician in your hand
            for(let card of this.bin){
                state.discard.push(card);
            }
            state.discard.push(card);
            this.bin = [];
            state.log.push(`Pulling a magician out of the hat!`);
            state.hand.push('magician');
            return;
        }
    }

}

module.exports = {
    Rabbit
}