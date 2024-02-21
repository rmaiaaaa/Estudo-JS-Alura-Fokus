const FOCO = 'foco';
const DESCANSO_CURTO = 'descanso-curto';
const DESCANSO_LONGO = 'descanso-longo';
/*----------------------------------------------- */
const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoesLista = document.querySelectorAll('.app__card-button')

botaoFoco.addEventListener('click', () => {
    alterarContexto(FOCO);
    botaoFoco.classList.add('active');
});

botaoDescansoCurto.addEventListener('click', () => {
    alterarContexto(DESCANSO_CURTO);
    botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', () => {
    alterarContexto(DESCANSO_LONGO);
    botaoDescansoLongo.classList.add('active');
});

function alterarContexto(contexto) {

    botoesLista.forEach(function(contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    modificarPorContexto(contexto);

}

function modificarPorContexto(contexto) {

    switch (contexto) {
        case FOCO:
            texto.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case DESCANSO_CURTO:
            texto.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case DESCANSO_LONGO:
            texto.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;
    }

}