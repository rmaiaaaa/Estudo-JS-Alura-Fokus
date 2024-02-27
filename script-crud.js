const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const formTextArea = document.querySelector('.app__form-textarea');

const listaTarefas = [];

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
    localStorage.setItem('ListaTarefas', JSON.stringify(listaTarefas));
})