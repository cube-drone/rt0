
// the goal of printshop is to poop out printable artifacts for all of the game's various and sundry printables
// running printshop will generate files in the /printables directory

const fs = require('fs');

const { pages } = require('./templates/base.html.js');
const { reportCardTemplate } = require('./templates/reportcard.html.js');
const {combatPages, magicPages} = require('./templates/combat.html.js');
const { prepareData } = require('./data.js');


function writeContentsToFile({title, contents, filename}) {
    let html = pages({title, contents});
    fs.writeFileSync(`printables/${filename}`, html);
}


function fullPrint({data}){
    let reportCard = reportCardTemplate(data);
    let combats = combatPages(data);
    let magics = magicPages(data);

    let contents = [
        reportCard,
        ...combats,
        ...magics,
    ];
    writeContentsToFile({title: 'Full Print', contents, filename: 'full.html'});
}

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


function main() {

    // prepare the data
    let data = prepareData();

    // create the printables directory if it doesn't exist
    if(!fs.existsSync('printables')){
        fs.mkdirSync('printables');
    }

    fullPrint({data});

    let combatMarkdown = generateCombatMarkdown({data});
    let spellsMarkdown = generateMagicMarkdown({data});
    // write the markdown to ../players-guide/src/player/generated/basic_combat.md
    let writeFileSync = (filename, contents) => {
        console.log(`writing ${filename}...`);
        fs.writeFileSync(filename, contents);
        console.log(`OK`);
    }
    writeFileSync('../players-guide/src/player/generated/basic_combat.md', combatMarkdown);
    writeFileSync('../players-guide/src/player/generated/basic_spells.md', spellsMarkdown);

    // copy the entire static directory to printables/static
    if(!fs.existsSync('printables/static')){
        fs.mkdirSync('printables/static');
    }
    for (let file of fs.readdirSync('static')) {
        fs.copyFileSync(`static/${file}`, `printables/static/${file}`);
    }


}

main();