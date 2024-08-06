
const fool = require('./arcana/fool.js');
const magician = require('./arcana/magician.js');
const highpriestess = require('./arcana/highpriestess.js');
const spells = require('./spells.js');
const Player = require('./Player.js');
const Table = require('cli-table');

const cliProgress = require('cli-progress');

// there are two things we want to accomplish
// 1. just run a simulation against a single player to determine the raw power output of a player with a given ability or set of abilities
// 2. run a full battle simulation to estimate the likelihood of a team of players winning a fight

// 1 is quite a bit easier to accomplish, but involves us doing things like guessing at the "block" value of movement or intent manipulation
//  (if you can move away from an enemy, you can avoid ALL damage, so it's "infinite" block _sometimes_, but then the amount of useful block provided
//    is dependent on the enemy's movement and damage)
// 1 also overvalues huge block spikes, whereas in practice, you'd rather have consistent block

// 2 (the full battle simulation) has its own problems, as well:
//  one of the big ones is that if the player plays "badly" due to poor AI decisionmaking, that doesn't necessarily mean the abilities are bad
//  there are loads of little tricks that one might use to play better (like: moving away from a big hit, or moving towards a weak enemy)
//  but capturing all of those in the player simulation AI would be a lot of work
//  if we make the AI dumb, then we're going to undervalue abilities that require clever play, which is kind of the opposite of what we want
// these are kind of the classic problems of simulation-based-balancing
// but I think that they're still worth doing, because they can give us a rough idea of the power level of a given ability
//  (before playtesting, which is the real gold standard)


let table = new Table({
    head: ['Name', 'Min', 'Max', 'StdDev', 'Score', 'Tags'],
    colWidths: [30, 10, 10, 10, 10, 30]
})

let tablePush = (name, min, max, stdDev, score, tags) => {
    table.push([String(name), String(min.toFixed(1)), String(max.toFixed(1)), String(stdDev.toFixed(2)), String(score.toFixed(1)),  String(tags)]);
}

let nCycles = 250;

let player = Player.generateDefaultPlayer();
let histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles});
let baselines = {};
baselines['default'] = histogram.score;
tablePush("default", histogram.minScore, histogram.maxScore, histogram.stdDev, histogram.brickScore, []);

let playerS = Player.generateDefaultPlayer();
playerS.addAbility(spells.Leo); // the baseline spell is Leo
let histogramS = playerS.generateUsefulnessHistogram({nTurns: 15, nCycles});
baselines['spells'] = histogramS.score;
tablePush("spells", histogramS.minScore, histogramS.maxScore, histogramS.stdDev, histogramS.brickScore, []);


let pushTag = (tag) => {
    player = Player.generatePlayerWithTags({tags: [tag]});
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles});
    baselines[tag] = histogram.score;
    let score = histogram.score - baselines['spells'];
    tablePush(tag, histogram.minScore, histogram.maxScore, histogram.stdDev, score, ['ability']);
}
let pushSpell = (ability) => {
    player = Player.generateDefaultPlayer();
    player.addAbility(ability);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles});
    let score = histogram.score - baselines['spells'];
    tablePush(ability.name, histogram.minScore, histogram.maxScore, histogram.stdDev, score, (new ability()).tags ?? []);
}
let pushAbility = (ability) => {
    player = Player.generateDefaultPlayer();
    player.addAbility(ability);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles});
    let score = histogram.score - baselines['default'];
    tablePush(ability.name, histogram.minScore, histogram.maxScore, histogram.stdDev, score, (new ability()).tags ?? []);
}
let pushTagsAndAbilities = (tags, abilities) => {
    player = Player.generateDefaultPlayer();
    player.tags = tags;
    let fullTags = [];
    let abilityNames = [];
    for(let ability of abilities){
        fullTags = fullTags.concat((new ability()).tags ?? []);
        abilityNames.push(ability.name);
        player.addAbility(ability);
    }
    player.buildDeck();

    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 5000});
    let name = [tags.join("-"), abilityNames.join("-")].join("-");
    let baseline = baselines['default'];
    if(tags.length === 1){
        baseline = baselines[tags[0]];
    }
    tablePush(name, histogram.minScore, histogram.maxScore, histogram.stdDev, histogram.score - baseline, fullTags);
}


let goodtags = ['strong', 'fast', 'wise', 'lucky', 'clever', 'charming', 'nothing'];
let badtags = ['weak', 'slow', 'foolish', 'unlucky', 'dull', 'repulsive'];

const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
progress.start(100, 0);

for(let tag of goodtags.concat(badtags)){
    pushTag(tag);
    progress.increment();
}


/*
let specialAbilities = [GoodIdea, Flex, Feint, Study, TakeAChance, Blur];
for(let ability of specialAbilities){
    pushAbility(ability);
}
*/

let allSpells = Object.values(spells);
for(let spell of allSpells){
    pushSpell(spell);
    progress.increment();
    pushTagsAndAbilities(['clever'], [spell]);
    progress.increment();
}

let foolabilities = Object.values(fool);
for(let ability of foolabilities){
    pushTagsAndAbilities(['lucky'], [ability, spells.Leo]);
    progress.increment();
}

let magicianabilities = Object.values(magician);
for(let ability of magicianabilities){
    pushTagsAndAbilities(['clever'], [ability, spells.Leo]);
    progress.increment();
}

let hpabilities = Object.values(highpriestess);
for(let ability of hpabilities){
    pushTagsAndAbilities(['wise'], [ability, spells.Leo]);
    progress.increment();
}

/*
let alreadyDone = new Set();
for(let ability of foolabilities){
    for(let ability2 of foolabilities){
        if(ability.name === ability2.name){
            continue;
        }
        let name = [ability.name, ability2.name].sort().join("-");
        if(alreadyDone.has(name)){
            continue;
        }
        alreadyDone.add(name);
        pushTagsAndAbilities(['lucky'], [ability, ability2, spells.Leo]);
        progress.increment();
    }
}
for(let ability of magicianabilities){
    for(let ability2 of magicianabilities){
        if(ability.name === ability2.name){
            continue;
        }
        let name = [ability.name, ability2.name].sort().join("-");
        if(alreadyDone.has(name)){
            continue;
        }
        alreadyDone.add(name);
        pushTagsAndAbilities(['clever'], [ability, ability2, spells.Leo]);
        progress.increment();
    }
}
*/

progress.stop();

console.log(table.toString());

//debugging
let a = () => {
    player = Player.generateDefaultPlayer();
    player.tags = ['clever', 'wise'];
    player.addAbility(magician.Saw);
    player.addAbility(magician.Cups);
    player.addAbility(magician.MagicWand);
    player.addAbility(spells.Leo);
    //console.log(player.generateLog())
    let histo = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 5000});
    console.dir(`magician broken`)
    console.log(histo.toString());
};

let b = () => {
    player = Player.generateDefaultPlayer();
    player.tags = ['strong', 'lucky'];
    player.addAbility(fool.HitMe);
    player.addAbility(fool.KnifeGuy);
    //console.log(player.generateLog())
    console.dir(`fool broken`)
    let histo = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 5000});
    console.log(histo.toString());
}
