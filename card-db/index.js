const {
    deck,
    getDeck,
    isCard,
    majorArcana,
    getMajorArcana,
    isMajorArcana,
    minorArcana,
    getMinorArcana,
    isMinorArcana,
    cups,
    getCups,
    isCups,
    swords,
    getSwords,
    isSwords,
    wands,
    getWands,
    isWands,
    pentacles,
    getPentacles,
    isPentacles,
    numericalValue
} = require('./tarot.js');

function shuffle(array) {
// Fisher-Yates shuffle algorithm
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

class PlayerState {
    constructor({deck, className, priority}) {
        this.abilities = [];
        this.hand = [];
        this.handSize = 5;
        this.className = className ?? 'default';
        this.priority = priority ?? 'random'; // random priority just chooses a random ability to play

        this.tags = []; // things like "weak", "strong", "fast", "slow", etc.

        this.damageMultiplier = 1;
        this.shieldMultiplier = 1;
        this.damageBonus = 0;
        this.shieldBonus = 0;
        this.rangedDamageBonus = 0;
        this.rangedDamageMultiplier = 1;
        this.magicDamageBonus = 0;
        this.magicDamageMultiplier = 1;

        this.totalDamage = 0;
        this.totalRangedDamage = 0;
        this.totalMagicDamage = 0;
        this.totalShields = 0;
        this.totalTurns = 0;

        this.discard = [];
        if(deck) {
            this.baseDeck = deck;
        }
        else{
            this.baseDeck = getDeck();
        }
        this.deck = JSON.parse(JSON.stringify(this.baseDeck));
        this.shuffle();

        this.maxHitPoints = 20;
        this.hitPoints = 20;

        this.log = [];
        this.turnOutput = [];
    }

    addAbility(ability) {
        this.abilities.push(ability);
    }

    getSortedAbilities() {
        let sortedAbilities = [];
        for (let ability of this.abilities) {
            sortedAbilities.push(ability);
        }
        if(this.priority === 'random') {
            shuffle(sortedAbilities);
        }
        else{
            sortedAbilities.sort((a, b) => {
                return (a.priorities()[this.priority] ?? 0) - (b.priorities()[this.priority] ?? 0);
            });
        }
        return sortedAbilities;
    }

    buildDeck() {
        if(this.tags.includes('lucky')){
            this.baseDeck = this.baseDeck.filter(card => card !== 'tower');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of wands');
        }
        if(this.tags.includes('unlucky')){
            this.baseDeck = this.baseDeck.filter(card => card !== 'fool');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of wands');
        }
        this.deck = JSON.parse(JSON.stringify(this.baseDeck));
        this.shuffle();
    }

    takeTurn() {
        this.drawHand();
        this.totalTurns++;
        let newTurnOutput = [];

        let sortedAbilities = this.getSortedAbilities();
        let nextCard = this.hand.pop();
        while (nextCard) {
            let card = nextCard;
            let cardPlayed = false;
            for (let ability of sortedAbilities) {
                if(ability.accepts(card) && ability.mandatory){
                    cardPlayed = true;
                    let result = ability.play(card, this);
                    if (result && result.type === "tower") {
                        newTurnOutput.push(result);
                        return;
                    }
                    if (result) {
                        newTurnOutput.push(result);
                        break;
                    }
                }
            }
            if(!cardPlayed){
                for (let ability of sortedAbilities) {
                    if(ability.accepts(card) && !ability.mandatory){
                        cardPlayed = true;
                        let result = ability.play(card, this);
                        if (result && result.type === "tower") {
                            newTurnOutput.push(result);
                            return;
                        }
                        if (result) {
                            newTurnOutput.push(result);
                            break;
                        }
                    }
                }
            }
            if(!cardPlayed){
                this.discard.push(card);
            }
            nextCard = this.hand.pop();
        }

        this.turnOutput.push(newTurnOutput);
    }

    takeNTurns(n){
        for(let i = 0; i < n; i++){
            this.takeTurn();
        }
    }

    drawHand(){
        for(let i = 0; i < this.handSize; i++){
            this.draw();
        }
        this.log.push(`Hand: ${this.hand}, Deck: ${this.deck.length}, Discard: ${this.discard.length}`);
    }

    draw() {
        if (this.deck.length === 0) {
            this.flush();
        }
        let card = this.deck.pop();
        this.log.push(`Drawing ${card}`);
        this.hand.push(card);
    }

    shuffle() {
        // shuffle deck by sorting randomly
        shuffle(this.deck);
    }

    flush() {
        this.log.push(`Flushing deck and shuffling.`);
        // empty all ability bins
        for (let key in this.abilities) {
            this.abilities[key].bin = [];
        }
        // shuffle discard into deck
        this.hand = [];
        this.discard = [];
        this.deck = JSON.parse(JSON.stringify(this.baseDeck));
        this.shuffle();
    }

    dumpLog() {
        return JSON.stringify(this.log, null, 2);
    }

    doDamage(damage) {
        this.log.push(`Dealing ${damage} damage!`);
        this.totalDamage += (damage + this.damageBonus) * this.damageMultiplier;
    }

    doMagicDamage(damage){
        this.log.push(`Dealing ${damage} magic damage!`);
        this.totalDamage += (damage + this.magicDamageBonus) * this.magicDamageMultiplier;
        this.totalMagicDamage += (damage + this.magicDamageBonus) * this.magicDamageMultiplier;
    }

    doRangedDamage(damage){
        this.log.push(`Dealing ${damage} ranged damage!`);
        this.totalDamage += (damage + this.rangedDamageBonus) * this.rangedDamageMultiplier;
        this.totalRangedDamage += (damage + this.rangedDamageBonus) * this.rangedDamageMultiplier;
    }

    doRangedMagicDamage(damage){
        this.log.push(`Dealing ${damage} magic ranged damage!`);
        this.totalDamage += (damage + this.magicDamageBonus) * this.magicDamageMultiplier;
        this.totalMagicDamage += (damage + this.magicDamageBonus + this.rangedDamageBonus) * this.magicDamageMultiplier * this.rangedDamageMultiplier;
        this.totalRangedDamage += (damage + this.magicDamageBonus + this.rangedDamageBonus) * this.magicDamageMultiplier * this.rangedDamageMultiplier;
    }

    addShields(shields) {
        this.log.push(`Adding ${shields} shields!`);
        this.totalShields += (shields + this.shieldBonus) * this.shieldMultiplier;
    }



}

class Strike {
    constructor() {
        this.name = 'Strike';
        this.bin = [];
    }

    priorities() {
        return {
            'just-strike': 10,
            'damage': 2
        }
    }

    accepts(card) {
        return isSwords(card) || isWands(card);
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(this.totalValueOfBin() >= 10){
            state.log.push(`Striking with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            if(state.tags.includes('strong')){
                state.doDamage(7);
            }
            else if(state.tags.includes('weak')){
                state.doDamage(3);
            }
            else{
                state.doDamage(5);
            }
            this.bin = [];
            return {type: 'strike', damage: 10};
        }
        else{
            state.log.push(`Playing ${card} to strike, sitting at ${this.totalValueOfBin()}/10.`);
        }
    }
}
class Defend {
    constructor() {
        this.name = 'Defend';
        this.bin = [];
    }

    priorities() {
        return {
            'just-defend': 10,
            'defense': 2
        }
    }

    accepts(card) {
        return isCups(card) || isPentacles(card);
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(this.totalValueOfBin() >= 10){
            state.log.push(`Defending with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            if(state.tags.includes('fast')){
                state.addShields(7);
            }
            else if(state.tags.includes('slow')){
                state.addShields(3);
            }
            else{
                state.addShields(5);
            }
            this.bin = [];
            return {type: 'defense', shields: 10};
        }
        else{
            state.log.push(`Playing ${card} to defend, sitting at ${this.totalValueOfBin()}/10.`);
        }
    }
}

class Concentrate {
    constructor() {
        this.name = 'Concentrate';
        this.bin = [];
    }

    priorities() {
        return {
            'just-concentrate': 10,
            'draw': 2
        }
    }

    accepts(card) {
        return isMajorArcana(card);
    }

    play(card, state) {
        this.bin.push(card);

        let binLengthRequired = 2;
        if(state.tags.includes('wise')){
            binLengthRequired = 1;
        }
        else if(state.tags.includes('foolish')){
            binLengthRequired = 3;
        }

        if(this.bin.length >= binLengthRequired){
            state.log.push(`Concentrating with ${this.bin}`);
            state.discard = state.discard.concat(this.bin);
            this.bin = [];
            state.draw();
            return {type: 'draw', cards: 1};
        }
        else{
            state.log.push(`Playing ${card} to concentrate, sitting at ${this.bin.length}/2.`);
        }
    }

}

class Tower {
    constructor() {
        this.name = 'Tower';
        this.type = 'catastrophe';
        // this is a mandatory ability that must be played when drawn
        this.mandatory = true;
    }

    accepts(card) {
        return card === 'tower';
    }

    play(card, state) {
        state.flush();
        state.log.push("The tower has fallen! Catastrophe strikes!");
        return {type: "tower"};
    }
}

class Leo {
    constructor() {
        this.name = 'Leo';
        this.bin = [];
    }

    priorities() {
        return {
            'damage': 5
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(state.tags.includes('clever')){
            state.doRangedMagicDamage(15);
        }
        else if(state.tags.includes('dull')){
            state.doRangedMagicDamage(5);
        }
        else{
            state.doRangedMagicDamage(10);
        }
        state.log.push(`Casting leo with the magician!`);
    }
}

class Cancer {
    constructor() {
        this.name = 'Cancer';
        this.bin = [];
    }

    priorities() {
        return {
            'defense': 5
        }
    }

    accepts(card) {
        return card === 'magician';
    }

    totalValueOfBin() {
        let total = 0;
        for (let card of this.bin) {
            total += numericalValue(card);
        }
        return total;
    }

    play(card, state) {
        this.bin.push(card);
        if(state.tags.includes('clever')){
            state.addShields(15);
        }
        else if(state.tags.includes('dull')){
            state.addShields(5);
        }
        else{
            state.addShields(10);
        }
        state.log.push(`Casting cancer with the magician!`);
    }
}

let startingTags = ['strong', 'fast', 'wise', 'clever', 'lucky', 'charming'];


function generateBrick(){
    // "brick" is the most basic character, with no special abilities
    let brick = new PlayerState({className: 'brick'});

    //brick.tags.push('strong');
    //brick.tags.push('weak');
    //brick.tags.push('fast');
    //brick.tags.push('slow');
    //brick.tags.push('wise');
    //brick.tags.push('foolish');
    //brick.tags.push('clever');
    //brick.tags.push('dull');
    //brick.tags.push('lucky');
    //brick.tags.push('unlucky');
    //brick.tags.push('charming');
    //brick.tags.push('boorish');
    brick.addAbility(new Strike());
    brick.addAbility(new Defend());
    brick.addAbility(new Concentrate());
    brick.addAbility(new Tower());

    let spells = [
        new Leo(),
        new Cancer()
    ]
    shuffle(spells);
    brick.addAbility(spells.pop());

    brick.buildDeck();

    return brick;
}
function generateBrick(){
    // "brick" is the most basic character, with no special abilities
    let brick = new PlayerState({className: 'weakbrick'});

    //brick.tags.push('strong');
    //brick.tags.push('weak');
    //brick.tags.push('fast');
    //brick.tags.push('slow');
    //brick.tags.push('wise');
    //brick.tags.push('foolish');
    //brick.tags.push('clever');
    //brick.tags.push('dull');
    //brick.tags.push('lucky');
    //brick.tags.push('unlucky');
    //brick.tags.push('charming');
    //brick.tags.push('boorish');
    brick.addAbility(new Strike());
    brick.addAbility(new Defend());
    brick.addAbility(new Concentrate());
    brick.addAbility(new Tower());

    let spells = [
        new Leo(),
        new Cancer()
    ]
    shuffle(spells);
    brick.addAbility(spells.pop());

    brick.buildDeck();

    return brick;
}

function generateUsefulnessHistogram(player){
    let lastBrick;
    let nTurns = 15;
    let damages = [];
    let shields = [];
    for(let i = 0; i < 1000; i++){
        brick.takeNTurns(nTurns);
        damages.push(brick.totalDamage);
        shields.push(brick.totalShields);
        lastBrick = brick;
    }

    let averageDamage = damages.reduce((a, b) => a + b, 0) / damages.length;
    let averageShields = shields.reduce((a, b) => a + b, 0) / shields.length;
    let averageDamagePerTurn = averageDamage / nTurns;
    let averageShieldsPerTurn = averageShields / nTurns;
    let score = averageDamagePerTurn + (averageShieldsPerTurn * 1.05); // we should bias slightly towards damage
    return {
        averageDamage,
        averageShields,
        averageDamagePerTurn,
        averageShieldsPerTurn,
        score,
        lastBrick
    }
}

function displayUsefulnessHistogram(histogram){
    console.log(`Average damage: ${histogram.averageDamage.toFixed(2)}`);
    console.log(`Average shields: ${histogram.averageShields.toFixed(2)}`);
    console.log(`Average damage per turn: ${histogram.averageDamagePerTurn.toFixed(2)}`);
    console.log(`Average shields per turn: ${histogram.averageShieldsPerTurn.toFixed(2)}`);
    console.log(`Score: ${histogram.score.toFixed(2)}`);
}

let brick = generateBrick();

let brickUsefulness = generateUsefulnessHistogram(brick);
displayUsefulnessHistogram(brickUsefulness);
