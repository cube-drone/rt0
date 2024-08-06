
const {
    isMajorArcana,
    isCups,
    isSwords,
    isWands,
    isPentacles,
    numericalValue,
    isMinorArcana
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


module.exports = {
    AllSignsPointToYes
}