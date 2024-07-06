function combatTemplate({}){
    return `
    <div id="combat" class="combat">

        <div class="combat-ability combat-ability-top unarmed-strike">

            <div class="tarot-bottom">
                <div class="card card-sword">⚔</div>
                <div class="card card-wand">⌇</div>
            </div>

            <h2>Unarmed Strike</h2>
            <ul>
                <li> Place Wands or Swords on <span class="keyword">Unarmed Strike</span>.</li>
                <li> Cards sitting on <span class="keyword">Unarmed Strike</span> remain there.</li>
                <li> When the sum of the numerical values on the cards reaches (or exceeds) 10, discard all cards on <span class="keyword">Unarmed Strike</span> and deal
                    5 (<strong>7</strong>/<em>3</em>) Damage <span class="keyword">or</span> 2 (<strong>3</strong>/<em>1</em>) Ranged Damage.</li>
            </ul>

            <div class="strongweak">
                <strong>Strong</strong> / <em>Weak</em>
            </div>


        </div>

        <div class="combat-ability combat-ability-top defend">

            <div class="tarot-bottom">
                <div class="card card-cup">∪</div>
                <div class="card card-pentacle">⊕</div>
            </div>

            <h2>Defend</h2>
            <ul>
                <li> Place Cups or Pentacles on <span class="keyword">Defend</span>.</li>
                <li> Cards sitting on <span class="keyword">Defend</span> remain there.</li>
                <li> When the sum of the numerical values on the cards reaches (or exceeds) 10, discard all cards on <span class="keyword">Defend</span> and gain
                    5 (<strong>7</strong>/<em>3</em>) <span class="keyword">Shields</span> </li>
            </ul>

            <div class="strongweak">
                <strong>Fast</strong> / <em>Slow</em>
            </div>

        </div>

        <div class="combat-ability combat-ability-top concentrate">

            <div class="tarot-bottom">
                <div class="card card-major">M</div>
                <div class="card card-major">M</div>
            </div>

            <h2>Concentrate</h2>
            <ul>
                <li> Place Major Arcana cards on <span class="keyword">Concentrate</span>.</li>
                <li> Cards sitting on <span class="keyword">Concentrate</span> remain there.</li>
                <li> When there are 2 (<strong>1</strong>/<em>3</em>) cards on <span class="keyword">Concentrate</span>, discard them and draw a new card, immediately.</li>
            </ul>

            <div class="strongweak">
                <strong>Wise</strong> / <em>Foolish</em>
            </div>

        </div>

        <div class="combat-ability combat-ability-bottom run-away">

            <div class="strongweak">
                <strong>Fast</strong> / <em>Slow</em>
            </div>

            <h2>Run Away</h2>
            <ul>
                <li> Place any card on <span class="keyword">Run Away</span>.</li>
                <li> Once a card has been placed on <span class="keyword">Run Away</span>,
                    the next card must be either one higher than the highest card on <span class="keyword">Run Away</span>,
                    or one lower than the lowest card on <span class="keyword">Run Away</span>.
                </li>
                <li> When there are 4 cards (<strong>3</strong>/<em>5</em>) on <span class="keyword">Run Away</span>, you may either: </li>
                <li> Move yourself to any unoccupied Zone in the current Battle Arena. </li>
                <li> Remove yourself from battle entirely. Your participation in this combat is over! The GM decides where you are hiding. </li>
                <li> Then: Discard all cards on <span class="keyword">Run Away</span> </li>
            </ul>

            <div class="tarot-top">
                <div class="card card-run">2</div>
                <div class="card card-run">3</div>
                <div class="card card-run">4</div>
                <div class="card card-run">5</div>
            </div>


        </div>

        <div class="combat-ability combat-ability-bottom movement">
            <div class="strongweak">
                <strong>Fast</strong> / <em>Slow</em>
            </div>

            <h2>Movement / Skill</h2>
            <ul>
                <li> Place any card on <span class="keyword">Movement</span>.</li>
                <li> When there are 2 (<strong>1</strong>/<em>3</em>) cards on <span class="keyword">Movement / Skill</span>, discard them and either
                    <ul>
                        <li> Move 1 <span class="keyword">zone</span> <span class="keyword">or</span></li>
                        <li> Shuffle your discard pile into your deck, then make a skill check.</li>
                    </uL.
                </li>
            </ul>

            <div class="tarot-top">
                <div class="card card-any">?</div>
            </div>
        </div>

        <div class="combat-ability combat-ability-bottom friendship">
            <div class="strongweak">
                <strong>Charming</strong>
            </div>

            <h2>Friendship</h2>
            <ul>
                <li> <span class="keyword">Corruption</span> may be marked on <span class="keyword">Friendship</span></li>
                <li> At the end of the <span class="keyword">day</span>, draw 1 (<strong>2</strong>) empty corruption circles on <span class="keyword">Friendship</span></li>
                <li> Players with <span class="keyword">Repulsive</span> may not use <span class="keyword">Friendship</span></li>
            </ul>

            <div class="corruption-container">
                <div class="corruption-circle"></div>
            </div>

        </div>

        <div class="combat-ability combat-ability-bottom tower">
            <h2>Catastrophe</h2>
            <ul>
                <li> Any time <span class="keyword">The Tower</span> is drawn, it must be played immediately and before any other cards on <span class="keyword">Catastrophe</span>.</li>
                <li> The player discards all cards on all of their Abilities, including <span class="keyword">The Tower</span>, then shuffles the discard pile back into their deck and ends their turn.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">XVI</div>
            </div>
        </div>

        <div class="combat-ability combat-ability-bottom turn">
            <ul>
                <li>First, draw an <span class="keyword">Intent</span> for each <span class="keyword">Adversary</span>.</li>
                <li>
                    Each player takes a turn. Players can choose which order they take their turns, but <span class="keyword">Fast</span> players must go first,
                    and <span class="keyword">Slow</span> players must go last.
                </li>
                <li>
                    On each player's turn:
                        <ul>
                            <li> They draw 5 cards from their deck. </li>
                            <li> They may play cards on their Abilities. </li>
                            <li> At the end of their turn, any cards left in their hand are Discarded. </li>
                        </ul>
                </li>
                <li> After all players have taken their turn, all <span class="keyword">Adversary</span> <span class="keyword">Intents</span> are executed and discarded. </li>
                <li> Discard any <span class="keyword">Shields</span> that were not used. </li>
            </ul>

        </div>

        <div class="combat-ability combat-ability-bottom numbers">
            <ul>
                <li><strong>Ace</strong> - 1</li>
                <li><strong>Page, Knight, Queen, King</strong> - 10</li>
            </ul>
        </div>



    </div>
    `;
}

function combatTemplatePageTwo({}){
    return `
    <div id="combat-two" class="combat">

        <div class="combat-ability combat-ability-top goodidea">

            <div class="tarot-bottom">
                <div class="card card-major">V</div>
            </div>

            <h2>Good Idea!</h2>
            <ul>
                <li> Only players with <span class="keyword">Charming</span> may use <span class="keyword">Good Idea!</span>.</li>
                <li> Place <span class="keyword">The Hierophant</span> on <span class="keyword">Good Idea!</span>.</li>
                <li> Choose another player: they draw 3 cards.</li>
                <li> Discard the card played on <span class="keyword">Good Idea!</span> at the end of the turn.</li>

            <div class="strongweak">
                <strong>Charming</strong>
            </div>

        </div>

        <div class="combat-ability combat-ability-top feint">

            <div class="tarot-bottom">
                <div class="card card-major card-moon">XVIII</div>
            </div>

            <h2>Feint</h2>
            <ul>
                <li> Only players with <span class="keyword">Wise</span> may use <span class="keyword">Feint</span>.</li>
                <li> Place <span class="keyword">The Moon</span> on <span class="keyword">Feint</span>.</li>
                <li> Reveal a hidden <span class="keyword">Intent</span> <span class="keyword">and</span> </li>
                <li> You may force an <span class="keyword">Adversary</span> to redraw an <span class="keyword">Intent</span>.</li>
                <li> Discard the card played on <span class="keyword">Feint</span> at the end of the turn.</li>

            <div class="strongweak">
                <strong>Wise</strong>
            </div>

        </div>

        <div class="combat-ability combat-ability-top flex">

            <div class="tarot-bottom">
                <div class="card card-major card-moon">IV</div>
            </div>

            <h2>Flex</h2>
            <ul>
                <li> Only players with <span class="keyword">Strong</span> may use <span class="keyword">Flex</span>.</li>
                <li> Place <span class="keyword">The Emperor</span> on <span class="keyword">Flex</span>.</li>
                <li> While there is a card on <span class="keyword">Flex</span>, any damage generated is multiplied by 2. </li>
                <li> Discard the card played on <span class="keyword">Flex</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <strong>Strong</strong>
            </div>

        </div>

        <div class="combat-ability combat-ability-bottom blur">
            <div class="strongweak">
                <strong>Fast</strong>
            </div>

            <h2>Blur</h2>
            <ul>
                <li> Only players with <span class="keyword">Fast</span> may use <span class="keyword">Blur</span>.</li>
                <li> Place <span class="keyword">The Chariot</span> on <span class="keyword">Blur</span>.</li>
                <li> While there is a card on <span class="keyword">Blur</span>, your Shields are not discarded at the end of the round. </li>
                <li> Discard the card played on <span class="keyword">Blur</span> at the beginning of your next turn.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">VII</div>
            </div>
        </div>

        <div class="combat-ability combat-ability-bottom study">
            <div class="strongweak">
                <strong>Clever</strong>
            </div>

            <h2>Study</h2>
            <ul>
                <li> Only players with <span class="keyword">Clever</span> may use <span class="keyword">Study</span>.</li>
                <li> Place <span class="keyword">The Hermit</span> on <span class="keyword">Study</span>.</li>
                <li> Draw the top 4 cards from your deck. Choose one and add it to your hand. Discard the rest. </li>
                <li> Discard the card played on <span class="keyword">Blur</span> at the end of the turn.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">VIII</div>
            </div>
        </div>

        <div class="combat-ability combat-ability-bottom takeachance">
            <div class="strongweak">
                <strong>Lucky</strong>
            </div>

            <h2>Take a Chance</h2>
            <ul>
                <li> Only players with <span class="keyword">Lucky</span> may use <span class="keyword">Take a Chance</span>.</li>
                <li> Place <span class="keyword">Wheel of Fortune</span> on <span class="keyword">Take a Chance</span>.</li>
                <li> Draw & discard the top card from your deck.
                    <ul>
                        <li>If it was a Ace through 9, do nothing.</li>
                        <li> Otherwise, choose one of Good Idea!, Third Eye, Flex, Blur, or Study, and use that ability as if you had played a card there. </li>
                    </ul>
                </li>
                <li> Discard the card played on <span class="keyword">Take a Chance</span> at the end of the turn.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">X</div>
            </div>
        </div>

        <div class="combat-ability combat-ability-top foolish">
            <h2>Foolish</h2>
            <ul>
                <li> Players with <span class="keyword">Foolish</span> <strong>must</strong> use <span class="keyword">Foolish</span> if they are able to, once per turn.</li>
                <li> Play any card on <span class="keyword">Foolish</span>. </li>
                <li> Make a funny face at the GM, or a silly noise, or honk,  or blow a raspberry, or say "Farts ahoy!" in your best pirate voice. </li>
                <li> Discard the card played on <span class="keyword">Foolish</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <em>Foolish</em>
            </div>
        </div>

        <div class="combat-ability combat-ability-top scissors">
            <h2>Scissors & Glue</h2>
            <ul>
                <li> Use <span class="keyword">Scissors & Glue</span> to take the set of abilities and spells that you can actually use and paste them on
                    to a single sheet for <span class="keyword">Convenient Access</span>. </li>
            </ul>

            <div class="strongweak">
                <strong>Clever</strong>
            </div>
        </div>



    </div>
    `
}

function magicTemplate({}){
    return `
    <div id="magic" class="combat">
        <div class="combat-ability combat-ability-top magic virgo">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> ♍︎ Virgo - Charm <small>(Combat)</small></h2>
            <ul>
                <li> Only players with <span class="keyword">Charming</span> may use or learn <span class="keyword">Virgo</span>.</li>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Virgo</span>.</li>
                <li> Choose an <span class="keyword">Adversary</span> in your Zone:
                    <ul>
                        <li> They must discard their current <span class="keyword">Intent</span>. </li>
                        <li> While a card remains on <span class="keyword">Virgo</span>, if the <span class="keyword">Adversary</span> draws a new <span class="keyword">Intent</span>,
                            and it is not a <span class="keyword">Sword</span>, discard it. </li>
                        <li> When the <span class="keyword">Adversary</span> draws a <span class="keyword">Sword</span>, discard the card used to play <span class="keyword">Virgo</span>. </li>
                        <li> If you or any ally damages the <span class="keyword">Adversary</span>, discard the card used to play <span class="keyword">Virgo</span>. </li>
                    </ul>
                </li>
                <li> If you are <span class="keyword">Clever</span>, you may target any <span class="keyword">Adversary</span>, regardless of location. </li>
            </ul>

            <div class="strongweak">
                <strong>Magic / Charming</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic virgo-narrative">

            <h2> ♍︎ Virgo - Charm <small>(Skill)</small></h2>
            <ul>
                <li> Once per <span class="keyword">Day</span>, Charm an intelligent human, creature or system that you encounter. </li>
                <li> This human, creature, or system will be:
                    <ul>
                        <li> less inclined to attack your party </li>
                        <li> more inclined to help your party </li>
                        <li> easier to convince </li>
                        <li> harder to anger </li>
                        <li> generally a real sweetie-pie. </li>
                    </ul>
                </li>
                <li> This effect ends if the target feels seriously threatened, or after 30 minutes. </li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>

        <div class="combat-ability combat-ability-top magic aquarius">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> ♒︎ Aquarius - Heal <small>(Combat)</small> </h2>
            <ul>
                <li> Only players with <span class="keyword">Charming</span> may use or learn <span class="keyword">Aquarius</span>.</li>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Aquarius</span>.</li>
                <li> You <span class="keyword">or</span> one ally in your Zone:
                    <ul>
                        <li> Regain all hit points <span class="keyword">or</span>
                        <li> downgrade a Major Injury to its associated Minor Injury <span class="keyword">or</span></li>
                        <li> remove a Minor Injury entirely.</li>
                    </ul>
                </li>
                <li> If you are <span class="keyword">Clever</span>, you may target any Ally, regardless of location. </li>
                <li> <span class="keyword">Aquarius</span> may not be used more than once per <span class="keyword">Day</span>.</li>
                <li> Discard the card played on <span class="keyword">Aquarius</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <strong>Magic / Charming</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic aquarius-narrative">

            <h2> ♒︎ Aquarius - Heal <small>(Skill)</small></h2>
            <ul>
                <li> You <span class="keyword">or</span> an ally may:
                    <ul>
                        <li> Downgrade a Major Injury to its associated Minor Injury <span class="keyword">or</span></li>
                        <li> remove a Minor Injury entirely.</li>
                    </ul>
                </li>
                <li> <span class="keyword">Aquarius</span> may not be used more than once per <span class="keyword">day</span>.</li>
            </ul>

            <div class="box box-bottom-right"></div>

        </div>

        <div class="combat-ability combat-ability-top magic ophiuchus">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> Ophiuchus - ??? <small>(Combat)</small> </h2>
            <ul>
                <li> Only players with <span class="keyword">Lucky</span> may use or learn <span class="keyword">Ophiuchus</span>.</li>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Ophiuchus</span>.</li>
                <li> Something magical happens. </li>
                <li> What is it? </li>
                <li> You tell me. </li>
                <li> Propose a small, useful magical effect to the GM. </li>
                <li> The GM will decide if it is reasonable. </li>
                <li> If it is, it happens. </li>
                <li> Discard the card played on <span class="keyword">Ophiuchus</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <strong>Magic / Lucky</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic ophiuchus-narrative">

            <h2> Ophiuchus - ??? <small>(Skill)</small></h2>
            <ul>
                <li> Something magical happens. </li>
                <li> What is it? </li>
                <li> You tell me. </li>
                <li> Propose a small, useful magical effect to the GM. </li>
                <li> The GM will decide if it is reasonable. </li>
                <li> If it is, it happens. </li>
                <li> <span class="keyword">Ophiuchus</span> may not be used more than once per <span class="keyword">day</span>.</li>
            </ul>

            <div class="box box-bottom-right"></div>

        </div>

    </div>`;
}

function magicTemplatePageTwo({}){
    return `
    <div id="magic" class="combat">
        <div class="combat-ability combat-ability-top magic aries">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> ♈︎ Aries - Dodge <small>(Combat)</small></h2>
            <ul>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Aries</span>.</li>
                <li> While <span class="keyword">Aries</span> has a card on it, any shields the player generates are multiplied by 2 (<strong>Clever: 3</strong>). </li>
                <li> You may discard the card played on <span class="keyword">Aries</span> whenever you choose.</li>
            </ul>

            <div class="strongweak">
                <strong>Magic</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic aries-narrative">

            <h2> ♈︎ Aries - Agility <small>(Skill)</small></h2>
            <ul>
                <li> Use Aries to make a Skill check for a skill marked "Fast" as if it were <span class="keyword">Easy</span>, once per <span class="keyword">Day</span></li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>

        <div class="combat-ability combat-ability-bottom magic taurus">

            <div class="strongweak">
                <strong>Magic</strong>
            </div>

            <h2> ♉︎ Taurus - Rage <small>(Combat)</small></h2>
            <ul>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Taurus</span>.</li>
                <li> While <span class="keyword">Taurus</span> has a card on it, any damage the player generates is multiplied by 2 (<strong>Clever: 3</strong>). </li>
                <li> You may discard the card played on <span class="keyword">Taurus</span> whenever you choose.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">I</div>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic taurus-narrative">

            <h2> ♉︎ Taurus - Strength <small>(Skill)</small></h2>
            <ul>
                <li> Use Taurus to make a Skill check for a skill marked "Strong" as if it were <span class="keyword">Easy</span>, once per <span class="keyword">Day</span></li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>

        <div class="combat-ability combat-ability-top magic cancer">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> ♋︎ Cancer - Shell <small>(Combat)</small></h2>
            <ul>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Cancer</span>.</li>
                <li> Either: <ul>
                    <li> Generate 15 <span class="keyword">Shields</span> (<strong>Clever</strong>: 30) <span class="keyword">or</span></li>
                    <li> Generate 8 <span class="keyword">Shields</span> and 8 <span class="keyword">Shields</span> for all allies in your <span class="keyword">Zone</span> (<strong>Clever</strong>: 16 each) </li>
                <li> Discard the card played on <span class="keyword">Cancer</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <strong>Magic</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic cancer-narrative">

            <h2> ♋︎ Cancer - Bubble <small>(Skill)</small></h2>
            <ul>
                <li> Use Cancer to spawn a small, hard, magical force-field around you while exploring Paradise Lua, once per <span class="keyword">Day</span></li>
                <li> The bubble lasts for 30 minutes, and holds enough air for all 30 of those minutes. </li>
                <li> If fall damage were a problem (on the Moon, where gravity is not so harsh a mistress), the bubble would protect you from that, too. </li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>

        <div class="combat-ability combat-ability-top magic leo">

            <div class="tarot-bottom">
                <div class="card card-major">I</div>
            </div>

            <h2> ♌︎ Leo - Beam <small>(Combat)</small></h2>
            <ul>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Leo</span>.</li>
                <li> Either:
                    <ul>
                        <li> Generate 15 Damage (<strong>Clever</strong>: 30) <span class="keyword">or</span></li>
                        <li> Generate 8 Damage for all <span class="keyword">Adversaries</span> in your <span class="keyword">Zone</span> (<strong>Clever</strong>: 16 each) </li>
                    </ul>
                </li>
                <li> Discard the card played on <span class="keyword">Leo</span> at the end of the turn.</li>
            </ul>

            <div class="strongweak">
                <strong>Magic</strong>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic leo-narrative">

            <h2> ♌︎ Leo - Light <small>(Skill)</small></h2>
            <ul>
                <li> As often as you want, you can use Leo to cast a bright light in a 30 foot radius around you. </li>
                <li> Once per <span class="keyword">Day</span>, you can use Leo to dramatically reduce the weight of an object. </li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>

        <div class="combat-ability combat-ability-bottom magic gemini">

            <div class="strongweak">
                <strong>Magic</strong>
            </div>

            <h2> ♊︎ Gemini - Twin <small>(Combat)</small></h2>
            <ul>
                <li> Place <span class="keyword">The Magician</span> on <span class="keyword">Gemini</span>.</li>
                <li> Draw 5 Cards (<strong>Clever</strong>: 10) </li>
                <li> Discard the card played on <span class="keyword">Gemini</span> at the end of the turn.</li>
            </ul>

            <div class="tarot-top">
                <div class="card card-major">I</div>
            </div>

        </div>

        <div class="narrative-ability narrative-ability-bottom magic gemini-narrative">

            <h2> ♊︎ Gemini - Clone <small>(Skill)</small></h2>
            <ul>
                <li> Once per <span class="keyword">Day</span>, you can create an illusory, holographic, silent duplicate of yourself. </li>
                <li> The duplicate cannot interact with, pick up, or touch anything - anything touching the illusory copy will simply go right through. </li>
                <li> The duplicate lasts for about thirty minutes. </li>
            </ul>

            <div class="box box-bottom-right"></div>
        </div>
    </div>`;
}

function magicTemplatePageThree({}){
    return `

    `
}

function combatPages(){
    return [
        combatTemplate({}),
        combatTemplatePageTwo({})
    ];
}

function magicPages(){
    return [
        magicTemplate({}),
        magicTemplatePageTwo({}),
        magicTemplatePageThree({})
    ];
}

module.exports = {
    combatTemplate,
    combatTemplatePageTwo,
    combatPages,
    magicTemplate,
    magicTemplatePageTwo,
    magicPages,
}