
// the goal of printshop is to poop out printable artifacts for all of the game's various and sundry printables
// running printshop will generate files in the /printables directory

const fs = require('fs');

const { pages } = require('./templates/base.html.js');
const { reportCardTemplate } = require('./templates/reportcard.html.js');
const {combatPages, magicPages} = require('./templates/combat.html.js');
const { prepareData } = require('./data.js');

const { generateCombatMarkdown, generateMagicMarkdown } = require('./markdown.js');

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

    let contents = [
        reportCard,
        ...combats,
        ...magics,
    ];
    writeContentsToFile({title: 'Full Print', contents, filename: 'full.html'});
}

function reportCardPrint({data}){
    let reportCard = reportCardTemplate(data);
    writeContentsToFile({title: 'Report Card', contents: [reportCard], filename: 'reportcard.html'});
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

    let combatMarkdown = generateCombatMarkdown({data});
    let spellsMarkdown = generateMagicMarkdown({data});
    // write the markdown to ../players-guide/src/player/generated/basic_combat.md
    writeFileSync('../players-guide/src/player/generated/basic_combat.md', combatMarkdown);
    writeFileSync('../players-guide/src/player/generated/basic_spells.md', spellsMarkdown);

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