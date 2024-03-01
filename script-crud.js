const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const formTextArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const botaoCancelForm = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

let listaTarefas = JSON.parse(localStorage.getItem('ListaTarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

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

    if (tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {

            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
    
            if (tarefa == tarefaSelecionada){
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
    
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        }
    }

    

    return li;

};

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

document.addEventListener('FocoFinalizado', () => {

    const condicao = tarefaSelecionada && liTarefaSelecionada;
    if (!condicao) {
        return;
    }

    liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');

    tarefaSelecionada.completa = true;
    atualizarTarefas();
})

const removerTarefas = (somenteCompletas) => {
    
    let seletor = ".app__section-task-list-item";
    
    if (somenteCompletas){
        seletor = ".app__section-task-list-item-complete";
    };

    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    })
    
    if (somenteCompletas){
        listaTarefas = listaTarefas.filter(tarefa => !tarefa.completa);
    } else {
        listaTarefas = [];
    }

    atualizarTarefas();

}

btnRemoverTodas.onclick = () => removerTarefas(false);
btnRemoverConcluidas.onclick = () => removerTarefas(true);