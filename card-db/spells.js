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
        state.discard.push(card);
        if(state.tags.includes('clever')){
            state.doRangedMagicDamage(30);
        }
        else{
            state.doRangedMagicDamage(15);
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
        state.discard.push(card);
        if(state.tags.includes('clever')){
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
        state.shieldBonus = 3;
        if(state.tags.includes('clever')){
            state.shieldMultiplier = 2;
        }
        state.log.push(`Casting aries with the magician!`);
    }

    onFlush(state){
        state.shieldBonus = 0;
        state.shieldMultiplier = 1;
        state.temporaryTags = state.temporaryTags.filter(tag => tag !== 'fast');
        state.temporaryTags = state.temporaryTags.filter(tag => tag !== 'weak');
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
        state.damageBonus = 3;
        if(state.tags.includes('clever')){
            state.damageMultiplier = 2;
        }
        state.log.push(`Casting taurus with the magician!`);
    }

    onFlush(state){
        state.damageBonus = 0;
        state.damageMultiplier = 1;
        state.temporaryTags = state.temporaryTags.filter(tag => tag !== 'strong');
        state.temporaryTags = state.temporaryTags.filter(tag => tag !== 'slow');
    }

}

module.exports = {
    Leo,
    Cancer,
    Aries,
    Taurus
}