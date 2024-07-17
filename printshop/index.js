
// the goal of printshop is to poop out printable artifacts for all of the game's various and sundry printables
// running printshop will generate files in the /printables directory

const fs = require('fs');

const { pages } = require('./templates/base.html.js');
const { reportCardTemplate } = require('./templates/reportcard.html.js');
const {combatPages, magicPages, arcanaPages, magicianPages, foolPages, priestessPages } = require('./templates/combat.html.js');
const { prepareData } = require('./data.js');

const { generateCombatMarkdown, generateMagicMarkdown, generateMagicianMarkdown,
    generateFoolMarkdown, generatePriestessMarkdown,
    generateCriticalInjuryMarkdown, generateMajorInjuryMarkdown, generateMinorInjuryMarkdown,
    generateItemMarkdown
 } = require('./markdown.js');

let writeFileSync = (filename, contents) => {
    console.log(`✍️ writing ${filename}...`);
    fs.writeFileSync(filename, contents);
}

let copyFileSync = (source, target) => {
    console.log(`💾 copying ${source} to ${target}...`);
    fs.copyFileSync(source, target);
}

let mkdirSync = (dir) => {
    console.log(`📁 making directory ${dir}...`);
    fs.mkdirSync(dir);
}

let copyDirSync = (source, target) => {
    console.log(`📁 copying directory ${source} to ${target}...`);
    fs.cpSync(source, target, {recursive: true});
}

function writeContentsToFile({title, contents, filename}) {
    let html = pages({title, contents});
    writeFileSync(`printables/${filename}`, html);
}


function fullPrint({data}){
    let reportCard = reportCardTemplate(data);
    let combats = combatPages(data);
    let magics = magicPages(data);
    let arcana = arcanaPages(data);

    let contents = [
        reportCard,
        ...combats,
        ...magics,
        ...arcana,
    ];
    writeContentsToFile({title: 'Full Print', contents, filename: 'full.html'});
}

function spellsPrint({data}){
    let magics = magicPages(data);
    writeContentsToFile({title: 'Spells', contents: magics, filename: 'spells.html'});
}

function combatPrint({data}){
    let combats = combatPages(data);

    let contents = [
        ...combats,
    ];
    writeContentsToFile({title: 'Full Print', contents, filename: 'combat.html'});
}

function reportCardPrint({data}){
    let reportCard = reportCardTemplate(data);
    writeContentsToFile({title: 'Report Card', contents: [reportCard], filename: 'reportcard.html'});
}

function magicianPrint({data}){
    let magics = magicianPages(data);
    writeContentsToFile({title: 'Magician', contents: magics, filename: 'magician.html'});
}

function foolPrint({data}){
    let fool = foolPages(data);
    writeContentsToFile({title: 'Fool', contents: fool, filename: 'fool.html'});
}

function priestessPrint({data}){
    let priestess = priestessPages(data);
    writeContentsToFile({title: 'High Priestess', contents: priestess, filename: 'priestess.html'});
}


function main() {

    // prepare the data
    let data = prepareData();

    // create the printables directory if it doesn't exist
    if(!fs.existsSync('printables')){
        mkdirSync('printables');
    }

    fullPrint({data});
    reportCardPrint({data});
    combatPrint({data});
    spellsPrint({data});
    magicianPrint({data});
    foolPrint({data});
    priestessPrint({data});

    let combatMarkdown = generateCombatMarkdown({data});
    let spellsMarkdown = generateMagicMarkdown({data});
    let magicianMarkdown = generateMagicianMarkdown({data});
    let foolMarkdown = generateFoolMarkdown({data});
    let priestessMarkdown = generatePriestessMarkdown({data});
    let criticalInjuryMarkdown = generateCriticalInjuryMarkdown({data});
    let majorInjuryMarkdown = generateMajorInjuryMarkdown({data});
    let minorInjuryMarkdown = generateMinorInjuryMarkdown({data});
    let itemMarkdown = generateItemMarkdown({data});
    // write the markdown to ../players-guide/src/player/generated/basic_combat.md
    writeFileSync('../players-guide/src/player/generated/basic_combat.md', combatMarkdown);
    writeFileSync('../players-guide/src/player/generated/basic_spells.md', spellsMarkdown);
    writeFileSync('../players-guide/src/player/generated/magician.md', magicianMarkdown);
    writeFileSync('../players-guide/src/player/generated/fool.md', foolMarkdown);
    writeFileSync('../players-guide/src/player/generated/priestess.md', priestessMarkdown);
    writeFileSync('../players-guide/src/player/generated/criticalinjuries.md', criticalInjuryMarkdown);
    writeFileSync('../players-guide/src/player/generated/majorinjuries.md', majorInjuryMarkdown);
    writeFileSync('../players-guide/src/player/generated/minorinjuries.md', minorInjuryMarkdown);
    writeFileSync('../players-guide/src/player/generated/items.md', itemMarkdown);


    // copy the entire static directory to printables/static
    if(!fs.existsSync('printables/static')){
        fs.mkdirSync('printables/static');
    }
    for (let file of fs.readdirSync('static')) {
        copyFileSync(`static/${file}`, `printables/static/${file}`);
    }

    // copy the entire printables directory to ../players-guide/book/printables
    copyDirSync('printables', '../players-guide/src/generated/printables');


}

main();