let {helperToCard} = require('./littlecard.html.js');

function strengthsAndWeaknesses(text){
    text = text.replace("Strong", "<strong class='strength-strong strength'>Strong</strong>");
    text = text.replace("Weak", "<em class='weakness-weak weakness'>Weak</em>");
    text = text.replace("Fast", "<strong class='strength-fast strength'>Fast</strong>");
    text = text.replace("Slow", "<em class='weakness-slow weakness'>Slow</em>");
    text = text.replace("Wise", "<strong class='strength-wises strength'>Wise</strong>");
    text = text.replace("Foolish", "<em class='weakness-foolish weakness'>Foolish</em>");
    text = text.replace("Charming", "<strong class='strength-charming strength'>Charming</strong>");
    text = text.replace("Strange", "<em class='weakness-strange weakness'>Strange</em>");
    text = text.replace("Clever", "<strong class='strength-clever strength'>Clever</strong>");
    text = text.replace("Dull", "<em class='weakness-dull weakness'>Dull</strong>");
    text = text.replace("Lucky", "<strong class='strength-lucky strength'>Lucky</strong>");
    text = text.replace("Unlucky", "<em class='weakness-unlucky weakness'>Unlucky</em>");

    return text;
}

function combatAbility({name, slug, flavorHtml, descriptionHtml, extraHtml, helper, type, category, row, column}){

    let top = row.startsWith('1') && !row.startsWith('10');
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
                <div class="flavor">${flavorHtml}</div>
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
                <div class="flavor">${flavorHtml}</div>

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

                <div class="flavor">${flavorHtml}</div>

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

function spellCombat({name, symbol, flavorHtml, combatName, slug, combatDescription, combatDescriptionHtml, skillDescriptionHtml, helper, type, category, row, column}){
    return combatAbility({
        name: `${symbol} ${name} - ${combatName} <small>(Combat)</small>`,
        slug: `${slug}-combat`,
        flavorHtml,
        description: combatDescription,
        descriptionHtml: combatDescriptionHtml,
        helper,
        type,
        category,
        row,
        column
    })
}

function spellSkill({name, symbol, skillName, slug, skillDescription, skillDescriptionHtml, helper, type, category, row, column}){
    let style = `
        <style>
        .grid-${slug}-narrative{
            grid-row: ${row};
            grid-column: ${column};
        }
        </style>
    `;

    return `
        ${style}
        <div class="combat-ability ${slug}-narrative grid-${slug}-narrative">
            <h2>${symbol} ${name} - ${skillName} <small>(Skill)</small></h2>
            ${skillDescriptionHtml}

            <div class="box box-bottom-right"></div>
        </div>
    `
}

function arcanaAbility({name, slug, flavorHtml, descriptionHtml, extraHtml, helper, type, category, row, column, upgrade, corruption, hidebox}){

    let top = row.startsWith('1') && !row.startsWith('10');
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

    if(corruption){
        // corruption abilities don't have a box, because they're unlocked rather than selected
        hidebox = true;
    }

    let upgradeHtml = '';
    if(corruption){
        upgradeHtml = `

        <div class="upgrade ${bottom ? 'upgrade-bottom' : 'upgrade-top'}">
            <h3> Corruption Unlock: </h3>

            <div class="corruption-circle box-left"></div>
            <div class="corruption-circle box-left"></div>
            <div class="corruption-circle box-left"></div>

            <div style="clear: both;"></div>
        </div>
        `;
    }

    if(top){
        return `
            ${style}
            <div class="combat-ability combat-ability-top ${slug} grid-${slug}">

                <div class="tarot-bottom">
                    ${helpHtml}
                </div>

                <h2>${name}</h2>

                <div class="flavor">${flavorHtml}</div>

                ${descriptionHtml}

                ${extraHtml}

                ${upgradeHtml}

                ${ hidebox ? '' : `<div class="box box-bottom-right"></div>` }

            </div>
        `
    }
    else if(bottom){
        return `
            ${style}
            <div class="combat-ability combat-ability-bottom ${slug} grid-${slug}">

                ${ hidebox ? '' : `<div class="box box-top-right"></div>` }
                <div class="box box-right invisible"></div>

                <h2>${name}</h2>

                <div class="flavor">${flavorHtml}</div>

                ${descriptionHtml}

                ${extraHtml}

                ${upgradeHtml}

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

                <div class="flavor">${flavorHtml}</div>

                ${descriptionHtml}

                ${extraHtml}

                ${helpHtml ? `<div class="tarot-bottom">${helpHtml}</div>` : ''}

                ${upgradeHtml}
            </div>
        `
    }

}


function combatTemplate({combat}){
    return `
    <div id="combat" class="ability-grid">

        ${combatAbility({...combat.strike, row: '1 / 5', column: '1'})}
        ${combatAbility({...combat.runaway, row: '9 / 13', column: '1'})}

        ${combatAbility({...combat.defend, row: '1 / 5', column: '2'})}
        ${combatAbility({...combat.honk, row: '5 / 7', column: '2'})}
        ${combatAbility({...combat.movement, row: '9 / 13', column: '2'})}

        ${combatAbility({...combat.concentrate, row: '1 / 5', column: '3'})}
        ${combatAbility({...combat.friendship, row: '5 / 9', column: '3'})}
        ${combatAbility({...combat.catastrophe, row: '9 / 13', column: '3'})}

        <style>
            .turn {
                grid-row: 5 / 9;
                grid-column: 1;
                font-size: x-small;
            }

            .corruption-heal {
                grid-row: 7 / 9;
                grid-column: 2;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top turn">
            <h2> Combat </h2>
            <ul>
                <li>First, draw an <span class="keyword">Intent</span> for each <span class="keyword">Adversary</span>.</li>
                <li>
                    Each player takes a turn. Players can choose which order they take their turns, but <span class="keyword">Fast</span> players must go first,
                    and <span class="keyword">Slow</span> players must go last.
                </li>
                <li>
                    On each player's turn:
                        <ul>
                            <li> They draw 5 cards from their deck, then play the cards in any order. </li>
                            <li> At the end of their turn, any cards left in their hand are Discarded. </li>
                        </ul>
                </li>
                <li> After all players have taken their turn, each <span class="keyword">Adversary</span> discards all Shields, then executes and discards their <span class="keyword">Intent</span>. </li>
                <li> Discard any Player <span class="keyword">Shields</span> that were not used. </li>
            </ul>

        </div>

        <div class="combat-ability corruption-heal">
            <h3>Uncanny Resilience</h3>
            <ul>
                <li>Take a corruption point. </li>
                <li> Draw a card, then gain HP eqivalent to the
                    numerical value of that card. </li>
                <li> This can heal you above your maximum HP. </li>
            </ul>
        </div>


    </div>
    `;
}

function magicPage({spell}){
    return `
    <div id="magic-${spell.slug}" class="ability-grid">
        ${spellCombat({...spell, row: '1 / 7', column: '1'})}
        ${spellSkill({...spell, row: '7 / 14', column: '1'})}
    </div>
    `;
}

function magicTemplate({spells}){
    return `
    <div id="magic" class="ability-grid">
        ${spellCombat({...spells.virgo, row: '1 / 7', column: '1'})}
        ${spellSkill({...spells.virgo, row: '7 / 11', column: '1'})}
        ${spellCombat({...spells.aquarius, row: '1 / 7', column: '2'})}
        ${spellSkill({...spells.aquarius, row: '7 / 10', column: '2'})}
        ${spellCombat({...spells.ophiuchus, row: '1 / 7', column: '3'})}
        ${spellSkill({...spells.ophiuchus, row: '7 / 10', column: '3'})}

    </div>`;
}

function magicTemplatePageTwo({spells}){
    return `
    <div id="magic" class="ability-grid">
        ${spellCombat({...spells.aries, row: '1 / 5', column: '1'})}
        ${spellSkill({...spells.aries, row: '5 / 7', column: '1'})}
        ${spellSkill({...spells.taurus, row: '7 / 9', column: '1'})}
        ${spellCombat({...spells.taurus, row: '9 / 13', column: '1'})}

        ${spellCombat({...spells.cancer, row: '1 / 6', column: '2'})}
        ${spellSkill({...spells.cancer, row: '6 / 9', column: '2'})}

        ${spellCombat({...spells.leo, row: '1 / 6', column: '3'})}
        ${spellSkill({...spells.leo, row: '6 / 9', column: '3'})}

        ${spellCombat({...spells.gemini, row: '9 / 13', column: '2'})}
        ${spellSkill({...spells.gemini, row: '9 / 13', column: '3'})}
    </div>`;
}

function magicTemplatePageThree({spells}){
    return `
    <div id="magic-2" class="ability-grid">
        ${spellCombat({...spells.sagittarius, row: '1 / 6', column: '1'})}
        ${spellSkill({...spells.sagittarius, row: '6 / 9', column: '1'})}

        ${spellCombat({...spells.capricorn, row: '1 / 7', column: '2'})}
        ${spellSkill({...spells.capricorn, row: '7 / 9', column: '2'})}

        ${spellCombat({...spells.libra, row: '1 / 7', column: '3'})}
        ${spellSkill({...spells.libra, row: '7 / 11', column: '3'})}

        ${spellCombat({...spells.pisces, row: '9 / 13', column: '1'})}
        ${spellSkill({...spells.pisces, row: '11 / 13', column: '2'})}

    </div>
    `
}

function magicianPage({arcana}){
    return `
    <div id="magician" class="ability-grid">

        <style>
            .magician {
                grid-row: 1 / 5;
                grid-column: 1;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top magician ">
            <h2> The Magician </h2>

            ${arcana.magician.descriptionHtml}

            ${arcana.magician.specialHtml}

        </div>

        <style>
            .magician-narrative {
                grid-row: 1 / 5;
                grid-column: 2;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top magician-narrative ">

            ${arcana.magician.narrativeAbilityHtml}

        </div>

        ${arcanaAbility({...arcana.magician.abilities.saw, row: '5 / 8', column: '1'})}
        ${arcanaAbility({...arcana.magician.abilities.rabbit, row: '8 / 13', column: '1'})}
        ${arcanaAbility({...arcana.magician.abilities.nexttrick, row: '6 / 9', column: '2'})}
        ${arcanaAbility({...arcana.magician.abilities.abracadabra, row: '9 / 13', column: '2'})}
        ${arcanaAbility({...arcana.magician.abilities.miser, row: '6 / 9', column: '3'})}
        ${arcanaAbility({...arcana.magician.abilities.checkears, row: '9 / 13', column: '3'})}

    </div>
    `
}

function magicianPageTwo({arcana}){
    return `
    <div id="magician-2" class="ability-grid">
        ${arcanaAbility({...arcana.magician.abilities.yourcard, row: '6 / 9', column: '1'})}
        ${arcanaAbility({...arcana.magician.abilities.threecardmonte, row: '1 / 6', column: '1'})}
        ${arcanaAbility({...arcana.magician.abilities.magicwand, row: '1 / 5', column: '2'})}
        ${arcanaAbility({...arcana.magician.abilities.cupsandballs, row: '5 / 8', column: '2'})}
        ${arcanaAbility({...arcana.magician.abilities.disappearing, row: '1 / 6', column: '3'})}
        ${arcanaAbility({...arcana.magician.abilities.smoke, row: '6 / 9', column: '3'})}
    </div>
    `
}

function foolPage({arcana}){
    return `
    <div id="fool" class="ability-grid">

        <style>
            .magician {
                grid-row: 1 / 5;
                grid-column: 1;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top magician ">
            <h2> The Fool </h2>

            ${arcana.fool.descriptionHtml}

            ${arcana.fool.specialHtml}

        </div>

        <style>
            .fool-narrative {
                grid-row: 1 / 3;
                grid-column: 2;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top fool-narrative ">

            ${arcana.fool.narrativeAbilityHtml}

        </div>
        ${arcanaAbility({...arcana.fool.abilities.slaughter, row: '5 / 9', column: '1'})}
        ${arcanaAbility({...arcana.fool.abilities.laughter, row: '9 / 13', column: '1'})}

        ${arcanaAbility({...arcana.fool.abilities.happyaccident, row: '6 / 9', column: '2'})}
        ${arcanaAbility({...arcana.fool.abilities.crisisaverted, row: '9 / 13', column: '2'})}

        ${arcanaAbility({...arcana.fool.abilities.hitme, row: '2 / 6', column: '3'})}
        ${arcanaAbility({...arcana.fool.abilities.blackjack, row: '6 / 13', column: '3'})}
    </div>
    `
}

function foolPageTwo({arcana}){
    return `
    <div id="fool-2" class="ability-grid">
        ${arcanaAbility({...arcana.fool.abilities.knifeguy, row: '5 / 9', column: '1'})}
        ${arcanaAbility({...arcana.fool.abilities.kitchensink, row: '1 / 5', column: '1'})}
        ${arcanaAbility({...arcana.fool.abilities.unlikelyhelmet, row: '10 / 13', column: '1'})}
        ${arcanaAbility({...arcana.fool.abilities.unlikelyweapon, row: '10 / 13', column: '2'})}

        ${arcanaAbility({...arcana.fool.abilities.parade, row: '1 / 6', column: '2'})}
        ${arcanaAbility({...arcana.fool.abilities.drivingcrazy, row: '6 / 9', column: '2'})}

        ${arcanaAbility({...arcana.fool.abilities.surprisetwist, row: '2 / 8', column: '3'})}
        ${arcanaAbility({...arcana.fool.abilities.throwawayjoke, row: '8 / 13', column: '3'})}
    </div>
    `
}

function priestessPage({arcana}){
    return `
    <div id="priestess" class="ability-grid">

        <style>
            .priestess {
                grid-row: 1 / 5;
                grid-column: 1;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top priestess ">
            <h2> The High Priestess </h2>

            ${arcana.highpriestess.descriptionHtml}

            ${arcana.highpriestess.specialHtml}

        </div>

        <style>
            .priestess-narrative {
                grid-row: 1 / 5;
                grid-column: 2 / 4;
                font-size: x-small;
            }
        </style>

        <div class="combat-ability combat-ability-top priestess-narrative ">

            ${arcana.highpriestess.narrativeAbilityHtml}

        </div>
        ${arcanaAbility({...arcana.highpriestess.abilities.betternottellyounow, row: '5 / 9', column: '1'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.allsignspointtoyes, row: '9 / 13', column: '1'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.bones, row: '5 / 9', column: '2'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.origami, row: '9 / 13', column: '2'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.goodbye, row: '5 / 9', column: '3'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.yesno, row: '9 / 13', column: '3'})}
    </div>
    `
}

function priestessPageTwo({arcana}){
    return `
    <div id="priestess-2" class="ability-grid">
        ${arcanaAbility({...arcana.highpriestess.abilities.palmreading, row: '1 / 6', column: '1'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.coldreading, row: '8 / 13', column: '1'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.ballistics, row: '1 / 6', column: '2'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.astronomy, row: '8 / 13', column: '2'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.luckynumbers, row: '1 / 7', column: '3'})}
        ${arcanaAbility({...arcana.highpriestess.abilities.mistake, row: '7 / 13', column: '3'})}
    </div>

    `
}


function combatPages(data){
    return [
        combatTemplate(data),
    ];
}

function magicPages(data){
    let spellPages = [];
    for(let spell of Object.values(data.spells)){
        spellPages.push(magicPage({spell}));
    }
    return spellPages;
}

function arcanaPages(data){
    return [
        magicianPage(data),
        magicianPageTwo(data),
        foolPage(data),
        foolPageTwo(data),
        priestessPage(data),
        priestessPageTwo(data),
    ];
}

function magicianPages(data){
    return [
        magicianPage(data),
        magicianPageTwo(data),
    ];
}

function foolPages(data){
    return [
        foolPage(data),
        foolPageTwo(data),
    ]
};

function priestessPages(data){
    return [
        priestessPage(data),
        priestessPageTwo(data),
    ]
};

module.exports = {
    combatTemplate,
    combatPages,
    magicTemplate,
    magicTemplatePageTwo,
    magicPages,
    arcanaPages,
    magicianPages,
    foolPages,
    priestessPages,
}