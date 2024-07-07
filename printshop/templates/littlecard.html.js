
function helperToCard(name){
    name = String(name).trim();
    if(name === 'Sword'){
        return `<div class="card card-minor card-sword">⚔</div>`;
    }
    if(name === 'Wand'){
        return `<div class="card card-minor card-wand">⌇</div>`;
    }
    if(name === 'Cup'){
        return `<div class="card card-minor card-cup">∪</div>`;
    }
    if(name === 'Pentacle'){
        return `<div class="card card-minor card-pentacle">⊕</div>`;
    }
    if(name === 'Major'){
        return `<div class="card card-major">M</div>`;
    }
    if(name === 'Major Arcana'){
        return `<div class="card card-major">M</div>`;
    }
    if(name === 'Minor'){
        return `<div class="card card-minor">m</div>`;
    }
    if(name === 'Minor Arcana'){
        return `<div class="card card-minor">m</div>`;
    }
    if(name === 'Any' || name === "?"){
        return `<div class="card card-any">?</div>`;
    }
    if(name === 'The Fool'){
        return `<div class="card card-fool card-major">0</div>`;
    }
    if(name === 'The Magician'){
        return `<div class="card card-magician card-major">I</div>`;
    }
    if(name === 'The High Priestess'){
        return `<div class="card card-high-priestess card-major">II</div>`;
    }
    if(name === 'The Empress'){
        return `<div class="card card-empress card-major">III</div>`;
    }
    if(name === 'The Emperor'){
        return `<div class="card card-emperor card-major">IV</div>`;
    }
    if(name === 'The Hierophant'){
        return `<div class="card card-hierophant card-major">V</div>`;
    }
    if(name === 'The Lovers'){
        return `<div class="card card-lovers card-major">VI</div>`;
    }
    if(name === 'The Chariot'){
        return `<div class="card card-chariot card-major">VII</div>`;
    }
    if(name === 'Strength'){
        return `<div class="card card-strength card-major">VIII</div>`;
    }
    if(name === 'The Hermit'){
        return `<div class="card card-hermit card-major">IX</div>`;
    }
    if(name === 'Wheel of Fortune'){
        return `<div class="card card-wheel card-major">X</div>`;
    }
    if(name === 'Justice'){
        return `<div class="card card-justice card-major">XI</div>`;
    }
    if(name === 'The Hanged Man'){
        return `<div class="card card-hanged-man card-major">XII</div>`;
    }
    if(name === 'Death'){
        return `<div class="card card-death card-major">XIII</div>`;
    }
    if(name === 'Temperance'){
        return `<div class="card card-temperance card-major">XIV</div>`;
    }
    if(name === 'The Devil'){
        return `<div class="card card-devil card-major">XV</div>`;
    }
    if(name === 'The Tower'){
        return `<div class="card card-tower card-major">XVI</div>`;
    }
    if(name === 'The Star'){
        return `<div class="card card-star card-major">XVII</div>`;
    }
    if(name === 'The Moon'){
        return `<div class="card card-moon card-major">XVIII</div>`;
    }
    if(name === 'The Sun'){
        return `<div class="card card-sun card-major">XIX</div>`;
    }
    if(name === 'Judgement'){
        return `<div class="card card-judgement card-major">XX</div>`;
    }
    if(name === 'The World'){
        return `<div class="card card-world card-major">XXI</div>`;
    }
    return `<div class="card card-${name.toLowerCase()}">${name}</div>`;

}

module.exports = {
    helperToCard,
}