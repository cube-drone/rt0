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

function renderAndReplace(text, keywords){
    /*
    * 1. Render the text as markdown
    * 2. Bold certain words ("may", "must")
    * 3. Highlight keywords like "Zone" and "The Magician"
    */
    let html = marked(text);

    for(let boldword of [' may ', ' must ']){
        let re = new RegExp(boldword, 'g');
        html = html.replace(re, `<strong>${boldword}</strong>`);
    }
    for(let keyword of keywords){
        let re = new RegExp(keyword, 'g');
        html = html.replace(re, `<span class="keyword">${keyword}</span>`);
    }

    return html;

}

function prepare(doc, keywords){
    if(doc.description && doc.description.length > 0){
        doc.descriptionHtml = renderAndReplace(doc.description, keywords);
    }
    if(doc.extraDescription && doc.extraDescription.length > 0){
        doc.extraDescriptionHtml = renderAndReplace(doc.extraDescription, keywords);
    }
    if(doc.combatDescription && doc.combatDescription.length > 0){
        doc.combatDescriptionHtml = renderAndReplace(doc.combatDescription, keywords);
    }
    if(doc.skillDescription && doc.skillDescription.length > 0){
        doc.skillDescriptionHtml = renderAndReplace(doc.skillDescription, keywords);
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

    let spellFiles = fs.readdirSync('data/spells');
    let spellData = {};
    for (let file of spellFiles){
        let doc = read(`data/spells/${file}`);
        let name = file.replace('.xml', '');
        spellData[name] = doc.spell;
        if(doc.spell.keywords && doc.spell.keywords.k){
            keywords.push(doc.spell.keywords.k);
        }
        keywords.push(doc.spell.name);
    }

    keywords = [...new Set(keywords)];

    for(let key of Object.keys(combatData)){
        combatData[key] = prepare(combatData[key], keywords);
    }
    for(let key of Object.keys(spellData)){
        spellData[key] = prepare(spellData[key], keywords);
    }

    return {
        combat: combatData,
        spells: spellData,
        keywordObj,
        keywords,
    };
}

module.exports = {
    prepareData,
};
