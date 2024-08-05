
const fool = require('./fool.js');
const magician = require('./magician.js');
const spells = require('./spells.js');
const Player = require('./Player.js');
const Table = require('cli-table');


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
    colWidths: [20, 10, 10, 10, 10, 30]
})

let tablePush = (name, min, max, stdDev, score, tags) => {
    table.push([String(name), String(min.toFixed(1)), String(max.toFixed(1)), String(stdDev.toFixed(2)), String(score.toFixed(1)),  String(tags)]);
}

let nCycles = 500;

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
        tags = tags.concat(ability.tags ?? []);
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
for(let tag of goodtags.concat(badtags)){
    pushTag(tag);
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
    pushTagsAndAbilities(['clever'], [spell]);
}

let foolabilities = Object.values(fool);
for(let ability of foolabilities){
    pushTagsAndAbilities(['lucky'], [ability, spells.Leo]);
}

let magicianabilities = Object.values(magician);
for(let ability of magicianabilities){
    pushTagsAndAbilities(['clever'], [ability, spells.Leo]);
}

/*
for(let ability of foolabilities){
    for(let ability2 of foolabilities){
        if(ability.name === ability2.name){
            continue;
        }
        player = Player.generateDefaultPlayer();
        player.addAbility(ability);
        player.addAbility(ability2)
        console.dir([ability.name, ability2.name].join("-"));
        histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
        console.log(histogram.toString());

    }
}
*/

console.log(table.toString());

//debugging
player = Player.generateDefaultPlayer();
player.addAbility(magician.Rabbit);
player.addAbility(spells.Leo);
console.log(player.generateLog())