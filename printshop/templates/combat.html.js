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
                    5 (<strong>7</strong>/<em>3</em>) Shields </li>
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
                <li> After all players have taken their turn, all <span class="keyword">Adversary</span> <span class="keyword">Intents</span> are executed. </li>
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

            <h2>Good Idea</h2>
            <ul>
                <li> Only players with <span class="keyword">Charming</span> may use <span class="keyword">Good Idea</span>.</li>
                <li> Place <span class="keyword">The Hierophant</span> on <span class="keyword">Good Idea</span>.</li>
                <li> Choose another player: they draw 3 cards.</li>
                <li> Discard the card played on <span class="keyword">Good Idea</span> at the end of the turn.</li>

            <div class="strongweak">
                <strong>Charming</strong>
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
                <li> Charm an intelligent human, creature or system that you encounter. </li>
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
                <li> Once <span class="keyword">Virgo</span> is used in this way, it can not be used again until the next Combat, or the end of the Day. </li>
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

module.exports = {
    combatTemplate,
    combatTemplatePageTwo,
    magicTemplate,
}