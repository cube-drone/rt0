const fs = require('fs');
const { XMLParser } = require("fast-xml-parser");
const { marked } = require('marked');

function read(xmlFile){
    let xml = fs.readFileSync(xmlFile, 'utf8');

    const parser = new XMLParser();
    let jObj = parser.parse(xml);

    delete jObj['?xml'];

    return jObj;
}

function readKeywords(){
    let doc = read('data/keywords.xml');
    let obj = {};
    for (let keywordGroupName of Object.keys(doc.lists)){
        obj[keywordGroupName] = doc.lists[keywordGroupName].k;
    }
    return obj;
}

function listKeywords(keywords){
    let list = [];
    for(let keywordGroup of Object.keys(keywords)){
        list = [...list, ...keywords[keywordGroup]];
    }
    return list;
}

function prepare(doc, keywords){
    doc.descriptionHtml = marked(doc.description);

    for(let keyword of keywords){
        doc.descriptionHtml = doc.descriptionHtml.replace(keyword, `<span class="keyword">${keyword}</span>`);
    }
    return doc;
}

function prepareData(){
    let keywordObj = readKeywords();
    let keywords = listKeywords(keywordObj);

    // for each document in data/combat:
    // read the document
    // add the document to the combat data object
    // add the document's keywords to the keywords object
    let combatData = {};
    let combatFiles = fs.readdirSync('data/combat');
    for (let file of combatFiles){
        let doc = read(`data/combat/${file}`);
        let name = file.replace('.xml', '');
        combatData[name] = doc.ability;
        if(doc.ability.keywords && doc.ability.keywords.k){
            keywords.push(doc.ability.keywords.k);
        }
        keywords.push(doc.ability.name);
    }

    keywords = [...new Set(keywords)];

    for(let key of Object.keys(combatData)){
        combatData[key] = prepare(combatData[key], keywords);
    }

    return {
        combat: combatData,
        keywordObj,
        keywords,
    };
}

let data = prepareData();
console.dir(data, {depth: 3});
