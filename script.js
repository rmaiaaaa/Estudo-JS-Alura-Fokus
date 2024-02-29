import Constants from './constants.js';
import TextConstants from './textos.js';
/*----------------------------------------------- */
const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoesLista = document.querySelectorAll('.app__card-button');
const botaoStartPause = document.querySelector('#start-pause');
const musicSwitch = document.querySelector('#alternar-musica');
const musicFile = new Audio('/sons/luna-rise-part-one.mp3');
const playSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');
const beepSound = new Audio('/sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');

musicFile.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musicSwitch.addEventListener('change', () =>{

    if(musicFile.paused){
        musicFile.play();
    }else{
        musicFile.pause();
    }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5;
    alterarContexto(Constants.FOCO);
    botaoFoco.classList.add('active');
});

botaoDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto(Constants.DESCANSO_CURTO);
    botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto(Constants.DESCANSO_LONGO);
    botaoDescansoLongo.classList.add('active');
});

function alterarContexto(contexto) {

    mostrarTempo();

    botoesLista.forEach(function(contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    modificarPorContexto(contexto);

};

function modificarPorContexto(contexto) {

    switch (contexto) {
        case Constants.FOCO:
            texto.innerHTML = TextConstants.FOCO;
            break;

        case Constants.DESCANSO_CURTO:
            texto.innerHTML = TextConstants.DESCANSO_CURTO;
            break;
        case Constants.DESCANSO_LONGO:
            texto.innerHTML = TextConstants.DESCANSO_LONGO;
            break;

        default:
            break;
    }

};

const contagemRegressiva = () =>{
    
    if(tempoDecorridoEmSegundos <= 0){
        beepSound.play();
        alert('Tempo finalizado!');
        zerarInterval();

        //broadcast de evento
        if (html.getAttribute('data-contexto') == Constants.FOCO){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        return;
    };

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

botaoStartPause.addEventListener('click', togglePlay);

function togglePlay() {
    
    var spanElement = botaoStartPause.querySelector('span');
    var symbolElement = botaoStartPause.querySelector('.app__card-primary-butto-icon');
    
    if(intervaloId){
        zerarInterval();
        pauseSound.play();
        spanElement.textContent = 'Começar';
        symbolElement.src = '/imagens/play_arrow.png';
        return;
    };
    
    intervaloId = setInterval(contagemRegressiva, 1000);
    playSound.play();
    spanElement.textContent = 'Pausar';
    symbolElement.src = '/imagens/pause.png';
};

function zerarInterval(){
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {

    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});

    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();