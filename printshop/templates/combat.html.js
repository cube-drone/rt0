let {helperToCard} = require('./littlecard.html.js');

function strengthsAndWeaknesses(text){
    text = text.replace("Strong", "<strong class='strength-strong strength'>Strong</strong>");
    text = text.replace("Weak", "<em class='weakness-weak weakness'>Weak</em>");
    text = text.replace("Fast", "<strong class='strength-fast strength'>Fast</strong>");
    text = text.replace("Slow", "<em class='weakness-slow weakness'>Slow</em>");
    text = text.replace("Wise", "<strong class='strength-wises strength'>Wise</strong>");
    text = text.replace("Foolish", "<em class='weakness-foolish weakness'>Foolish</em>");
    text = text.replace("Charming", "<strong class='strength-charming strength'>Charming</strong>");
    text = text.replace("Repulsive", "<em class='weakness-repulsive weakness'>Repulsive</em>");
    text = text.replace("Clever", "<strong class='strength-clever strength'>Clever</strong>");
    text = text.replace("Dull", "<em class='weakness-dull weakness'>Dull</strong>");
    text = text.replace("Lucky", "<strong class='strength-lucky strength'>Lucky</strong>");
    text = text.replace("Unlucky", "<em class='weakness-unlucky weakness'>Unlucky</em>");

    return text;
}

function combatAbility({name, slug, description, descriptionHtml, extraHtml, helper, type, category, row, column}){

    let top = row.startsWith('1');
    let bottom = row.endsWith('13');

    let helpHtml = '';
    if(helper){
        let helpers = helper.card;
        if(!Array.isArray(helpers)){
            helpers = [helpers];
        }
        helpHtml = helpers.map(helperToCard).join('');
    }

    let style = `
        <style>
        .grid-${slug}{
            grid-row: ${row};
            grid-column: ${column};
        }
        </style>
    `;

    let typeHtml = '';
    if(type){
        typeHtml = strengthsAndWeaknesses(type);
    }

    if(!extraHtml){
        extraHtml = '';
    }

    if(top){
        return `
            ${style}
            <div class="combat-ability combat-ability-top ${slug} grid-${slug}">

                <div class="tarot-bottom">
                    ${helpHtml}
                </div>

                <h2>${name}</h2>
                ${descriptionHtml}

                ${extraHtml}

                <div class="strongweak">
                    ${typeHtml}
                </div>
            </div>
        `
    }
    else if(bottom){
        return `
            ${style}
            <div class="combat-ability combat-ability-bottom ${slug} grid-${slug}">
                <div class="strongweak">
                    ${typeHtml}
                </div>

                <h2>${name}</h2>
                ${descriptionHtml}

                ${extraHtml}

                <div class="tarot-top">
                    ${helpHtml}
                </div>

            </div>
        `
    }
    else {
        return `
            ${style}
            <div class="combat-ability combat-ability-top ${slug} grid-${slug}">
                <h2>${name}</h2>
                ${descriptionHtml}

                ${extraHtml}

                ${helpHtml ? `<div class="tarot-bottom">${helpHtml}</div>` : ''}

                <div class="strongweak">
                    ${typeHtml}
                </div>
            </div>
        `
    }

}


function combatTemplate({combat}){
    return `
    <div id="combat" class="combat">

        ${combatAbility({...combat.strike, row: '1 / 6', column: '1'})}
        ${combatAbility({...combat.runaway, row: '6 / 13', column: '1'})}

        ${combatAbility({...combat.defend, row: '1 / 6', column: '2'})}
        ${combatAbility({...combat.movement, row: '9 / 13', column: '2'})}

        ${combatAbility({...combat.concentrate, row: '1 / 6', column: '3'})}
        ${combatAbility({...combat.friendship, row: '6 / 9', column: '3'})}
        ${combatAbility({...combat.catastrophe, row: '9 / 13', column: '3'})}

        <style>
            .turn {
                grid-row: 6 / 9;
                grid-column: 2;
                font-size: x-small;
            }
        </style>

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

    </div>
    `;
}

function combatTemplatePageTwo({combat}){
    return `
    <div id="combat-two" class="combat">

        ${combatAbility({...combat.goodidea, row: '1 / 6', column: '1'})}
        ${combatAbility({...combat.honk, row: '6 / 9', column: '1'})}
        ${combatAbility({...combat.blur, row: '9 / 13', column: '1'})}

        ${combatAbility({...combat.feint, row: '1 / 6', column: '2'})}
        ${combatAbility({...combat.scissors, row: '6 / 9 ', column: '2'})}
        ${combatAbility({...combat.study, row: '9 / 13', column: '2'})}

        ${combatAbility({...combat.flex, row: '1 / 6', column: '3'})}
        ${combatAbility({...combat.takeachance, row: '8 / 13', column: '3'})}

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

function combatPages(data){
    return [
        combatTemplate(data),
        combatTemplatePageTwo(data)
    ];
}

function magicPages(data){
    return [
        magicTemplate(data),
        magicTemplatePageTwo(data),
        magicTemplatePageThree(data)
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