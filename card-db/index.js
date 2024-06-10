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

const { Strike, Defend, Concentrate, Tower, Foolish } = require('./abilities.js');
const { Leo, Cancer, Aries, Taurus } = require('./spells.js');

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
        this.priority = priority ?? 'default'; // random priority just chooses a random ability to play

        this.tags = []; // things like "weak", "strong", "fast", "slow", etc.
        this.temporaryTags = [];

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

    name() {
        return `${this.className}-${this.tags.join('-')}`;
    }

    getTags(){
        let mergedTags = [];
        for(let tag of this.tags){
            mergedTags.push(tag);
        }
        for(let tag of this.temporaryTags){
            if(tag == "strong"){
                mergedTags = mergedTags.filter(tag => tag !== "weak");
            }
            if(tag == "weak"){
                mergedTags = mergedTags.filter(tag => tag !== "strong");
            }
            if(tag == "fast"){
                mergedTags = mergedTags.filter(tag => tag !== "slow");
            }
            if(tag == "slow"){
                mergedTags = mergedTags.filter(tag => tag !== "fast");
            }
            if(tag == "wise"){
                mergedTags = mergedTags.filter(tag => tag !== "foolish");
            }
            if(tag == "foolish"){
                mergedTags = mergedTags.filter(tag => tag !== "wise");
            }
            if(tag == "clever"){
                mergedTags = mergedTags.filter(tag => tag !== "dull");
            }
            if(tag == "dull"){
                mergedTags = mergedTags.filter(tag => tag !== "clever");
            }
            if(tag == "lucky"){
                mergedTags = mergedTags.filter(tag => tag !== "unlucky");
            }
            if(tag == "unlucky"){
                mergedTags = mergedTags.filter(tag => tag !== "lucky");
            }
            if(tag == "charming"){
                mergedTags = mergedTags.filter(tag => tag !== "boorish");
            }
            if(tag == "boorish"){
                mergedTags = mergedTags.filter(tag => tag !== "charming");
            }
            mergedTags.push(tag);
        }
        return mergedTags;
    }

    addAbility(ability) {
        if(!ability.name){
            throw new Error("Ability must have a name, got " + ability);
        }
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
                return (b.priorities()[this.priority] ?? 0) - (a.priorities()[this.priority] ?? 0);
            });
        }
        // get all "mandatory" abilities, remove them, and put them at the front
        let mandatoryAbilities = sortedAbilities.filter(ability => ability.mandatory);
        sortedAbilities = sortedAbilities.filter(ability => !ability.mandatory);
        sortedAbilities = mandatoryAbilities.concat(sortedAbilities);
        return sortedAbilities;
    }

    buildDeck() {
        if(this.tags.includes('lucky')){
            this.baseDeck = this.baseDeck.filter(card => card !== 'tower');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== 'ace of swords');
            this.baseDeck = this.baseDeck.filter(card => card !== '2 of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== '2 of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== '2 of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== '2 of swords');
        }
        if(this.tags.includes('unlucky')){
            this.baseDeck = this.baseDeck.filter(card => card !== 'fool');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of swords');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of swords');
        }
        this.deck = JSON.parse(JSON.stringify(this.baseDeck));
        this.shuffle();
    }

    takeTurn() {
        this.drawHand();
        this.totalTurns++;
        let newTurnOutput = [];

        let sortedAbilities = this.getSortedAbilities();

        for(let ability of sortedAbilities){
            if(ability.onTurnStart){
                let result = ability.onTurnStart(this);
                if(result){
                    newTurnOutput.push(result);
                }
            }
        }

        let nextCard = this.hand.pop();
        while (nextCard) {
            if(this.hand.includes('tower')){
                let potentialTowers = sortedAbilities.filter(ability => ability.name === 'tower');
                if(potentialTowers.length > 0){
                    let towerAbility = potentialTowers[0];
                    let result = towerAbility.play('tower', this);
                    newTurnOutput.push(result);
                    return;
                }
            }
            let card = nextCard;
            let cardPlayed = false;
            for (let ability of sortedAbilities) {
                if(!cardPlayed && ability.accepts(card, this)){
                    cardPlayed = true;
                    let result = ability.play(card, this);
                    if (result && result.type === "tower") {
                        newTurnOutput.push(result);
                        return;
                    }
                    else if (result) {
                        newTurnOutput.push(result);
                        break;
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
            if(this.abilities[key].onFlush){
                this.abilities[key].onFlush(this);
            }
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

let goodTags = ['strong', 'fast', 'wise', 'clever', 'lucky', 'charming'];
let badTags = ['weak', 'slow', 'foolish', 'dull', 'unlucky', 'boorish'];

function generateBrick(){
    // "brick" is the most basic character, with no special abilities
    let brick = new PlayerState({className: 'brick'});

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
function generateTagsBrick({tags, spells}){
    // "brick" is the most basic character, with no special abilities
    if(!tags){
        tags = [];
    }
    let brick = new PlayerState({className: `${tags.join('-')}-brick`});

    for(let tag of tags){
        brick.tags.push(tag);
    }
    brick.addAbility(new Strike());
    brick.addAbility(new Defend());
    brick.addAbility(new Concentrate());
    brick.addAbility(new Tower());

    let defaultSpells = [
        new Leo(),
        new Cancer(),
        new Taurus(),
        new Aries(),
    ]
    shuffle(defaultSpells);
    if(spells){
        for(let spell of spells){
            brick.addAbility(spell);
        }
    }
    else{
        if(!tags.includes("dull")){
            brick.addAbility(defaultSpells.pop());
        }
    }

    if(tags.includes("foolish")){
        brick.addAbility(new Foolish());
    }

    brick.buildDeck();

    return brick;
}



function generateUsefulnessHistogram(playerFn, args){
    let lastRun;
    let nTurns = 15;
    let damages = [];
    let shields = [];
    for(let i = 0; i < 5000; i++){
        let player = playerFn(args)
        player.takeNTurns(nTurns);
        damages.push(player.totalDamage);
        shields.push(player.totalShields);
        lastRun = player;
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
        lastRun,
        name: lastRun.name()
    }
}

let brickUsefulness = generateUsefulnessHistogram(generateBrick);

function displayUsefulnessHistogram(histogram){
    if(histogram == null){ throw new Error("histogram is null");}
    /*
    console.log(`${histogram.name} Average damage: ${histogram.averageDamage.toFixed(1)}`);
    console.log(`${histogram.name} Average shields: ${histogram.averageShields.toFixed(1)}`);
    console.log(`${histogram.name} Average damage per turn: ${histogram.averageDamagePerTurn.toFixed(1)}`);
    console.log(`${histogram.name} Average shields per turn: ${histogram.averageShieldsPerTurn.toFixed(1)}`);
    */
    console.log(`${histogram.name} Score: ${histogram.score.toFixed(1)}`);
    //console.log(histogram.lastRun.dumpLog());
    console.log(`${histogram.name} Brick Score: ${(histogram.score - brickUsefulness.score).toFixed(1)}`);
}

displayUsefulnessHistogram(brickUsefulness);

let histogram = generateUsefulnessHistogram(generateTagsBrick, {spells: []});
histogram.name = "nospells";
displayUsefulnessHistogram(histogram);

for(let spell of [new Leo(), new Cancer(), new Aries(), new Taurus()]){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {spells: [spell]});
    histogram.name = spell.name;
    displayUsefulnessHistogram(histogram);
}

for(let tag of goodTags){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: [tag]});
    displayUsefulnessHistogram(histogram);
}
for(let tag of badTags){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: [tag]});
    if(tag === "foolish"){
        console.log(histogram.lastRun.dumpLog());
    }
    displayUsefulnessHistogram(histogram);
}

