
// the goal of printshop is to poop out printable artifacts for all of the game's various and sundry printables
// running printshop will generate files in the /printables directory

const fs = require('fs');

const { pages } = require('./templates/base.html.js');
const { reportCardTemplate } = require('./templates/reportcard.html.js');


function writeContentsToFile({title, contents, filename}) {
    let html = pages({title, contents});
    fs.writeFileSync(`printables/${filename}`, html);
}

let reportCard = reportCardTemplate({});

function testPrint(){
    let contents = [
        reportCard,
        "<h2>Page Two</h2>",
        "<h3>Page Three</h2>",
        "<h4>Page Four</h2>"
    ];
    writeContentsToFile({title: 'Hello Printshop', contents, filename: 'hello.html'});

}

function main() {

    // create the printables directory if it doesn't exist
    if(!fs.existsSync('printables')){
        fs.mkdirSync('printables');
    }

    testPrint();

    // copy the entire static directory to printables/static
    if(!fs.existsSync('printables/static')){
        fs.mkdirSync('printables/static');
    }
    for (let file of fs.readdirSync('static')) {
        fs.copyFileSync(`static/${file}`, `printables/static/${file}`);
    }


}

main();