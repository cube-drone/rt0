
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
    writeContentsToFile({title: 'Hello Printshop', contents, filename: 'hello.html'});

}

function main() {

    // prepare the data
    let data = prepareData();

    // create the printables directory if it doesn't exist
    if(!fs.existsSync('printables')){
        fs.mkdirSync('printables');
    }

    fullPrint({data});

    // copy the entire static directory to printables/static
    if(!fs.existsSync('printables/static')){
        fs.mkdirSync('printables/static');
    }
    for (let file of fs.readdirSync('static')) {
        fs.copyFileSync(`static/${file}`, `printables/static/${file}`);
    }


}

main();