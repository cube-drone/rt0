const { getDeck } = require('./tarot.js');
const { shuffle } = require('./utils.js');

const { Strike, Defend, Concentrate, Tower, Foolish, GoodIdea, Feint, Flex, Blur, Study, TakeAChance } = require('./abilities.js');
const { Leo, Cancer, Aries, Taurus, Gemini, Capricorn, Scorpio, Libra } = require('./spells.js');

class PlayReport {
    constructor({damages, shields, rangedDamages, nTurns}){
        this.nTurns = nTurns;

        let nCycles = damages.length;
        this.averageDamage = damages.reduce((a, b) => a + b, 0) / nCycles;
        this.averageShields = shields.reduce((a, b) => a + b, 0) / nCycles;
        this.averageRangedDamage = rangedDamages.reduce((a, b) => a + b, 0) / nCycles;
        this.averageDamagePerTurn = this.averageDamage / nTurns;
        this.averageShieldsPerTurn = this.averageShields / nTurns;
        this.averageRangedDamagePerTurn = this.averageRangedDamage / nTurns;
        this.score = this.averageDamagePerTurn + (this.averageShieldsPerTurn * 1.05); // we should bias slightly towards shields
        this.brickScore = this.score - 10.5;
    }

    toString(){
        return `Dmg: ${this.averageDamage.toFixed(2)}, Shld: ${this.averageShields.toFixed(2)}, Brick Score: ${this.brickScore.toFixed(2)}`;
    }
}

class Player {
    constructor({priority, extraTags}={}) {
        this.abilities = [];

        this.hand = [];
        this.handSize = 5;

        this.priority = priority ?? 'default';

        this.tags = extraTags ?? []; // things like "weak", "strong", "fast", "slow", etc.

        this.reset();
    }

    reset() {

        this.corruption = 1;
        if(this.tags.includes('charming')){
            this.corruption = 2;
        }
        if(this.tags.includes('strange')){
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
        this.totalRangedDamage = 0;
        this.damageThisTurn = 0;
        this.rangedDamageThisTurn = 0;

        this.totalShields = 0;
        this.shieldsThisTurn = 0;

        this.totalTurns = 0;

        this.discard = [];

        this.maxHitPoints = 20;
        this.hitPoints = 20;

        this.log = [];

        for(let ability of this.abilities){
            if(ability.reset){
                ability.reset();
            }
        }

        this.buildDeck();
    }

    buildDeck() {
        // buildDeck is idempotent but you _should_ call it at least once:
        //  certain abilities and tags change the state of the starting deck so if
        //  buildDeck isn't called up-front, those changes won't be reflected in the deck
        this.baseDeck = getDeck();
        if(this.tags.includes('lucky')){
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
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== 'king of swords');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of pentacles');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of cups');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of wands');
            this.baseDeck = this.baseDeck.filter(card => card !== 'queen of swords');
        }
        this.deck = this.baseDeck;
        this.shuffle();
    }


    static generateDefaultPlayer(){
        // "brick" is the most basic character, with no special abilities
        let brick = new Player();

        brick.addAbility(new Strike());
        brick.addAbility(new Defend());
        brick.addAbility(new Concentrate());
        brick.addAbility(new Tower());

        brick.buildDeck();

        return brick;
    }

    static generateDefaultPlayerWithSpells(){
        let player = Player.generateDefaultPlayer();
        let spells = [
            new Leo(),
            new Cancer()
        ]
        shuffle(spells);
        player.addAbility(spells.pop());

        player.buildDeck();

        return player;
    }

    static generatePlayerWithTags({tags}){
        // "brick" is the most basic character, with no special abilities
        if(!tags){
            tags = [];
        }
        let brick = new Player({extraTags: tags});

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

        if(tags.includes("foolish")){
            brick.addAbility(new Foolish());
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

        return brick;
    }

    generateUsefulnessHistogram({nTurns=15, nCycles=1000}={}){
        let damages = [];
        let rangedDamages = [];
        let shields = [];
        for(let i = 0; i < nCycles; i++){
            this.takeNTurns(nTurns);
            if(this.totalDamage > 500 || this.totalShields > 500){
                console.log(this.dumpLog());
            }
            rangedDamages.push(this.totalRangedDamage);
            damages.push(this.totalDamage);
            shields.push(this.totalShields);
            this.reset();
        }

        let histogram = new PlayReport({damages, shields, rangedDamages, nTurns});
        return histogram;
    }

    generateLog({nTurns=15}={}){
        this.takeNTurns(nTurns);

        return `${this.dumpLog()}\n${this.totalDamage} damage dealt, ${this.totalShields} shields generated in ${this.totalTurns} turns.`;
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

    getSortedAbilities({priority}={}) {
        // get a list of abilities sorted by priority
        //  with the highest priority abilities first
        // (so, if your priority is "block", abilities that produce a lot of block will be ranked more highly)
        let sortedAbilities = [];
        for (let ability of this.abilities) {
            sortedAbilities.push(ability);
        }

        let prior = priority ?? this.priority;
        if(prior === 'random') {
            shuffle(sortedAbilities);
        }
        else{
            sortedAbilities.sort((a, b) => {
                return (b.priorities()[prior] ?? 0) - (a.priorities()[prior] ?? 0);
            });
        }

        // get all "mandatory" abilities, remove them, and put them at the front
        // (mandatory abilities are abilities that must be played when drawn, like "tower" or "foolish")
        let mandatoryAbilities = sortedAbilities.filter(ability => ability.mandatory);
        sortedAbilities = sortedAbilities.filter(ability => !ability.mandatory);
        sortedAbilities = mandatoryAbilities.concat(sortedAbilities);
        return sortedAbilities;
    }

    takeTurn() {
        // ability hooks:
        //  onTurnStart(player)
        //  onTurnEnd(player)
        this.damageThisTurn = 0;
        this.rangedDamageThisTurn = 0;
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
        this.buildDeck();
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
        let thatsALottaDamage = (damage + this.damageBonus + this.temporaryDamageBonus) * this.damageMultiplier * this.temporaryDamageMultiplier;
        this.totalRangedDamage += thatsALottaDamage;
        this.totalDamage += thatsALottaDamage;
        this.rangedDamageThisTurn += thatsALottaDamage;
        this.damageThisTurn += thatsALottaDamage;
    }

    doMagicRangedDamage(damage){
        this.doRangedMagicDamage(damage);
    }
    doRangedMagicDamage(damage){
        let thatsALottaDamage = (damage + this.damageBonus + this.temporaryDamageBonus) * this.damageMultiplier * this.temporaryDamageMultiplier;
        this.totalRangedDamage += thatsALottaDamage;
        this.totalDamage += thatsALottaDamage;
        this.rangedDamageThisTurn += thatsALottaDamage;
        this.damageThisTurn += thatsALottaDamage;
    }

    addShields(shields) {
        this.log.push(`Adding ${shields} shields!`);
        let thatsALottaShields = (shields + this.shieldBonus + this.temporaryShieldBonus) * this.shieldMultiplier * this.temporaryShieldMultiplier;
        this.totalShields += thatsALottaShields;
        this.shieldsThisTurn += thatsALottaShields;
    }

    redrawIntent(){
        // the idea is that players will only redraw enemy intents if the alternative is better, so
        //  (at least in our modeling) we should treat it as block?
        this.log.push(`Redrawing intent!`);
        this.shieldsThisTurn += 10;
        // if this.fight, there's a fight going on, so we should redraw the enemy intent, preferably whichever one is the nastiest
    }

    redrawAllIntents(){
        // this one's easier to code but it doesn't so much work, yet
    }
}

module.exports = Player;