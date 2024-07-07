const { randomHand } = require('./tarot');

function main() {
    let counter = 0;
    let n = 100000;
    let counter2 = 0;
    for(let i = 0; i < n; i++){
        let hand = randomHand(6);
        if(hand.includes('magician')){
            counter++;

            let ladies = [
                'queen of wands',
                'queen of cups',
                'queen of swords',
                'queen of pentacles',
                'high priestess',
                'empress',
                'lovers',
                'devil',
                'strength',
                'star',
                'world',
            ]
            let found = false;
            for(let card of hand){
                if(!found && ladies.includes(card)){
                    counter2++;
                    found = true;
                }
            }
        }
    }

    console.log(`${counter}/${n}: ${counter/n}`);
    console.log(`${counter2}/${n}: ${counter2/n}`);
}

main();