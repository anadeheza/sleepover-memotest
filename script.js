const totalCards = 12;
let cards = [];
let selected = [];
let valuesUsed = [];
let currentMove = 0;
let intentos = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="front"></div></div>'

function activate(e) {
    if(currentMove < 2) {

        if((!selected[0] || selected[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selected.push(e.target);

            if(++currentMove == 2) {
                
                intentos++;
                document.querySelector('#stats').innerHTML = 'Intentos:' + intentos;

                if(selected[0].querySelectorAll('.front')[0].innerHTML == selected[1].querySelectorAll('.front')[0].innerHTML) {
                    selected = [];
                    currentMove = 0;
                }
                else {
                    setTimeout(() => {
                        selected[0].classList.remove('active');
                        selected[1].classList.remove('active');
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

for (let i=0; i<totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.front')[0].innerHTML = valuesUsed[i];
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

