const { getDeck } = require('./tarot.js');

const { Strike, Defend, Concentrate, Tower, Foolish, GoodIdea, Feint, Flex, Blur, Study, TakeAChance } = require('./abilities.js');
const { Leo, Cancer, Aries, Taurus, Gemini, Capricorn, Scorpio, Libra } = require('./spells.js');
const { KitchenSink, KnifeGuy, Laughter, Slaughter, Blackjack, HitMe, ThrowawayJoke, SurpriseTwist } = require('./fool.js');

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

        this.corruption = 1;
        if(this.tags.includes('charming')){
            this.corruption = 2;
        }
        if(this.tags.includes('repulsive')){
            this.corruption = 0;
        }

        this.damageMultiplier = 1;
        this.temporaryDamageMultiplier = 1; // only lasts this turn

        this.shieldMultiplier = 1;
        this.temporaryShieldMultiplier = 1; // only lasts this turn

        this.damageBonus = 0;
        this.temporaryDamageBonus = 0; // only lasts this turn

        this.shieldBonus = 0;
        this.temporaryShieldBonus = 0; // only lasts this turn

        this.totalDamage = 0;
        this.damageThisTurn = 0;

        this.totalShields = 0;
        this.shieldsThisTurn = 0;

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
    }

    name() {
        return `${this.className}-${this.tags.join('-')}`;
    }

    getTags(){
        return this.tags;
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
        this.damageThisTurn = 0;
        this.shieldsThisTurn = 0;
        this.drawHand();
        this.totalTurns++;

        let sortedAbilities = this.getSortedAbilities();

        for(let ability of sortedAbilities){
            if(ability.onTurnStart){
                ability.onTurnStart(this);
            }
        }

        let nextCard = this.hand.pop();
        while (nextCard) {
            for(let ability of sortedAbilities){
                if(ability.onCardDrawn){
                    ability.onCardDrawn(nextCard, this);
                }
            }
            if(this.hand.includes('tower')){
                let potentialTowers = sortedAbilities.filter(ability => ability.name === 'tower');
                if(potentialTowers.length > 0){
                    let towerAbility = potentialTowers[0];
                    towerAbility.play('tower', this);
                    return;
                }
            }
            let card = nextCard;
            let cardPlayed = false;
            for (let ability of sortedAbilities) {
                if(!cardPlayed && ability.accepts(card, this)){
                    cardPlayed = true;
                    ability.play(card, this);
                }
            }
            if(!cardPlayed){
                this.discard.push(card);
            }
            nextCard = this.hand.pop();
        }

        for(let ability of sortedAbilities){
            if(ability.onTurnEnd){
                ability.onTurnEnd(this);
            }
        }

        this.temporaryDamageMultiplier = 1;
        this.temporaryShieldMultiplier = 1;
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
        let thatsALottaDamage = (damage + this.damageBonus + this.temporaryDamageBonus) * this.damageMultiplier * this.temporaryDamageMultiplier;
        this.totalDamage += thatsALottaDamage;
        this.damageThisTurn += thatsALottaDamage;
    }

    doMagicDamage(damage) {
        this.doDamage(damage);
    }

    doRangedDamage(damage){
        this.doDamage(damage);
    }

    doRangedMagicDamage(damage){
        this.doDamage(damage);
    }

    addShields(shields) {
        this.log.push(`Adding ${shields} shields!`);
        let thatsALottaShields = (shields + this.shieldBonus + this.temporaryShieldBonus) * this.shieldMultiplier * this.temporaryShieldMultiplier;
        this.totalShields += thatsALottaShields;
        this.shieldsThisTurn += thatsALottaShields;
    }

    redrawIntent(){
        // the idea is that players will only redraw enemy intents if the alternative is better, so
        //  (at least in our modeling) we should treat it as a temporary multiplier to block
        this.log.push(`Redrawing intent!`);
        this.temporaryShieldMultiplier = 1.4;
    }
}

let goodTags = ['strong', 'fast', 'wise', 'clever', 'lucky', 'charming'];
let badTags = ['weak', 'slow', 'foolish', 'dull', 'unlucky', 'repulsive'];

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
        new Gemini(),
        new Capricorn(),
    ]
    shuffle(defaultSpells);
    if(spells){
        for(let spell of spells){
            brick.addAbility(spell);
        }
    }
    else{
        if(tags.includes("clever")){
            let cleverSpells = [
                new Scorpio(),
                new Libra()
            ]
            shuffle(cleverSpells);
            brick.addAbility(cleverSpells.pop());
        }
        else if(!tags.includes("dull")){
            brick.addAbility(defaultSpells.pop());
        }
    }

    if(tags.includes("foolish")){
        brick.addAbility(new Foolish());
    }
    if(tags.includes("strong")){
        brick.addAbility(new Flex());
    }
    if(tags.includes("fast")){
        brick.addAbility(new Blur());
    }
    if(tags.includes("wise")){
        brick.addAbility(new Feint());
    }
    if(tags.includes("clever")){
        brick.addAbility(new Study());
    }
    if(tags.includes("charming")){
        brick.addAbility(new GoodIdea());
    }
    if(tags.includes("lucky")){
        brick.addAbility(new TakeAChance());
    }

    return brick;
}

function generateFool({tags}){
    // "brick" is the most basic character, with no special abilities
    let brick = generateTagsBrick({tags})

    brick.addAbility(new KitchenSink());
    brick.addAbility(new KnifeGuy());
    brick.addAbility(new Laughter());
    brick.addAbility(new Slaughter());
    brick.addAbility(new Blackjack());
    brick.addAbility(new HitMe());

    return brick;
}

function generateMagician({tags}){
    let brick = generateTagsBrick({tags, nSpells: 2})

    return brick;
}


function generateUsefulnessHistogram(playerFn, args){
    let lastRun;
    let nTurns = 15;
    let damages = [];
    let shields = [];
    for(let i = 0; i < 5000; i++){
        let player = playerFn(args)
        player.buildDeck();
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

/*
let histogram = generateUsefulnessHistogram(generateTagsBrick, {spells: []});
histogram.name = "nospells";
displayUsefulnessHistogram(histogram);

for(let spell of [new Leo(), new Cancer(), new Aries(), new Taurus(), new Gemini(), new Capricorn(), new Scorpio(), new Libra()]){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {spells: [spell]});
    histogram.name = spell.name;
    displayUsefulnessHistogram(histogram);
}
*/

/*
let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: ["lucky"]});
histogram.name = "lucky";
displayUsefulnessHistogram(histogram);
histogram = generateUsefulnessHistogram(generateFool, {tags: []});
displayUsefulnessHistogram(histogram);

histogram = generateUsefulnessHistogram(generateFool, {tags: ['charming', 'dull']});
displayUsefulnessHistogram(histogram);
histogram = generateUsefulnessHistogram(generateFool, {tags: ['fast', 'repulsive']});
displayUsefulnessHistogram(histogram);
histogram = generateUsefulnessHistogram(generateFool, {tags: ['clever', 'repulsive']});
displayUsefulnessHistogram(histogram);
histogram = generateUsefulnessHistogram(generateFool, {tags: ['strong', 'dull']});
displayUsefulnessHistogram(histogram);

histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: ["clever"]});
histogram.name = "clever";
displayUsefulnessHistogram(histogram);
histogram = generateUsefulnessHistogram(generateMagician, {tags: []});
displayUsefulnessHistogram(histogram);
*/

for(let tag of goodTags){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: [tag]});
    displayUsefulnessHistogram(histogram);
}
for(let tag of badTags){
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: [tag]});
    displayUsefulnessHistogram(histogram);
}

/*
for(let tag of goodTags){
    if(tag === "lucky"){
        continue;
    }
    let histogram = generateUsefulnessHistogram(generateTagsBrick, {tags: [tag, "lucky"]});
    displayUsefulnessHistogram(histogram);
    histogram = generateUsefulnessHistogram(generateFool, {tags: [tag]});
    displayUsefulnessHistogram(histogram);
}
*/
