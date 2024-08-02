
const { KitchenSink, KnifeGuy, Laughter, Slaughter, Blackjack, ThrowawayJoke, SurpriseTwist } = require('./fool.js');
const { Leo, Cancer, Aries, Taurus, Gemini, Capricorn, Scorpio, Libra } = require('./spells.js');
const Player = require('./Player.js');

const { shuffle } = require('./utils.js');

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


let player = Player.generateDefaultPlayer();
let histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
console.dir("default");
console.log(histogram.toString());

let spells = [new Leo(), new Cancer(), new Aries(), new Taurus(), new Gemini(), new Capricorn(), new Scorpio(), new Libra()];
for(let spell of spells){
    console.dir(spell.name);
    player = Player.generateDefaultPlayer();
    player.addAbility(spell);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
    console.log(histogram.toString());
}
let goodtags = ['strong', 'fast', 'wise', 'lucky', 'clever', 'charming'];
let badtags = ['weak', 'slow', 'foolish', 'unlucky', 'dull', 'repulsive'];
for(let tag of goodtags){
    player = Player.generatePlayerWithTags({tags: [tag]});
    console.dir(tag);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
    console.log(histogram.toString());
}
for(let tag of badtags){
    player = Player.generatePlayerWithTags({tags: [tag]});
    console.dir(tag);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
    console.log(histogram.toString());
}

let foolabilities = [new KitchenSink(), new KnifeGuy(), new Laughter(), new Slaughter(), new Blackjack(), new ThrowawayJoke(), new SurpriseTwist()];
for(let ability of foolabilities){
    player = Player.generateDefaultPlayer();
    player.addAbility(ability);
    console.dir(ability.name);
    histogram = player.generateUsefulnessHistogram({nTurns: 15, nCycles: 500});
    console.log(histogram.toString());
}

/*
//debugging
let bj = new Blackjack();
player = Player.generateDefaultPlayer();
player.addAbility(bj);
console.log(player.generateLog())
*/