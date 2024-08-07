

function generateCombatMarkdown({data}){
    let markdown = '';

    const addToMarkdown = ({name, flavor, slug, description, type, category, extraDescription}) => {
        markdown += `## ${name}\n`;
        markdown += `_${flavor}_\n\n`
        markdown += description;
        if(extraDescription){
            markdown += '\n\n';
            markdown += extraDescription;
        }
        markdown += '\n\n';
    }

    addToMarkdown(data.combat.strike);
    addToMarkdown(data.combat.defend);
    addToMarkdown(data.combat.concentrate);
    addToMarkdown(data.combat.movement);
    addToMarkdown(data.combat.runaway);
    addToMarkdown(data.combat.catastrophe);
    addToMarkdown(data.combat.friendship);

    /*
    addToMarkdown(data.combat.flex);
    addToMarkdown(data.combat.blur);
    addToMarkdown(data.combat.feint);
    addToMarkdown(data.combat.study);
    addToMarkdown(data.combat.takeachance);
    addToMarkdown(data.combat.goodidea);
    */

    addToMarkdown(data.combat.honk);

    return markdown;
}

function generateMagicMarkdown({data}){
    let markdown = '';

    const addToMarkdown = ({name, flavor, slug, symbol, combatName, combatDescription, skillName, skillDescription, extraDescription}) => {
        markdown += `## ${symbol} ${name}\n`;

        markdown += `_${flavor}_\n\n`

        if(extraDescription){
            markdown += extraDescription;
            markdown += '\n\n';
        }

        markdown += `### Combat - ${combatName}\n`
        markdown += combatDescription;
        markdown += '\n\n';

        markdown += `### Skill - ${skillName}\n`
        markdown += skillDescription;
        markdown += '\n\n';
    }

    addToMarkdown(data.spells.aries);
    addToMarkdown(data.spells.taurus);
    addToMarkdown(data.spells.cancer);
    addToMarkdown(data.spells.leo);
    addToMarkdown(data.spells.gemini);
    addToMarkdown(data.spells.sagittarius);
    addToMarkdown(data.spells.capricorn);
    addToMarkdown(data.spells.libra);
    addToMarkdown(data.spells.scorpio);
    addToMarkdown(data.spells.pisces);
    addToMarkdown(data.spells.aquarius);
    addToMarkdown(data.spells.virgo);
    addToMarkdown(data.spells.ophiuchus);

    return markdown;
}

function generateMagicianMarkdown({data}){
    let markdown = '';

    markdown += `# 1 - The Magician\n\n`;

    markdown += '![the magician](/images/magician.png)\n\n'

    markdown += `[Magician Character Sheet](/generated/printables/magician.html)\n\n`;

    markdown += `## Description\n\n`;
    markdown += data.arcana.magician.description;
    markdown += '\n\n';

    markdown += data.arcana.magician.special;
    markdown += '\n\n';

    markdown += data.arcana.magician.narrativeAbility;
    markdown += '\n\n';

    const addToMarkdown = ({name, flavor, description, extraDescription, corruption, upgrade}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        if(corruption){
            markdown += `**Corruption Upgrade: Mark 3 Corruption Points on ${name} to Unlock it.**\n\n`;
        }
        if(upgrade){
            markdown += `_Corruption Upgrade: ${upgrade}_\n\n`;
        }

        markdown += description;
        if(extraDescription){
            markdown += '\n\n';
            markdown += extraDescription;
        }
        markdown += '\n\n';
    }

    markdown += `## Arcana Abilities\n\n`;
    addToMarkdown(data.arcana.magician.abilities.rabbit);
    addToMarkdown(data.arcana.magician.abilities.saw);

    addToMarkdown(data.arcana.magician.abilities.abracadabra);
    addToMarkdown(data.arcana.magician.abilities.nexttrick);

    addToMarkdown(data.arcana.magician.abilities.checkears);
    addToMarkdown(data.arcana.magician.abilities.miser);

    addToMarkdown(data.arcana.magician.abilities.cupsandballs);
    addToMarkdown(data.arcana.magician.abilities.magicwand);

    addToMarkdown(data.arcana.magician.abilities.threecardmonte);
    addToMarkdown(data.arcana.magician.abilities.yourcard);

    addToMarkdown(data.arcana.magician.abilities.disappearing);
    addToMarkdown(data.arcana.magician.abilities.smoke);

    return markdown;
}

function generateFoolMarkdown({data}){
    let markdown = '';

    markdown += `# 0 - The Fool\n\n`;

    markdown += '![the fool](/images/fool.png)\n\n'

    markdown += `[Fool Character Sheet](/generated/printables/fool.html)\n\n`;

    markdown += `## Description\n\n`;
    markdown += data.arcana.fool.description;
    markdown += '\n\n';

    markdown += data.arcana.fool.special;
    markdown += '\n\n';

    markdown += data.arcana.fool.narrativeAbility;
    markdown += '\n\n';

    const addToMarkdown = ({name, flavor, description, extraDescription, corruption, upgrade}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        if(corruption){
            markdown += `**Corruption Upgrade: Mark 3 Corruption Points on ${name} to Unlock it.**\n\n`;
        }
        if(upgrade){
            markdown += `_Corruption Upgrade: ${upgrade}_\n\n`;
        }

        markdown += description;
        if(extraDescription){
            markdown += '\n\n';
            markdown += extraDescription;
        }
        markdown += '\n\n';
    }

    markdown += `## Arcana Abilities\n\n`;
    addToMarkdown(data.arcana.fool.abilities.kitchensink);
    addToMarkdown(data.arcana.fool.abilities.knifeguy);
    addToMarkdown(data.arcana.fool.abilities.unlikelyhelmet);
    addToMarkdown(data.arcana.fool.abilities.unlikelyweapon);

    addToMarkdown(data.arcana.fool.abilities.laughter);
    addToMarkdown(data.arcana.fool.abilities.slaughter);

    addToMarkdown(data.arcana.fool.abilities.blackjack);
    addToMarkdown(data.arcana.fool.abilities.hitme);

    addToMarkdown(data.arcana.fool.abilities.parade);
    addToMarkdown(data.arcana.fool.abilities.drivingcrazy);

    addToMarkdown(data.arcana.fool.abilities.throwawayjoke);
    addToMarkdown(data.arcana.fool.abilities.surprisetwist);

    addToMarkdown(data.arcana.fool.abilities.crisisaverted);
    addToMarkdown(data.arcana.fool.abilities.happyaccident);

    return markdown;
}

function generatePriestessMarkdown({data}){
    let markdown = '';

    markdown += `# 2 - The High Priestess\n\n`;

    markdown += `[High Priestess Character Sheet](/generated/printables/priestess.html)\n\n`;

    markdown += `## Description\n\n`;
    markdown += data.arcana.highpriestess.description;
    markdown += '\n\n';

    markdown += data.arcana.highpriestess.special;
    markdown += '\n\n';

    markdown += data.arcana.highpriestess.narrativeAbility;
    markdown += '\n\n';

    const addToMarkdown = ({name, flavor, description, extraDescription, corruption, upgrade}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        if(corruption){
            markdown += `**Corruption Upgrade: Mark 3 Corruption Points on ${name} to Unlock it.**\n\n`;
        }
        if(upgrade){
            markdown += `_Corruption Upgrade: ${upgrade}_\n\n`;
        }

        markdown += description;
        if(extraDescription){
            markdown += '\n\n';
            markdown += extraDescription;
        }
        markdown += '\n\n';
    }

    markdown += `## Arcana Abilities\n\n`;
    addToMarkdown(data.arcana.highpriestess.abilities.allsignspointtoyes);
    addToMarkdown(data.arcana.highpriestess.abilities.betternottellyounow);

    addToMarkdown(data.arcana.highpriestess.abilities.yesno);
    addToMarkdown(data.arcana.highpriestess.abilities.goodbye);

    addToMarkdown(data.arcana.highpriestess.abilities.origami);
    addToMarkdown(data.arcana.highpriestess.abilities.bones);

    addToMarkdown(data.arcana.highpriestess.abilities.luckynumbers);
    addToMarkdown(data.arcana.highpriestess.abilities.mistake);

    addToMarkdown(data.arcana.highpriestess.abilities.palmreading);
    addToMarkdown(data.arcana.highpriestess.abilities.coldreading);

    addToMarkdown(data.arcana.highpriestess.abilities.ballistics);
    addToMarkdown(data.arcana.highpriestess.abilities.astronomy);

    return markdown;
}

function generateCriticalInjuryMarkdown({data}){
    let markdown = '';

    markdown += `# Critical Injury\n\n`;

    const addToMarkdown = ({name, flavor, description}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        markdown += description;
        markdown += '\n\n';
    }

    addToMarkdown(data.injury.critical.critical);
    return markdown;
}

function generateMajorInjuryMarkdown({data}){
    let markdown = '';

    markdown += `# Major Injury\n\n`;

    const addToMarkdown = ({name, flavor, description}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        markdown += description;
        markdown += '\n\n';
    }

    for(let [key, injury] of Object.entries(data.injury.major)){
        addToMarkdown(injury);
    }
    return markdown;
}

function generateMinorInjuryMarkdown({data}){
    let markdown = '';

    markdown += `# Minor Injury\n\n`;

    const addToMarkdown = ({name, flavor, description}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        markdown += description;
        markdown += '\n\n';
    }

    for(let [key, injury] of Object.entries(data.injury.minor)){
        addToMarkdown(injury);
    }
    return markdown;
}

function generateItemMarkdown({data}){
    let markdown = '';

    markdown += `# Items\n\n`;

    const addToMarkdown = ({name, flavor, description}) => {
        markdown += `### ${name}\n`;
        markdown += `_${flavor}_\n\n`
        markdown += description;
        markdown += '\n\n';
    }

    for(let [key, item] of Object.entries(data.items)){
        addToMarkdown(item);
    }
    return markdown;
}

module.exports = {
    generateCombatMarkdown,
    generateMagicMarkdown,
    generateMagicianMarkdown,
    generateFoolMarkdown,
    generatePriestessMarkdown,
    generateCriticalInjuryMarkdown,
    generateMajorInjuryMarkdown,
    generateMinorInjuryMarkdown,
    generateItemMarkdown
}
