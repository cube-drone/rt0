# Combat
Combat is triggered any time the players get into a scuffle with an adversary or adversaries.

The goal of Combat is to deal damage to adversaries until they stop fighting.

## Summary
Players and adversaries draw hands of cards, then play them into a variety of "bins" that are available to them, corresponding
with unique combat abilities.

These cards generate Strike and Defend points, which can be used to both generate and offset damage.

## Hit Points
Players start every combat with 20 HP, a number that resets with _every combat_.

When a player reaches 0 HP, they do not die, but instead must buy 10 more HP. In order to do so, they
must take 3 Corruption Points.

When a player reaches 0 HP for a second time, they suffer _consequences_, which are generally non-fatal.
This costs them _more_ Corruption Points, and they wake up in their room the next day with a new Manipulation.

If there is still a lot of time left in the day, the player gets to play as an EDDY for the rest of the day.

A sufficient number of Corruption points will permanently retire the Player, although the exact number is only known by the GM.

## The Order
A Round of battle is a cycle where every participant gets one turn.

First, an Intent is drawn for every Adversary. This is a card that determines what the Adversary will
do on their turn. Some Adversaries draw Intents face-up, some draw Intents face down.

Then, players each take a turn. Fast players first, then players without Fast or Slow, then Slow players.

Finally, each Adversary does whatever their Intent indicates that they will do.

## Movement
Whenever a fight is triggered, the room the players are standing in becomes a Battle Arena.

The Battle Arena is a 3x3 grid. Each square of the grid is a Zone.
Players and Adversaries can share a Zone, and _all_ start in the center square.

Most melee-range abilites only work within a Zone. Most ranged abilities work on adversaries in ANY Zone.

Some rooms are Large, these are represented by a 5x5 grid.
Some rooms are Cramped, these are represented by a 1x1 grid. (Which is, notably, just a single square. Sorry, ranged abilities!)

## A Turn

On a turn, a player draws 4 cards from their deck. If there are not enough cards in their deck
to draw 5 cards, they shuffle their discard pile into their deck, and then draw 4 cards from their deck.

These 5 cards constitute the player's "hand" for the turn.

If the player cannot draw up to 5 cards, they should reshuffle their discard pile to make a fresh deck.

## Numerical Values of Tarot Cards
* Ace - 1
* 2 through 10 - as listed
* Page - 10
* Knight - 10
* Queen - 10
* King - 10

## The Gutter
Every player has The Gutter, a collection of Default Abilities:

### Unarmed Strike (Melee)
* Place Minor Arcana cards of suit Wands or Swords on Strike.
* Cards sitting on Strike remain there.
* When the sum of the numerical values on the cards reaches (or exceeds) 10, discard all cards on Strike and deal 5 Damage, or 2 Ranged Damage.

* If Strong, 7/3 damage.
* If Weak, 3/1 damage.

### Defend
* Place Minor Arcana cards of suit Cups or Pentacles on Defend.
* Cards sitting on Defend remain there.
* When the sum of the numerical values on the cards reaches (or exceeds) 10, discard all cards on Defend and generate 5 Shields.

* Shields are temporary, and last until the beginning of your next turn. You can spend a Shield rather than losing a Hit Point.

* If Fast, 7 shields.
* If Slow, 3 shields.

### Concentrate
* Place Major Arcana on Concentrate.
* When there are two cards on Concentrate, discard them and draw a new card, immediately.
* If Wise, when there are 1 cards on Concentrate.
* If Foolish, when there are 3 cards on Concentrate.

### Discard Pile
Once there are >= 20 cards in the Discard pile, the Discard pile is shuffled back into the deck.

### The Tower
* When The Tower is drawn, it must be played on The Tower, immediately, interrupting any abilities in play.
* If an ability calls for card draw and the card drawn is The Tower, the ability does not activate.
* The player discards all cards on all of their Abilities, including The Tower, then shuffles the discard pile back into their deck and ends their turn.
* The Tower is a reset - at the end of the Tower turn, the player should have a full deck.

### Foolishness
* Only add this to your abilities if you have the 'foolish' trait.
* Every turn in which you draw Minor Arcana, you must discard your lowest Minor Arcana card.

### Movement
* Place any card on Movement.
* When there are two cards on Movement, discard them and move 1 zone.

If Fast, when there are 1 cards on Movement.
If Slow, when there are 3 cards on Movement.

### Good Idea!
* Only players with Charming may use Good Idea!
* Place The Hierophant on Good Idea!
* Choose another player: they may draw three extra cards this turn.
* Discard the card played on Good Idea at the end of the turn.

### Feint
* Only players with Wise may use Feint.
* Place The Moon on Feint.
* Reveal a hidden Intent, or force an Adversary to re-draw an intent.
* Discard the card played on Feint at the end of the turn.

### Flex
* Only players with Strong may use Flex.
* Place The Emperor on Flex.
* Any non-magical damage generated this turn is doubled.
* Discard The Emperor at the end of the turn.

### Blur
* Only players with Fast may use Blur.
* Place The Chariot on Blur.
* Any left-over shields at the end of this turn are rolled over to the next turn.
* Discard The Chariot at the end of the turn.

### Study
* Only players with Clever may use Study.
* Place Hermit on Study.
* Draw the top 4 cards from your deck. Choose one and add it to your hand. Discard the rest. (This may trigger The Tower.)
* Discard Hermit at the end of the turn.

### Take a Chance
* Only players with Lucky may use Take a Chance.
* Place Wheel of Fortune on Take a Chance.
* Flip a coin. On a Heads, choose one of Good Idea!, Third Eye, Flex, Blur, or Study, and use that ability as if you had played a card there.
* Discard Wheel of Fortune at the end of the turn.

### Run Away
* Place any card on Run Away.

* Once a card has been placed on Run Away, the next card must be either one higher than the highest card on Run Away, or one lower than the lowest card on Run Away.
* (So, for example, when a 5 of Swords and 6 of Pentacles are placed on Run Away, the next card must be a 4, or 7, of any Suit.)
When there are 4 cards (Fast: 3 / Slow: 5) on Run Away, you may either:
* * Move yourself to any unoccupied Zone in the current Battle Arena.
* * Remove yourself from battle entirely. Your participation in this combat is over! The GM decides where you are hiding.
* Then: Discard all cards on Run Away

### Friendship
Friendship can be marked with up to one Corruption Point.

At the end of the Day, if all boxes are marked with a Corruption Point and the player is not Repulsive, draw a new, empty box on Friendship. If the player is Charming, draw an additional empty box on Friendship.

### Skill Checks
Some actions during battle call for Skill Checks. "I hack the computer while the battle is raging on", or "I force open the door".

Attempting the skill check costs cards from the player's hand, and the GM can determine how many cards it costs based on how time-consuming or distracting
the action might be. A very time consuming and distracting action, like hacking a computer, might cost all 5 cards,
whereas a quick action where the battle is still the focus, like deftly leaping across a chasm, might only cost 1 card.

Once the player has "paid" for the skill check, while keeping their hand and any current combat cards separate, the player shuffles their discard pile into their deck, then uses the deck to perform a skill check as usual.

## Magic
Characters can cast [spells](./magic.md) in battle!

## Conclusion & Supremacy

The Combat is over when all adversaries have fled or knocked down to 0HP.

Adversaries knocked down to 0HP may have been knocked unconscious, killed, or simply incapacitated: that's
up to the players and the GM.

When a Combat concludes, open up the Supremacy Worksheet:
* If every player has full HP, mark one tally in the Supremacy box.
* If any player has full HP, mark one tally in the Supremacy box.
* If every player has accumulated 0 Corruption, mark one tally in the Supremacy box.
* If any player has accumulated 0 Corruption, mark one tally in the Supremacy box.

Accumulated Supremacy makes combat _more difficult_ as the game goes on.
Every time the players reach a milestone on the Supremacy Worksheet, the GM draws a card and
gives some or all of the game's adversaries a buff.

However, accumulating Supremacy is good: it's one of the only ways in the game to shed Corruption points, for one!

## A Sample Adversary
This is _Brock_, an example of the kind of fellow one might get in a scuffle with:

### Brock: A Regular Guy With No Special Qualities Whatsoever, But He Is Definitely a Real Jerk
HP: 30

* Simple: Brock draws 1 card per turn.
* Mobile: If there is nobody to hit in Brock's zone, Brock will move 1 space towards any player on his turn.
* Swords, Wands: "Punch", Do 8 melee damage.
* Cups, Pentacles: "Dodge", Generate 6 shields.
* Major Arcana: "Pocket Sand!", Make one player in melee range "Weak" until the beginning of Brock's next turn.