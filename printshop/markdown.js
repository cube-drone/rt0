

function generateCombatMarkdown({data}){
    let markdown = '';

    const addToMarkdown = ({name, slug, description, type, category, extraDescription}) => {
        markdown += `## ${name}\n`;
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

    addToMarkdown(data.combat.flex);
    addToMarkdown(data.combat.blur);
    addToMarkdown(data.combat.feint);
    addToMarkdown(data.combat.study);
    addToMarkdown(data.combat.takeachance);
    addToMarkdown(data.combat.goodidea);

    addToMarkdown(data.combat.honk);

    return markdown;
}

function generateMagicMarkdown({data}){
    let markdown = '';

    const addToMarkdown = ({name, slug, symbol, combatName, combatDescription, skillName, skillDescription, extraDescription}) => {
        markdown += `## ${symbol} ${name}\n`;

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

    markdown += `[Magician Character Sheet](/generated/printables/magician.html)\n\n`;

    markdown += `## Description\n\n`;
    markdown += data.arcana.magician.description;
    markdown += '\n\n';

    markdown += data.arcana.magician.special;
    markdown += '\n\n';

    markdown += data.arcana.magician.narrativeAbility;
    markdown += '\n\n';

    const addToMarkdown = ({name, description, extraDescription, corruption}) => {
        markdown += `### ${name}\n`;
        if(corruption){
            markdown += `_Corruption Upgrade: Mark 3 Corruption Points on ${name} to Unlock it._\n\n`;
        }

        markdown += description;
        if(extraDescription){
            markdown += '\n\n';
            markdown += extraDescription;
        }
        markdown += '\n\n';
    }

    markdown += `## Combat Abilities\n\n`;
    addToMarkdown(data.arcana.magician.abilities.rabbit);
    addToMarkdown(data.arcana.magician.abilities.saw);

    addToMarkdown(data.arcana.magician.abilities.nexttrick);
    addToMarkdown(data.arcana.magician.abilities.abracadabra);

    addToMarkdown(data.arcana.magician.abilities.miser);
    addToMarkdown(data.arcana.magician.abilities.checkears);

    addToMarkdown(data.arcana.magician.abilities.cupsandballs);
    addToMarkdown(data.arcana.magician.abilities.magicwand);

    addToMarkdown(data.arcana.magician.abilities.yourcard);
    addToMarkdown(data.arcana.magician.abilities.threecardmonte);

    addToMarkdown(data.arcana.magician.abilities.disappearing);
    addToMarkdown(data.arcana.magician.abilities.smoke);

    return markdown;
}

module.exports = {
    generateCombatMarkdown,
    generateMagicMarkdown,
    generateMagicianMarkdown
}