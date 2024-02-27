const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const formTextArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const botaoCancelForm = document.querySelector('.app__form-footer__button--cancel');

const listaTarefas = JSON.parse(localStorage.getItem('ListaTarefas')) || [];

function atualizarTarefas () {
    localStorage.setItem('ListaTarefas', JSON.stringify(listaTarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    const imagemBotao = document.createElement('img');

    imagemBotao.setAttribute('src', './imagens/edit.png');
    botao.append(imagemBotao);
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        
        if (!novaDescricao) {
            return;
        };

        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao;
        atualizarTarefas();
    };

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;

}

botaoAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const descricaoTarefa = formTextArea.getAttribute('value');
    const tarefa = {
        descricao: formTextArea.value
    };

    listaTarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    formTextArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

listaTarefas.forEach(tarefa => {
    
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    
});

const limparFormulario = () => {

    formTextArea.removeAttribute('value');
    formAdicionarTarefa.classList.add('hidden');

};

botaoCancelForm.addEventListener('click', limparFormulario);