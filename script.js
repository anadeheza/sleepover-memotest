const totalCards = 12;
let cards = [];
let selected = [];
let valuesUsed = [];
let currentMove = 0;
let intentos = 0;
let pairsFound = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="front"></div></div>'

function activate(e) {
    if(currentMove < 2) {
        if((!selected[0] || selected[0] !== e.currentTarget) && !e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active');
            selected.push(e.currentTarget);

            if(++currentMove == 2) {
                intentos++;
                document.querySelector('#stats').innerHTML = 'Intentos: ' + intentos;

                if(selected[0].querySelector('.front').innerHTML == selected[1].querySelector('.front').innerHTML) {
                    pairsFound++;
                    selected = [];
                    currentMove = 0;
                    if (pairsFound === totalCards / 2) {
                        document.getElementById("win-screen").style.display = "flex";
                    }
                }
                else {
                    selected[0].classList.add('shake');
                    selected[1].classList.add('shake');

                    setTimeout(() => {
                        selected[0].classList.remove('active');
                        selected[1].classList.remove('active');
                        
                        selected[0].classList.remove('shake');
                        selected[1].classList.remove('shake');
                        
                        selected = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if(values.length < 2) {
        valuesUsed.push(rnd);
    }
    else {
        randomValue();
    }
}

function initGame() {
    document.querySelector('#game').innerHTML = "";
    cards = [];
    valuesUsed = [];
    selected = [];
    currentMove = 0;
    intentos = 0;
    pairsFound = 0;
    document.querySelector('#stats').innerHTML = 'Intentos: 0';

    for (let i=0; i<totalCards; i++) {
        randomValue();
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        cards[i].querySelector('.front').innerHTML = valuesUsed[i];
        cards[i].querySelector('.card').addEventListener('click', activate);
    }
}

function resetGame() {
    document.getElementById("win-screen").style.display = "none";
    initGame();
}

initGame();